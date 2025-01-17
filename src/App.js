import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Elements } from "@stripe/react-stripe-js";


const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Rgister.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
// const CheckOut = lazy(() => import("./pages/checkOut.jsx"));
const PaymentPage = lazy(() => import("./pages/paymentPage.jsx"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess.jsx"));
const CheckoutCancelled = lazy(() => import ("./pages/cancelled.jsx") )

function App() {
  return (
      <Suspense fallback={<Loader />}>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/cancel" element={<CheckoutCancelled />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
  );
}

export default App;
