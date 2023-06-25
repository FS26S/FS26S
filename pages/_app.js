import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import NavBar from './NavBar/NavBar';

function MyApp({ Component, pageProps, router }) {

  const { pathname } = router;

    const excludedPaths = ['/', '/cadastrar', '/redefinirSenha'];

    // Verifica se o pathname está na lista de páginas a serem excluídas
    const shouldRenderNavBar = !excludedPaths.includes(pathname);

  return (
    <div>
      {shouldRenderNavBar && <NavBar />}     
      <Component {...pageProps}/>
    </div>    
  )
}

export default MyApp
