import React, { useContext, useEffect } from 'react'
import { CartContext } from '../context/Cart';
import { useQuery } from 'react-query';

export default function GetOrder() {
    const { getOrderContext} = useContext(CartContext);

    const getdata = async () => {
        const res = await getOrderContext();
        return res;
    }

   
    const { data, isLoading } = useQuery('orders', getdata);
    console.log(data);
    console.log(data.orders[0].products[0])

if(isLoading){
    return "Loading..."
}
  return (
    <div className="">
    <div className="container">

        <div className="row ">
          {data?.orders? (data.orders.map((order) =>
          <div className="col-lg-12">
          <div key={order._id}>
             <h2>Order</h2>
             <table class="table">
               <thead>
                 <tr>
                   <th>Address</th>
                   <th>Final Price</th>
                   <th>Payment Type</th>
                   <th>Status</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>{order.address}</td>
                   <td>{order.finalPrice}</td>
                   <td>{order.paymentType}</td>
                   <td>{order.status}</td>

                 </tr>
                
               </tbody>
             </table>
             </div>
             </div>
              )) : 'No data found'}

        </div>
      </div>
    </div>
  )
}
