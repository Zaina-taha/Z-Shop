import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import axios  from 'axios';


export default function Categories() {
const getCategories=async ()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    return data;
}
const {data,isLoading}=useQuery('web-category',getCategories);
if(isLoading){
  return <h2>Loading...</h2>
}

  return (
 <div className='container'>
  <div className='row'>
    {(data?.categories.length?data?.categories.map((category)=>
    <div className='col-md-4' key={category._id}>
      <img src={category.image.secure_url}/>
      <h2>{category.name}</h2>
    </div>
    ):'no category found')
    }

  </div>

 </div>
  )
}
