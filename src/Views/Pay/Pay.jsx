import React, { useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Pay = () => {
  const handleClick = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;

    const response = await axios.post(
      "http://localhost:3000/payment/create-checkout-session"
    );

    const session = response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  useEffect(() => {
    const fetchReceiptUrl = async () => {
      const { search } = window.location;
      const sessionId = new URLSearchParams(search).get("session_id");
      if (sessionId) {
        const response = await axios.get(
          `http://localhost:3000/payment/receipt/${sessionId}`
        );
        const { receiptUrl } = response.data;

        window.location.href = receiptUrl;
      }
    };

    fetchReceiptUrl();
  }, []);

  return (
    <button role="link" onClick={handleClick}>
      Pagar
    </button>
  );
};

export default Pay;
