import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import Search from '../src/components/inputPesquisa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const save = require('../public/assets/Save.png');

export default function RelacionamentoSala() {
    const [patrimonioSala, setPatrimonioSala] = useState([]);  //patrimonios relacionados a sala
    const [patrimonios, setPatrimonios] = useState([]); //todos os patrimonios em estoque
    const [isOpen, setIsOpen] = useState(false);

    async function getPatrimonioSala() {
        let codSala = document.getElementById('busca').value;
        const res = await fetch(`http://localhost:3001/api/equipamento/relacaosala?id=${codSala}`)
        try {
            const json = await res.json();
            if (json.codPatrimonio) {
                setPatrimonios(json);
            } else {
                setPatrimonios([]);
                alert(json.message);
            }
            document.getElementById('codSala').value = codSala;
        } catch (e) {
            alert('Erro ao buscar patrimônio');
        }
    }

    async function getPatrimonios() {
        const response = await fetch(`http://localhost:3001/api/patrimonios`)
        try {
            const json = await response.json();
            console.log(json)
            if (json) {
                setPatrimonios(json);
            } else {
                setPatrimonios(null);

            }
        } catch (e) {
            console.error(e)
        }
    }

    async function handleSave(e) { }
    async function handleDelete() {

        let check = document.querySelectorAll('input[type="checkbox"]:checked');
        if (check.length > 0) {
            if (window.confirm('Deseja realmente excluir os patrimônios dessa sala?')) {
                check.forEach((item) => {
                    fetch(`http://localhost:3001/api/equipamento/relacaosala?id=${item.id}`, {
                        method: 'DELETE'
                    })

                })
            }
        }
    }

    useEffect(() => {
        getPatrimonios()
        //setando os patrimonios para teste 
        setPatrimonioSala([
            {
                id_equipamento: 1,
                nome: 'Patrimônio 1',
                qtdAtivos: 1,
                qtdConserto: 0
            },
            {
                id_equipamento: 2,
                nome: 'Patrimônio 2',
                qtdAtivos: 1,
                qtdConserto: 0
            },
            {
                id_equipamento: 3,
                nome: 'Patrimônio 3',
                qtdAtivos: 0,
                qtdConserto: 1
            },
            {
                id_equipamento: 4,
                nome: 'Patrimônio 4',
                qtdAtivos: 2,
                qtdConserto: 1,
            },
            {
                id_equipamento: 5,
                nome: 'Patrimônio 5',
                qtdAtivos: 1,
                qtdConserto: 0
            },
            {
                id_equipamento: 6,
                nome: 'Patrimônio 6',
                qtdAtivos: 1,
                qtdConserto: 0
            },
            {
                id_equipamento: 7,
                nome: 'Patrimônio 7',
                qtdAtivos: 0,
                qtdConserto: 1
            },
            {
                id_equipamento: 8,
                nome: 'Patrimônio 8',
                qtdAtivos: 2,
                qtdConserto: 1,
            },
        ]);
    }, []);


    return (
        <div className="main">
            <Search onClick={getPatrimonioSala} />

            <Form.Group className="mx-auto d-flex justify-content-center align-items-center mb-3 w-50">
                <Form.Label>Cód Sala/Lab</Form.Label>
                <Form.Control type="text" disabled={true} id="codSala" />
            </Form.Group>
            <div className="tableRelacionamento w-75 mx-auto">
                <hr className='w-100' />
                <Table borderless={true} className=" table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Patrimônio</th>
                            <th scope="col">Ativos</th>
                            <th scope="col">Conserto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patrimonioSala.length > 0 ?
                            patrimonioSala.map((patrimonio) => (
                                <tr style={{ borderBottom: '2px solid #ccc' }}>
                                    <th scope="row">
                                        <Form.Check type="checkbox" id={patrimonio.id_equipamento} />
                                    </th>
                                    <td>{patrimonio.nome}</td>
                                    <td>{patrimonio.qtdAtivos}</td>
                                    <td>{patrimonio.qtdConserto}</td>
                                </tr>
                            )
                            ) :
                            <tr>
                                <td colSpan="4" className="text-center">Nenhum patrimônio encontrado</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
            {
                isOpen  &&
                <Form.Group as={Row} className="mx-auto my-5 w-75">
                    {patrimonios.length!==0 /* 0 */ ? <>
                    <Form.Label column className="mx-3">Patrimônio</Form.Label>
                    <Col sm={7}>
                        <Form.Select name="patrimonio" className="mx-3" type="number" defaultValue={""} >
                            <option value="" disabled={true}>Selecione</option>
                            {
                                patrimonios.map((patrimonio) => (
                                    <option value={patrimonio.id_equipamento} disabled={patrimonio.flaginativo} >{patrimonio.id_equipamento} - {patrimonio.nome}</option>
                                ))
                                
                            }
                        </Form.Select>
                    </Col>
                    <Col sm={2}>
                        <Button variant="danger" type="button" onClick={() => setIsOpen(false)} title="Cancelar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </Button>
                    </Col></>
                    : <p className='text-secondary text-center'>Não foi possível encontrar nenhum patrimônio</p>}
                </Form.Group>
            }

            <div className="buttons mb-5">
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
                <Button type="button" title="Adicionar" onClick={() => setIsOpen(!isOpen)} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg></Button>
            </div>
        </div>
    )
}