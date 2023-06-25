import React from 'react';
import styles from './NavBar.module.css';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap'; 
import Route from '../../src/router/routes'; 

function NavBar() {
  return (
    <Navbar style={{ backgroundColor: '#EAE8E8', position: 'absolute', width: '100%'}}>
      <Navbar.Toggle/>
      <Navbar.Collapse >
        <Nav className="nav navbar-nav w-100" >
            <NavDropdown style={{marginLeft: 10, marginRight: 10}} className={styles.nav_dropdown} title='Cadastros' >
              <NavDropdown.Item >
                <Nav.Link style={{color: 'black'}} >Cadastro Patrimônio</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item >
                <Nav.Link ><Route style={{color: 'black'}} href={'/CadastroLab/'}>Cadastro Sala/Lab</Route></Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown style={{marginLeft: 10, marginRight: 10}} className={styles.nav_dropdown} title='Controle do Patrimônio' >
              <NavDropdown.Item >
                <Nav.Link ><Route style={{color: 'black'}} href={'/controleEstoque/'}>Movimento Estoque</Route></Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item >
                <Nav.Link ><Route style={{color: 'black'}} href={'/relacionamentoSala/'}>Relacionamento Sala</Route></Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown style={{marginLeft: 10, marginRight: 10}} className={styles.nav_dropdown} title='Reservas' >
              <NavDropdown.Item >
                <Nav.Link ><Route style={{color: 'black'}} href={'/reservas/'}>Reserva Sala/Lab</Route></Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>           
        </Nav>
        <Nav.Link style={{marginRight: 20}} >
          <Route style={{color: 'red', fontWeight: 'bold' }} href={'/'} >
            Sair
          </Route>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
