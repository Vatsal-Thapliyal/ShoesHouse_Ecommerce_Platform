import React, { useEffect, useReducer, useState } from 'react';
import './style.css';
import Navbar from './navbar';
import { sliderItems } from './slideritems';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from './card';


const reducer = (state, action) => {
    if (action.type === "PREV_SLIDE") {
        return state === 0 ? sliderItems.length - 1 : state - 1;
    } else if (action.type === "NEXT_SLIDE") {
        return state === sliderItems.length - 1 ? 0 : state + 1;
    } else return state;
};

const Home = () => {
    const initialState = 0;
    const [indexAsState, dispatch] = useReducer(reducer, initialState);
    const [products,setProducts] = useState([]);


    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: 'NEXT_SLIDE' });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(()=>{
        const fetchProducts = async ()=>{
                try{
                    const res = await axios.get(`http://localhost:5000/api/product/findall`);
                    setProducts(res.data);
                }
                catch(err){
                    console.log(err);
                }
        }
        fetchProducts(); 
    },[]);

    return (
        <>
            <Navbar />
            <section className='grid grid-rows-1 justify-center items-center light-blue pt-20'>
                <div className='mx-50'>
                    <div className='grid-container mx-5'>
                        <img className='slider-image shadow-2xl' src={sliderItems[indexAsState].img} alt='' />
                    </div>
                    <div className='flex justify-center items-center'>
                        <img
                            className='h-5 m-2 hover:cursor-pointer'
                            src={require('./images/left-arrow.png')}
                            alt='backwards'
                            onClick={() => dispatch({ type: 'PREV_SLIDE' })}
                        />

                        <img
                            className='h-5 m-2 hover:cursor-pointer'
                            src={require('./images/right-arrow.png')}
                            alt='forwards'
                            onClick={() => dispatch({ type: 'NEXT_SLIDE' })}
                        />
                    </div>
                    <p className='text-2xl font-bold flex items-center justify-center text-blue-800 m-10'>Explore Categories!!</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 justify-center items-center'>
                    <div className='m-5 grid-container'>
                        <Link to="/products/Sneakers"><img className="" src={require('./images/sneakers.png')} alt="" /></Link>
                    </div>

                    <div className='m-5 grid-container'>
                        <Link to="/products/Sports"><img className="" src={require('./images/sports.png')} alt="" /></Link>
                    </div>

                    <div className='m-5 grid-container'>
                        <Link to="/products/Formals"><img className="" src={require('./images/formals.png')} alt="" /></Link>
                    </div>
                </div>
                
                <p className='text-2xl font-bold flex items-center justify-center text-blue-800 mt-10'>Checkout our products.</p>
                <p className='text-2xl font-bold flex items-center justify-center text-blue-800 mb-10'>Happy Shopping!!</p>

                <div className='card-container grid-container justify-center items-center pt-2'>
                {products.map((currProduct, index) => (
                    <Card key={currProduct._id.toString()} item={currProduct} />
                ))};
                </div>

            </section>
        </>
    );
};

export default Home;
