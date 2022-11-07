import { 
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    LOGINEXITOSO,
    LIMPIAR_ALERTA,
    LOGINERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from "../../types";

export default (state, action) => {

    switch(action.type){
        case REGISTRO_EXISTOSO:
        case REGISTRO_ERROR:
        case LOGINERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case LOGINEXITOSO:
            localStorage.setItem('token', action.payload)
            return{
                ...state,
                token: action.payload,
                autenticado: true
            }
        case LIMPIAR_ALERTA: 
            return{
                ...state,
                mensaje: null
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                autenticado: false,
                usuario: null,
                token: null,
            }
        default: 
            return state;
    }
}