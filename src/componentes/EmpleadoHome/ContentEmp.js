import React from "react";
import { Link } from "react-router-dom";

export default function ContentEmp() {
  return (
    <div style={{ backgroundImage: 'url("imagen_fondo_general.jpg")' }}>
    <body
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px",
        padding: "0",
        boxSizing: "border-box",
        background: "none", // Fondo transparente para evitar duplicar imágenes
      }}
    >
      <div
        class="container"
        style={{
          maxWidth: "800px",
          margin: "auto",
          backgroundImage: 'url("imagen_fondo_container.jpg")',
        }}
      >
        <h1
          style={{
            textAlign: "center",
            backgroundImage: 'url("imagen_fondo_titulo.jpg")',
          }}
        >
          Bienvenido Empleado a nuestro Servicio de Atención al Cliente
        </h1>
  
        <p style={{ lineHeight: "1.6" }}>
          Somos dedicados a proporcionar un servicio excepcional para satisfacer
          las necesidades de nuestros clientes. Aquí encontrarás información útil
          y recursos para mejorar tu experiencia con nosotros.
        </p>
  
        <h2>Nuestros Servicios</h2>
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
          }}
        >
          <li style={{ marginBottom: "10px" }}>
            Asistencia telefónica las 24 horas del día, los 7 días de la semana.
          </li>
          <li style={{ marginBottom: "10px" }}>
            Soporte en línea a través de nuestro portal de atención al cliente.
          </li>
          <li style={{ marginBottom: "10px" }}>
            Respuestas a preguntas frecuentes para resolver problemas comunes.
          </li>
          <li style={{ marginBottom: "10px" }}>
            Comentarios y sugerencias para mejorar nuestros servicios.
          </li>
        </ul>
  
        <h2 style={{ textAlign: "center", backgroundImage: 'url("imagen_fondo_titulo.jpg")' }}>
          Contáctanos
        </h2>
        <p style={{ lineHeight: "1.6" }}>
          Estamos aquí para ayudarte. Puedes ponerte en contacto con nosotros de
          las siguientes maneras:
        </p>
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
          }}
        >
          <li style={{ marginBottom: "10px" }}>
            Por teléfono: [Número de Teléfono]
          </li>
          <li style={{ marginBottom: "10px" }}>
            Por correo electrónico: [Correo Electrónico]
          </li>
          <li style={{ marginBottom: "10px" }}>
            Chat en línea a través de nuestro portal.
          </li>
        </ul>
      </div>
    </body>
  </div>
  
  );
}
