import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';
import { Button, Form, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//import './Materias.css'


export function Materias(){
      const baseUrl = 'http://localhost:3005';

      const navigate = useNavigate();

      const [userData, setUserData] = useContext(UserContext);

      const [formMateria, setFormMateria] = useState({
        nombre:"",
        horasSemanales:"",
        tipoMateria:""
      });

      const [datosMateria, setDatosMateria] = useState(null);


      useEffect(()=>{
        buscarMaterias();
      }, []);

      const buscarMaterias = async()=>{
        axios.get(baseUrl + '/api/v1/rutas/materia/materias')
        .then(resp =>{
          console.log(resp.data.dato)
          setDatosMateria(resp.data.dato);
        }).catch(error=>{
          console.log(error);
        })
      }

      const eliminarMateria = async(idMateria) =>{
        Swal.fire({
          title:'¿Está seguro que desea eliminar la materia seleccionada?',
          showDenyButton:'Confirmar'
        }).then((result)=>{
          if(result.isConfirmed){
            axios.delete(baseUrl +'/api/v1/materia/materias'+ idMateria, {
              headers:{
                authorization:`Bearer ${userData.token}`
              }
            }).then(async resp=>{
              const result = await Swal.fire({
                text:resp.data.msj,
                icon:'success'});
    
                if(result.isConfirmed){
                  buscarMaterias();
                }
            }).catch(error=>{
              console.log(error);
            })
          }
        })
      }
    

      const enviarInformacion = async(e)=>{
        e.preventDefault();

        axios.post(baseUrl +'/api/v1/rutas/materia/materias')
        .then(resp=>{
          setFormMateria({
            nombre:'',
            horasSemanales:'',
            tipoMateria:''
          })
          buscarMaterias();
        }).catch(error=>{
          console.log(error);
        })
      }

      const dashboard = ()=>{
        navigate('/privado/Materia')
      }

      return (
        <>
          <div className='container mt-3 mb-2'>
        <div className='row'>
          <div className="col-md-11">
            <h1>Datos de Materias</h1>
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
                        onChange={(e) => setFormMateria({ ...formMateria, nombre:e.target.value })}
                        value={formMateria.nombre} required/>
                  </Form.Group>
                </div>
                
                
                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicCelular">
                    <Form.Label>Carga Horaria</Form.Label>
                      <Form.Control type="text"
                        onChange={(e) => setFormMateria({ ...formMateria, horasSemanales:e.target.value })}
                        value={formMateria.horasSemanales} required/>
                  </Form.Group>
                </div>
                
                
                <div className="col-md-4">
                  <Form.Group className="mb-3" controlId="formBasicModalidad">
                    <Form.Label>Tipo de Materia</Form.Label>
                      <Form.Select onChange={(e) => setFormMateria({ ...formMateria, tipoMateria:e.target.value })}>
                        <option value="">Seleccione una opción</option>
                        <option value="0">Anual</option>
                        <option value="1">Cuatrimestral</option>
                      </Form.Select>
                  </Form.Group>
                </div>

              
                </div>
                
                <Button variant='primary' type='submit'>Crear Materia</Button>
            
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
              <th className='theadEstudiante'>Carga horaria</th>
              <th className='theadEstudiante'>Tipo </th>
              <th className='theadEstudiante'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
            datosMateria ? (datosMateria.map ((item, index) =>(
                <tr key={index}>
                  <td>{item.idMateria}</td>
                  <td>{item.nombre}</td>
                  <td>{item.horasSemanales}</td>
                  <td>{item.tipoMateria}</td>

                  <td>
                    <Button variant='success' className='botonInterno'>Editar</Button>
                    <Button variant='danger' onClick={()=>eliminarMateria(item.idMateria)}>Eliminar</Button>
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