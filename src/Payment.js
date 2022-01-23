import React, {useState} from 'react'
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getCartTotal} from "./reducer"

function Payment() {
    const [{cart,user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")

    const handleSubmit = e => {
       
    }

    const handleChange = event => {
       setDisabled(event.empty);
       setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment--container'>
            {/* Delivery Address */}
                  <div className='payment--section'>
                  <div className='payment--title'>
                      <h3>Delivery Address</h3>
                      </div> 
                      <div className='payment--address'>
                          <p>{user?.email}</p>
                          <p>Flat No 301, Hiranandani</p>
                          <p>Andheri, India</p>
                      </div>
                  </div>

               {/* Cart Review */}
               <div className='payment--section'>
               <div className='payment--title'>
                    <h3>Review your Item in cart</h3> 
                    </div> 
                    <div className='payment--items'>
                    {cart.map( item => (
           <CheckoutProduct 
            id = {item.id}
            title = {item.title}
            image = {item.image}
            price = {item.price}
           /> 
          ))}
                 </div>  
               </div>
                  {/* Payment Gateway */}
            <div className='payment--section'>
            <div className='payment--title'>
              <h3>Payment Method</h3>
                </div>     
                    <div className='payment--details'>
                          {/* Stripe Seceret Code  */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                        <div className='payment--priceContainer'>
                            
                       <CurrencyFormat
                        renderText ={ (value)=>(
                     <>
                      <p>Subtotal ({cart.length} items):<strong>{value}</strong> </p>
                      <small className="subtotal--gift">
                     <input type="checkbox" /> This order contains a gift
                     </small>
                    </>
             )}
               decimalScale = {2}
               value = {getCartTotal(cart)}
               displayType = {"text"}
               thousandSeparator ={true}
               prefix={"₹"}
           />
                    <button disabled = {processing || disabled || succeeded}>
                       <span > {processing ? <p>Processing</p> : "Buy Now"} </span>
                    </button>
                        </div>
                  </form>
                  </div> 
                </div>
            </div>
        </div>
    )
}

export default Payment
