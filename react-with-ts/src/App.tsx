import React from 'react';
import './App.css';
import Hello from './components/Hello';
import LikeButton from './components/LikeButton';
import MouseTracker from './components/MouseTracker';

function App() {
  return (
    <div className="App">

      <Hello></Hello>
      <LikeButton />
      <MouseTracker />
    </div>
  );
}

export default App;
