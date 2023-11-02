import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {Button, Table, Card, Form} from "react-bootstrap";
import  axios  from "axios";

import './Alumnos.css'



export function Alumnos() {
  const baseUrl = 'http:localhost:3005';

  const navigate = useNavigate();
  
  //almacenar información del formulario
  const [formulario, setFormulario] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    nacionalidad: "",
    correo: "",
    celular: "",
  });

  //
  const [datos, setDatos] = useState(null);

  //en useEffect voy colocando los métodos que defino acá abajo, es así como se usa???
  useEffect(()=>{
    buscarEstudiantes();
  }, []);

  //utilizamos axios con el metodo http GET para conectarnos al back y usar el endpoint para obtener los datos de los estudiantes
  const buscarEstudiantes = async() =>{
    axios.get(baseUrl + '/api/v1/estudiante/estudiantes')
    .then(resp =>{
      console.log(resp.data.dato); //consoleamos los datos de los estudiantes que requerimos desde el back.
      setDatos(resp.data.datos);
    }).catch(error =>{
        console.log(error);
    });
    
  }
  

  const eliminarEstudiante = async(idEstudiante) =>{
    axios.delete(baseUrl +'/api/v1/estudiante/estudiantes'+ idEstudiante)
    .then(resp =>{
      //mostrar el mensaje de eliminacion en consola
      //console.log(resp.data.msj);
      
      buscarEstudiantes();
      alert(resp.data.msj);
    
    }).catch(error=>{
      console.log(error);
    });
  }

  //enviar la información cargada en el front, recibe un parámetro "e"
  //NOTA: recordar que todos estos métodos usan axios.metodohttp (GET, DELETE, POST, etc)
  const enviarInformacion = async(e) =>{
    e.preventDefault();

    axios.post(baseUrl +'/api/v1/estudiante/estudiantes', formulario)
    .then( res=> {
      console.log(res)
      setFormulario({
        dni: '',
        nombre: '',
        apellido:'',
        fechaNacimiento:'',
        nacionalidad:'',
        correoElectronico:'',
        celular:''
      })
      buscarEstudiantes();
    }).catch(error =>{
      console.log('error', error);
    })
  }

  //navegamos al dashboard que nos indica cual tipo de user está permitido en esta ruta
  const dashboard = ()=>{
    navigate('/privado/dashboard'); 
  };
  
  
  return (
    <>
      <div className='container mt-3 mb-2'>
        <div className='row'>
          <div className="col-md-11">
            <h1>Datos de Alumnos</h1>
          </div>
          <div className='col-md-1'>
            <Button variant='info' onClick={dashboard}>Volver</Button>
          </div>
        </div>
        <Card className='mt-3 mb-3'>
          <Card.Body>
            <Form onSubmit={e => enviarInformacion(e)}>
              <div className='row'>

                <div className='col-md-4'>
                  <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setFormulario({ ...formulario, nombre:e.target.value })}
                        value={formulario.nombre} required/>
                  </Form.Group>
                </div>
               
				        <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicApellido">
                    <Form.Label>Apellido</Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setFormulario({ ...formulario, apellido:e.target.value })}
                        value={formulario.apellido} required/>
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicFechaNacimiento">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                      <Form.Control type="date"
                        onChange={(e) => setFormulario({ ...formulario, fechaNacimiento:e.target.value })}
                        value={formulario.fechaNacimiento} required/>
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                    <Form.Label>Nacionalidad</Form.Label>
                      <Form.Select onChange={(e) => setFormulario({ ...formulario, apellido:e.target.value })}>
                        <option value="">Seleccione una opción</option>
                        <option value="0">Argentina</option>
                        <option value="1">Uruguay</option>
                        <option value="2">Chile</option>
                        <option value="3">Paraguay</option>
                        <option value="4">Brasíl</option>
                        <option value="5">Bolivia</option>
                      </Form.Select>
                  </Form.Group>
                </div>

                  <div className="col-md-4">
                    <Form.Group className="mb-3" controlId="formBasicCorreoElectronioc">
                      <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="text"
                          onChange={(e) => setFormulario({ ...formulario, correoElectronico:e.target.value })}
                          value={formulario.correoElectronico} required/>
                      </Form.Group>
                  </div>             

                  <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicCelular">
                    <Form.Label>Celular</Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setFormulario({ ...formulario, celular:e.target.value })}
                        value={formulario.celular} required/>
                  </Form.Group>
                </div>
                </div>
                
                <Button variant='primary' type='submit'>Inscribir</Button>
            
            </Form>
          </Card.Body>
        </Card>
      </div>

      <div className='container mt-1 mb-5 tablaEstudiante'>
        <Table strip bordered hover>
          <thead>
            <tr>
              <th className='theadEstudiante'>Legajo</th>
              <th className='theadEstudiante'>DNI</th>
              <th className='theadEstudiante'>Nombre</th>
              <th className='theadEstudiante'>Apellido</th>
              <th className='theadEstudiante'>Nacionalidad</th>
              <th className='theadEstudiante'>fechaNacimiento</th>
              <th className='theadEstudiante'>correoElectronico</th>
              <th className='theadEstudiante'>celular</th>
              <th className='theadEstudiante'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
            datos ? (datos.map ((item, index) =>(
                <tr key={index}>
                  <td>{item.idEstudiante}</td>
                  <td>{item.dni}</td>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.nacionalidad}</td>
                  <td>{item.fechaNacimiento}</td>
                  <td>{item.correoElectronico}</td>
                  <td>{item.celular}</td>

                  <td>
                    <Button variant='success' className='botonInterno'>Editar</Button>
                    <Button variant='danger' onClick={()=>eliminarEstudiante(item.idEstudiante)}>Eliminar</Button>
                  </td>

                </tr>
            )))
            : 
              (
                <tr>
                  {/* ACÁ IRÍA ALGÚN MENSAJE O ALGO ASÍ, */}
                </tr>
              )

            }
            </tbody>
        </Table>
      </div>
    </>
  );
}
