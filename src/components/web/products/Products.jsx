import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/Cart';



export default function Products() {
    const { productId } = useParams();
    const { AddToCartContext } = useContext(CartContext);
    const { getOrderContext } = useContext(CartContext);

    let [status, setStatus] = useState(['pending']);

    const getdata = async () => {
        const res = await getOrderContext();
        return res;
    }
  

    const getProducts = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }
    const { data, isLoading } = useQuery('productDetail', getProducts);
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    const AddToCart = async (productId) => {
        const res = await AddToCartContext(productId);
        return res;
    }

    return (

        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    {data.subImages.map((img, index) =>
                        <img src={img.secure_url} key={index} height="400px" width="300px" alt='products' />
                    )}
                </div>
                <div className="col-lg-8">
                    <h2>{data.name}</h2>
                    <p>${data.price}</p>
                    <section className="p-2 text-center text-lg-start shadow-1-strong rounded" style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)' }}>
                        <div className="row d-flex justify-content-center">
                            {data.reviews.map((review) =>
                                <div className="col-lg-6 mt-2" key={review._id}>
                                    <div className="card">
                                        <div className="card-body m-3">
                                            <div className="row">
                                                <p className="text-muted fw-light">Rating: {review.rating}/5</p>
                                                <p className="text-muted fw-bold lead  mb-4">
                                                    {review.comment}
                                                </p>
                                                <p>{review.createdAt}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <button className='btn btn-outline-info mt-5' onClick={() => AddToCart(data._id)}>Add To Cart</button>

                    {/* {data1?.orders ? (data1.orders.map((order) =>
                        <div key={order._id}>
                            <tr>
                                <td>{order.status}</td>
                                {order.products.map((products) =>
                                    <td>{products.productId}</td>
                                )}
                            </tr>
                            {status == 'deliverd' ? (<div>
                        <Link className='btn btn-outline-secondary mt-3' to={`/products/${productId}/review`}>Create Review</Link>
                    </div>) : null}
                        </div>
                    )) : "hi"} */}

                    




                </div>
            </div>
        </div>
    )
}
