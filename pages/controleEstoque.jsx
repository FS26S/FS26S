import { Button, Form } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Search from "../src/components/inputPesquisa";
const save = require('../public/assets/Save.png');


export default function ControleEstoque() {
    async function getPatrimonio(e) {
        e.preventDefault();
        const busca = document.getElementById('busca').value;
        const res = await fetch(`http://localhost:3001/api/equipamento/${busca}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();
        console.log(json);
        if (json.codPatrimonio) {
            document.getElementById('codPatrimonio').value = json.codPatrimonio;
            document.getElementById('saldoEstoque').value = json.saldoEstoque;
        } else {
            alert('Patrimônio não encontrado');
        }
    }

    function handleSave(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);
        fetch('http://localhost:3000/api/movimentacao', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 500) {
                    alert(response.message)
                }
                throw new Error('Erro ao salvar');
            })
            .catch((error) => {
                console.log(error);
            })
        //Integrar com a API
    }

    async function handleAdd(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const res = await fetch('http://localhost:3001/api/movimentacao', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();
        console.log(json);


        //Integrar com a API
    }

    async function handleDelete(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const res = await fetch('http://localhost:3001/api/movimentacao', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();
        alert(json.message);
    }

    return (
        <main className="main">
            <Search onClick={getPatrimonio}/>
            <Form className="row g-3 mt-5" style={{ width: '100%' }} onSubmit={handleAdd}>
                <div className="d-flex justify-content-between">
                    <Form.Group className="form-group w-50" controlId="codPatrimonio">
                        <Form.Label className=" text-secondary" >Cód. Patrimônio</Form.Label>
                        <Form.Control  type="text" disabled={true} readOnly={true} />
                    </Form.Group>
                    <Form.Group controlId="saldoEstoque" className="text-secondary col-md-5 form-group" >
                        <Form.Label>Saldo Estoque</Form.Label>
                        <Form.Control  disabled={true} type="number" readOnly={true} />
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Form.Group className="form-group w-75" controlId="descricao">
                        <Form.Label>Tipo Movimento</Form.Label>
                        <Form.Select required={true} name="tipoMovimento" aria-label="Tipo" defaultValue={""}>
                            <option disabled={true} value={""}></option>
                            <option value="entradas">Entradas</option>
                            <option value="perdas">Perdas</option>
                            <option value="saidasConserto">Saídas para Conserto</option>
                            <option value="retornoConserto">Retorno de Conserto</option>
                        </Form.Select>
                    </Form.Group>
                    <Link href={"/historico"} className="btn btn-outline-secondary">
                        Histórico
                    </Link>
                </div>
                <div className="d-flex justify-content-between">
                    <Form.Group controlId="tipo" className="form-group w-50">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control required={true} type="number" name="quantidade" />
                    </Form.Group>
                </div>
                <div className="buttons">
                    <Button variant="danger" title="Excluir" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </Button>
                    <Button variant="success" title="Salvar" onClick={handleSave}>
                        <Image
                            width={18}
                            height={18}
                            src={save}
                            alt="Salvar"
                        />
                    </Button>

                    <Button role="button" title="Adicionar" type="submit" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg></Button>
                </div>
            </Form>

        </main>
    )
}