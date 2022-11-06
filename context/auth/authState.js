import React, {useReducer} from 'react';
import authContext from "./authContext";
import authReducer from './authReducer';
import { 
    USUARIO_AUTENTICADO, 
    REGISTRO_EXISTOSO, 
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGINEXITOSO,
    LOGINERROR,
    CERRAR_SESION

} from '../../types';
import clientesAxios from '../../config/axios';

const AuthState = ({children}) => {

    //definir nuestro state inicial
    const initialState = {
        token: '',
        autenticado: false,
        usuario: null,
        mensaje: null
    }
    
    //definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //registrar nuevos usuarios
    const registrarUsarios = async (datos) => {
        console.log('desde registrar usuarios', datos);
        try {
            const res = await clientesAxios.post('/api/usuarios', datos);
            console.log(res.data.msg);
            dispatch({
                type: REGISTRO_EXISTOSO, 
                payload : res.data.msg
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }
        //lIMPIA LA ALERTA 
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsarios
            }}
        >
            {children}
        </authContext.Provider>
    )
}


export default AuthState