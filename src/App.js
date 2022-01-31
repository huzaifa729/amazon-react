import React, {useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
 
} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider'
import Payment from './Payment';
import { loadStripe} from '@stripe/stripe-js';
import { Elements} from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51KJFGGSGtv46Bfi1hBljdoSq8Kk1qdWlTh8YkLD4BtrICG2fBbej5eY7X9JChCX904FfJKijj39ZpFIKWyujkZER00WtQ42E8j');

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only runce one when app component is loaded
    auth.onAuthStateChanged(
      authUser => {
        console.log('THE USER IS :', authUser)

      if(authUser){
        //user just looged in / user was logged in
        dispatch({
          type: 'SET_USER',
          user:authUser
        })
      }
      else{
        //user logged out 
        dispatch({
          type: 'SET_USER',
          user:null
        })
      }
  })
  }, [])

  return (
    <Router>
    <div className="App">
      {/* <h1>We are building Amaon Project</h1>  */}
      <Switch>
        <Route path="/login">
      
          <Login/>
        </Route>
        <Route path="/checkout">
           <Header />
            <Checkout/>
            </Route>

            <Route path="/payment">
           <Header />
           <Elements stripe={promise}>
            <Payment/>
            </Elements>
            </Route>

    <Route path='/'>
    <Header />
    <Home />
    </Route>
    </Switch>

    </div>
  </Router>
  );
}

export default App;



