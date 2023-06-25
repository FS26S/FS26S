import { Form, Button } from 'react-bootstrap'
import Image from 'next/image'
import save from '../public/assets/Save.png'
import Search from '../src/components/inputPesquisa'
import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [id_sala, setId_sala] = useState('');
    const [inativa, setInativa] = useState(false); 
    const [agendamento, setAgendamento] = useState(0);

    async function salaAtiva(id) {
        const response = await fetch('http://localhost:3000/api/sala?id=' + id);
        const data = await response.json();
        setInativa(false);
        if (response.status != 200) {
            let form = document.getElementsByTagName('form')[0]
            form.reset();
            alert(data.message);     
            return false;
        }
        if (data.flaginativo) {
            setInativa(true);
            alert('Sala inativa');
            //return false;
        }
        setId_sala(data.id_sala);
        return true;
    }

    async function getReservas(e,id) {
        let id_sala = id ?? document.getElementById('busca').value;
        if (id_sala == '') {
            alert('Informe o código da sala');
        }
        const ativa = await salaAtiva(id_sala);
        if (!ativa) { 
            setReservas([]);
            setId_sala('');
            return false;
        }

        const response = await fetch('http://localhost:3000/api/agendamento?id_sala=' + id_sala);
        const data = await response.json();
        setReservas(data);
    }
    async function handleAdd() {

    }

    async function handleDelete() {
        const response = await fetch('http://localhost:3000/api/agendamento?id_agendamento=' + agendamento, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (response.status == 200) {
            getReservas(null,id_sala)
        }
        else {
            alert(result.message);
        }
    }

    async function handleSave(e) {
        e.preventDefault();      
        let data = Object.fromEntries(new FormData(e.target));
        if (id_sala == '') {
            alert('Procure uma sala para reservar');
            return false;
        }
        if (data.data_agendamento == '' || data.hora_inicio == '') {
            alert('Informe a data e hora da reserva');
            return false;
        }
        data = {...data, id_pessoa: 1} //Utilizar o id da pessoa logada
        
        const response = await fetch('http://localhost:3000/api/agendamento', {
            method: 'POST',
            body: JSON.stringify({
                data: data,
                reservas: reservas
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (response.status == 201) {
            console.log(result)
            alert(`Horário reservado com código ${result.id_agendamento}`)
            getReservas(null,id_sala)
        }
        else {
            alert(result.message);
        }
    }

    useEffect(() => {
        console.log(inativa);
    }, [inativa])

    return (
        <div className="main">
            <Head>
                <title>Reservas - Controle de Salas UTFPR</title>
            </Head>
            <Search onClick={getReservas} />
            <div id="reserva">
                <div className="w-75">
                    <Form onSubmit={handleSave}>
                        <Form.Group className='w-50 d-flex justify-content-between align-items-center' controlId="id_sala">
                            <Form.Label className='text-secondary'>Cód. Sala</Form.Label>
                            <Form.Control type="text" value={id_sala} readOnly={true} name="id_sala" />
                        </Form.Group>
                        <hr className='w-50' />
                        <Form.Group className='w-50  d-flex align-items-center justify-content-between' controlId="data_agendamento">
                            <Form.Label>Data Reserva</Form.Label>
                            <Form.Control type="date" className='w-75' name="data_agendamento" />
                        </Form.Group>
                        <Form.Group
                            controlId="hora_inicio"
                            className="w-50  align-items-center d-flex justify-content-between"
                        >
                            <Form.Label>Hora Reserva</Form.Label>
                            <Form.Control type="time" className='w-75' name="hora_inicio" />
                        </Form.Group>
                        <div className="buttons  w-75">
                            <Button variant="danger" title="Excluir" type="button" onClick={handleDelete}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                </svg>
                            </Button>
                            <Button variant="success" title="Salvar" type="submit" disabled={inativa} >
                                <Image
                                    width={18}
                                    height={18}
                                    src={save}
                                    alt="Salvar"
                                />
                            </Button>

                            <Button role="button" title="Adicionar" type="submit" disabled={inativa} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                </svg></Button>
                        </div>
                    </Form>

                </div>
                <div className="w-50">
                    <div className='float-end historicoReservas'>
                        <b className='text-secondary'>Histórico reservas</b>
                        {reservas.length > 0 ? reservas.map((reserva) => {
                            if (reserva.id_sala == id_sala  ) {
                                return (
                                        <a href='#' key={reserva.id_agendamento} onClick={()=>setAgendamento(reserva.id_agendamento)} className='text-decoration-none text-secondary itemReserva'>{reserva.data_agendamento} - {reserva.hora_inicio}</a>
                                )
                            }
                        }) : id_sala != '' &&
                        <p className='text-danger'>Nenhuma reserva para essa sala</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}