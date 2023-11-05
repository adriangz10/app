import { UserContext } from '../UserContext/UserContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Table  } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Inscribir.css';

export function AñadirMateria(props) {
    const { userData } = useContext(UserContext);

    // obtener el parametro ID de Carrera
    const { parametro } = useParams();

    const baseURL = 'http://localhost:3005/api/v1/';
    
    const [materias, setMaterias] = useState([]);
    
    const [añadidas, setAñadidas] = useState([]);

    const navigate = useNavigate();

    // buscamos los jugadores activos
    useEffect(()=>{
        buscarMaterias();
    },[]); 
    
    const buscarMaterias = async () => {
        axios.get(baseURL + 'materias/materias', {
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( res => {           
            console.log(res.data.dato); 
            setMaterias(res.data.dato);
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const añadir = (idMateria) => {
        if (añadidas.includes(idMateria)) {
            // Si ya está seleccionada, quito de la lista de materias añadidas
            setAñadidas(añadidas.filter((rowId) => rowId !== idMateria));
        } else {
            // Si no está seleccionada, agrego a la lista de convocados
            setAñadidas([...añadidas, idMateria]);
        }        
    }

    // tiene el error de no controlar si seleccionó o no futbolistas
    // tarea: corregir
    const enviarInformacion = () => {    
        
        const lista ={ idCarrera:parametro, materias:añadidas}  
        axios.post(baseURL + 'carreraMateria/nuevoMateria', lista)
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
        navigate('/privado/carrera');        
    };

    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Añadir Materias</h1>
                    </div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={enviarInformacion}>Añadir</Button>
                    </div>
                    <div className="col-md-1">
                        <Button variant="info" onClick={carreras}>Volver</Button>
                    </div>

                </div>

                <div className='miTabla'>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Carga horaria</th>
                                <th className='miThead'>Tipo de materia</th>
                                <th className='miThead'>Añadir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                materias ? (materias.map((item, index) => (
                                    <tr key={index}> 
                                        <td>{item.nombre}</td>
                                        <td>{item.horasSemanales}</td>
                                        <td>{item.tipoMateria}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={añadidass.includes(item.idMateria)}
                                                onChange={() => añadir(item.idMateria)}
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