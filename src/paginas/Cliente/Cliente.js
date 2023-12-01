import React from "react";
import HeaderCliente from "../../componentes/ClienteHome/HeaderCliente";
import AsideCliente from "../../componentes/ClienteHome/AsideCliente";
import ContentCliente from "../../componentes/ClienteHome/ContentCliente";
import FooterCliente from "../../componentes/ClienteHome/FooterCliente";



const Cliente = () =>{
    return(
      <div>
      <HeaderCliente/>
      <AsideCliente/>
      <ContentCliente/>
      <FooterCliente/>
      </div>
    );
}

export default Cliente;