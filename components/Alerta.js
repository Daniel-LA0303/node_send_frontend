import React, {useContext} from 'react'
import authContext from '../context/auth/authContext'
// import app

const Alerta = () => {
    
    
    //extraer mensaje de error para users
    const AuthContext = useContext(authContext);
    const {mensaje} = AuthContext


return (
    <>
        <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
            {mensaje || mensaje_archivo}
        </div>
    </>
  )
}

export default Alerta