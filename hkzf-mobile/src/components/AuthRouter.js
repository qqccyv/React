import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import Auth from '../utils/Auth';
// 封装路由拦截功能 拦截需要登录权限的页面请求
const AuthRouter = ({component: Component,...rest})=>{
  return <Route {...rest} render={(props)=>{
    return Auth.isToken ? <Component {...props}></Component> : <Redirect to={{pathname: '/login',from: props.location.pathname}}></Redirect>
  }}></Route>
}

export default AuthRouter