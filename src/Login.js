import React from 'react'
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className='login'>
        <Link to = "/">
       <img className="login--logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon"/>
       </Link>

          <div className='login--container'>
              <h1>Sign-In</h1>
              <form>
                  <h5>E-mail</h5>
                  <input type='text'/>
                  <h5>Password</h5>
                  <input type='password'/>
                  <button className='login--signButton'>Sign In</button>
              </form>
              <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice, our Cookies Notice and our Internet-Based Ads Notice</p>
         <button className='login--registerButton'>Create your Amazon Account</button>
          </div>
        </div>
       
    )
}

export default Login
