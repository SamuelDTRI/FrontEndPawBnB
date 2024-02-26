import React from "react";
import styles from "./PaymentCancel.module.css";

const PaymentCancel = () => {
  return (
    <div className={styles.paymentCancelContainer}>
      <div className={styles.paymentCancelText}>Payment Cancelled</div>
    </div>
  );
};

export default PaymentCancel;
