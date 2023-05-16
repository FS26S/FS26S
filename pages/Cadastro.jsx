import { Form } from "react-bootstrap";

function Cadastro() {
    const url = 'http://localhost:3000/api'; //Atualizar a URL da API
    function handleSubmit(e) {
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
        if (data.senha !== data.confirmarSenha) { //Validação da senha
            alert('As senhas não coincidem');    //Adiciona um destaque vermelho nos campos de senha
            document.getElementById('senha').classList.add('is-invalid');
            document.getElementById('confirmarSenha').classList.add('is-invalid');
            return;
        } else { //Remove a classe is-invalid quando a senha está ok
            document.getElementById('senha').classList.remove('is-invalid');
            document.getElementById('confirmarSenha').classList.remove('is-invalid');
        }
        fetch(url + '/cadastro', { //Também atualizar aqui a URL da API se necessário
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                window.location.href = '/login'; //Redireciona para a página de login se tudo ok
                return response.json();
            }
            throw new Error('Erro ao cadastrar'); //Se a API retornar um erro ou não responder printa no console
        }).then((response) => {
            console.log(response);
        }
        ).catch((error) => {
            console.log(error);
        })
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
        <Form className="form" method="post" onSubmit={handleSubmit}>
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
    )
}

export default Cadastro;