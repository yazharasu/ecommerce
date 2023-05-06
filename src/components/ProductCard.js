import React from 'react'
import { BiRupee } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { showToast } from '../store/toastSlice';

const ProductCard = (props) => {
    const {product, type, loading} = props;
    const dispatch = useDispatch();

    const handleCart = () => {
        if(type==='cart') {
            dispatch(remove(product)); 
            dispatch(showToast('Item has been removed from the cart'))
        } else if (product?.addedToCart) {
            dispatch(remove(product)); 
            dispatch(showToast('Item removed from the cart')) 
        } else if (!product?.addedToCart) {
            dispatch(add(product)); 
            dispatch(showToast('Item added to the cart')) 
        }
    }

  return (
    <>
    {loading ? 
        <div className={`rounded-lg flex flex-col md:flex-row items-center min-w-[300px] animate-pulse ${type=="cart" ? "w-full gap-6" :"max-w-[632px] drop-shadow-lg hover:scale-[1.01] border-2 border-solid gap-4"} h-fit md:h-56 p-4 `}>
            <div className='h-full min-w-[192px] max-w-[192px] flex justify-center bg-gray-200 dark:bg-gray-300'>
            </div>
            <div className='flex flex-col justify-between gap-4 w-[calc(100%-176px)] p-2 h-full'>
                <div className="h-5 bg-gray-200 dark:bg-gray-300 md:w-full mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-300 md:w-full mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-300 md:w-full mb-4"></div>
            </div>
        </div>
    :
        <div className={`rounded-lg bg-white flex flex-col md:flex-row items-center md:items-start min-w-[300px] ${type=="cart" ? "w-full gap-6" :"max-w-[632px] drop-shadow-lg hover:scale-[1.01] border-2 border-solid gap-4"} h-fit md:h-56 p-4 `}>
            <div className='h-full min-w-[192px] max-w-[192px] flex justify-center'>
                <Link to={`/product/${product?.id}`}>
                <img className='h-full w-full border-none' src={product?.image} />
                </Link>
            </div>
            <div className='flex flex-col justify-between w-full md:w-[calc(100%-192px)] h-full'>
                <Link to={`/product/${product?.id}`} className='flex flex-col gap-4'>
                <div className='font-medium text-base line-clamp-2 text-ellipsis'>{product?.title}</div>
                <div className='flex flex-row justify-start gap-4'>
                    <div className='h-6 px-2 py-[6px] font-medium text-base text-gray-700 flex flex-row items-center gap-2 rounded-sm bg-green-700'>
                        <AiFillStar className='text-white h-3 w-3 m-auto' /> 
                        <span className='text-white text-xs align-middle'>{product?.rating?.rate}</span>
                    </div>
                    <div className='font-medium text-sm text-gray-700 flex flex-row items-center gap-2'>
                        {product?.rating?.count} Ratings
                    </div>
                </div>

                <div className='font-medium text-xl text-gray-700 flex flex-row items-center gap-1'>
                    <BiRupee className='w-5 h-5' /> 
                    <span className='text-center'>{product?.price}</span>
                </div>
                </Link>
                {
                    type=="cart" ? 
                    <div onClick={handleCart} 
                        className='w-full flex flex-row justify-start items-center mt-5 md:mt-0 gap-2 cursor-pointer'>
                        <BsFillCartFill className='w-3 h-3 text-blue-900' /> 
                        <span className='font-white text-sm text-blue-900'>Remove Item</span>
                    </div>
                :
                    <div onClick={handleCart} 
                        className='w-full flex flex-row justify-start items-center mt-5 md:mt-0 gap-2 cursor-pointer'>
                        <BsFillCartFill className={`w-3 h-3 ${product?.addedToCart ? "text-green-900" : "text-blue-900"}`} /> 
                        <span className={`font-white text-sm ${product?.addedToCart ? "text-green-900 font-medium" : "text-blue-900"}`}>{product.addedToCart ? "Remove from Cart" : "Add to Cart"}</span>
                    </div>
                }
            </div>
        </div>
    }
    </>
  )
}

export default ProductCard