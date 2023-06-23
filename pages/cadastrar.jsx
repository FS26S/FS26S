import Head from "next/head";
import { Form } from "react-bootstrap";

function emailUTFPR(email) {
    let emailUTFPR = email.split('@');
    if (emailUTFPR[1] === 'alunos.utfpr.edu.br' || emailUTFPR[1] === 'utfpr.edu.br') {
        return true;
    }
    return false;
}


function Cadastro() {
    const endpoint = '/api/cadastro'; //Atualizar a URL da API
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        if (data.email === '' //Verifica se os campos estão vazios
            || data.nome === ''
            || data.cargo === undefined
            || data.senha === ''
            || data.confirmarSenha === '') {
            alert('Preencha todos os campos');
            return;
        }
        if (!emailUTFPR(data.email)) { //Verifica se o email é da UTFPR
            alert('Email inválido');
            document.getElementById('email').classList.add('is-invalid'); //Adiciona um destaque vermelho no campo de email
            return;
        } else { //Remove a classe is-invalid quando o email é da UTFPR
            document.getElementById('email').classList.remove('is-invalid');
        }

        if (data.senha !== data.confirmarSenha) { //Validação da senha
            alert('As senhas não coincidem');    //Adiciona um destaque vermelho nos campos de senha
            document.getElementById('senha').classList.add('is-invalid');
            document.getElementById('confirmarSenha').classList.add('is-invalid');
            return;
        } else { //Remove a classe is-invalid quando a senha está ok
            document.getElementById('senha').classList.remove('is-invalid');
            document.getElementById('confirmarSenha').classList.remove('is-invalid');
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }
        const response = await fetch(endpoint, options)
        if (response.status === 201) {
            window.location.href = '/login'; //Redireciona para a página de login se tudo ok
            return response.json();
        }
        else {
            console.error(response)
            alert('Erro ao cadastrar');
        }
    }

    function Input(props) {
        return (
            <Form.Group className=''>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type={props.type} name={props.name} id={props.id} />
            </Form.Group>
        )
    }

    return (
        <main className="main d-flex align-items-center ">
            <Head>
                <title>Cadastro</title>
            </Head>
            <Form className="form  mx-auto" method="post" onSubmit={handleSubmit} >
                <p className=''>Cadastro</p>
                <Input label="Email" name="email" id="email" type="email" />
                <Input label="Nome" type="text" id="nome" name="nome" />
                <Form.Group className=''>
                    <Form.Label>Cargo</Form.Label>
                    <Form.Select name="cargo" defaultValue={""}>
                        <option value="" disabled>Selecione</option>
                        <option value="professor">Professor</option>
                        <option value="aluno">Servidor</option>
                    </Form.Select>
                </Form.Group>
                <Input label="Senha" type="password" name="senha" id="senha" />
                <Input label="Confirmar Senha" type="password" name="confirmarSenha" id="confirmarSenha" />
                <div className="mx-auto w-50">
                    <input type="submit" value="Cadastrar" className="mt-3 w-100 btn btn-outline-primary" title="Cadastrar" />
                </div>
            </Form>
        </main>
    )
}

export default Cadastro;
