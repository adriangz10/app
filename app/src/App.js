import React, { useState } from 'react';
import { UserContext } from './Componentes/UserContext/UserContext';

// imports de bootstrap
import './App.css';

//Imports header y footer
import { Header } from './Componentes/Header/Header';
import { Footer } from './Componentes/Footer/Footer';

import { Inicio } from './Componentes/Inicio/Inicio';
import { Institucional } from './Componentes/Institucional/Institucional';
import { Alumnos } from './Componentes/Alumnos/Alumnos';
import { Materias } from './Componentes/Materias/Materias';
import { Carreras } from './Componentes/Carreras/Carreras';
import { Contacto } from './Componentes/Contacto/Contacto';
import { Dashboard } from './Componentes/Dashboard/Dashboard';
import { Login } from './Componentes/Login/Login';
//import { InscribirACarrera } from './Componentes/InscripcionesCarrera/InscribirACarrera';
//import { InscritposCarrera} from './Componentes/InscripcionesCarrera/InscriptosCarrera';
//import { InscribirAMateria } from './Componentes/InscripcionesMateria/InscribirAMateria';
//import { InscriptosMateria } from './Componentes/InscripcionesMateria/InscriptosMateria';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Componentes/UserContext/UserContext";
import { ProtectedRoute } from './Componentes/ProtectedRoute/ProtectedRoute';

export function App() {
  const [userData, setUserData] = useState({
    userData: null
  });

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Inicio />}></Route>
            <Route path="institucional" element={<Institucional />}></Route>
            <Route path="contacto" element={<Contacto />}></Route>
            <Route path="login" element={<Login />}></Route>

            <Route path='/privado/dashboard'
              element={
                <ProtectedRoute mustBeBedel={false}>
                  {<Dashboard />}
                </ProtectedRoute>
              } />
            {/*en la ruta para dashboar mustBeBedel debe ser "false" ya que es una ruta solo para decano*/}

            <Route path="/privado/alumnos"
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<Alumnos />}
                </ProtectedRoute>
              } />

            <Route path="/privado/materias"
              element={
                <ProtectedRoute mustBeBedel={true}>
                  {<Materias />}
                </ProtectedRoute>
              } />

            <Route path="privado/carreras"
              element={
                <ProtectedRoute mustBedel={true}>
                  {<Carreras />}
                </ProtectedRoute>
              } />

            {/*<Route path="/privado/inscripcionesCarrera" 
        element={
          <ProtectedRoute mustBeBedel={true}>
            {<InscripcionesCarrera/>}
          </ProtectedRoute>
        }/>*/}

            {/*<Route path="/privado/inscripcionesCarrera/" 
        element={
          <ProtectedRoute mustBeBedel={true} component={InscribirACarrera}>
            {<InscripcionesCarrera/>}
          </ProtectedRoute>
        }/>*/}

            {/*<Route path="/privado/inscriptos/idEstudianteCarrera/:idEstudiante" 
        element={
          <ProtectedRoute mustBeBedel={true} component={InscriptosCarrera}>
            {<InscripcionesCarrera/>}
          </ProtectedRoute>
        }/>*/}
        
            {/*<Route path="/privado/inscripcionesMateria" 
        element={
          <ProtectedRoute mustBeBedel={true}>
            {<InscripcionesMateria/>}
          </ProtectedRoute>
        }/>*/}

            {/*<Route path="/privado/inscribirAMateria/" 
        element={
          <ProtectedRoute mustBeBedel={true} component={InscribirAMateria}>
            {<InscribirAMateria/>}
          </ProtectedRoute>
        }/>*/}

            {/*<Route path="/privado/inscriptosMateria/idEstudianteMateria/:idEstudiante" 
        element={
          <ProtectedRoute mustBeBedel={true} component={InscriptosMateria}>
            {<InscriptosMateria/>}
          </ProtectedRoute>
        }/>*/}
          </Routes>
        </UserProvider>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;