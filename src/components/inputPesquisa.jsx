import { Form, Button } from 'react-bootstrap';

export default function Search(props) {
    return (<>
        <div className='search w-75 mx-auto'>
            <Form.Group className="input-group ">
                <Form.Label className="input-group-text mb-0 text-bg-light " htmlFor="busca">Pesquisa</Form.Label>
                <Form.Control type="text" className="" name="busca" id="busca" />
                <Button type="submit" variant="outline-secondary" onClick={props.onClick}>Buscar</Button>
            </Form.Group>
           
        </div>
         <hr className='w-100' />
         </>
    )
}