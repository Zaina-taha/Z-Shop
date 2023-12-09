import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import './Categories.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios  from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/Cart';


export default function Categories() {
const getCategories=async ()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=20`);
    return data.categories;
}
const {data,isLoading}=useQuery('web-category',getCategories);
if(isLoading){
  return <h2>Loading...</h2>
}
  return (
 <div className='container'>
  <div className='swiper-custom-pagination'></div>
  <Swiper
        modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={2}
      navigation
      pagination={{ 
      clickable: true,
      el:'.swiper-custom-pagination'
      }}
    >
      {data?.length?data?.map((category)=>
   
     <SwiperSlide key={category._id}>
      <Link to={`/products/category/${category._id}`}>
      <img src={category.image.secure_url}/>
      </Link>
     </SwiperSlide>
    ):'no category found'
    }
    </Swiper>
 </div>
  )
}
