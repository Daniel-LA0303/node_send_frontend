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
            return {
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR_ALERTA: 
            return{
                ...state,
                mensaje: null
            }
        default: 
            return state;
    }
}