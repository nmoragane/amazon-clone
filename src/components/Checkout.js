import React from 'react';
import '../styles/checkout.css';
import Subtotal from './Subtotal';

function Checkout(props) {
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB42392668_.jpg" alt="" className="checkout__ad"/>
                
                <div className="">
                    <h2 className="checkout__title">Your Shopping Basket</h2>
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal/>
            </div>

        </div>
    );
}

export default Checkout;