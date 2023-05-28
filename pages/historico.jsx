import { useState,useEffect } from "react";
import { Form } from "react-bootstrap";

export default function Histórico(){
    const [codPatrimonio, setCodPatrimonio] = useState('');
    const [descricao, setDescricao] = useState('');
    useEffect(() => {
        /*
        Chamar a API para buscar os dados do patrimônio
        */
    },[])
    return(<>
        <Form.Group>
            <Form.Label>Cód Patrimônio</Form.Label>
            <Form.Control readOnly={true} plaintext={true} value={codPatrimonio} type="text" placeholder="Cód Patrimônio" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control readOnly={true} plaintext={true} value={descricao} type="text" placeholder="Descrição" />
        </Form.Group>
        </>
    )
}