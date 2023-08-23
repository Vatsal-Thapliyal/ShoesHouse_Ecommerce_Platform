import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
  const id = item._id.toString();
  return (
    <>
         <Link to={`/each-product/${id}`}><div className="each-card overflow-hidden bg-white hover:bg-slate-300 hover:cursor-pointer w-60 my-4 mx-10 shadow-xl grid  grid-container h-80" >
           <div className='flex justify-center'>
          <img className="w-60 h-60" src={item.img} alt="Shoe"></img>
          </div>
        <div className='mx-5 my-1'>
          <div className="text-l text-slate-700 font-semibold">{item.title}</div>
          <div className='text-slate-500'>Rs. {item.price}</div> 
        </div>
    </div>
    </Link>
    </>
  )
}

export default Card