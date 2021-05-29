/* eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import { APIContext } from '../../state_&_contexts/APIContext';
import { UserContext } from '../../state_&_contexts/UserContext'

const Login_Signup = (props) => {
  const { createUser, userLogin } = useContext(APIContext);
  const { userId } = useContext(UserContext)

  const [onLoginPage, setOnLoginPage] = useState(true);

  const switchPage = () => {
    setOnLoginPage(!onLoginPage);
  };

 useEffect(()=>{
  if (userId > 0) {
    setTimeout(() => {props.changeView('pantryList')}, 500)}
  },
  [userId])

  return (
    <div className='login'>
      {onLoginPage
       ? <div className='loginBox'>
          <button className='btn switch_login_signup' type="button" onClick={() => {switchPage()}}>
            New User? Sign Up Here!
          </button>
          <h4>Login</h4>
          <form onSubmit={(e) => {userLogin(e) }}>
            <label className='loginItem' htmlFor="username">
              <input className='input' type='text' id="username" name="username" placeholder='username' required />
            </label>
            <label className='loginItem' htmlFor="password">
              <input className='input' autoComplete='password' type='password' id="password" name="password" placeholder='password' required />
            </label>
            <button className='btn fill' type="submit">Log In</button>
          </form>
        </div>
      : <div className='loginBox'>
          <button className='btn switch_login_signup' type="button" onClick={() => switchPage()}>
            Have an account? Log In Here!
          </button>
          <h4>Sign Up</h4>
          <form onSubmit={(e) => {createUser(e)}}>
            <label className='loginItem' htmlFor="username">
              <input className='input' type='text' id="username" name="username" placeholder='username' required />
            </label>
            <label className='loginItem' htmlFor="password">
              <input className='input' type='password' autoComplete='password' id="password" name="password" placeholder='password' required />
            </label>
            <button className='btn fill' type="submit">Sign Up</button>
          </form>
        </div>
      }
    </div>
  )
}

export default Login_Signup;









