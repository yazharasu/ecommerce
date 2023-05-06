import React, { useEffect } from 'react';
import { removeToast } from '../store/toastSlice';
import { useSelector, useDispatch } from 'react-redux';


const Toast = () => {
    const toastMessage = useSelector((state) => state.toast.toast);
    const dispatch = useDispatch();

    useEffect( () => {
        const timer = setTimeout( () => {
            dispatch(removeToast(""));
        }, 2000);

        return () => clearTimeout(timer);
    }, [toastMessage]);

  return (
        <div className={`absolute w-80 h-12 z-20 m-2 top-8 right-5 flex gap-4 justify-start items-center bg-green-100 drop-shadow-sm border border-solid border-gray-500 text-blue-700  
            ${toastMessage.length ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out delay-200 duration-400
            `}>
            <div className='w-2 h-full bg-green-900 '>
            </div>
            <div className='font-medium text-base text-green-800'>{toastMessage}</div>
        </div>
  )
}

export default Toast