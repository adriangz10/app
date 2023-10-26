import {Button, Card, Table, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

//import '/Materias.css';


export function Inscripciones(){
  const baseUrl = 'http://localhost:3005/api/v1';


  //permite la navegación entre rutas
  const navigate = useNavigate();

  //datos de inscripciones
  const [inscripciones, setIncripciones] = useState(null);

  //datos de los alumnos activos
  const [estudiante, setEstudiante] = useState(null);

  //
  const [showModal, setShowModal] = useState(false); 

  //almacenar los datos de la inscripción
  const [inscripcion, setInscripcion] = useState({fecha:'', idAlumno:'', idCarrera:'', idMateria:''});

  useEffect(()=>{
    buscarInscripciones();
  });

  //esto desactiva el modal
  const cerrarModal = () => setShowModal(false);

  //activa el modal al realizar una acción 
  const verModal = ()=>{
      buscarEstudiantes();
      setShowModal(true)
  }

  //esta función agrega la fecha de los siguientes partidos en la app de la scaloneta 
  //en la de Bedelía supongo que debería mostrar la fecha en que un alumno se inscribió
  
  function dateFormat(dateTime){
    const date = new Date(dateTime);
    return date.toISOString().split('T')[0];
  }

  const buscarEstudiantes = async() =>{
    axios.get(baseUrl + '/estudiante/estudiantes')
    .then(resp =>{
      setEstudiante(resp.data.dato);
    })
    .catch(error =>{
      console.log(error);
    });
  }

  const buscarInscripciones = async() =>{
    axios.get(baseUsr + '/inscripcion/inscripciones')
    .then(resp =>{
      setInscripciones(resp.data.dato);
    }).catch(error =>{
      console.log(error);
    })
  }


  const inscribir = (id) =>{
    const parametro = id;
    navigate(`/privado/dashboard/${parametro}`);
  }

  const dashboard = () =>{
    navigate('/privado/dashboar');
  }

  const inscriptos = (idInscripciones, estudiante) =>{
    navigate(`/privado/inscriptos/${idInscripciones}/${estudiante}`);
  }

  const crearInscripcion = async(e) =>{
    e.preventDefault();

    axios.post(baseUrl + '/inscripcion/nueva', inscripcion)
    .then(resp =>{
      if(resp.data.dato === 'OK'){
        alert(resp.data.msj);
        cerrarModal();
        buscarInscripciones();
      }
    }).catch(error =>{
      console.log(error)
    })
  }

  return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Inscripciones</h1>
                    </div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={verModal}>Nueva</Button>
                    </div>
                    <div className="col-md-1">
                        <Button variant="info" onClick={dashboard}>Volver</Button>
                    </div>
                </div>
                
                
                <div className='miTabla'>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                <th className='miThead'>Fecha</th>
                                <th className='miThead'>Estudiante</th>
                                <th className='miThead'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                convocatorias ? (inscripciones.map((item, index) => (
                                    <tr key={item.idInscripcion}> 
                                        <td>{formatoFecha(item.fecha)}</td>
                                        <td>{item.nombre}</td>
                                        <td>
                                            <Button variant="secondary" className='miBoton' onClick={() => inscribir(item.idInscripcion)}>Inscribir</Button>
                                            <Button variant="success" className='miBoton' onClick={() => inscriptos(item.idInscripcion, item.nombre)}>Inscriptos</Button>
                                            <Button variant="info" className='miBoton'>Resultados</Button>                                            
                                        </td>
                                    </tr>
                                ))) 
                                : <></>
                            }
                        </tbody>
                    </Table> 
                </div>
            </div>

            <Modal show={showModal} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Inscripcion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => crearInscripcion(e)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicFecha">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="date"
                                        onChange={(e) => setInscripcion({ ...inscripcion, fecha:e.target.value })}
                                        value={inscripcion.fecha} required/>
                                </Form.Group>
                            </div>
                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicEstudiante">
                                    <Form.Label>Estudiante</Form.Label>
                                    <Form.Select onChange={(e) => setInscripcion({ ...inscrpcion, estudiante:e.target.value })}>
                                        <option value="">Seleccione una opción</option>
                                        { (estudiantes?.length > 0) ? estudiantes.map(item => (
                                            <option key={item.idEstudiantes} value={item.idEstudiante}>
                                                {item.nombre}
                                            </option>
                                        )) : <></>}                                        
                                    </Form.Select>                                    
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );



}

