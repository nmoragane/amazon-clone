import React, { useEffect, useState } from 'react';
import '../styles/payment.css'
import CheckoutProducts from './CheckoutProducts';
import { useStateValue } from '../StateProvider';
import {Link} from "react-router-dom";
import { getBasketTotal } from '../reducer';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import axios from '../axios';

function Payment(props) {
    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const element = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect (() => {
        //generate the special stripe func which allows us to charge the customer
        const getClientSecret = async () => {
            const respose = await axios({
                method:'post',
                url: `/payment/create?total${getBasketTotal(basket) * 100}`
            });
            setClientSecret(respose.data.clientSecret)
        }
        getClientSecret()
    }, [basket])
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card: element.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            history.replaceState('/orders')
        })
    }

    const handleChange = e => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }
    
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
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                />

                                <button disabled={processing || disabled ||succeeded}>
                                    <span>{processing ? <p>Processing...</p>: "Buy Now"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                 </div>

             </div>
         </div>
    );
}

export default Payment;