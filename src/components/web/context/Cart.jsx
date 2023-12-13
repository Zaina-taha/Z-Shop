import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';



export const CartContext=createContext(null);

export function CartContextProvider({children}){

    const AddToCartContext=async(productId)=>{
        try {
            const token=localStorage.getItem("userToken");
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}});
            if(data.message=='success'){
                toast('Product Added successfuly', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            return data;
        } catch (error) {
            console.log(error)
            
        }
    }

    const getCartContext=async()=>{
        try {
            const token=localStorage.getItem('userToken');
            const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}});
            return data;
        } catch (error) {
            console.log('error')
            console.log(error)
        }
    }

    const removeItemContext=async(productId)=>{
        try {
        const token=localStorage.getItem('userToken');
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
        {productId}
        ,{headers:{Authorization:`Tariq__${token}`}});
        return data;
        } catch (error) {
        console.log(error); 
        }
    

    }

    const clearCartContext=async()=>{
        try {
        const token=localStorage.getItem('userToken');
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        {headers:{Authorization:`Tariq__${token}`}});
        return data;
        } catch (error) {
        console.log(error); 
        }
    

    }
    
    const increaseQtyContext=async(productId)=>{
        try {
        const token=localStorage.getItem('userToken');
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        {productId}
        ,{headers:{Authorization:`Tariq__${token}`}});
        return data;
        } catch (error) {
        console.log(error); 
        }
    

    }
    const decreaseQtyContext=async(productId)=>{
        try {
        const token=localStorage.getItem('userToken');
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        {productId}
        ,{headers:{Authorization:`Tariq__${token}`}});
        return data;
        } catch (error) {
        console.log(error); 
        }
    

    }
    const getOrderContext=async()=>{
        try {
        const token=localStorage.getItem('userToken');
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order`
        ,{headers:{Authorization:`Tariq__${token}`}});
        console.log(data.orders);
        return data;
        } catch (error) {
        console.log(error); 
        }
    

    }

    return <CartContext.Provider value={{AddToCartContext,getCartContext,removeItemContext,clearCartContext,decreaseQtyContext,increaseQtyContext,getOrderContext}} >
     {children}
    </CartContext.Provider>
}

