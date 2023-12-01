import React, { useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke";
import swal from 'sweetalert';

const solicitud = true

const CrearTicket = () => {
  const [ticket, setTicket] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    estado: "pendiente"
  });

  const { nombre, email, telefono, asunto, mensaje, estado  } = ticket;

  const onChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const CrearTickete = async () => {
    const verificarExistenciaTicket = async (
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
      estado
    ) => {
      try {
        const response = await APIInvoke.invokeGET(
          `/tickets?nombre=${nombre}&email=${email}&telefono${telefono}&asunto${asunto}&mensaje${mensaje}&estado=${estado}`
        );

        if (response && response.length > 0) {
          return true; // el ticket ya existe
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false; // Maneja el error si la solicitud falla
      }
    };

    if (solicitud === true) {
      const usuarioExistente = await verificarExistenciaTicket();
      const data = {
        nombre: ticket.nombre,
        email: ticket.email,
        telefono: ticket.telefono,
        asunto: ticket.asunto,
        mensaje: ticket.mensaje,
        estado: ticket.estado // Hay que asegurarse que se envie bien al servidor
      };
      const response = await APIInvoke.invokePOST(`/tickets`, data);
      const mensaje = response.msg;

      if (usuarioExistente) {
        const msg = "El ticket ya existe";
        new swal({
          title: "Error",
          text: msg,
          icon: "error",
          buttons: {
            confirm: {
              text: "Ok",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true,
            },
          },
        });
      } else {
        const msg = "el ticket fue creado correctamente";
        swal({
          title: "Información",
          text: msg,
          icon: "success",
          buttons: {
            confirm: {
              text: "Ok",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true,
            },
          },
        });

        setTicket({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: "",
          estado:""
        });
      }
    }
  };

 

  const onSubmit = (e) => {
    e.preventDefault();
    CrearTickete();
  };


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
           <Link to={"/Cliente"} className="nav-link" style={{color:"white"}}>
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
       <Link to={"/Cliente"} className="brand-link">
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
              Cliente
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
               <Link to={"/Cliente"} className="nav-link">
                 <i className="nav-icon fas fa-th" />
                 <p>Bienvenido</p>
               </Link>
             </li>
             <li className="nav-item">
               <Link href="#" className="nav-link">
                 <i className="nav-icon fas fa-copy" />
                 <p>
                   Atencion al cliente
                   <i className="fas fa-angle-left right" />
                   <span className="badge badge-info right">6</span>
                 </p>
               </Link>
               <ul className="nav nav-treeview">
                 <li className="nav-item">
                   <Link to={"/crearTicket"} className="nav-link">
                     <i className="far fa-circle nav-icon" />
                     <p>Crear Ticket</p>
                   </Link>
                 </li>
                 <li className="nav-item">
                   <Link
                     to={"/ConsultarTicket"}
                     className="nav-link"
                   >
                     <i className="far fa-circle nav-icon" />
                     <p>Consultar Ticket</p>
                   </Link>
                 </li>
                 <li className="nav-item">
                   <Link to={"/EditarTicket"} className="nav-link">
                     <i className="far fa-circle nav-icon" />
                     <p>Editar Ticket</p>
                   </Link>
                 </li>
             
               </ul>
             </li>
             <li className="nav-item">
               <Link href="#" className="nav-link">
                 <i className="nav-icon fas fa-chart-pie" />
                 <p>
                   Chats
                   <i className="right fas fa-angle-left" />
                 </p>
               </Link>
               <ul className="nav nav-treeview">
                 <li className="nav-item">
                   <a href="pages/charts/chartjs.html" className="nav-link">
                     <i className="far fa-circle nav-icon" />
                     <p>Ver Chat</p>
                   </a>
                 </li>
               </ul>
             </li>
           </ul>
         </nav>
         {/* /.sidebar-menu */}
       </div>
       {/* /.sidebar */}
     </aside>
     <div style={{backgroundColor:"white",paddingLeft:"450px", paddingTop:"20px", paddingBottom:"20px", borderRadius:"20px", marginLeft:"255px", marginRight:"5px", marginBottom:"5px", marginTop:"5px"}}  className="content-wrapper">
       <section className="content-header">
         <div  className="container-fluid">
           <div className="row mb-2">
             <div className="col-sm-6">
              
             </div>
             <div className="col-sm-6">
               <ol className="breadcrumb float-sm-right">
                 <li className="breadcrumb-item">
                   <Link to={"/Home"}>Home</Link>
                 </li>
                 <li className="breadcrumb-item active">Crear Ticket</li>
               </ol>
             </div>
           </div>
         </div>
         {/* /.container-fluid */}
       </section>
       {/* Main content */}
       <section className="content">
       <form onSubmit={onSubmit}>
      
         <div className="row">
           <div className="col-md-6" >
             
             <div className="card card-primary" style={{backgroundColor:"#13265c", borderRadius:"20px"}}>
             
                 <div className="card-tools">
             
                   <button
                     type="button"
                     className="btn btn-tool"
                     data-card-widget="collapse"
                     title="Collapse"
                   >
                     <i className="fas fa-minus" />
                   </button>
                 </div>
                 <center style={{margin:"10px", fontSize: "35px", color:"white" }}>Crear Ticket</center >
               <div className="card-body">
                 <div className="form-group">
                   <label style={{color:"white"}} htmlFor="nombre">Nombre:</label>
                   <input
                      style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                      type="text" 
                      className="form-control" 
                      placeholder="Nombre" 
                      id="nombre"  
                      name="nombre" 
                      value={nombre} 
                      onChange={onChange}
                      required
                   />
                 </div>
                 <div className="form-group">
                   <label style={{color:"white"}} htmlFor="email">Correo Electrónico:</label>
                   <input
                      style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                        type="email" 
                        className="form-control" 
                        placeholder="Email" 
                        id="email" 
                        name="email"
                        value={email} 
                        onChange={onChange}
                        required
                   />
                 </div>
                 <div className="form-group">
                   <label style={{color:"white"}} htmlFor="telefono">Teléfono:</label>
                   <input
                     style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                     type="number"
                     className="form-control" 
                     placeholder="Telefono" 
                     id="telefono" 
                     name="telefono"
                     value={telefono} 
                     onChange={onChange}
                     required
                   />
                 </div>
                 <div className="form-group">
                   <label style={{color:"white"}} htmlFor="asunto">Asunto:</label>
                   <select
                  name="asunto"
                  className="form-control"
                  placeholder="tipo de asunto"
                  value={asunto}
                  onChange={onChange}
                  required
                >
                  <option >Area Academica</option>
                  <option >Area de la Salud</option>
                  <option >Area Administrativa</option>
                  <option >Postulaciones</option>
                  <option >Constancias</option>
                  <option >Formularios Electronicos</option>
                </select>
                 </div>
                 <div className="form-group">
                   <label style={{color:"white"}} htmlFor="mensaje">Mensaje:</label>
                   <textarea
                     style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                     name="mensaje"
                     id="mensaje"
                     className="form-control"
                     placeholder="mensaje" 
                     value={mensaje}
                     onChange={onChange}
                     required
                     rows={4}
                   />
                 </div>
                 <div className="row">
               <div className="col-12">
                 <Link to={"/Cliente"} className="btn btn-secondary"
                 style={{
                   backgroundColor: "white",
                   borderColor: "#DCEFFB",
                   color: "#5DADE2",
                   borderRadius:"20px"
                 }}>
                   Cancel
                 </Link>
                 <input
                    style={{
                     backgroundColor: "white",
                     borderColor: "#DCEFFB",
                     color: "#5DADE2",
                     borderRadius:"20px"
                   }}
                   type="submit"
                   defaultValue="crear solicitud"
                   className="btn btn-success float-right"
                 />
               </div>
             </div>
               </div>
               
               {/* /.card-body */}
             </div>
         
             {/* /.card */}
           </div>
         </div>
         </form>
       </section>
       
       {/* /.content */}
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
    );
    }
  
export default CrearTicket;