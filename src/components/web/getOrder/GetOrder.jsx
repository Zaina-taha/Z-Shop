import React, { useContext } from 'react'
import { CartContext } from '../context/Cart';
import { useQuery } from 'react-query';

export default function GetOrder() {
    const { getOrderContext} = useContext(CartContext);
    const getdata = async () => {
        const res = await getOrderContext();
        return res;
    }
    const { data, isLoading } = useQuery('cart', getdata);
if(isLoading){
    return "Loading..."
}

  return (
    <div className="cart">
    <div className="container">
        <div className="row">
            <div className="cart-items">
                <div className="products" id="products">
                    <div className="item">
                        <div className="product-info">
                            <h2>Product</h2>
                        </div>
                        <div className="quantity">
                            <h2>Quantity</h2>
                        </div>
                        <div className="price">
                            <h2>Price</h2>
                        </div>
                        <div className="subtotal">
                            <h2>Subtotal</h2>
                        </div>
                    </div>

                    {data?.products?(data.products.map((product)=>
                    <div className="item" key={product._id}>
                        <div className="product-info">
                            <img src={product.details.mainImage.secure_url} height='150px' />
                            <div className="product-details">
                                <h2>{product.details.name}</h2>
                                <span>Color:black</span>
                            </div>
                        </div>
                        <div className="quantity">
                            
                            <span >{product.quantity}</span>
                            
                        </div>
                        <div className="price">{product.details.price}</div>
                        <div className="subtotal">{product.details.price*product.quantity}</div>
                    </div>
                    )):'No data found'}
                    
                </div>
               
            </div>
        </div>
    </div>
</div>
  )
}
