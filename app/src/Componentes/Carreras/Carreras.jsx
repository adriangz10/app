import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';
import { Button, Form, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//import './Carreras.css'


export function Carreras(){
      const baseUrl = 'http://localhost:3005';

      const navigate = useNavigate();

      const [userData, setUserData] = useContext(UserContext);

      const [formCarrera, setFormCarrera] = useState({
        nombre:"",
        modalidad:"",
        cantMaterias:""
      });

      const [datosCarrera, setDatosCarrera] = useState(null);


      useEffect(()=>{
        buscarCarreras();
      }, []);

      const buscarCarreras = async()=>{
        axios.get(baseUrl + '/api/v1/rutas/carrera/carreras')
        .then(resp =>{
          console.log(resp.data.dato)
          setDatosCarrera(resp.data.dato);
        }).catch(error=>{
          console.log(error);
        })
      }

      const eliminarCarrera = async(idCarrera) =>{
        Swal.fire({
          title:'¿Está seguro que desea eliminar la carrera seleccionado?',
          showDenyButton:'Confirmar'
        }).then((result)=>{
          if(result.isConfirmed){
            axios.delete(baseUrl +'/api/v1/carrera/carreras'+ idCarrera, {
              headers:{
                authorization:`Bearer ${userData.token}`
              }
            }).then(async resp=>{
              const result = await Swal.fire({
                text:resp.data.msj,
                icon:'success'});
    
                if(result.isConfirmed){
                  buscarCarreras();
                }
            }).catch(error=>{
              console.log(error);
            })
          }
        })
      }
    

      const enviarInformacion = async(e)=>{
        e.preventDefault();

        axios.post(baseUrl +'/api/v1/rutas/carrera/carreras')
        .then(resp=>{
          setFormCarrera({
            nombre:'',
            modalidad:'',
            cantMaterias:''
          })
          buscarCarreras();
        }).catch(error=>{
          console.log(error);
        })
      }

      const dashboard = ()=>{
        navigate('/privado/Carrera')
      }

      return (
        <>
          <div className='container mt-3 mb-2'>
        <div className='row'>
          <div className="col-md-11">
            <h1>Datos de Carrera</h1>
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
                        onChange={(e) => setFormCarrera({ ...formCarrera, nombre:e.target.value })}
                        value={formCarrera.nombre} required/>
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicModalidad">
                    <Form.Label>Modalidad</Form.Label>
                      <Form.Select onChange={(e) => setFormCarrera({ ...formCarrera, modalidad:e.target.value })}>
                        <option value="">Seleccione una opción</option>
                        <option value="0">Virtual</option>
                        <option value="1">Presencial</option>
                        <option value="2">Hibrida</option>
                      </Form.Select>
                  </Form.Group>
                </div>

                  <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicCelular">
                    <Form.Label>Cantidad de materias</Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setFormCarrera({ ...formCarrera, cantMaterias:e.target.value })}
                        value={formCarrera.cantMaterias} required/>
                  </Form.Group>
                </div>
                </div>
                
                <Button variant='primary' type='submit'>Crear Carrera</Button>
            
            </Form>
          </Card.Body>
        </Card>
      </div>

      <div className='container mt-1 mb-5 tablaCarrera'>
        <Table strip bordered hover>
          <thead>
            <tr>
              <th className='theadEstudiante'>Nº Identificación</th>
              <th className='theadEstudiante'>Nombre</th>
              <th className='theadEstudiante'>Modalidad</th>
              <th className='theadEstudiante'>Nº de materias</th>
              <th className='theadEstudiante'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
            datosCarrera ? (datosCarrera.map ((item, index) =>(
                <tr key={index}>
                  <td>{item.idCarrera}</td>
                  <td>{item.nombre}</td>
                  <td>{item.modalidad}</td>
                  <td>{item.cantMaterias}</td>

                  <td>
                    <Button variant='success' className='botonInterno'>Editar</Button>
                    <Button variant='danger' onClick={()=>eliminarCarrera(item.idCarrera)}>Eliminar</Button>
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