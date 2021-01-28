import React from 'react';
import '../styles/subtotal.css';
import CurrencyFormat from 'react-currency-format';


function Subtotal(props) {
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                    <p>
                        {/* Subtotal ({basket.length} items):
                        <strong>{`${value}`}</strong> */}
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/> 
                        This order contains a subtotal__gift
                    </small>
                    </>
                )}
                decimalScale={2}
                // value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                />

                <button>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;