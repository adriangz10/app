import React, { useState } from 'react';
import { UserContext } from './componentes/UserContext/UserContext';

// imports de bootstrap
import './App.css';

//Imports header y footer
import { Header } from "./componentes/Header/Header";
import { Footer } from "./componentes/Footer/Footer";
import { Banner } from "./componentes/Banner/Banner";


//Imports demás componentes 
import { Inicio } from "./componentes/Inicio/Inicio";
import { Institucional } from "./componentes/Institucional/Institucional";
import { Alumnos } from "./componentes/Alumnos/Alumnos";
import { Materias } from "./componentes/Materias/Materias";
import { Carreras } from "./componentes/Carreras/Carreras";
//import { Inscripciones } from "./componentes/Inscripciones/Inscripciones";
//import { Inscribir } from "./componenetes/Incripciones/Inscribir";
//import { Inscriptos } from "./componentes/Inscripciones/Inscriptos"
import { Contacto } from "./componentes/Contacto/Contacto";
import { Login } from "./componentes/Login/Login";
import { Dashboard } from "./componentes/Dashboard/Dashboard";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./componentes/UserContext/UserContext";
import { ProtectedRoute } from "./componentes/ProtectedRoute/ProtectedRoute";

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
            <Route path="banner" element={<Banner />}></Route>
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

            {/*<Route path="/privado/inscripciones" 
        element={
          <ProtectedRoute mustBeBedel={true}>
            {<Inscripciones/>}
          </ProtectedRoute>
        }/>*/}

            {/*<Route path="/privado/inscribir/" 
        element={
          <ProtectedRoute mustBeBedel={true} component={Inscribir}>
            {<Inscribir/>}
          </ProtectedRoute>
        }/>*/}

            {/*<Route path="/privado/inscriptos/idInscripcion/:idEstudiante" 
        element={
          <ProtectedRoute mustBeBedel={true} component={Inscriptos}>
            {<Inscriptos/>}
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