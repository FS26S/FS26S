import Link from "next/link";
import LoginCard from "../src/components/loginCard/loginCard"
import styles from '../styles/login.module.css'
import Input from "../src/components/input/input";
import Button from "../src/components/button/button";
export default function LoginPage(){
    return (
        <div className={styles.background}>
            <LoginCard title="Controle de Patrimonio Reserva de Salas">
                <hr className={styles.separador}/>
                <h4 className={styles.utfpr}>UTFPR</h4>
                <form className={styles.form}>
                    <Input type="email" placeholder="Seu e-mail"/>
                    <Input type="password" placeholder="Sua senha"/>
                    <Link href={"/recuperaSenha"} className={styles.recuperarSenha}>Esqueci a Senha</Link>
                    <Button>Entrar</Button>
                    <Link href={"/cadastrar"} className={styles.cadastro}>Cadastre-se</Link>
                </form>
            </LoginCard>
        </div>
    )
}
