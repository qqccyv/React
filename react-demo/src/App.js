import React from 'react';
import './App.css';
// import Count from './components/count';
import Count from './container/count' // 引入react-redux容器
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Count store={store} />
    </div>
  );
}

export default App;
