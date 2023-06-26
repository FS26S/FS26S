import React from 'react';
import styles from './NavBar.module.css';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap'; 
import Route from '../router/routes'

function NavBar() {
  return (
    <Navbar style={{ backgroundColor: '#EAE8E8', position: 'absolute', width: '100%'}}>
      <Navbar.Toggle/>
      <Navbar.Collapse >
        <Nav className="nav navbar-nav w-100" >
            <NavDropdown style={{marginLeft: 10, marginRight: 10}} className={styles.nav_dropdown} title='Cadastros' >
              <NavDropdown.Item >
                <Route style={{color:'black'}} className='nav-link' href={'/cadastroPatrimonio'}>Cadastro Patrimônio</Route>
              </NavDropdown.Item>
              <NavDropdown.Item >
                <Route  style={{color: 'black'}} className='nav-link' href={'/CadastroLab'}>Cadastro Sala/Lab</Route>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown style={{marginLeft: 10, marginRight: 10}} className={styles.nav_dropdown} title='Controle do Patrimônio' >
              <NavDropdown.Item >
                <Route className='nav-link' style={{color: 'black'}} href={'/controleEstoque'}>Movimento Estoque</Route>
              </NavDropdown.Item>
              <NavDropdown.Item >
                <Route className='nav-link' style={{color: 'black'}} href={'/relacionamentoSala'}>Relacionamento Sala</Route>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown style={{marginLeft: 10, marginRight: 10}} className={styles.nav_dropdown} title='Reservas' >
              <NavDropdown.Item >
                <Route className='nav-link' style={{color:'black'}} href='/reservas'>Reserva Sala</Route>
              </NavDropdown.Item>
            </NavDropdown>           
        </Nav>
        <Route className='nav-link' style={{marginRight: 20, color: 'red', fontWeight: 'bold' }} href={'/'} >
            Sair
        </Route>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
