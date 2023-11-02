// imports de bootstrap
import './App.css';

//Imports header y footer
import { Header } from "./Componentes/Header/Header";
import { Footer } from "./Componentes/Footer/Footer";
import { Banner } from "./Componentes/Banner/Banner";


//Imports demás componentes 
import { Inicio } from "./Componentes/Inicio/Inicio";
import { Institucional } from "./Componentes/Institucional/Institucional";
import { Alumnos } from "./Componentes/Alumnos/Alumnos";
import { Materias } from "./Componentes/Materias/Materias";
import { Carreras } from "./Componentes/Carreras/Carreras";
import { Inscripciones } from "./Componentes/Inscripciones/Inscripciones";
import { Inscribir } from "./Componenetes/Incripciones/Inscribir";
import { Inscriptos } from "./Componentes/Inscripciones/Inscriptos"
import { Contacto } from "./Componentes/Contacto/Contacto";
import { Login } from "./Componentes/Login/Login";
import { Dashboard } from "./Componentes/Dashboard/Dashboard";

 

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Componentes/UserContext/UserContext";
import { ProtectedRoute } from "./Componentes/ProtectedRoute/ProtectedRoute"; 

export function App() {
  return (
    <>  
      <BrowserRouter>
      <UserProvider>
       <Header/> 
      <Routes>
        <Route path="/" element={<Inicio/>}></Route>
        <Route path="institucional" element={<Institucional/>}></Route>
        <Route path="contacto" element={<Contacto/>}></Route>
        <Route path= "banner" element={<Banner/>}></Route>
        <Route path= "login" element={<Login/>}></Route>
        
        <Route path='/privado/dashboard' 
        element={
        <ProtectedRoute mustBeBedel={false}>
          {<Dashboard/>}
        </ProtectedRoute>
      }/> 
        {/*en la ruta para dashboar mustBeBedel debe ser "false" ya que es una ruta solo para decano*/}

        <Route path="/privado/alumnos" 
        element={
        <ProtectedRoute mustBeBedel={true}>
          {<Alumnos/>}
        </ProtectedRoute>
        }/>
        
        <Route path="/privado/materias" 
        element={
          <ProtectedRoute mustBeBedel={true}>
            {<Materias/>}
          </ProtectedRoute>
        }/>
        
        <Route path="privado/carreras" 
        element={
          <ProtectedRoute mustBedel={true}>
            {<Carreras/>}
          </ProtectedRoute>
        }/>
        
        <Route path="/privado/inscripciones" 
        element={
          <ProtectedRoute mustBeBedel={true}>
            {<Inscripciones/>}
          </ProtectedRoute>
        }/>
        
        <Route path="/privado/inscribir/:parametro" 
        element={
          <ProtectedRoute mustBeBedel={true} component={Inscribir}>
            {<Inscribir/>}
          </ProtectedRoute>
        }/>
        
        <Route path="/privado/inscriptos/idInscripcion/:idEstudiante" 
        element={
          <ProtectedRoute mustBeBedel={true} component={Inscriptos}>
            {<Inscriptos/>}
          </ProtectedRoute>
        }/>
      </Routes>
      </UserProvider>
      <Footer/>
    </BrowserRouter>
  </>
  );
}

export default App;