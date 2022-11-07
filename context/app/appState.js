import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import clientesAxios from '../../config/axios';

import{
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO,
    SUBIR_ARCHIVO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from '../../types'

const AppState = ({children}) => {
    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(appReducer, initialState);

    //muestra una alerta 
    const mostrarAlerta = msg => {

        console.log(msg);
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    //Sube los archivos al servidor
    const subirArchivo = async(formData, nombreArchivo) => {
        console.log('subiendo');
        dispatch({
            type: SUBIR_ARCHIVO
        })
        try {
            const res = await clientesAxios.post('/api/archivos', formData);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: res.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
            console.log(res.data);
        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }

    }

    //crear el enlace
    const crearEnlace = async () => {
        // console.log('creando enlace');
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const res = await clientesAxios.post('/api/enlaces', data)
            console.log(res.data.msg);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: res.data.msg
            });
        } catch (error) {
            console.log(error);
        }
    }



    return(
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;