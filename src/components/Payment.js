import React from 'react';
import '../styles/payment.css'
import CheckoutProducts from './CheckoutProducts';
import { useStateValue } from '../StateProvider';
import {Link} from "react-router-dom";

function Payment(props) {
    const [{basket, user}, dispatch] = useStateValue();
    return (
         <div className="payment">
             <div className="payment__container">

                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                 {/* address */}
                 <div className="payment__section">
                     <div className="payment__title">
                         <h3>Delivery Address</h3>
                     </div>
                     <div className="payment__address">
                         <p>{user?.email}</p>
                         <p>Mallawapitiya</p>
                         <p>Kurunegala</p>
                     </div>
                 </div>

                {/* review items */}
                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProducts
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />)
                        )}
                    </div>
                 </div>

                {/* payment method */}
                 <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    {/* stripe setup */}
                    <div className="payment__details">

                    </div>
                 </div>

             </div>
         </div>
    );
}

export default Payment;