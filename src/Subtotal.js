import React from 'react';
import './Subtotal.css'

function Subtotal() {
    return (
        <div className="subtotal">
           <p>Subtotal (0 item): <strong>0</strong></p>
           <small className="subtotal--gift">
               <input type="checkbox"/>The order contains a gift
           </small>
           <button>Proceed to buy</button>
        </div>
    )
}

export default Subtotal



