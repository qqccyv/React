import './App.css';
import { HashRouter } from 'react-router-dom'
import MRouter from './router/MRouter';
import Tabbar from './components/Tabbar';
function App() {
  return (
    <HashRouter>
      <MRouter></MRouter>
      <Tabbar></Tabbar>
    </HashRouter>
  );
}

export default App;
