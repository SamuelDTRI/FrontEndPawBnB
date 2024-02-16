import styles from "./LinksDashboardOwner.module.css"
import { useState } from "react";
import {useDispatch } from "react-redux";
import { infoLinkOwner } from "../../redux/linksActives";


const LinksDashboardOwner = ()=>{
  const dispatch = useDispatch()

  const handleClick=(informacion)=>{
  dispatch(infoLinkOwner(informacion))
  };


  return (
    <div>
    <div className={styles.sideBarLinks}>
      <ul>
        <li>
          <a href="#" onClick={()=> handleClick("miInfo")}>
           Mi informacion
          </a>
        </li>
        <li>
          <a href="#" onClick={()=>handleClick("miPerro")}>
           Mi perro
          </a>
        </li>
        <li>
          <a href="#" onClick={()=>handleClick("misReservas")}>
           Mis reservas
          </a>
        </li>
        <li>
          <a href="#" onClick={()=>handleClick("Favoritos")}>
          Favoritos
          </a>
        </li>
        <li>
          <a href="#" onClick={()=>handleClick("MetodosPago")}>
          Metodos de Pago
          </a>
        </li>
      </ul>
    </div>
    </div>
  );

}

export default LinksDashboardOwner;