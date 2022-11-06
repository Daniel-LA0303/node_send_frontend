import '../styles/globals.css';
import AuthState from '../context/auth/authState';


function MyApp({ Component, pageProps }) {
  return (
      <AuthState>
        {/* <AppState> */}
          <Component {...pageProps} />
        {/* </AppState> */}
      </AuthState>
  )
}

export default MyApp
