import React from 'react'
import { Link } from 'react-router-dom'
const PaymentFailure = () => {
  return (
    <>
        <div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
        <div className='flex items-center justify-center'>
        <img className=" w-24  h-24" src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_640.png" alt="" />
        </div>
        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Transaction Failed!</h3>
            <p class="text-gray-600 my-2">If your money is deducted from your account, it will be returned to you within 2-3 buisness days.</p>
            <p> Sorry for inconvenience  </p>
            <div class="py-10 text-center">
                <Link to="/" class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO TO HOME PAGE 
               </Link>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default PaymentFailure