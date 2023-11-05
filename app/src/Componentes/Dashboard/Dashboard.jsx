import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import { Button } from 'react-bootstrap';
import axios from 'axios';
//Esto está comentado porque no se importan creo que es porque no se usan
import Card from 'react-bootstrap/Card';




const Dashboard = () =>{
    const baseUrl = 'http://localhost:3005';

    const navigate = useNavigate();
    const [userData, setUserData] = useContext(UserContext)

    const [estadistica, setEstadistica ] = useState(null);


    useEffect(()=>{
        // busco la info estadistica unicamente cuando sea presidente
        if(userData.user.tipoUsuario === 0){
            buscarEstadistica();
        }
    },[]); 
        
    
    const buscarEstadistica = async () =>{
        axios.get(baseUrl + '/api/v1/estadistica/estadistica',{
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        })
        .then( resp => {
            setEstadistica(resp.data.dato);
        })
        .catch( error => {
            console.log(error);
        })
    }


    const irAInscripcionesCarrera = () =>{
        navigate('/privado/inscripcionesCarrera');
    };

    const irAAñadirMaterias = () => {
        navigate('/privado/Carreras')
    }

    const irAInscripcionesMateria = ()=>{
        navigate('/privado/inscripcioneMateria');
    }

    const irAEstudiantes =() =>{
        navigate('/privado/alumnos');
    };

    const irAMaterias = ()=> {
        navigate('/privado/materias');
    };

    const irACarreras = ()=>{
        navigate('/privado/carreras');
    };

    return (userData.user ?
            <>
                <div className='container mt-3 mb-1 mb-5'>
                    <h1>Bienvenido {userData.user.nombre}</h1>

                <Card>
                    <ProtectedElement mustBeBedel={true}>
                        <div className='row'>
                            <div className='col-md-10'>
                                <h3>Incribir en Carreras</h3>
                            </div>
                                
                                <div className='col-md-2'>
                                    <Button variant="primary" onClick={irAInscripcionesCarrera}>Ir</Button>
                                </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-10'>
                                <h3>Añadir Materias a carreras</h3>
                            </div>
                                
                                <div className='col-md-2'>
                                    <Button variant="primary" onClick={irAAñadirMaterias}>Ir</Button>
                                </div>
                        </div>
                        
                        
                        <div className='row'>
                            <div className='col-md-10'>
                                <h3>Incribir en Materias</h3>
                            </div>
                                
                                <div className='col-md-2'>
                                    <Button variant="primary" onClick={irAInscripcionesMateria}>Ir</Button>
                                </div>
                        </div>

                        
                        <div className='row'>
                            <div className='col-mb-10'>
                                <h3>Alumnos</h3>
                            </div>

                            <div className='col-md-2'>
                                <Button variant="primary" onClick={irAEstudiantes}>Ir</Button>
                            </div>
                            <div className='col-md-10'>
                                <h3>Materias</h3>
                            </div>
                                
                                <div className='col-md-2'>
                                    <Button variant="primary" onClick={irAMaterias}>Ir</Button>
                                </div>
                        </div>

                        <div className='row'>
                            <div className='col-mb-10'>
                                <h3>Carreras</h3>
                            </div>

                            <div className='col-md-2'>
                                <Button variant="primary" onClick={irACarreras}>Ir</Button>
                            </div>
                        </div>
                        </ProtectedElement>
                        <ProtectedElement mustBeDecano={true}>
                            {/*Acá vamos a poner las estadísticas de materias creadas, alumnos activos, de baja, materias, carreras activas, etc*/}
                        </ProtectedElement>
                    </Card>
                </div>
            </> : <></>
        );
}

export {Dashboard};