import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <input type="text" />
      <button onClick={() => { 
        localStorage.setItem('token','123');
        navigate('/center',{replace:true})
       }}>登录</button>
    </div>
  )
}

export default Login