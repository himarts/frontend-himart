import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../app/features/cart/cartSlice";

const CheckoutCancelled = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Optionally clear the cart if the payment process was interrupted
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "80vh",
        maxWidth: "800px",
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem", color: "#e02b2b" }}>
        Payment Cancelled
      </h2>
      <p>Your payment process was interrupted or canceled.</p>
      <p>Please try again to complete your order.</p>
      <p>
        If you need help, contact our support team at{" "}
        <strong>support@hi-mart.com</strong>.
      </p>
      <button
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => window.location.href = "/cart"}
      >
        Return to Cart
      </button>
    </div>
  );
};

export default CheckoutCancelled;
