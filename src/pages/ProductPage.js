import React, {useEffect, useState} from 'react'
import { getSingleProduct } from '../services/services';
import { useParams } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import SimilarProducts from '../components/SimilarProducts';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from '../store/cartSlice';
import { showToast } from '../store/toastSlice';


const ProductPage = () => {
    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    let {id} = useParams();

    useEffect( () => {
        setLoading(true);
        getProduct();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [id]);

    useEffect( () => {
        if(cart?.some( obj => obj.id === productData.id)){
            setProductData( {...productData, addedToCart:true })
        } else {
            setProductData( {...productData, addedToCart:false })
        }
    }, [cart]);

    const getProduct = () => {
        getSingleProduct(id)
            .then( (res) => {
                    if(cart?.some( obj => obj.id === res.id)){
                        res.addedToCart = true;
                    } else {
                        res.addedToCart = false;
                    }
                setProductData(res);
                setLoading(false);
            })
    }

    const handleCart = (e) => {
        e.preventDefault();
        if(productData.addedToCart === false) {
            dispatch(add(productData)); 
            dispatch(showToast('Item added to the cart')) 
        } else if(productData.addedToCart === true) {
            dispatch(remove(productData)); 
            dispatch(showToast('Item removed from the cart')) 
        }
    }
    
    return (
        <>
        <div className='flex flex-col bg-white drop-shadow mx-auto rounded-md xl:flex-row p-8 w-full max-w-[1366px] h-full gap-8'>
            <div className='flex flex-col justify-center items-center gap-y-6'>
                <div className='h-96 w-96'>
                    {loading ?
                        <div className='animate-pulse h-96 w-96'>
                             <div className='w-full h-full bg-gray-100 dark:bg-gray-200'></div> 
                        </div>
                        :
                        <img src={productData.image} className='w-full h-full'/> 
                    }
                </div>
                <div className='flex gap-5'>
                    <div className='w-40 h-10 p-2 rounded-md bg-blue-700 hover:bg-blue-600 cursor-pointer flex flex-row items-center justify-center gap-2'>
                        <BsFillCartFill className='w-4 h-4 text-white' /> 
                        <span onClick={handleCart} className='font-white text-lg text-white'>{productData.addedToCart ? "Remove from Cart" : "Add to Cart"}</span>
                    </div>
                    <Link to="/">
                        <div className='w-36 h-10 p-2 rounded-md bg-orange-600 hover:bg-orange-500 cursor-pointer flex flex-row items-center justify-center gap-2'>
                            <span className='font-white text-lg text-white'>Shop More</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='flex flex-col justify-start items-start gap-2 w-full xl:w-[calc(100%-160px)]'>
                <div className='font-medium text-[20px]'>
                    {productData.title}
                </div>
                <div className='flex flex-row justify-start gap-4'>
                    <div className='h-6 px-2 py-[6px] font-medium text-base text-gray-700 flex flex-row items-center gap-2 rounded-sm bg-green-700'>
                        <AiFillStar className='text-white h-3 w-3 m-auto' /> 
                        <span className='text-white text-xs align-middle'>{productData?.rating?.rate}</span>
                    </div>
                    <div className='font-medium text-sm text-gray-700 flex flex-row items-center gap-2'>
                        {productData?.rating?.count} Ratings
                    </div>
                </div>

                <div className='font-medium text-xl text-gray-700 flex flex-row items-center gap-1'>
                    <BiRupee className='w-5 h-5' /> 
                    <span className='text-center'>{productData?.price}</span>
                </div>

                <div className='flex flex-col items-start gap-2 mt-4'>
                    <div className='font-medium text-base text-gray-700'>Produect Description</div>
                    <div className='font-normal text-base text-gray-700'>{productData?.description}</div>
                </div>

                <div className='font-medium text-base text-gray-700 mt-8'>
                    Category: <span className='font-normal capitalize'>{productData?.category}</span>
                </div>
            </div>
        </div>
        <SimilarProducts category={productData?.category} itemId={productData?.id} />
        </>
    )
}

export default ProductPage