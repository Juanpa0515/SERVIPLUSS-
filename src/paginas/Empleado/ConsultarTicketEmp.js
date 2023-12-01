import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";


export default function ConsultarTicketEmp() {
  const [ticket, setticket] = useState([
  ]);
  const tickets = async () => {
    try {
      var response = await APIInvoke.invokeGET(`/tickets`);
      console.log("Respuesta de la API:", response);

      if (Array.isArray(response) && response.length > 0) {
        setticket(response);
      } else {
        console.error("La respuesta de la API no contiene tickets.");
      }
    } catch (error) {
      console.error("Error al cargar los tickets", error);
    }
  };
 
  const  casa = "gestionada";
  
  const { nombre, email, telefono, asunto, mensaje, estado } = ticket;
  //se invoca el id y se hace el proceso de actualizar
  const actualizarTicket = async (e, id) => {
    e.preventDefault();
    const verificarExistenciaproyecto = async (id) => {
      try {
        const response = await APIInvoke.invokeGET(`/tickets?id=${id}`);
        if (response && response.length > 0) {
          return true; // El usuario ya existe
        }
        return false; // El usuario no existe
      } catch (error) {
        console.error(error);
        return false; // Maneja el error si la solicitud falla
      }
    };

    const TicketExistente = await verificarExistenciaproyecto(id);
    console.log(TicketExistente)
    if (TicketExistente) {
      const response = await APIInvoke.invokePUT(`/tickets/${id}`,{ 
      "estado": "Resuelto"
    });
      const msg = "el ticket se ha actualizo correctamente";
      new swal({
        title: "Informacion",
        text: msg,
        icon: "success",
        buttons: {
          confirmar: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-prymari",
            closeModal: true,
          },
        },
      });
      tickets();
    } else {
      const msg = "La cita  No se  Pudo actualizar";
      new swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirmar: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    }

  };
  const TicketsU = async () => {
    try {
      var response = await APIInvoke.invokeGET(`/citas`);
      console.log("Respuesta de la API:", response);

      if (Array.isArray(response) && response.length > 0) {
        setticket(response);
      } else {
        console.error("La respuesta de la API no contiene citas.");
      }
    } catch (error) {
      console.error("Error al cargar las citas", error);
    }
  };

  useEffect(() => {
    tickets();
    
  }, []);
 
  return (
    <div style={{backgroundColor:"white"}}>
      <nav style={{backgroundColor:"#13265c"}} className="main-header navbar navbar-expand navbar-white navbar-light">
       <ul className="navbar-nav">
         <li className="nav-item" >
           <Link
             style={{color:"white"}}
             className="nav-link"
             data-widget="pushmenu"
             href="#"
             role="button"
           >
             <i className="fas fa-bars" />
           </Link>
         </li>
         <li className="nav-item d-none d-sm-inline-block">
           <Link to={"/Home"} className="nav-link" style={{color:"white"}}>
             Home
           </Link>
         </li>
         <li className="nav-item d-none d-sm-inline-block">
           <Link href="#" className="nav-link" style={{color:"white"}}>
             Contact
           </Link>
         </li>
       </ul>
       <ul className="navbar-nav ml-auto">
         <li className="nav-item" >
           <Link
             style={{color:"white"}}
             className="nav-link"
             data-widget="navbar-search"
             href="#"
             role="button"
           >
             <i className="fas fa-search" />
           </Link>
           <div className="navbar-search-block">
             <form className="form-inline">
               <div className="input-group input-group-sm">
                 <input
                   className="form-control form-control-navbar"
                   type="search"
                   placeholder="Search"
                   aria-label="Search"
                 />
                 <div className="input-group-append">
                   <button className="btn btn-navbar" type="submit">
                     <i className="fas fa-search" />
                   </button>
                   <button
                     className="btn btn-navbar"
                     type="button"
                     data-widget="navbar-search"
                   >
                     <i className="fas fa-times" />
                   </button>
                 </div>
               </div>
             </form>
           </div>
         </li>
         <li className="nav-item dropdown">
           <Link className="nav-link" data-toggle="dropdown" to={"#"}  style={{color:"white"}}>
             <i className="far fa-comments" />
             <span className="badge badge-danger navbar-badge">3</span>
           </Link>
         </li>
         {/* Notifications Dropdown Menu */}
         <li className="nav-item dropdown" >
           <Link className="nav-link" data-toggle="dropdown" href="#"  style={{color:"white"}}>
             <i className="far fa-bell" />
             <span className="badge badge-warning navbar-badge">15</span>
           </Link>
           <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
             <span className="dropdown-item dropdown-header">
               15 Notifications
             </span>
             <div className="dropdown-divider" />
             <a href="#" className="dropdown-item">
               <i className="fas fa-envelope mr-2" /> 4 new messages
               <span className="float-right text-muted text-sm">3 mins</span>
             </a>
             <div className="dropdown-divider" />
             <a href="#" className="dropdown-item">
               <i className="fas fa-users mr-2" /> 8 friend requests
               <span className="float-right text-muted text-sm">12 hours</span>
             </a>
             <div className="dropdown-divider" />
             <a href="#" className="dropdown-item">
               <i className="fas fa-file mr-2" /> 3 new reports
               <span className="float-right text-muted text-sm">2 days</span>
             </a>
             <div className="dropdown-divider" />
             <a href="#" className="dropdown-item dropdown-footer">
               See All Notifications
             </a>
           </div>
         </li>
       </ul>
     </nav>
     <aside style={{backgroundColor:"#13265c"}} className="main-sidebar sidebar-dark-primary elevation-4">
       {/* Brand Logo */}
       <Link to={"#"} className="brand-link">
         <img
           src="dist/img/s.png"
           alt="AdminLTE Logo"
           className="brand-image img-circle elevation-3"
           style={{ opacity: ".8" }}
         />
         <span style={{Color:"white"}} className="brand-text font-weight-light">ServiPlus</span>
       </Link>
       {/* Sidebar */}
       <div className="sidebar">
         {/* Sidebar user panel (optional) */}
         <div className="user-panel mt-3 pb-3 mb-3 d-flex">
           <div className="image">
             <img
               src="dist/img/Avatar5.png"
               className="img-circle elevation-2"
               alt="User Image"
             />
           </div>
           <div style={{Color:"white"}} className="info">
             <Link to={"/profile"} className="d-block">
              Empleado
             </Link>
           </div>
         </div>
         {/* SidebarSearch Form */}
         <div className="form-inline">
           <div className="input-group" data-widget="sidebar-search">
             <input
               style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
               className="form-control form-control-sidebar"
               type="search"
               placeholder="Search"
               aria-label="Search"
             />
             <div className="input-group-append">
               <button className="btn btn-sidebar"  style={{borderRadius:"20px", marginLeft:"10px", backgroundColor:"#DCEFFB", color:"#13265c"}}>
                 <i className="fas fa-search fa-fw" />
               </button>
             </div>
           </div>
         </div>
         {/* Sidebar Menu */}
         <nav className="mt-2">
           <ul
             className="nav nav-pills nav-sidebar flex-column"
             data-widget="treeview"
             role="menu"
             data-accordion="false"
           >
             {/* Add icons to the links using the .nav-icon class
        with font-awesome or any other icon font library */}

             <li className="nav-item">
               <Link to={"/Empleado"} className="nav-link">
                 <i className="nav-icon fas fa-th" />
                 <p>Bienvenido</p>
               </Link>
             </li>
             <li className="nav-item">
               <Link href="#" className="nav-link">
                 <i className="nav-icon fas fa-copy" />
                 <p>
                   Bandeja de Entrada
                   <i className="fas fa-angle-left right" />
                   <span className="badge badge-info right">6</span>
                 </p>
               </Link>
               <ul className="nav nav-treeview">
                 <li className="nav-item">
                   <Link
                     to={"/ConsultarTicketEmp"}
                     className="nav-link"
                   >
                     <i className="far fa-circle nav-icon" />
                     <p>Tickets</p>
                   </Link>
                 </li>
               </ul>
             </li>
           </ul>
         </nav>
         {/* /.sidebar-menu */}
       </div>
       {/* /.sidebar */}
     </aside>
     <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">ServiPlus</h1>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
        </div>

        <section className="content" style={{ maxWidth:2350 , minWidth:1550 }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header border-transparent">
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table m-0">
                        <thead>
                          <tr>
                            <th>id Ticket</th>
                            <th>nombre del Ticket</th>
                            <th>email del Ticket</th>
                            <th>numero del Ticket</th>
                            <th>asunto del Ticket</th>
                            <th>mensaje del Ticket</th>
                            <th>estado del Ticket</th>
                            <th>operadores</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ticket.map((item) => (
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.nombre}</td>
                              <td>{item.email}</td>
                              <td>{item.numero}</td>
                              <td>{item.asunto}</td>
                              <td>{item.mensaje}</td>
                              <td>{item.estado}</td>
                              <td>
                              <Link
                                  to={("/EnviarRespuesta")}
                                  className="btn btn-sm btn-info float-left"
                                >
                                  enviar Respuesta
                                </Link>
                                <Link
                                  onClick={(e) => actualizarTicket(e, item.id)}
                                  className="btn btn-sm btn-info float-left"
                                >
                                  confirmar Respuesta
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer clearfix">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
     <footer className="main-footer">
       <strong>
         Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.
       </strong>
       All rights reserved.
       <div className="float-right d-none d-sm-inline-block">
         <b>Version</b> 3.2.0
       </div>
     </footer>
   </div>

  )
}
