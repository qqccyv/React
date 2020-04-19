import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


// import { Button } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import './assets/fonts/iconfont.css'



import Home from './pages/Home'
import CityList from './pages/CityList'

function App() {
  return (
    <Router>
    <div className="App">
      {/* 将默认路由重定向到home路由 */}
      <Route path="/" render={()=><Redirect to="/home"></Redirect>}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/citylist" component={CityList}></Route>
    </div>
    </Router>
  );
}

export default App;
