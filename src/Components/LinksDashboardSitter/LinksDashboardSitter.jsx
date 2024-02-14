import { useState } from "react";
import styles from "./LinksDashboardSitter.module.css";
import Gallery from "../Gallery/Gallery";
import { useDispatch } from "react-redux";
import { infoLink } from "../../redux/dashboardsitter";

const LinksDashboardSitter = () => {
  const dispatch = useDispatch();

  const handleClick = (informacion) => {
    dispatch(infoLink(informacion));
  };

  return (
    <div>
      <div className={styles.sideBarLinks}>
        <ul>
          <li>
            <a href="#" onClick={() => handleClick("miInfo")}>
              <i className="bi bi-person-vcard"></i> Mi informacion
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleClick("miGaleria")}>
              <i className="bi bi-images"></i> Mi galeria
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleClick("misReservas")}>
              <i className="bi bi-calendar4-week"></i> Mis reservas
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleClick("pagos")}>
              <i className="bi bi-coin"></i> Pagos
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LinksDashboardSitter;
