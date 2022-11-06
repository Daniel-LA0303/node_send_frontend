import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import mypic from '../public/logo.svg'

const Header = () => {
  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
    <Image 
        // onClick={() => redireccionar()} 
        className='w-64 mb-8 md:mb-0' src={mypic}/>

    <div>

            <>
                <Link 
                    href='/login'
                    className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'    
                >
                    Iniciar sesion
                </Link>
                <Link 
                    href='/crearcuenta'
                    className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
                >
                    Crear Cuenta
                </Link>
            </>
    </div>
</header>
  )
}

export default Header