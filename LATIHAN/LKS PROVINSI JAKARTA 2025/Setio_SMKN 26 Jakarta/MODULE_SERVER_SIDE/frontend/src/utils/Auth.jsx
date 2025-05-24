import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router';

const Auth = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    useEffect(() => {
        if (!token){
            navigate('/')
        }
    });
  return (
    <div>
        {children}
    </div>
  )
}

export default Auth