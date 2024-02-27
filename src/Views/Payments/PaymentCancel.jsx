import React from "react";
import { Link } from "react-router-dom";
import styles from "./PaymentCancel.module.css";

const PaymentCancel = () => {
  return (
    <div className={styles.paymentCancelContainer}>
      <div className={styles.paymentCancelBox}>
        <div className={styles.paymentCancelText}>
          <h2>Lo sentimos</h2>
          <p>
            Tu reserva ha sido cancelada debido a la ausencia de pago o
            incumplimiento de las normas.
          </p>
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

export default PaymentCancel;
