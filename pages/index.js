import React, { useContext } from 'react';
import { Context } from '../context';
import { useRouter } from 'next/router';
import axios from 'axios';

const Auth = () => {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    if (username.length === 1 || secret.length === 1) return;
    axios.put(
      "https://api.chatengine.io/users/",
      { username, secret },
      { headers: { "Private-Key": "38bf5c6d-40c5-4244-9c2a-c6f691768100" }}
    )
    .then((r) => {
      router.push("/chats");
    });
  }

  return (
    <div className='background'>
      <div className='auth-container'>
        <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
          <div className='auth-title'>Chats App</div>
          <div className='input-container'>
            <input 
              placeholder='username'
              className='text-input'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='input-container'>
            <input
              type='password' 
              placeholder='password'
              className='text-input'
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <button 
            type='submit'
            className='submit-button'>
              Login / Register
            </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;