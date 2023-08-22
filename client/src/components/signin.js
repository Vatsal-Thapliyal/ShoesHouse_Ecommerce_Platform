import { React, useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginFailure, loginSuccess, loginStart } from '../redux/userRedux';
import axios from "axios";
import "./style.css";

const Signin = () => {
  
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentuser);

  let userId,accessToken;
  if(user){
    userId = user._id;
    accessToken = user.accessToken;
    console.log(accessToken)
  }
  

  const handleUsername = (e) => {
        setUsername(e.target.value);
  };

  const handlePassword = (e) => {
       setPassword(e.target.value);
  };

  const handleSignin = async (e) =>{
      e.preventDefault();
      try{
         dispatch(loginStart());
         const res = await axios.post("http://localhost:5000/api/shoeshouse/signin",{username,password});
         dispatch(loginSuccess(res.data));
      }
      catch{
         dispatch(loginFailure());
         setError("Your Username/Password is incorrect.");
      }
  };

  useEffect(() => {
    const fetchUserCart = async () => {
      if(user){
          const res = await axios.get(`http://localhost:5000/api/cart/find/${userId}`, {
              headers: {
                token: `Bearer ${accessToken}`}});
                const products = res.data.products;
                
                if(products){
                console.log(products);
                }      
        };
      }
    fetchUserCart();
  },[user]);

  return (
    <>
      <section className="login-section h-screen w-screen" style={{ backgroundColor: '#0E67B4' }}>
        
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img className="w-60 mr-2 my-9" src={require('./images/logo.png')} alt="logo" />  

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-600 md:text-2xl">Sign in to your account</h1>

              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-600">Username</label>
                  <input type="email" name="email" id="email" className="border-solid border-2 border-slate-400 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="For Example : abc@company-mail.com" required="" onChange={handleUsername}/>
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-600">Password</label>
                  <input type="password" name="password" id="password" className="border-solid border-2 border-slate-400 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="********" required="" onChange={handlePassword}/>
                </div>

                <button type="submit" className="gray-button w-full text-white px-5 py-2.5 text-center" onClick={handleSignin}>Sign in</button>
                <p className="text-red-600 text-sm">{error}</p>

                <Link to='/create-account'>
                  <p className="text-sm text-slate-700">
                    Don’t have an account yet? <span className="font-medium text-primary-600 hover:underline">Create account</span>
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
