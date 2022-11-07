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
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    //definir nuestro state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
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

    
    //Autenticar Usuarios
    const iniciarSesion = async datos => {
        console.log(datos);
        try {
            const res = await clientesAxios.post('/api/auth', datos);
            console.log(res.data.token);
            dispatch({
                type: LOGINEXITOSO,
                payload: res.data.token
            })
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: LOGINERROR,
                payload: error.response.data.msg
            })
        }
        // //lIMPIA LA ALERTA 
        // setTimeout(() => {
        //     dispatch({
        //         type: LIMPIAR_ALERTA
        //     })
        // }, 3000);
    }

    //Retorne el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if(token){
            tokenAuth(token);
            
            try {
                const res = await clientesAxios.get('/api/auth');
                // console.log(res.data.usuario);
                if(res.data.usuario){
                    dispatch({
                        type: USUARIO_AUTENTICADO,
                        payload: res.data.usuario
                    })
                }
            } catch (error) {
                dispatch({
                    type: LOGINERROR,
                    payload: error.response.data.msg
                })
            }
        }
    }

    //Cerrar sesion 
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsarios, 
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}


export default AuthState