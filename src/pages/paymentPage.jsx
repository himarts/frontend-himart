import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutForm from './checkOut'; // Adjust the path accordingly
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
  const cart = useSelector((state) => state?.cart);
  const { cartList } = cart;

  return (
    <div className="container py-5">
      <h1 className="text-center">Payment Page</h1>
      <div className="my-4">
        <CheckoutForm cartList={cartList} />
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
