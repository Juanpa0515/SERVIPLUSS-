import React from "react";
import HeaderEmp from "../../componentes/EmpleadoHome/HeaderEmp";
import AsideEmp from "../../componentes/EmpleadoHome/AsideEmp";
import ContentEmp from "../../componentes/EmpleadoHome/ContentEmp";
import FooterEmp from "../../componentes/EmpleadoHome/FooterEmp";


const Empleado = () =>{
    return(
        <div>
            <HeaderEmp/>
            <AsideEmp/>
            <ContentEmp/>
            <FooterEmp/>
        </div>
    );
}

export default Empleado;