import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button  } from 'react-bootstrap';
//import './Convocados.css';
import axios from 'axios';


export function Inscriptos(props){
    const {idCarreraMateria, materia} = useParams();

    const baseUrl = 'http://localhost:3005/api/v1';

    const [agregadas, setAgregadas] = useState([]);
    

    const navigate = useNavigate();

    useEffect(()=>{
        buscarMateriasAgregadas();
    }, []);

    const buscarMateriasAgregadas = async() =>{
        axios.get(baseUrl +'/carreraMateria/carreraMaterias'+ idCarreraMateria)
        .then(res =>{
            //falta agregar un control acá
            setAgregadas(res.data.dato)
        }).catch(error =>{
            console.log(error)
        })
    }

    const volver = ()=>{
        navigate('/privado/carreras');
    }
    
    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h2>Añadida {materia}</h2>
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
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Carga horaria</th>
                                <th className='miThead'>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                agregadas ? (agregadas.map((item, index) => (
                                    <tr key={index}> 
                                        <td>{item.nombre}</td>
                                        <td>{item.horasSemanales}</td>
                                        <td>{item.tipoMateria}</td>
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