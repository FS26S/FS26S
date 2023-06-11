import { Form,Button } from 'react-bootstrap'
import Image from 'next/image'
import save from '../public/assets/Save.png'
import Search from '../src/components/inputPesquisa'

export default function Reservas() {
    return (
        <div className="main">
            <Search />
            <div id="reserva">
                <div className="w-75">
                    <Form.Group className='w-50 d-flex justify-content-between align-items-center' controlId="id_sala">
                        <Form.Label className='text-secondary'>Cód. Sala</Form.Label>
                        <Form.Control type="text" readOnly={true} name="id_sala" />
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
                    <Button variant="danger" title="Excluir" >
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

                    <Button role="button" title="Adicionar" type="submit" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg></Button>
                </div>


                </div>
                <div className="w-50">
                    <div className='float-end historicoReservas'>
                        <b className='text-secondary'>Histórico reservas</b>
                        {/*  */}
                    </div>
                </div>
            </div>
        </div>
    )
}