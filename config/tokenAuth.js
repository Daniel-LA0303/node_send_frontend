import clientesAxios from "./axios";

const tokenAuth = (token) => {
    if(token){
        clientesAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete clientesAxios.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth;