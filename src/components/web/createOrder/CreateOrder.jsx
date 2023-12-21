import React, { useContext } from 'react'
import { CartContext } from '../context/Cart';
import { useQuery } from 'react-query';
import axios  from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import Input from '../../pages/Input';
import { CreateOrderSchema } from '../validation/validate';

export default function CreateOrder() {
    const { getCartContext} = useContext(CartContext);

    const getdata = async () => {
        const res = await getCartContext();
        return res;
    }
    const { data, isLoading } = useQuery('cart', getdata);

    const initialValues = {
        couponName: '',
        address:'',
        phone:''



    };
    const onSubmit = async users => {
        const token=localStorage.getItem('userToken');
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`,users,
        {headers:{Authorization:`Tariq__${token}`}});
        if (data.message == "success") {
            toast.success('Order created successfully', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:CreateOrderSchema,

    });
    const inputs = [

        {
            type: 'text',
            id: 'couponName',
            title: 'couponName',
            name: 'couponName',
            value: formik.values.couponName,
        },
        {
            type: 'text',
            id: 'address',
            title: 'address',
            name: 'address',
            value: formik.values.address
        },
        {
            type: 'text',
            id: 'phone',
            title: 'phone',
            name: 'phone',
            value: formik.values.phone
        },

    ];
    const renderInputs = inputs.map((ele, index) =>
    <Input type={ele.type}
        id={ele.id}
        title={ele.title}
        name={ele.name}
        key={index}
        value={ele.value}
        errors={formik.errors}
        onChange={formik.handleChange}
        touched={formik.touched}
        onBlur={formik.handleBlur}

    />
    )

    if (isLoading) {
        return <p>LOADING....</p>
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
                  <form onSubmit={formik.handleSubmit}>
                      {renderInputs}
                      <button type='submit' disabled={!formik.isValid}>submit</button>
                  </form>
                </div>
            </div>
        </div>  )
}
