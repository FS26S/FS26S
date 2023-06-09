import Head from 'next/head'
import Login from './login'
/*import CadastroLab from './cadastroLab'
import Cadastro from './cadastrar'
import ControleEstoque from './controleEstoque'*/


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>FS26S</title>
        <meta name="description" content="Controle de Patrimônio e Reservas de sala da UTFPR-DV" />
        <link rel="icon" href="/favicon.ico" /> 
      </Head>
      <Login />
    </div>
  )
}
