import React from 'react'
import { Route, Routes } from 'react-router'
import Cenima from '../views/Cenima'
import Center from '../views/Center'
import Film from '../views/Film'
import ComingSoon from '../views/Film/ComingSoon'
import NowPlaying from '../views/Film/NowPlaying'
import NotFound from '../views/NotFound'

function MRouter() {
  return (
    <Routes>
      <Route path="/film" element={<Film></Film>}>
        {/* 默认路由 */}
        <Route index element={<NowPlaying></NowPlaying>}></Route>
        <Route path="nowplaying" element={<NowPlaying></NowPlaying>}></Route>
        <Route path="comingsoon" element={<ComingSoon></ComingSoon>}></Route>
      </Route>
      <Route path="cenima" element={<Cenima></Cenima>}></Route>
      <Route path="center" element={<Center></Center>}></Route>
      <Route path="/" element={<Film></Film>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  )
}

export default MRouter
