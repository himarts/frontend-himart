// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./Checkout.css"; // Ensure this file contains the above CSS
// import { clearCart } from "../app/features/cart/cartSlice";

// const stripePromise = loadStripe(
//   "pk_live_51PnPOcHbJynMJMLNj3I8lMgpV8LsUkvMDtlGxCqs7DghNxeWWnM1biMzHzIalZlCsZWTKruinDjq71JRKvvmCaKt00PUAh6iZ2"
// ); // Replace with your Stripe public key

// const Checkout = () => {
//   const state = useSelector((state) => state?.cart?.cartList);
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [shippingFee, setShippingFee] = useState(0.0); // Set your shipping fee here
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const calculateTotal = async () => {
//       let subtotal = state.reduce(
//         (acc, item) => acc + item.price * item.qty,
//         0
//       );
//       const totalAmount = subtotal + shippingFee;

//       try {
//         const response = await axios.post(
//           "https://himartbackend.onrender.com/create-payment-intent",
//           {
//             amount: totalAmount, // amount in cents
//             currency: "usd",
//           }
//         );

//         console.log("Backend Response:", response.data); // Log entire response for debugging

//         const { clientSecret } = response.data;
//         console.log("Client Secret:", clientSecret); // Log client secret for debugging
//         setClientSecret(clientSecret);
//       } catch (error) {
//         console.error("Error creating payment intent:", error);
//       }
//     };

//     calculateTotal();
//   }, [state, shippingFee]);

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       console.log("Stripe or Elements not loaded");
//       return;
//     }

//     try {
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       // Handle different paymentIntent statuses
//       switch (paymentIntent.status) {
//         case "succeeded":
//           toast.success("Payment successful!");
//           dispatch(clearCart()); // Clear the cart
//           navigate("/"); // Redirect to a success page or similar
//           break;
//         case "pending":
//           toast.info(
//             "Payment is pending. We will notify you once it's completed."
//           );
//           break;
//         case "failed":
//           toast.error("Payment failed! Please try again.");
//           break;
//         default:
//           toast.error("Payment status is unknown. Please contact support.");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Payment failed!");
//     } finally {
//       setLoading(false); // Always set loading to false when payment completes
//     }
//   };

//   const EmptyCart = () => {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12 py-5 bg-light text-center">
//             <h4 className="p-3 display-5">No items in Cart</h4>
//             <Link to="/" className="btn btn-outline-dark mx-4">
//               <i className="fa fa-arrow-left"></i> Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const ShowCheckout = () => {
//     let subtotal = state.reduce((acc, item) => acc + item.price * item.qty, 0);
//     let totalItems = state.reduce((acc, item) => acc + item.qty, 0);
//     let totalAmount = subtotal + shippingFee;

//     return (
//       <>
//         <>
//           <div className="container py-5">
//             <div className="row my-4">
//               <div className="col-md-5 col-lg-4 order-md-last">
//                 <div className="card mb-4">
//                   <div className="card-header py-3 bg-light">
//                     <h5 className="mb-0">Order Summary</h5>
//                   </div>
//                   <div className="card-body">
//                     <ul className="list-group list-group-flush">
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                         Products ({totalItems})
//                         <span>${Math.round(subtotal)}</span>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center px-0">
//                         Shipping
//                         <span>${shippingFee}</span>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                         <div>
//                           <strong>Total amount</strong>
//                         </div>
//                         <span>
//                           <strong>${Math.round(totalAmount)}</strong>
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-7 col-lg-8">
//                 <div className="card mb-4">
//                   <div className="card-body">
//                     <form
//                       className="needs-validation"
//                       noValidate
//                       onSubmit={handlePayment}
//                     >
//                       <h4 className="mb-3">Payment</h4>
//                       <CardElement className="StripeElement" />
//                       <hr className="my-4" />
//                       <button
//                         className="w-100 btn btn-primary"
//                         type="submit"
//                         disabled={loading} // Disable button while loading
//                       >
//                         {loading ? "Processing..." : "Pay Now"}
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       </>
//     );
//   };

//   return (
//     <>
//       <div className="container my-3 py-3">
//         <h1 className="text-center">Checkout</h1>
//         <hr />
//         {state?.length ? <ShowCheckout /> : <EmptyCart />}
//       </div>
//     </>
//   );
// };

// const StripeCheckout = () => (
//   <Elements stripe={stripePromise}>
//     <Checkout />
//   </Elements>
// );

// export default StripeCheckout;
