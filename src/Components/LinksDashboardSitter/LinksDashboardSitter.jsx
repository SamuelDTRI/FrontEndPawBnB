import { useState } from "react";
import styles from "./LinksDashboardSitter.module.css";
import Gallery from "../GallerySitters/GallerySitters";
import {useDispatch } from "react-redux";
import { infoLink } from "../../redux/linksActives";

const LinksDashboardSitter = () => {
const dispatch = useDispatch()

  const handleClick=(informacion)=>{
  dispatch(infoLink(informacion))
  };


  return (
    <div>
    <div className={styles.sideBarLinks}>
      <ul className={styles.buttonList}>
        <li>
          <button onClick={()=> handleClick("miInfo")} >
            <i className="bi bi-person-vcard"></i> Mi informacion
          </button>
        </li>
        <li>
          <button onClick={()=>handleClick("miGaleria")}>
          <i className="bi bi-images"></i> Mi galeria
          </button>
        </li>
        <li>
          <button onClick={()=>handleClick("misReservas")}>
            <i className="bi bi-calendar4-week"></i> Mis reservas
          </button>
        </li>
        {/* <li>
          <a href="#" onClick={()=>handleClick("pagos")}>
            <i className="bi bi-coin"></i> Pagos
          </a>
        </li> */}
      </ul>
    </div>
    </div>
  );
};

export default LinksDashboardSitter;
