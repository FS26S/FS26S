import Image from "next/image";
//import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Search from "../src/components/inputPesquisa";
import Head from "next/head";
const save = require('../public/assets/Save.png');

export default function CadastroLab() {
    const api = `http://localhost:3000/api/sala`;

    async function getSala(){
        let id = document.getElementById('busca').value;
        const response = await fetch(`${api}?id=${id}`);
        if (response.status !== 200){
            const data = await response.json();
            let form = document.getElementById('formCadastroLab');
            form.reset();
            alert(`Erro ${response.status} - ${data.message}`);
            return false;
        }
        const data = await response.json();
        document.getElementById('codSala').value = data.id_sala;
        document.getElementById('descricao').value = data.nome;
        document.getElementById('tipo').value = data.tipo;
        document.getElementById('bloco').value = data.localizacao;
        document.getElementById('situacao').value = data.flaginativo;
    }

    async function handleSave(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const response = await fetch(api, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        if (response.status === 201) alert(`Sala cadastrada com código ${result.id_sala}!`)
        else alert(result.message);
    }

    function handleAdd(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        //Integrar com a API
    }

    async function handleDelete(e) {
        let id = document.getElementById('codSala').value;
        const response = await fetch(`${api}?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status !== 200)
            alert(`Erro ${response.status} - ${data.message}`);
        else{
            alert(`${data.message}`);
            document.getElementById('formCadastroLab').reset();
        }
    }

    return (
        <div className="main">
            <Head>
                <title>Cadastro de Sala e Laboratórios</title>
            </Head>
            <Search onClick={getSala} />
            <Form className="row g-3 mt-5" style={{ width: '100%' }} id="formCadastroLab" onSubmit={handleSave}>
                <div className="d-flex justify-content-between">
                    <Form.Group className="form-group w-50" controlId="codSala">
                        <Form.Label name="codSala" className=" text-secondary" >Cód. Sala</Form.Label>
                        <Form.Control type="text" disabled={true}/>
                    </Form.Group>
                    <Form.Group controlId="situacao" className=" col-md-5 form-group" >
                        <Form.Label>Situação</Form.Label>
                        <Form.Select name="situacao" aria-label="Situação" defaultValue={""}>
                            <option disabled={true} value={""}></option>
                            <option value="0">Livre</option>
                            <option value="1">Ocupada</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-between">
                    <Form.Group className="form-group w-100" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control name="descricao" className="" type="text" />
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-between">
                    <Form.Group controlId="tipo" className="w-50 form-group">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select aria-label="Tipo" name="tipo" defaultValue={""}>
                            <option disabled={true} value={""}></option>
                            <option value="laboratorio">Laboratório</option>
                            <option value="sala">Sala</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="bloco" className="form-group">
                        <Form.Label>Bloco</Form.Label>
                        <Form.Control name="bloco" type="text" ></Form.Control>
                    </Form.Group>
                </div>
                <div className="buttons">
                    <Button variant="danger" type="button" onClick={handleDelete} title="Excluir" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </Button>
                    <Button variant="success" title="Salvar" type="submit">
                        <Image
                            width={18}
                            height={18}
                            src={save}
                            alt="Salvar"
                        />
                    </Button>

                    <Button type="button" title="Adicionar" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg></Button>
                </div>
            </Form>
            
        </div>
    )
}