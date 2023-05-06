import React, { useEffect, useState } from 'react';
import { getAllProducts, getAllCategories, filterCategory } from '../services/services';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import banner from '../Assets/banner.svg';

const Home = () => {
    const cart = useSelector(state => state.cart.value);
    const [products, setProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [category, setCategory] = useState('All Categories');
    const [open, setOpen] = useState(false); 
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        if(category==='All Categories') {
            getProducts();
        }
    }, [cart]);

    useEffect( () => {
        getCategories();
    },[]);

    const getProducts = () => {
        getAllProducts()
            .then( (res) => {
                res?.forEach( (item) => {
                    if(cart?.some( obj => obj.id === item.id)){
                        item.addedToCart = true;
                    } else {
                        item.addedToCart = false;
                    }
                })
                setProducts(res);
                setLoading(false);
            })
    };

    const getCategories = () => {
        getAllCategories()
            .then( (res) => {
                setAllCategories( res )
                console.log(res)
            })
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleFilter = (e) => {
        setLoading(true)
        setCategory(e.target.textContent);
        setOpen(!open);
        filterCategory(e.target.textContent)
            .then( (res) => {
                setProducts(res)
                setLoading(false)
        })
    };

  return (
    <>
    <div className='flex flex-col h-full gap-6 justify-center mx-auto my-6 w-full max-w-[1280px]'>
        <div className='relative px-2 md:px-0 w-full h-60 max-w-full'>
            <img src={banner} alt='' className='object-cover w-full h-full rounded-md'/>
            <div className='absolute bottom-8 right-10 font-bold text-yellow-900 text-[20px] md:text-[28px]'>Welcome to GamaKart...!</div>
        </div>
        <div className='w-full flex relative justify-end'>
            <div className='flex flex-row items-center gap-4'>
                <span className='text-blue-600 text-sm cursor-pointer' onClick={ () => {getProducts(); setCategory('All Categories')}}>Reset Filter</span>
                <button onClick={handleOpen} className='w-44 h-10 rounded-lg border-2 border-solid border-gray-400 capitalize'>
                    {category}
                </button>
            </div>
            {open ? (
                <ul className="p-2 w-44 mt-1 absolute right-0 top-10 z-10 bg-white rounded-md drop-shadow border-2 border-solid border-gray-400">
                    {allCategories?.map( (cat) => {
                        return (
                            <li className="text-gray-800 p-2 rounded-md hover:bg-slate-300" key={cat} onClick={handleFilter}>
                                <button className={`capitalize ${ cat===category && "text-blue-700 font-bold" }`}>{cat}</button>
                            </li>
                        )
                    })}
                </ul>
            ) : null}
        </div>

        <div className='!gap-4 mx-auto grid grid-cols-1 lg:grid-cols-2 w-full'>
        {loading ?
            Array(6).fill('').map( (item, index) => {
                return (
                    <ProductCard product={item} key={index} loading={loading}/>
                )
            })            :
            products?.map( (item) => {
                return (
                    <ProductCard product={item} key={item.id} />
                )
            })
        }
        </div>
    </div>
    </>
  )
}

export default Home