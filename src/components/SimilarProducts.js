import React, { useEffect, useState } from 'react'
import { filterCategory } from '../services/services';
import ProductCard from './ProductCard';


const SimilarProducts = (props) => {
    const {category} = props;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        getSimilarProducts();
        console.log("category", category)
    }, [category]);

    const getSimilarProducts = () => {    
            filterCategory(category)
            .then( (res) => {
                setProducts(res);
                setLoading(false)
            })
    };

  return (
    <div className='flex flex-col gap-5 mx-auto p-8 w-full max-w-[1366px] h-full'>
        <div className='text-gray-700 font-bold text-xl'>Similar Products</div>
        <div className='!gap-4 mx-auto grid grid-cols-1 lg:grid-cols-2 w-full'>
        {loading ?
            Array(2).fill('').map( (item, index) => {
                return (
                    <ProductCard product={item} key={index} loading={loading}/>
                )
            })            
            :
            products ?
                products?.map( (item) => {
                    return (
                        <ProductCard product={item} key={item.id} />
                    )
                })
            :
            <div className='text-center'>Oops! No similar products found</div>
        }
        </div>
    </div>
  )
}

export default SimilarProducts