import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../app/features/cart/cartSlice";
import { useLocation } from "react-router-dom";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Clear the cart after successful payment
    dispatch(clearCart());

    // Retrieve order details from location state
    if (location.state && location.state.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    }
  }, [dispatch, location.state]);

  if (!orderDetails) {
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
        <h2 style={{ marginBottom: "0.5rem", color: "#029e02" }}>
          Checkout Successful
        </h2>
        <p>Loading your order details...</p>
      </div>
    );
  }

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
      <h2 style={{ marginBottom: "0.5rem", color: "#029e02" }}>
        Checkout Successful
      </h2>
      <p>Your order was processed successfully. Below are your order details:</p>
      <div style={{ width: "100%", maxWidth: "600px", marginTop: "1rem" }}>
        <h3>Purchased Items</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {orderDetails.items.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span>{item.name}</span>
              <span>
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <h4 style={{ textAlign: "right", marginTop: "1rem" }}>
          Total: ${orderDetails.total.toFixed(2)}
        </h4>
      </div>
      <p>
        For any inquiries, contact support at{" "}
        <strong>support@hi-mart.com</strong>.
      </p>
    </div>
  );
};

export default CheckoutSuccess;
