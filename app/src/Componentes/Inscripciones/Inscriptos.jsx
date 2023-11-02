import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button  } from 'react-bootstrap';
//import './Convocados.css';
import axios from 'axios';


export function Inscriptos(props){
    const {idEstudianteMateria, estudiante} = useParams();

    const baseUrl = 'http://localhost:3005/api/v1';

    const [inscriptos, setInscriptos] = useState([]);
    

    const navigate = useNavigate();

    useEffect(()=>{
        buscarInscriptos();
    }, []);

    const buscarInscriptos = async() =>{
        axios.get(baseUrl +'/estudianteMateria/estudianteMateria'+ idEstudianteMateria)
        .then(res =>{
            //falta agregar un control acá
            setInscriptos(res.data.dato)
        }).catch(error =>{
            console.log(error)
        })
    }

    const volver = ()=>{
        navigate('/privado/inscripciones')
    }
    
    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h2>Inscriptos {estudiante}</h2>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" onClick={volver}>Volver</Button>
                    </div>
                </div>

                <div className='miTabla'>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                {/* <th className='miThead'>id</th> */}
                                <th className='miThead'>DNI</th>
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Apellido</th>
                                <th className='miThead'>Nacionalidad</th>
                                <th className='miThead'>Correo Electrónico</th>
                                <th className='miThead'>Celular</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inscriptos ? (inscriptos.map((item, index) => (
                                    <tr key={index}> 
                                        <td>{item.dni}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.Nacionalidad}</td>
                                        <td>{item.correoElectronico}</td>
                                        <td>{item.celular}</td>
                                                     
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