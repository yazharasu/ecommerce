import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import Toast from './Toast';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const cart = useSelector(state => state.cart.value)

    let handleChange = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }
    
    return(
        <div className="sticky top-0 z-10">
        <Toast />
        <div className='flex flex-row sticky top-0 z-10 items-center justify-between w-full h-14 py-2 px-4 md:px-8 bg-blue-900'>
            <Link to="/">
                <div className='font-bold text-lg text-white'>
                    GamaKart
                </div>
            </Link>

            <div className='flex flex-row items-center justify-end gap-6'>
                <div className='flex flex-row items-center bg-white rounded-[2px] justify-center gap-5'>
                    <form onSubmit={ (e) => { 
                        e.preventDefault();
                    }}
                    >
                        <input
                            className="w-24 sm:w-32 md:w-80 h-8 px-4 rounded-[2px] text-black focus:outline-none border-none"
                            type="text"
                            placeholder="Search here"
                            onChange={handleChange}
                            value={searchTerm}
                        />
                    </form>
                    <AiOutlineClose
                        className={`text-x mx-2 text-black cursor-pointer  ${
                        !searchTerm ? "invisible" : "visible"
                        }`}
                        onClick={ () => setSearchTerm('') }
                    />
                </div>
                <Link to="/cart">
                    <div className='text-sm relative text-white flex flex-row items-center gap-2 cursor-pointer'>
                        <BsFillCartFill></BsFillCartFill>
                        Cart
                        <div className={`${cart.length > 0 ? "visited" : "invisible" } absolute w-3 h-3 m-auto font-bold flex items-center justify-center top-0 right-7 text-[8px] rounded-full bg-red-800 text-white`}><span>{cart.length > 0 && cart.length}</span></div>
                    </div>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default Header