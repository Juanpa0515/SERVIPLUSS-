import React from 'react';


export default function Profile() {
  return (
 <div className='card'>
    <body style={{ fontFamily: 'Arial',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: "100px",
      backgroundColor: "#f0f0f0"}}>
  <div className="profile-container">
    <h1>Perfil de Usuario</h1>
    <div>
      <img src="tu-imagen-de-perfil.jpg" alt="Imagen de perfil" />
    </div>
    <h2>Nombre de Usuario</h2>
    <p>Correo electrónico: usuario@example.com</p>
    <p>Ubicación: Ciudad, País</p>
    {/* Agrega más información del perfil según sea necesario */}
  </div>
  </body>
</div>

  );
}
