import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useSelector, useDispatch } from 'react-redux'; 
import { updateProductQuantity, removeProduct } from '../redux/cartRedux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'


const Cart = () => {
   
  const cart = useSelector(state => state.cart);

  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();

  const handleQuantity = (update, productId, productSize) => {

    const product = cart.products.find(product => product._id === productId && product.productSize === productSize);
    if (!product) return;

    const updatedQuantity = update === 'INCR' ? product.quantity + 1 : product.quantity - 1;

    if (updatedQuantity >= 1 && updatedQuantity <= 10) {
        dispatch(updateProductQuantity({ productId, newQuantity: updatedQuantity, productSize }));
    } else if (updatedQuantity > 10) {
        alert("You cannot purchase more than 10.");
    }
};

const handleRemove = (productId, productSize) => {
  dispatch(removeProduct({ productId, productSize }));
};

const onToken = async (token) => {
  setStripeToken(token);
};
useEffect(()=>{
  const makeRequest = async() => {
    try{
          await axios.post('http://localhost:5000/api/checkout/payment',{
          tokenId: stripeToken.id,
          amount: cart.totalPrice * 100,
        });
    }catch(err){
        console.log(err);
    }
  };
  stripeToken && makeRequest();
},[stripeToken, cart.totalPrice])

  return (
    <>
       <Navbar />
        
        {cart.products.length > 0 ? 
       (<section className='flex items-center justify-center pt-20'>
         <div className="container mx-80">
         <div className="flex shadow-md">
         <div className="w-full bg-white">
        
         <div className="flex justify-between border-b">
           <h1 className="font-semibold text-2xl">Your Cart</h1>
         </div>

         <div className="flex my-7">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
         </div>

        {cart.products.map((currProduct, index)=>(
 
        <div key={index}className="flex items-center justify-center hover:bg-blue-200 light-blue shadow-2xl my-3 mx-3">
          
          <div className="flex w-2/5">
            <div className="w-28 border-2 border-solid border-gray-400 m-3">
                <img className="h-24 w-full" src={currProduct.img} alt="" />
            </div>
            <div className="flex flex-col justify-between my-3">
              <h1 className="font-bold text-sm">{currProduct.title}</h1>
              <h3 className="font-semibold text-green-700 text-xs my-1">Size: {currProduct.productSize}</h3>
              <h3 className="font-semibold hover:text-red-700 hover:cursor-pointer text-gray-700 text-xs my-1" onClick={() => handleRemove(currProduct._id, currProduct.productSize)}>Remove</h3>
            </div> 
          </div>

          <div className="flex justify-center w-1/5">
            <span className='font-extrabold hover:text-red-700 hover:cursor-pointer' onClick={() => handleQuantity('DECR', currProduct._id, currProduct.productSize)}>-</span>
            <span className='mx-6'>{currProduct.quantity}</span>
            <span className='font-extrabold qty-update hover:text-green-800 hover:cursor-pointer' onClick={() => handleQuantity('INCR', currProduct._id, currProduct.productSize)}>+</span>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm text-gray-600">Rs. {currProduct.price}</span>
          <span className="text-center w-1/5 font-semibold text-sm text-gray-600">Rs.{currProduct.price * currProduct.quantity}</span>
        </div>
          
          ))}

        <div className="border-t my-8 mx-4">
          <div className="flex font-semibold justify-between text-sm">
            <span className='text-gray-700 text-lg'>Total cost</span>
            <span className='text-gray-700 text-lg'>            
              Rs. {cart.products.reduce((total, product) => total + product.price * product.quantity, 0)}
           </span>
          </div>
          
          <StripeCheckout
          amount={cart.totalPrice * 100}
          billingAddress
          shippingAddress
          token={onToken}
          stripeKey= "pk_test_51NgAgISI2kokvQn5ndeUQyHCwCz7YVq7MKJOgbNV60UbApnMXbBJTQ3iG8JPUNlsU14xjNH4cIlFSNAcIP9gbNUg00eboo5oNE">
          <button className="gray-button font-semibold py-3 my-1 text-sm text-white uppercase w-full">Proceed to Buy</button>
          </StripeCheckout>
        </div>
      </div>

    </div>
  </div>
</section>)
: (<div className='pt-56 justify-center items-center flex font-bold text-lg border border-gray-300 border-solid bg-pink-100 mx-20 rounded'><h6 className='text-gray-500 empty-cart'>Cart is empty</h6></div>)
  }
    </>
  )
}

export default Cart