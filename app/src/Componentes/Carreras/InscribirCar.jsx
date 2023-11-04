import { UserContext } from '../UserContext/UserContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Table  } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';


export function InscribirCar(){
    const { userData } = useContext(UserContext);

    //obtenemos el parámetro idInscripcion
    const {parametro} = useParams();

    const baseUrl = 'http://localhost:3005/api/v1/';

    const [estudiantes, setEstudiantes] = useState([]);
    
    const [inscriptos, setInscriptos] = useState([]);

    const navigate = useNavigate();

    //buscar estudiantes activos
    useEffect(()=>{
        buscarEstudiantes()
    }, []);

    const buscarEstudiantes = async() =>{
        axios.get(baseUrl + '/estudiante/estudiantes', {
            headers:{Authorization:`Bearer${userData.token}`}
        
        })
        .then(res =>{
            console.log(res.data.dato)
            setFutbolista(res.data.dato);
        }).catch(error=>{
            console.log(error);
        })
}
    //@esta función no recuerdo si era más para los checkboxes que mostró de la app scaloneta, o si era para el boton inscribir --mario
     const inscribir = (idEstudiante)=>{
        if(inscriptos.includes(idEstudiante)){
            setInscriptos(inscriptos.filter((rowId )=> rowId != idEstudiante));
        }else{
            //no sé si dejar esta línea o si quitarla, por las dudas la dejo comentada
            //setInscriptos([... inscriptos, idEstudiante]);
        }
    }

        // tiene el error de no controlar si seleccionó o no futbolistas
    // tarea: corregir
    const enviarInformacion = () => {    
        
    //TODO acá estoy medio perdido, ya que Cristian dijo que las inscricpciones son equivalentes a futbolistaConvocatorias y las Convocatorias a las Materias 
    //TODO así que en la baseUrl dejo estudianteMateria, pero quizás haya que corregirlo --Mario    
    const lista ={ idInscripciones:parametro, estudiantes:inscriptos}  
        axios.post(baseURL + 'estudianteMateria/nueva', lista)
        .then( async res => {           
            if (res.data.estado === 'OK') {
                const result = await Swal.fire({
                    text: res.data.msj,
                    icon:'success'})

                if (result.isConfirmed){
                    navigate('/privado/Inscripciones');
                }    
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const inscripciones = () =>{
        navigate('/privado/inscripciones');
    }

    return (
        <>	
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Inscribir Estudiantes</h1>
                    </div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={enviarInformacion}>Inscribir</Button>
                    </div>
                    <div className="col-md-1">
                        <Button variant="info" onClick={inscribir}>Volver</Button>
                    </div>

                </div>

                <div className='miTabla'>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                <th className='miThead'>DNI</th>
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Apellido</th>
                                <th className='miThead'>Nacionalidad</th>
                                <th className='miThead'>Inscribir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estudiantes ? (estudiantes.map((item, index) => (
                                    <tr key={index}> 
                                        <td>{item.dni}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.nacionalidad}</td>
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