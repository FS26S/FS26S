import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
const save = require('../public/assets/Save.png');

export default function CadastroLab(props) {
    useEffect(() => {
        //Verificar se o usuário está logado
        //Se não estiver
        //window.location.href = "/login";
    }
        , [])
    return (
        <>
            <Form className="row g-3" style={{ width: '100%' }}>
                <div className="d-flex justify-content-between">
                    <Form.Group className="form-group w-50" controlId="codSala">
                        <Form.Label className=" text-secondary" >Cód. Sala</Form.Label>
                        <Form.Control type="text" readOnly={true} plaintext={true} />
                    </Form.Group>
                    <Form.Group controlId="situacao" className=" col-md-5 form-group" >
                        <Form.Label>Situação</Form.Label>
                        <Form.Select aria-label="Situação" defaultValue={""}>
                            <option disabled={true} value={""}></option>
                            <option value="livre">Livre</option>
                            <option value="ocupada">Ocupada</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-between">
                    <Form.Group className="form-group w-100" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control className="" type="text" />
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-between">
                    <Form.Group controlId="tipo" className="w-50 form-group">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select aria-label="Tipo" defaultValue={""}>
                            <option disabled={true} value={""}></option>
                            <option value="laboratorio">Laboratório</option>
                            <option value="sala">Sala</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="bloco" className="form-group">
                        <Form.Label>Bloco</Form.Label>
                        <Form.Control type="text" ></Form.Control>
                    </Form.Group>
                </div>
            </Form>
            <div className="buttons">
                <Button role="button" title="Adicionar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg></Button>
                <Button variant="success" title="Salvar">
                    <Image
                        width={18}
                        height={18}
                        src={save}
                        alt="Salvar"
                    />
                </Button>
                <Button variant="danger" title="Excluir"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg></Button>
            </div>
        </>
    )
}