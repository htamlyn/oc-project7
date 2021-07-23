import { useState } from 'react';
const jwt = require('jsonwebtoken');

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString !== null) {
        const userToken = JSON.parse(tokenString);
        const decodedToken = jwt.verify(userToken.token, 'RANDOM_TOKEN_SECRET');
        if(decodedToken) {
            return decodedToken
        }
    } 
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}