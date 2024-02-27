import React from "react";
import { Link } from "react-router-dom";
import styles from "./PaymentSucces.module.css";

const PaymentSucces = () => {
  return (
    <div className={styles.paymentSuccesContainer}>
      <div className={styles.paymentSuccesBox}>
        <div className={styles.paymentSuccesText}>
          Tu reserva ha sido enviada y está pendiente de aceptación por parte
          del cuidador.
        </div>
        <Link to="/home" className={styles.button}>
          Volver a Home
        </Link>
        <Link to={`/`} className={styles.button}>
          Ir al Inicio
        </Link>
      </div>
    </div>
  );
};

export default PaymentSucces;
