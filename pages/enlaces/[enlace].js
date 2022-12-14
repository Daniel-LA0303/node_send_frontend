import React, {useState, useContext} from 'react';
import Layout from '../../components/Layout';
import Alerta from '../../components/Alerta';
import clientesAxios from '../../config/axios';
import appContext from '../../context/app/appContext';


export async function getServerSideProps({params}){

    const {enlace} = params;
    // console.log(enlace);

    const res = await clientesAxios.get(`/api/enlaces/${enlace}`);
    console.log(res);


    return{
        props:{
            enlace: res.data
        }
    }
}

export async function getServerSidePaths(){
    const enlaces = await clientesAxios.get('http://localhost:4000/api/enlaces');


    return{
        paths: enlaces.data.enlaces.map((enlace) => ({
            params: {enlace: enlace.url}
        })),
        fallback: false

    }
}


export default ({enlace}) => {
    
    //context app
    const AppContext = useContext(appContext);
    const {mostrarAlerta, mensaje_archivo} = AppContext;

    const[tienePassword, setTienePassword] = useState(enlace.password);
    const[password, setPassword] = useState('');
    console.log(tienePassword);

    const verificarPassword =async e => {
        e.preventDefault();

        const data = {
            password
        }
        try {
            const res = await clientesAxios.post(`http://localhost:4000/api/enlaces/${enlace.enlace}`, data);
            // console.log(res);
            enlace.archivo = res.data.archivo //*******este era el error xd */
            setTienePassword(res.data.password)
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }

    }

    return (
    <Layout>
        {tienePassword ? (
            <>
                <p className='text-center'>Este enlace esta protegido por un password, colocalo a continuación</p>
                {mensaje_archivo && <Alerta />}
                <div className='flex justify-center mt-5'>
                    <div className="w-full max-w-lg">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={e => verificarPassword(e)}
                        >
                            <div className="mb-4">
                                <label 
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="password"
                                >Password</label>
                                <input 
                                    type="password"
                                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <input 
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                value="Validar Password"
                            />
                        </form>
                    </div>
                </div>
            </>
        ) : (
            <>
                <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo</h1>
                <div className='flex items-center justify-center mt-10'>
                    <a 
                        href={`http://localhost:4000/api/archivos/${enlace.archivo}`} 
                        className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'
                    >Here</a>
                </div>
            </>
        )}

    </Layout>
  )
}

