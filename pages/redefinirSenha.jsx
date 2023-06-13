import { Form } from "react-bootstrap";


export default function RedefinirSenha() {
    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        if (data.email === '' || data.senha === '' || data.confirmarSenha === '') {
            alert('Preencha todos os campos');
            return;
        }
        if (data.senha !== data.confirmarSenha) {
            alert('As senhas não coincidem');
            document.getElementById('senha').classList.add('is-invalid');
            document.getElementById('confirmarSenha').classList.add('is-invalid');
            return;
        } else {
            document.getElementById('senha').classList.remove('is-invalid');
            document.getElementById('confirmarSenha').classList.remove('is-invalid');
        }
        /*const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };
        const response = await fetch('http://localhost:3001/api/redefinirSenha', options);
        const result = await response.json();
        if (response.status == 200) {
            alert(result.message);
        }
        else {
            alert(result.message);
        }*/
    }

    function Input(props) {
        return (
            <Form.Group className=''>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type={props.type} name={props.name} required={true} id={props.id} />
            </Form.Group>
        )
    }

    return (
        <main className="main d-flex align-items-center ">
            <Form className="form  mx-auto" method="post" onSubmit={handleSubmit} >
                <p className=''>Alterar Senha</p>
                <Input label="E-mail" type="email" id="email" name="email"  />
                <Input label="Nova Senha" type="password" name="senha" id="senha" />
                <Input label="Confirmar Senha" type="password" name="confirmarSenha" id="confirmarSenha" />
                <div className="mx-auto w-50">
                    <input type="submit" value="Alterar" className="mt-3 w-100 btn btn-outline-primary" title="Alterar" />
                </div>
            </Form>
        </main>
    )
}