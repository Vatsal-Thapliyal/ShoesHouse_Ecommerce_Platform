import {React, useState} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useselector, useDispatch } from 'react-redux';

const Createaccount = () => {
  
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
   
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
      e.preventDefault();
      try{
      if (!username || !email || !password) {
        alert('Please fill in all required fields.');
      }
      else{
          const res = await axios.post("http://localhost:5000/api/shoeshouse/signup",{ username, email, password });
          const userId = res.data._id;
          const products = [];
          const cart_res = await axios.post("http://localhost:5000/api/cart/", { userId, products });
          console.log(cart_res.data);
          navigate(-2);
      }
    }
    catch(err){
      alert('This username already exists. Try something different.');
    }
  };

  const handleUsername = (e) => {
      setUsername(e.target.value);
  }

  const handlePassword = (e) => {
      setPassword(e.target.value);
  }

  const handleEmail = (e) => {
      setEmail(e.target.value);
  }

  return (
    <>
      <section className="login-section h-screen w-screen" style={{ backgroundColor: '#0E67B4' }}>
        

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img className="w-60 mr-2 my-9" src={require('./images/logo.png')} alt="logo" />  

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-600 md:text-2xl">Create an account</h1>

              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-600">Username</label>
                  <input type="text" name="name" id="name" className="border-solid border-2 border-slate-400 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Your Name" required title="Username is mandatory" onChange={handleUsername}/>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-600">Your email</label>
                  <input type="email" name="email" id="email" className="border-solid border-2 border-slate-400 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="For Example: abc@company-mail.com" required title="Email is mandatory" onChange={handleEmail}/>
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-600">Password</label>
                  <input type="password" name="password" id="password" className="border-solid border-2 border-slate-400 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="********" required title="Password is mandatory" onChange={handlePassword}/>
                </div>

                <button type="submit" className="gray-button w-full text-white px-5 py-2.5 text-center" onClick={handleCreateAccount}>Create Account</button>

                <p className="text-sm text-slate-700">
                  Already have an account? <Link to="/sign-in" className="font-medium text-primary-600 hover:underline">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Createaccount;
