import { UserContext } from '../UserContext/UserContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Table  } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Inscribir.css';

export function InscribirCar(props) {
    const { userData } = useContext(UserContext);

    // obtengo mi parametro id convocatoria
    const { parametro } = useParams();

    const baseURL = 'http://localhost:3005/api/v1/';
    const direccionPublica = 'http://localhost:3005/archivos/';

    const [estudiantes, setEstudiantes] = useState([]);
    
    const [inscriptos, setInscriptos] = useState([]);

    const navigate = useNavigate();

    // buscamos los jugadores activos
    useEffect(()=>{
        buscarEstudiantes();
    },[]); 
    
    const buscarEstudiantes = async () => {
        axios.get(baseURL + 'estudiantes/estudiantes', {
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( res => {           
            console.log(res.data.dato); 
            setEstudiantes(res.data.dato);
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const inscribir = (idEstudiante) => {
        if (inscriptos.includes(idEstudiante)) {
            // Si ya está seleccionado, quito de la lista de convocados
            setInscriptos(inscriptos.filter((rowId) => rowId !== idEstudiante));
        } else {
            // Si no está seleccionada, agrego a la lista de convocados
            setInscriptos([...inscriptos, idEstudiante]);
        }        
    }

    // tiene el error de no controlar si seleccionó o no futbolistas
    // tarea: corregir
    const enviarInformacion = () => {    
        
        const lista ={ idCarrera:parametro, futbolistas:convocados}  
        axios.post(baseURL + 'estudianteCarrera/nuevoEstudianteCarrera', lista)
        .then( async res => {           
            if (res.data.estado === 'OK') {
                const result = await Swal.fire({
                    text: res.data.msj,
                    icon:'success'})

                if (result.isConfirmed){
                    navigate('/privado/carreras');
                }    
            }
        })
        .catch(error =>{
            console.log(error);
        });

    }

    const carreras = () => {        
        navigate('/privado/inscripcionesCarrera');        
    };

    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Inscribir Alumnos</h1>
                    </div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={enviarInformacion}>Inscribir</Button>
                    </div>
                    <div className="col-md-1">
                        <Button variant="info" onClick={carreras}>Volver</Button>
                    </div>

                </div>

                <div className='miTabla'>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                <th className='miThead'>Imagen</th>
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Apellido</th>
                                <th className='miThead'>Nacionalidad</th>
                                <th className='miThead'>Fecha nacimiento</th>
                                <th className='miThead'>Inscribir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estudiantes ? (estudiantes.map((item, index) => (
                                    <tr key={index}> 
                                        <td>
                                            <img  style={{ borderRadius: '50%', width: '50px', height: '50px' }}
                                                src={`http://localhost:3005/archivos/${item.foto}`} alt={item.foto} 
                                            />
                                        </td>
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.nacionalidad}</td>
                                        <td>{item.fechaNacimiento}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={inscriptos.includes(item.idEstudiante)}
                                                onChange={() => inscribir(item.idEstudiante)}
                                            />
                                        </td>
                                    </tr>
                                ))) 
                                : <></>
                            }
                        </tbody>
                    </Table> 
                </div>
            </div>
        </>
    );
}