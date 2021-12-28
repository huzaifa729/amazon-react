import React, {useState} from 'react'
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const signIn = e => {
         e.preventDefault();
      }

      const register = e => {
        e.preventDefault();
      }


    return (
        <div className='login'>
        <Link to = "/">
       <img className="login--logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon"/>
       </Link>

          <div className='login--container'>
              <h1>Sign-In</h1>
              <form>
                  <h5>E-mail</h5>
                  <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                  <h5>Password</h5>
                  <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                  <button type='submit' onClick={signIn} className='login--signButton'>Sign In</button>
              </form>
              <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice, our Cookies Notice and our Internet-Based Ads Notice</p>
         <button type='submit' onClick={register} className='login--registerButton'>Create your Amazon Account</button>
          </div>
        </div>
       
    )
}

export default Login