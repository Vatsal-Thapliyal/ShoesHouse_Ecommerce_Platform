import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { loginSuccess } from '../redux/userRedux';

const Navbar = () => {
   const totalProducts = useSelector(state => state.cart.totalProducts);
   const Cart = useSelector(state=> state.cart);
   const dispatch = useDispatch();
   const user = useSelector(state=>state.user.currentuser);
  
   if(user){
    var userId = user._id;
    var name = user.username;
   }

  const handleSignOut = () => {
    // eslint-disable-next-line no-restricted-globals
    var signoutFlag = confirm(`Are You sure You want to SignOut, ${name}?`);
    if (signoutFlag) {
      dispatch(loginSuccess(null));
    }
  };
  
   return (
    <>

      <div className='nav-item-container py-2.5 fixed'>
        <nav className='navbar flex z-10 justify-center items-center flex-cols'>
          <div className='h-7 w-40 mx-7'>
            <Link to="/"><img src={require('./images/logo.png')} className=' h-full hover:cursor-pointer w-48 hover:border border-solid' alt="" /></Link>
          </div>
          <div className='flex items-center justify-center m-2'>
            <div><input type="text" className='px-1 text-sm py-1 w-56' placeholder='Search for products' /></div>
            <div className='justify-center flex items-center mx-1'><button className="gray-button text-white py-2 px-2 h-7"><img className='h-4' src={require('./images/search_logo.png')} alt="Search" /></button></div>
          </div>

          {user? 
          <div className='flex'>
          <p className='text-white mt-2'>Hi, {name}</p>
          <div className='justify-center flex items-center m-2'><Link to="/"><button className="gray-button text-white py-0 px-2 h-7 text-sm" onClick={handleSignOut}>Sign Out</button></Link></div>
          </div>
          : <div className='justify-center flex items-center m-2'><Link to="/sign-in"><button className="gray-button text-white py-0 px-2 h-7 text-sm">Sign In</button></Link></div>
        } 
            
          <div className='justify-center flex items-center m-2'><Link to={`/cart/${userId}`}><button className="flex justify-center items-center gray-button text-white py-0 px-2 h-7"><img className='h-5' src={require('./images/cart_logo.png')} alt="Search" />&nbsp;<span className='text-sm'>({totalProducts})</span></button></Link></div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
