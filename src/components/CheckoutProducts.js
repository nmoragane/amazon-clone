import React from 'react';
import '../styles/checkoutproducts.css';

function CheckoutProducts({id,image,title,price,rating}) {
    return (
        <div className="checkoutProduct">
            <img classname="checkoutProduct__image" src={image} alt=""/>

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>

                <p className="checkoutProduct__title">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_,i) => (
                        <p>⭐</p>
                    ))}
                </div>

                <button>Remove from Basket </button>
            </div>

        </div>
    );
}

export default CheckoutProducts;