import Head from 'next/head'
import Cadastro from './cadastro'
//import CadastroLab from './cadastroLab'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Cadastrar</title>
        <meta name="description" content="Controle de Patrimônio e Reservas de sala da UTFPR-DV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
          <Cadastro/>
      </main>
    </div>
  )
}
