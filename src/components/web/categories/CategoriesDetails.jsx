import React from 'react'
import axios  from 'axios';
import 'swiper/css';
import './Categories.css';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';




export default function CategoriesDetails() {

  const {categoryId } = useParams();
  const getCategoryDetails=async ()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
    return data.products;
  }

  const{data,isLoading}=useQuery('categoryDetails',getCategoryDetails);
  if(isLoading){
    return <h2>Loading...</h2>
  }

  return (
   <div className="container">
   
      {data?.length?data?.map((products)=>
     <div className="images pt-4" key={products._id}>
      <img src={products.mainImage.secure_url}/>
      <Link to={`/products/${products._id}`}>Details</Link>
     </div>
    ):'no category found'
    }
   </div>
  )
}
