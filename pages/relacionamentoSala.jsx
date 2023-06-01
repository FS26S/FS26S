import { Form, Button, Table } from 'react-bootstrap';
import Search from '../src/components/inputPesquisa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const save = require('../public/assets/Save.png');

export default function RelacionamentoSala() {
    const [patrimonios, setPatrimonios] = useState([]);

    async function getPatrimonio() {
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
        //setando os patrimonios para teste 
        setPatrimonios([
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
            <Search onClick={getPatrimonio} />

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
                        {patrimonios.length > 0 ?
                            patrimonios.map((patrimonio) => (
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
        </div>
    )
}