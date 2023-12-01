import React from 'react';
import { Link } from 'react-router-dom';

export default function AsideCliente() {
  return (
    <div> <div>
    <aside style={{backgroundColor:"#13265c"}} className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to={"/Cliente"} className="brand-link">
        <img
          src="dist/img/s.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span style={{Color:"white"}} className="brand-text ">ServiPlus</span>
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
            <div className="input-group-append" >
              <button className="btn btn-sidebar"  style={{borderRadius:"20px", marginLeft:"10px", backgroundColor:"#DCEFFB", color:"#13265c"}}>
                <i className="fas fa-search fa-fw"  />
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
              <Link to={"#"} className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>
                  Bienvenido
                </p>
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
                    <Link to={"/consultarTicket"}
                      className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Consultar Ticket</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/editarTicket"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Editar Ticket</p>
                    </Link>
                  </li>
                </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Chat
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
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
  </div></div>
  )
}
