import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const Login = () => {
  //Este método es para redireccionar un componente a otro
  const navigate = useNavigate();

  //Definir el estado inicial de las variables
  const [Cliente, setCliente] = useState({
      email: '',
      password: ''
  });

  const { email, password } = Cliente;

  

  const onChange = (e) => {
    setCliente({
          ...Cliente,
          [e.target.name]: e.target.value
      });
  }

  useEffect(() => {
      document.getElementById("email").focus();
  }, [])


  const iniciarSesion = async () => {
      const verificarExistenciaUsuario = async (email, password) => {
          try {
              const response = await APIInvoke.invokeGET(
                  `/Clientes?email=${email}&password=${password}`
              );
              if (response && response.length > 0) {
                  return response[0]; // Devuelve el primer usuario que coincide
              }
              return null; // El usuario no existe
          } catch (error) {
              console.error(error);
              return null; // Maneja el error si la solicitud falla
          }
      };

      if(password.length < 6){
          const msg = "Contraseña demasiado corta (debe ser mayor a 6 caracteres)";
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
      }else{
        const usuarioExistente = await verificarExistenciaUsuario(email, password);
        const response = await APIInvoke.invokeGET(
            `/Clientes?email=${email}&password=${password}`
        );

        if (!usuarioExistente) {
          const msg = "usuario o contraseña incorrecto.";
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
      }else {
        if (usuarioExistente.rol === 'Clientes') {
            navigate("/Cliente", usuarioExistente.id);
        } else if(usuarioExistente.rol === 'Empleados'){
          navigate("/Empleado")
        } else {
            navigate("/");
        }
    }
      }
  }


  const onSubmit = (e) => {
      e.preventDefault();
      iniciarSesion();
  }

  
  return (
    <div
      style={{
        backgroundColor: "#13265c",
        backgroundSize: "20px 20px",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
      className="hold-transition login-page"
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
              Bienvenido, ingrese sus credenciales para iniciar sesión
            </p>
            

            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                  type="email"
                  className="form-control"
                  placeholder="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text" style={{marginLeft:"20px",borderRadius:"20px", border:"solid #DCEFFB 1px"}}>
                    <span
                      style={{color: "white"}}
                      className="fas fa-envelope"
                    ></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  style={{backgroundColor:"#DCEFFB",color: "black", borderColor: "white", borderRadius:"20px"}}
                  type="password"
                  className="form-control"
                  placeholder="Password"
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
                    ></span>
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
                  className="btn btn-block btn-primary"
                >
                  {" "}
                  Ingresar
                </button>
                <Link
                  to={"crear-cuenta"}
                  style={{
                    backgroundColor: "white",
                    borderColor: "#DCEFFB",
                    color: "#5DADE2",
                    borderRadius:"20px"
                  }}
                  type="submit"
                  className="btn btn-block btn-danger"
                >
                  {" "}
                  Crear cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
