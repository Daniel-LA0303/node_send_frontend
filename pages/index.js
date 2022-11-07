import React, {useContext, useEffect} from 'react'
import Layout from "../components/Layout";
import authContext from '../context/auth/authContext';


export default function Home() {

  //extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const {usuarioAutenticado} = AuthContext;

  useEffect(() => {

    const token = localStorage.getItem('token');
    if(token){
      usuarioAutenticado()
    }
  }, [])

  return (
    <Layout></Layout>
  )
}
