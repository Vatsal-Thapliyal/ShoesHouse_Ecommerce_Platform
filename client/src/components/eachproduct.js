import { useEffect, React, useState } from 'react'
import './style.css'
import Navbar from './navbar'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/cartRedux';

const Eachproduct = () => {

    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const [product, setProduct] = useState({size:[]});
    const dispatch = useDispatch();
    const [productSize, setProductSize] = useState('');
    
    const cartProducts = useSelector(state => state.cart.products);

    useEffect(()=>{
        const fetchEachProduct = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/product/find/${productId}`);
                setProduct(res.data);
            }
            catch(err){
                console.log(err);
            }
        }

        fetchEachProduct()
    },[productId])

   const price = product.price;
   const quantity=1;
   const productList = {...product,productSize,quantity};
   const handleAddToCart = () => {
    if (productSize !== '') {
        const existingProduct = cartProducts.find(product => product._id === productId && product.productSize === productSize);

        if (!existingProduct) {
            const totalProducts = 1;
            dispatch(addProduct({ productList, totalProducts, price }));
        } else if (existingProduct.productSize === productSize) {
            alert("You already have this product in your cart. Please choose new product or change the size of this product.");
        }
    } else {
        alert("Please select a size.");
    }
};


   const handleSize = (e) =>{
        setProductSize(e.target.value);
   };

  return (
    <> 
    <Navbar/>
    <section className='flex justify-center items-center h-screen each-product-section pt-20 bg-pink-100 grid-container mx-32'>
        <div className='grid grid-cols-2 gap-7 mx-96 grid-container'>
            <div className='grid grid-cols-1'>
                <div className='grid-container'>
                    <img className='shadow-2xl product-image h-full width-full border-2  border-solid border-gray-200' src={product.img} alt="" />
                </div>
            </div>

            <div className='grid-rows-3 justify-center light-blue shadow-2xl items-start'>
                <div className='grid grid-row-3 m-7'>
                
                <div className='mx-7 text-slate-600 text-lg font-bold'><h1>{product.title}</h1></div>
                <div className='mx-7 text-sm text-slate-600 font-bold'><h1>Rs. {product.price}</h1></div>
                <div className='mx-7 my-4 text-slate-600'>
                    <p>{product.desc}</p>
                </div>   
                </div>
                
                <div className='shoe-size flex justify-center'>
                <div className=' size-select  flex items-center justify-start w-20 shadow-2xl mx-3'>

                       <label htmlFor="" className='m-1 text-white font-thin'>Size</label>
                       <select className='hover:cursor-pointer' onChange={handleSize} value={productSize}>
                                    <option selected disabled></option>
                                    {product.size.map((currSize, index) => (
                                        <option key={index} value={currSize}>{currSize}</option>
                                    ))};
                       </select>
                </div>

                 <div><Popup trigger={<h1 className='text-gray-700 text-sm hover:underline hover:cursor-pointer mx-3'>Size Chart</h1>} position={'center center'} contentStyle={{ maxWidth:'100%',width: '150px', height: 'auto',border:'1px solid black', margin:'10px' }}>
                            <img src={require("./images/size-chart.png")} style={{ width: '100%', height: '100%' }} alt="" />
                      </Popup>
                </div>
                </div>
                      
                <div className='flex justify-center'>
                    <button className='gray-button text-white px-5 py-2.5 text-center m-4 w-60 shadow-2xl' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default Eachproduct