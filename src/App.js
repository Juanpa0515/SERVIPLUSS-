import React, { Fragment, Profiler } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // componentes de ruteo
import Login from "./paginas/auth/login";
import CrearCuenta from "./paginas/auth/CrearCuenta";
import Profile from "./paginas/Empleado/profile";
import CrearCuentaAdmin from "./paginas/auth/CrearCuentaAdmin";
import ConsultarTicket from "./paginas/Cliente/ConsultarTicket";
import EditarTicket from "./paginas/Cliente/EditarTicket";
import Empleado from "./paginas/Empleado/Empleado";
import Cliente from "./paginas/Cliente/Cliente";
import ConsultarTicketEmp from "./paginas/Empleado/ConsultarTicketEmp";
import CrearTicket from "./paginas/Cliente/CrearTicket";



function App() {


  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/Crear-Cuenta" exact element={<CrearCuenta/>}/>
          <Route path="/Cliente" exact element={<Cliente/>}/>
          <Route path="/crearTicket" exact element={<CrearTicket/>}/>
          <Route path="/profile" exact element={<Profile/>}/>
          <Route path="/CrearCuentaAdmin" exact element={<CrearCuentaAdmin/>}/>
          <Route path="/ConsultarTicket" exact element={<ConsultarTicket/>}/>
          <Route path="/Empleado" exact element={<Empleado/>}/>
          <Route path="/EditarTicket" exact element={<EditarTicket/>}/>
          <Route path="/ConsultarTicketEmp" exact element={<ConsultarTicketEmp/>}/>
          

        </Routes>
      </Router>
    </Fragment>
  );
}


export default App;
