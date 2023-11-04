import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

//import './Login.css'

export function Login(){
    const baseUrl = 'http://localhost:3005/api/v1';
    const navigate = useNavigate();
    //creamos un formulario que nos pide el correo y la clave del user a autenticar.
    const [formulario, setFormulario] = useState({correoElectronico:'', clave:''});

    const {setUserData} = useContext(UserContext);


    const enviarInformacion = async(e) =>{
        e.preventDefault();

        axios.post(baseUrl + 'auth/login', formulario)
        .then(res =>{
            if(res.status === 200){
                //con los datos del user seteamos el contexto
                //tambien se setea el token para las consultas del back
                setUserData({user: res.data.usuario, token: res.data.token});
                navigate('/privado/dashboard')
            }
            {/*Algo por si no se logea correctamente*/}
        }).catch(error =>{
            console.log(error)
        });

    }

    return (
        <>
            <div className='login-container'>
                <div className='login-form'>
                    <Form onSubmit={(e)=> enviarInformacion(e)}>
                        <div className='row'>
                            <div className='col-md-12'>
                                <Form.Group className='mb-3' controlId='formBasicFormulario'>
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type='text' 
                                    onChange={(e)=> setFormulario({... formulario, correoElectronico:e.value.target})}
                                    value={formulario.correElectronico} required/>
                                </Form.Group>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <Form.Group className='mb-3' controlId='formBasicUsuario'>
                                    <Form.Label>Clave</Form.Label>
                                    <Form.Control type="password"
                                    onChange={(e)=> setFormulario({... formulario, clave:e.value.target})}
                                    value={formulario.clave} required/>
                                </Form.Group>
                            </div>
                        </div>

                        <Button variant='primary' type='submit'>
                            Iniciar Sesión
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )

}



