import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

export default function ConsultarTicket() {
  
  const [ticket, setticket] = useState([]);
  const userId = localStorage.getItem("id");
  const tickets = async () => {
    try {
      var response = await APIInvoke.invokeGET(`/tickets?userId=${userId}`);
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

  useEffect(() => {
    tickets();
  }, []);

  const eliminarProyecto = async (e, id) => {
    e.preventDefault();
    const verificarExistenciaproyecto = async (id) => {
      const userId = localStorage.getItem("id");
      try {
        const response = await APIInvoke.invokeGET(`/tickets?id=${id}`);
        if (response && response.length > 0) {
          return true; // El ticket ya existe
        }
        return false; // El ticket no existe
      } catch (error) {
        console.error(error);
        return false; // Maneja el error si la solicitud falla
      }
    };

    const ticketexistente = await verificarExistenciaproyecto(id);

    if (ticketexistente) {
      const response = await APIInvoke.invokeDELETE(`/tickets/${id}`);
      const msg = "ticket eliminado correctamente";
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
      const msg = "El ticket No Pudo Ser Eliminado";
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

  return (
    <div style={{ backgroundColor: "white" }}>
      <nav
        style={{ backgroundColor: "#13265c" }}
        className="main-header navbar navbar-expand navbar-white navbar-light"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              style={{ color: "white" }}
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to={"/Home"} className="nav-link" style={{ color: "white" }}>
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link href="#" className="nav-link" style={{ color: "white" }}>
              Contact
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              style={{ color: "white" }}
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
            <Link
              className="nav-link"
              data-toggle="dropdown"
              to={"#"}
              style={{ color: "white" }}
            >
              <i className="far fa-comments" />
              <span className="badge badge-danger navbar-badge">3</span>
            </Link>
          </li>
          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <Link
              className="nav-link"
              data-toggle="dropdown"
              href="#"
              style={{ color: "white" }}
            >
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
      <aside
        style={{ backgroundColor: "#13265c" }}
        className="main-sidebar sidebar-dark-primary elevation-4"
      >
        {/* Brand Logo */}
        <Link to={"/Cliente"} className="brand-link">
          <img
            src="dist/img/s.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span
            style={{ Color: "white" }}
            className="brand-text font-weight-light"
          >
            ServiPlus
          </span>
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
            <div style={{ Color: "white" }} className="info">
              <Link to={"/profile"} className="d-block">
               Cliente
              </Link>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                style={{
                  backgroundColor: "#DCEFFB",
                  color: "black",
                  borderColor: "white",
                  borderRadius: "20px",
                }}
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-sidebar"
                  style={{
                    borderRadius: "20px",
                    marginLeft: "10px",
                    backgroundColor: "#DCEFFB",
                    color: "#13265c",
                  }}
                >
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
                    <span className="badge badge-info right">3</span>
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
                    <Link to={"/ConsultarTicket"} className="nav-link">
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
                    <Link href="pages/charts/chartjs.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Ver Chat</p>
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
      <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6" style={{textAlign:"center"}}>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><Link to={"/Cliente"}>Home</Link></li>
            <li className="breadcrumb-item active">Tickets</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>

  <section className="content">
    {/* Default box */}
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Tickets</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        <table className="table table-striped projects">
          <thead>
                          <tr>
                            <th style={{ width: "1%" }}>id ticket</th>
                            <th style={{ width: "20%" }}>nombre del ticket</th>
                            <th style={{ width: "30%" }}>correo del ticket</th>
                            <th style={{ width: "8%" }} className="text-center">
                              telefono del ticket
                            </th>
                            <th style={{ width: "20%" }}>asunto del ticket</th>
                            <th style={{ width: "20%" }}>mensaje del ticket</th>
                            <th style={{ width: "20%" }}>estado del ticket</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ticket.map((item) => (
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.nombre}</td>
                              <td>{item.email}</td>
                              <td>{item.telefono}</td>
                              <td>{item.asunto}</td>
                              <td>{item.mensaje}</td>
                              <td>{item.estado}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer clearfix">
                    <Link
                      to={"/crearTicket"}
                      className="btn btn-sm btn-secondary float-right"
                    >
                      Crear Ticket
                    </Link>
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
  );
}
