import axios from "axios";
// import { useSelector } from "react-redux";
import React, { useState } from "react";

const PaypalButton = ({ cartItems }) => {
  const [loading, setLoading] = useState(false);
//   const user = useSelector((state) => state?.auth);

  const handleCheckout = () => {
    setLoading(true); // Set loading to true when the button is clicked

    axios
      .post(`https://himartbackend.onrender.com/create-checkout-session`, {
        cartItems,
        userId: "2345678tredgh345678743",
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false); // Set loading back to false when the request completes
      });
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "#4CAF50" /* Green */,
          border: "none",
          color: "white",
          padding: "12px 28px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          margin: "4px 2px",
          cursor: "pointer",
          borderRadius: "12px",
          transition: "background-color 0.3s ease",
        }}
        onClick={handleCheckout}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        disabled={loading} // Disable the button when loading
      >
        {loading ? "Processing..." : "Checkout"}{" "}
        {/* Change button text when loading */}
      </button>
    </div>
  );
};

export default PaypalButton;
