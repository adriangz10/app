import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import { Button } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
//Esto está comentado porque no se importan creo que es porque no se usan
import Card from 'react-bootstrap/Card';

const Dashboard = () => {

    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext)


    const irAInscripciones = () => {
        navigate('/privado/inscripciones');
    };

    const irAEstudiantes = () => {
        navigate('/privado/alumnos');
    };

    const irAMaterias = () => {
        navigate('/privado/materias');
    };

    const irACarreras = () => {
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
                                <h3>Inscripciones</h3>
                            </div>

                            <div className='col-md-2'>
                                <Button variant="primary" onClick={irAInscripciones}>Ir</Button>
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

export { Dashboard };