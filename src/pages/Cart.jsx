import { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty, deleteProduct } from "../app/features/cart/cartSlice";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { clearCart } from "../app/features/cart/cartSlice";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [guestDetails, setGuestDetails] = useState({ name: "", email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shippingFee = 20;
  const taxRate = 0.02;

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * (item.price || 0),
    0
  );

  const totalTax = totalPrice * taxRate;
  const finalTotal = totalPrice + shippingFee + totalTax;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createOrder = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/create-payment", {
        items: cartList?.map((item) => ({
          name: item.productName || "Unknown Item",
          price: (parseFloat(item?.price) || 0).toFixed(2),
          quantity: parseInt(item?.qty, 10) || 0,
        })),
      });
      window.location.href = response.data.approvalUrl;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      alert("Could not create PayPal order.");
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/execute-payment", {
        orderId: data.orderID,
      });

      if (response.data.success) {
        const orderDetails = {
          items: response.data.order.purchaseUnits[0].items.map((item) => ({
            name: item.name,
            price: parseFloat(item.unit_amount.value),
            quantity: parseInt(item.quantity, 10),
          })),
          total: parseFloat(response.data.order.purchaseUnits[0].amount.value),
        };

        dispatch(clearCart());
        navigate("/success", { state: { orderDetails } });
        alert("Payment completed successfully!");
      } else {
        alert("Payment was approved but not captured.");
      }
    } catch (error) {
      console.error("Error executing payment:", error);
      alert("Payment failed.");
    }
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 ? (
              <h1 className="no-items product">No Items are added to the Cart</h1>
            ) : (
              cartList.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div className="cart-list" key={item.id}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img src={item.imgUrl} alt={item.productName || "Product"} />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className="cart-content justify-content-center">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{item.productName || "Unnamed Product"}</h3>
                            <h4>
  ${item?.price ? item.price.toFixed(2) : "0.00"} x {item.qty}
  <span>${productQty ? productQty.toFixed(2) : "0.00"}</span>
</h4>
                          </Col>
                          <Col xs={12} sm={3} className="cartControl">
                            <button
                              className="incCart"
                              onClick={() =>
                                dispatch(addToCart({ product: item, num: 1 }))
                              }
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button
                              className="desCart"
                              onClick={() => dispatch(decreaseQty(item))}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                      <button
                        className="delete"
                        onClick={() => dispatch(deleteProduct(item))}
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </Row>
                  </div>
                );
              })
            )}
          </Col>
          <Col md={4}>
            <div className="cart-total card mb-4" style={{ height: "320px" }}>
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Cart Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
  Total Price: <span>${(totalPrice || 0).toFixed(2)}</span>
</li>
<li className="list-group-item d-flex justify-content-between align-items-center px-0">
  Shipping Fee: <span>${(shippingFee || 0).toFixed(2)}</span>
</li>
<li className="list-group-item d-flex justify-content-between align-items-center px-0">
  Tax: <span>${(totalTax || 0).toFixed(2)}</span>
</li>
<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
  <div>
    <strong>Final Total</strong>
  </div>
  <span>
    <strong>${(finalTotal || 0).toFixed(2)}</strong>
  </span>
</li>

                </ul>
                <PayPalScriptProvider options={{ "client-id": "AXXmcVftiBTqRaasKPGPlDT4HR1uAXIgIJSULutka2rqn64hVl7TyKGlbwujXixRZpxUKGVmlae98oGH" }}>
                  <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                </PayPalScriptProvider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login or Checkout as Guest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="success" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Form className="mt-3">
            <Form.Group controlId="guestName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={guestDetails.name}
                onChange={(e) =>
                  setGuestDetails({ ...guestDetails, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Cart;
