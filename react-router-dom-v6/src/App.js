import './App.css';
import { HashRouter } from 'react-router-dom'
import MRouter from './router/MRouter';
function App() {
  return (
    <HashRouter>
      <MRouter></MRouter>
    </HashRouter>
  );
}

export default App;