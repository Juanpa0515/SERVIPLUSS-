import React, { useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke";
import swal from 'sweetalert';
//import swal  from 'sweetalert';

const CrearCuentaAdmin = ()  => {

const [usuario, setUsuario]= useState({
 nombre:'',
 email:'',
 password:'',
 confirmar:'',
 rol: 'administrador'
 });
    
 const {nombre, email, password, confirmar, rol } = usuario;
    
    const onChange = (e) =>{
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };
    
    useEffect(()=>{
        document.getElementById('Nombre').focus();
    },[])

    const CrearCuenta= async () =>{
      const verificarExistenciaUsuario = async (email, nombre) => {
        try {
          const response = await APIInvoke.invokeGET(
            `/usuarios?email=${email}&nombre=${nombre}`
          );
      
          if (response && response.length > 0) {
            return true; // El usuario ya existe
          } else {
            return false; // El usuario no existe
          }
        } catch (error) {
          console.error(error);
          return false; // Maneja el error si la solicitud falla
        }
      };

if (password !== confirmar) {
    const msg = "Las contraseñas no coinciden.";
    swal({
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
        }else if (password.length < 6) {
          const msg = "Contraseña demasiado corta (debe ser mayor a 6 caracteres)";
          swal({
              title: 'Error',
              text: msg,
              icon: 'warning',
              buttons: {
                  confirmar:{
                      text: 'Ok',
                      value: true,
                      visible: true,
                      className: 'btn btn-danger',
                      closeModal: true
                  }
              }
          }); } else {
            const usuarioExistente = await verificarExistenciaUsuario(nombre);     
            const data = {
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            confirmar: usuario.confirmar,
            rol: usuario.rol   // Hay que asegurarse que se envie bien al servidor
            };                                          
            const response = await APIInvoke.invokePOST(`/Usuarios`, data);
            const mensaje = response.msg;
    
            if (usuarioExistente) {
                const msg = 'El usuario ya existe'
                new swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            } else {
                    const msg = "El usuario fue creado correctamente";
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
                            }
                        }
                    });
    
                    setUsuario({
                        nombre: "",
                        email: "",
                        password: "",
                        confirmar: "",
                        rol: "administrador"
    
                    })
                }
            }
        }

    const onSubmit = (e) =>{
        e.preventDefault()
        CrearCuenta();
    }

    return (
        <div
        style={{
          backgroundColor: "#13265c",
          backgroundSize: "20px 20px",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
          class="hold-transition login-page"
        >
        <div className="login-box">
          <div className="login-logo" style={{ color: "white" }}>
            <Link to={"#"} style={{ fontSize: "40px", color: "white" }}>
              <b style={{color:"white", fontSize: "45px" }}>Servi</b>Plus
            </Link>
          </div>
  
          <div className="card" style={{border:"solid #5DADE2 1px", borderRadius:"20px"}}>
            <div className="card-body login-card-body" style={{backgroundColor:"#5DADE2", borderRadius:"20px"}}>
                <p className="login-box-msg" style={{color:"white"}}>
                  Ingresa los datos del usuario
                </p>
  
  
                <form onSubmit={onSubmit}>
                  <div className="input-group mb-3">
                    <input
                      style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      id="Nombre"
                      name="nombre"
                      value={nombre}
                      onChange={onChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text" style={{marginLeft:"20px",borderRadius:"20px", border:"solid #DCEFFB 1px"}}>
                        <span
                          style={{color: "white"}}
                          className="fas fa-user"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
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
                    <div className="input-group-append">
                      <div className="input-group-text" style={{marginLeft:"20px",borderRadius:"20px", border:"solid #DCEFFB 1px"}}>
                        <span
                         style={{ color: "white", borderColor: "#239B56"}}
                          className="fas fa-envelope"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                     style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                      type="password"
                      className="form-control"
                      placeholder="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text" style={{marginLeft:"20px",borderRadius:"20px", border:"solid #DCEFFB 1px"}}>
                        <span
                         style={{ color: "white", borderColor: "#239B56"}}
                          className="fas fa-lock"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                        style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                      type="password"
                      className="form-control"
                      placeholder="confirmar contraseña"
                      id="password2"
                      name="confirmar"
                      value={confirmar}
                      onChange={onChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text" style={{marginLeft:"20px",borderRadius:"20px", border:"solid #DCEFFB 1px"}}>
                        <span
                          style={{ color: "white", borderColor: "#239B56"}}
                          className="fas fa-lock"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="social-auth-links text-center mb-3">
                    <button
                       style={{
                        backgroundColor: "white",
                        borderColor: "#DCEFFB",
                        color: "#5DADE2",
                        borderRadius:"20px"
                      }}
                      type="submit"
                      to={"#"}
                      className="btn btn-block btn-primary"
                    >
                      crear cuenta de Admin
                    </button>
                    <Link
                      to={"/"}
                      style={{
                        backgroundColor: "white",
                        borderColor: "#DCEFFB",
                        color: "#5DADE2",
                        borderRadius:"20px"
                      }}
                      className="btn btn-block btn-danger"
                    >
                      regresar al login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            </div>
          </div>
    )
    }
export default CrearCuentaAdmin;