import { useState, useEffect, useContext} from "react";
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import {Button, Table, Form, Modal} from "react-bootstrap";
import  axios  from "axios";
import Swal from 'sweetalert2';

import './Alumnos.css'



export function Alumnos() {
  const baseUrl = 'http://localhost:3005';

  const navigate = useNavigate();
  

  const {userData, setUserData} = useContext(UserContext);
  const [archivo, setArchivo] = useState(null) 
  const [datos, setDatos] = useState(null);

  
  //almacenar información del formulario
  const [estudiante, setEstudiante] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    nacionalidad: "",
    correoElectronico: "",
    celular: ""
  });

  const [showModal, setShowModal] = useState(false);
  const cerrarModal = () => setShowModal(false);


  const changeArchivo = (e)=>{
    setArchivo(e.target.file[0]);
  }
 
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
    Swal.fire({
      title:'¿Está seguro que desea eliminar el estudiante seleccionado?',
      showDenyButton:'Confirmar'
    }).then((result)=>{
      if(result.isConfirmed){
        axios.delete(baseUrl +'/api/v1/estudiante/estudiantes'+ idEstudiante, {
          headers:{
            authorization:`Bearer ${userData.token}`
          }
        }).then(async resp=>{
          const result = await Swal.fire({
            text:resp.data.msj,
            icon:'success'});

            if(result.isConfirmed){
              buscarEstudiantes();
            }
        }).catch(error=>{
          console.log(error);
        })
      }
    })
  }

  //enviar la información cargada en el front, recibe un parámetro "e"
  //NOTA: recordar que todos estos métodos usan axios.metodohttp (GET, DELETE, POST, etc)
  const enviarInformacion = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
        formData.append('dni', estudiante.dni);
        formData.append('nombre', estudiante.nombre);
        formData.append('apellido', estudiante.apellido);
        formData.append('fechaNacimiento', estudiante.fechaNacimiento);
        formData.append('nacionalidad', estudiante.nacionalidad);
        formData.append('correoElectronico', estudiante.correoElectronico);
        formData.append('celular', estudiante.celular);
        formData.append('foto', archivo);
        try {

                  
        const response = await axios.post(baseUrl + '/api/v1/estudiante/estudiantes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            },
        });

        if(response.data.estado==='OK'){
            const result = await Swal.fire({
                text: response.data.msj,
                icon:'success'})

            if (result.isConfirmed){
                cerrarModal();
                buscarEstudiantes();
                setEstudiante({dni:'',
                    nombre:'', 
                    apellido:'',
                    nacionalidad:'', 
                    correoElectronico:'',
                    fechaNacimiento:'', 
                    celular:''}
                );    
            }  
            
        }
        } catch (error) {
        console.error('Error al crear un estudiante', error);
        }
    }

    // activa el modal y busca los rivales
    const verModal = () => {        
        setShowModal(true);
    };
  
  
  return (
    <>
        <div className='container mt-3 mb-2'>
                <div className='row'>
                    <div className="col-md-11">
                        <h1>Estudiantes</h1>
                    </div>                    
                    <div className="col-md-1">
                        <Button variant="primary" onClick={verModal}>Nuevo</Button>
                    </div>
                </div>
            </div>

            <div className='container mt-1 mb-5 miTabla'>
                <Table striped bordered hover >
                    <thead >
                        <tr>
                            <th className='miThead'>Foto</th>
                            <th className='miThead'>Legajo</th>
                            <th className='miThead'>DNI</th>
                            <th className='miThead'>Apellido</th>
                            <th className='miThead'>Nombre</th>
                            <th className='miThead'>Fecha Nacimiento</th>
                            <th className='miThead'>Nacionalidad</th>
                            <th className='miThead'>Correo Electrónico</th>
                            <th className='miThead'>Celular</th>
                            <th className='miThead'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            datos ? (datos.map((item, index) => (
                                <tr key={index}> 
                                    <td>
                                        <img 
                                            className='foto'
                                            src={`http://localhost:3010/archivos/${item.foto}`} alt={item.foto}
                                        />
                                    </td>
                                    <td>{item.idEstudiante}</td>
                                    <td>{item.dni}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.fechaNacimiento}</td>
                                    <td>{item.nacionalidad}</td>
                                    <td>{item.correoElectronico}</td>
                                    <td>{item.celular}</td>
                                    <td>
                                        <Button variant="success" className='miBoton'>Editar</Button>
                                        <Button variant="danger" onClick={()=>eliminarEstudiante(item.idEstudiante)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))) 
                            : 
                            (
                                <tr>
                                    {/* Acá deberíamos poner algo como un mensaje */}
                                </tr>
                            )
                        }
                    </tbody>
                </Table> 
            </div>


            <Modal show={showModal} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Esrudiante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => enviarInformacion(e)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicdni">
                                    <Form.Label>DNI</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, dni:e.target.value })}
                                        value={estudiante.dni} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, nombre:e.target.value })}
                                        value={estudiante.nombre} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, apellido:e.target.value })}
                                        value={estudiante.apellido} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                                    <Form.Label>Nacionalidad</Form.Label>
                                    <Form.Select onChange={(e) => setEstudiante({ ...estudiante, nacionalidad:e.target.value })}>
                                        <option value="">Seleccionar</option>
                                        <option value="0">Argentina</option>
                                        <option value="1">Uruguay</option>
                                        <option value="2">Chile</option>
                                        <option value="3">Paraguay</option>
                                        <option value="4">Brasil</option>
                                        <option value="5">Bolivia</option>
                                    </Form.Select>                                    
                                </Form.Group>
                            </div>                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicFechaNacimiento">
                                    <Form.Label>Fecha Nacimiento</Form.Label>
                                    <Form.Control type="date"
                                        onChange={(e) => setEstudiante({ ...estudiante, fechaNacimiento:e.target.value })}
                                        value={estudiante.fechaNacimiento} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-8">
                                <Form.Group className="mb-3" controlId="formBasicCorreoElectronico">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, correoElectronico:e.target.value })}
                                        value={estudiante.correoElectronico} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicCelular">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, celular:e.target.value })}
                                        value={estudiante.celular} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-12">
                                <Form.Group className="mb-3" controlId="formBasicCelular">
                                    <Form.Label>Seleccionar Archivo:</Form.Label>
                                    <Form.Control type="file"                                                                            
                                        accept=".jpg, .jpeg, .png" // Define los tipos de archivo permitidos                                        
                                        onChange={changeArchivo}
                                    />
                                </Form.Group>
                            </div>                            
                        </div>

                        <Button variant="primary" type="submit">
                            Crear
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
      
    </>
  );
}
