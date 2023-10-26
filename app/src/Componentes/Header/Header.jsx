//Import bootstrap
import './Header.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';

export function Header() {


  return(
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='/'>PROGRAMACIÓN 3</Navbar.Brand>
            <Navbar.Toggle aria-controls='algo'/>
            <Navbar.Collapse id='algo'>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/institucional'>Institucional</Nav.Link>
                <Nav.Link as={Link} to='/contacto'>Contacto</Nav.Link>
                </Nav>
                <NavDropdown title='Gestion' id='nav-dropdown' className='miNavDropdown'>
                  <NavDropdown.Item as={Link} to='/alumnos'>Alumnos</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/materias'>Materias</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/alumnos'>Carreras</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/inscripciones'>Incripciones</NavDropdown.Item>
                  {/*<NavDropdown.divider/>*/}
                  <NavDropdown.Item as={Link} to='/construccion'>Iniciar Sesión</NavDropdown.Item>
                </NavDropdown>   
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}