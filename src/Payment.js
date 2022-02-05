import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getCartTotal} from "./reducer"
import {Link, useHistory } from 'react-router-dom';



function Payment() {
    const [{cart,user}, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
          // generate the special stripe secret which allows us to charge a customer

     const  getClientSecret = async  () =>{
           const response = await axios({
               method: 'post',
               //stripe use expect total amount in base currencies like ruppes to paise
               url: `/payment/create?total=${getCartTotal(cart)* 100}`
           });
           setClientSecret(response.data.clientSecret)
     }

        getClientSecret();
    },[cart])

    const handleSubmit = async (event) => {
         event.preventDefault(); 
         setProcessing(true) 

          const payload = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                  card: elements.getElement(CardElement)
              }
          }).then( ({paymentIntent})=>{
              setSucceeded(true);
              setError(null);
              setProcessing(false)


           history.replace('/orders')

          }

          )
       
    };

    const handleChange = (event) => {
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
                      <p>Subtotal ({cart.length} items):<strong>{value}</strong>{" "} </p>
                      {/* <small className="subtotal--gift">
                     <input type="checkbox" /> This order contains a gift
                     </small> */}
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

                           {/* Error */}

                           {error && <div>{error}</div>}
                  </form>
                  </div> 
                </div>
            </div>
        </div>
    )
}

export default Payment
