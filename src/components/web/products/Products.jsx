import React, { useContext } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/Cart';


export default function Products() {
    const { productId } = useParams();
    const {AddToCartContext}=useContext(CartContext);

    const getProducts = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }
    const { data, isLoading } = useQuery('productDetail', getProducts);
    if(isLoading){
        return <h2>Loading...</h2>
      }
      const AddToCart=async(productId)=>{
        const res=await AddToCartContext(productId);
        return res;
      }
    return (

        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    {data.subImages.map((img, index) =>
                       <img src={img.secure_url} alt='products'/>
                    )}
                </div>
                <div className="col-lg-8">
                    <h2>{data.name}</h2>
                    <p>{data.price}</p>
                    <button className='btn btn-outline-info' onClick={()=>AddToCart(data._id)}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
