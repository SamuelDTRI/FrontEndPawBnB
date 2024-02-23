import axios from "axios";
import React from "react";

const PaymentCheckout = () => {
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/payment/create-checkout-session"
      );
      const url = response.data.url;
      window.location.href = url;
    } catch (error) {
      console.error("Error al realizar el pago: ", error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default PaymentCheckout;
