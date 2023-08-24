// imports de bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

import { Inicio } from "../Inicio/Inicio";
import { Institucional } from "../Institucional/Institucional";
import { Alumnos } from "../Alumnos/Alumnos";
import { Materias } from "../Materias/Materias";
import { Carreras } from "../Carreras/Carreras";
import { Inscripciones } from "../Inscripciones/Inscripciones";
import { Contacto } from "../Contacto/Contacto";


export function Header() {
  return (
    <BrowserRouter>
      <>
        <Navbar className="bg-body-tertiary fixed-top" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/img/LOGO-fcad-2.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              UNER FCAD
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="algo" />
            <Navbar.Collapse id="algo">
              <Nav className="me-auto">
              <Nav.Link as={Link} to="/inicio">
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/institucional">
                  Institucional
                </Nav.Link>
                <Nav.Link as={Link} to="/alumnos">
                  Alumnos
                </Nav.Link>
                <Nav.Link as={Link} to="/materias">
                  Materias
                </Nav.Link>
                <Nav.Link as={Link} to="/carreras">
                  Carreras
                </Nav.Link>
                <Nav.Link as={Link} to="/inscripciones">
                  Inscripciones
                </Nav.Link>
                <Nav.Link as={Link} to="/contacto">
                  Contacto
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      <Routes>
        <Route path="inicio" element={<Inicio />}></Route>
        <Route path="institucional" element={<Institucional />}></Route>
        <Route path="alumnos" element={<Alumnos />}></Route>
        <Route path="materias" element={<Materias />}></Route>
        <Route path="carreras" element={<Carreras />}></Route>
        <Route path="inscripciones" element={<Inscripciones />}></Route>
        <Route path="contacto" element={<Contacto />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
