import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { BsFillCartFill } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import noData from '../Assets/noData.svg';
import { showToast } from '../store/toastSlice';
import { clear } from '../store/cartSlice';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [placeOrder, setPlaceOrder] = useState(false);
  const cart = useSelector(state => state.cart.value);
  const dispatch = useDispatch();

  useEffect( () => {
    setCartItems(cart);
    calcPrice();
  }, [cart]);

  const calcPrice = () => {
    let total = 0
    cartItems.forEach( (i) => {
      if(i && i.price) {
        total += i.price;
      }
    })
    setTotalPrice(total);
    setLoading(false);
  }

  const handleOrder = () => {
    setPlaceOrder(true);
    dispatch(clear());
    dispatch(showToast('Order has been successfullly placed!')) 
  }

  return (
    <div className='grid grid-cols-3 gap-4 mx-auto my-8 w-full max-w-[1366px] min-h-screen'>
      <div className={`${cartItems.length>0 ? "col-span-3 md:col-span-2" : "col-span-3"} gap-5 rounded-md drop-shadow-lg bg-white p-5 w-full`}>
        <div className='text-gray-700 font-bold my-2 text-xl gap-5'>Cart</div>
        <div className='w-full h-[1px] bg-gray-300 mb-5'></div>
        { 
          loading ?
            Array(3).fill('').map( (item, index) => {
                return (
                    <ProductCard product={item} key={index} loading={loading}/>
                )
            })            
            :
            cartItems?.length ?
              ( cartItems.map( (item) => {
                return(
                  <>
                  <ProductCard product={item} type="cart" key={item.id}/>
                  <div className='w-full h-[1px] bg-gray-200 my-4'></div>
                  </>
                )
              })) 
              : placeOrder ?
                <div className='flex flex-col items-center text-green-700 justify-center text-center text-bold text-[28px] mt-20'>
                  Success! Your order has been placed.
                  <img src={noData} alt='' className='w-60 h-60' />
                  <Link to='/'>
                    <div className='text-bold text-[20px] mt-5 text-blue-700' >Click here to shop more</div>
                  </Link>
                </div>
              :
              <div className='flex flex-col items-center justify-center text-center text-bold text-[22px] mt-20'>
                Oops! Your cart is empty.
                <img src={noData} alt='' className='w-60 h-60' />
              </div>
        }
      </div>

      <div className={`${cartItems?.length>0 ? "col-span-3 md:col-span-1" : "hidden"}  bg-white rounded-md drop-shadow-lg p-5 w-full`}>
        <div className='text-gray-700 font-bold my-2 text-xl gap-5'>PRICE DETAILS</div>
        <div className='w-full h-[1px] bg-gray-300 mb-5'></div>
        
        <div className='flex flex-row justify-between items-center text-gray-700 font-normal my-2 text-xl'>
          <div className=''>Price ({cartItems?.length} item)</div>
          <span className='flex items-center gap-2'><BiRupee className='w-5 h-5' />{totalPrice}</span>
        </div>
        <div className='flex flex-row justify-between items-center text-gray-700 font-normal my-2 text-xl'>
          <div className=''>Delivery Charges</div>
          <span className='flex items-center gap-2'><BiRupee className='w-5 h-5' />50</span>
        </div>
        <div className='w-full h-[1px] bg-gray-300 my-5'></div>
        <div className='flex flex-row justify-between items-center text-gray-700 font-bold my-2 text-xl'>
          <div className=''>Total Amount</div>
          <span className='flex items-center gap-2'><BiRupee className='w-5 h-5' />{totalPrice+50}</span>
        </div>
        <div onClick={handleOrder} className='w-36 h-10 p-2 mt-10 mx-auto rounded-md bg-blue-700 hover:bg-blue-600 cursor-pointer flex flex-row items-center justify-center gap-2'>
            <BsFillCartFill className='w-4 h-4 text-white' /> 
            <span className='font-white text-lg text-white'>Place Order</span>
        </div>
      </div>
    </div>
  )
}

export default Cart