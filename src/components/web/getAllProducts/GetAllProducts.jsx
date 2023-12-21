import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function GetAllProducts() {
    const[items,setItems]=useState([]);
    const[page,setPage]=useState(0);

   
    const GetAllProducts=async ()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=4`);
        const total=data.page;
        setPage(total);
        setItems(data.products);
    }
    useEffect(()=>{
        GetAllProducts();
    },[])
    const FetchData=async (currentPage)=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=4`);
       return data.products;
    }
    const handlePageClick=async (data)=>{
        let currentPage=data.selected+1;
        const DataServer=await FetchData(currentPage);
        setItems(DataServer);
        
    }
  return (
    <div className='container'>
        <div className="row">
            {items.map((item) => {
                return <div className = "col-sm-6 col-md-4 v my-2" key={item._id} >
                    <div className="card shadow-sm w-100 " style={{ minHeight: 225 }} >
                        <div className="card-body">
                            <img src={item.mainImage.secure_url} width='100px' height='150px' alt='products'/>
                            <h5 className="card-title text-center h2">{item.name} </h5>
                            <h6 className="card-subtitle mb-2 text-muted text-center">{item.price}</h6>
                            <Link to={`/products/${item._id}`}>Details</Link>

                        </div>
                    </div>
                    </div>
})}


        <ReactPaginate
         previousLabel={"previous"}
         nextLabel={"next"}
         breakLabel={"..."}
         pageCount={page}
         marginPagesDisplayed={2}
         pageRangeDisplayed={2}
         onPageChange={handlePageClick}
         containerClassName={'pagination justify-content-center'}
         pageClassName={'page-item'}
         pageLinkClassName={'page-link'}
         previousClassName={'page-item'}
         previousLinkClassName={'page-link'}
         nextClassName={'page-item'}
         nextLinkClassName={'page-link'}
         breakLinkClassName={'page-link'}
         activeClassName={'active'}


        />
        </div>
    </div>
  )
}
