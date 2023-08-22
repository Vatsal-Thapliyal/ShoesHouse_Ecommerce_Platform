// Assuming this is the correct file containing Productlist
import React from 'react';
import Navbar from './navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from './card';
import axios from 'axios';
import './style.css'

const Productlist = () => {
    const location = useLocation();
    const category = location.pathname.split('/')[2];
    
    const [productCategory, setProductCategory] =  useState(category);
    
    const handleCategories = (e) => {
        const value = e.target.value;
        setProductCategory(value);
    }


    const [products, setproducts] = useState([]);
    
    useEffect(()=>{
        const fetchProducts = async ()=>{
            let url;
            try{
                if(productCategory !== "All")
                    url = `http://localhost:5000/api/product/findall?category=${productCategory}`
                else{
                    url = `http://localhost:5000/api/product/findall`
                }

                const res = await axios.get(url);
                setproducts(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchProducts();
        
    },[productCategory])

    return (
        <>

        <section className='light-blue h-full'>
            <Navbar />

            <div className='flex items-center justify-start pt-20 mx-80 h-full'>
                <div className='flex items-center justify-center'>
                    <label htmlFor="" className='text-gray-700 text-lg m-1'>Categories</label>
                    <select onChange={handleCategories} value={productCategory} className='bg-gray-300'>
                        <option disabled selected></option>
                        <option>All</option>
                        <option>Sports</option>
                        <option>Sneakers</option>
                        <option>Formals</option>
                    </select>
                </div>
            </div>
            <div className='card-container grid-container justify-center items-center mx-72 pt-20 h-full'>
            
            {products.map((currProduct, index) => (
                <Card key={currProduct._id.toString()} item={currProduct} />
            ))}
            
          </div>

        </section>

        </>
    )
}

export default Productlist;
