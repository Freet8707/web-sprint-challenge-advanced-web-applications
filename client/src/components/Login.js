import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialState = {
  username: 'Lambda School',
  password: 'i<3Lambd4'
} 

const Login = () => {
  const[credentials, setCredentials] = useState(initialState)
  const { push } = useHistory()
  // make a post request to retrieve a token from the api

  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setCredentials(initialState)
    axios.post('http://localhost:5000/api/login', credentials)
    .then(res => {
      console.log(res);
      if(window.localStorage.getItem('token')){
        return console.log('already logged in')        
      } else {
        window.localStorage.setItem('token', res.data.payload)
      }      
    })
    .catch(err => console.log(err.response))
    push('/bubbles-page')
  }
  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username' />Enter username: 
        <input
          type='text'
          id='username'
          name='username'
          onChange={handleChange}
          value={credentials.username}
        />
        <label htmlFor='password' />Enter username: 
        <input
          type='password'
          id='password'
          name='password'
          onChange={handleChange}
          value={credentials.password}
        />
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;
