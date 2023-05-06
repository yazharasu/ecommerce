import React, { useEffect, useState } from 'react'
import { filterCategory } from '../services/services';
import ProductCard from './ProductCard';


const SimilarProducts = (props) => {
    const {category} = props;
    const [products, setProducts] = useState([]);

    useEffect( () => {
        getSimilarProducts();
    }, [category]);

    const getSimilarProducts = () => {    
            filterCategory(category)
            .then( (res) => {
                console.log("res----->", res)
                setProducts( res )
            })
    };

  return (
    <div className='flex flex-col gap-5 mx-auto p-8 w-full max-w-[1366px] h-full'>
        <div className='text-gray-700 font-bold text-xl'>Similar Products</div>
        { products.length ?
            <div className='!gap-4 mx-auto grid grid-cols-1 lg:grid-cols-2'>
                {products.map( (item) => {
                    return (
                        <ProductCard product={item} key={item.id}/>
                    )
                }) }
            </div>
            :
            <div className='text-center'>Oops! No similar products found</div>
        }
    </div>
  )
}

export default SimilarProducts