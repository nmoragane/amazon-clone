import React from 'react';
import '../styles/checkout.css';
import CheckoutProducts from './CheckoutProducts';
import Subtotal from './Subtotal';
import { useStateValue } from '../StateProvider';

function Checkout(props) {
    const[{ basket,user }, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB42392668_.jpg" alt="" className="checkout__ad"/>
                
                <div className="">
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout__title">Your Shopping Basket</h2>

                    {/* baskets */}
                    {basket.map(item => (
                        <CheckoutProducts
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal/>
            </div>

        </div>
    );
}

export default Checkout;