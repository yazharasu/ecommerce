import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useToast = () => {
    const [ toastMessage, setToastMessage] = useState("");
    const dispatch = useDispatch();

    useEffect( () => {
        if(toastMessage) {
            const timer = setTimeout( () => {
                setToastMessage("")
            }, 3000);
            return clearTimeout(timer);
        }
    }, [toastMessage]);

    const showToast = (message) => {
        console.log("message======",message)
        setToastMessage(message);
    };
    
    return [toastMessage, showToast];
   }

   export default useToast;