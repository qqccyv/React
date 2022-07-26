import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Redirect from '../components/Redirect'
import Cenima from '../views/Cenima'
import Center from '../views/Center'
import Detail from '../views/Detail'
import Film from '../views/Film'
import ComingSoon from '../views/Film/ComingSoon'
import NowPlaying from '../views/Film/NowPlaying'
import Login from '../views/Login'
import NotFound from '../views/NotFound'

function MRouter() {
  return (
    <Routes>
      <Route path="/film" element={<Film></Film>}>
        {/* 默认路由，不会展示具体路径 */}
        {/* <Route index element={<NowPlaying></NowPlaying>}></Route> */}
        {/* 子路由重定向，这个重定向路径会在url中展示出来 */}
        <Route path='' element={<Navigate to="/film/nowplaying"></Navigate>}></Route>
        <Route path="nowplaying" element={<NowPlaying></NowPlaying>}></Route>
        <Route path="comingsoon" element={<ComingSoon></ComingSoon>}></Route>
      </Route>
      <Route path="/cenima" element={<Cenima></Cenima>}></Route>
      {/* 需要登陆后访问的组件，可用封装的路由拦截鉴权组件包裹，进行判断拦截 */}
      <Route path="/center" element={<AuthComponent>
        <Center></Center>
      </AuthComponent>}></Route>
      <Route path="/detail/:id" element={<Detail></Detail>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      {/* 路由重定向 */}
      {/* <Route path="/" element={<Navigate to="/film"></Navigate>}></Route> */}
      <Route path="/" element={<Redirect to="/film"></Redirect >}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  )
}

export default MRouter
// 路由鉴权组件封装
function AuthComponent({ children }) {
  const isAuth = localStorage.getItem('token');
  return isAuth ? children : <Redirect to={'/login'}></Redirect>
}