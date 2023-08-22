import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home';
import Signin from './components/signin';
import EachProduct from './components/eachproduct';
import Createaccount from './components/createaccount';
import Cart from './components/cart';
import Productlist from './components/productlist';
import { useSelector } from 'react-redux';
import SuccessPayment from './components/successPayment';
import PaymentFailure from './components/paymentFailure';

function App() {
  const user = useSelector(state => state.user.currentuser);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<Productlist />} />
        <Route path="/sign-in" element={user ? <Navigate to="/" /> : <Signin />} />
        <Route path="/each-product/:id" element={<EachProduct />} />
        <Route path="/create-account" element={<Createaccount />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/success" element={<SuccessPayment />} />
        <Route path="/failure" element={<PaymentFailure />} />
      </Routes>
    </Router>
  );
}

export default App;
