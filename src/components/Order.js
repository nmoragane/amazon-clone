import React from 'react';
import '../styles/order.css'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';
import CheckoutProducts from './CheckoutProducts';

function Order({order}) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            
            <p className="order__id">
                <small>{order.id}</small>
                {order.data.basket?.map(item => (
                    <CheckoutProducts
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    />                    
                ))}
                <CurrencyFormat
                    renderText={(value) => (
                        <h3 className="order__total">Order Total: {value}</h3>
                    )}
                    decimalScale={2}
                    value={order.data.value / 100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />
            </p>
        </div>
    );
}

export default Order;