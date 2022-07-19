import './App.css';
import react, { useState, useContext } from 'react';
const globalContext = react.createContext()
function App() {
  const [count, setcount] = useState(0);

  return (
    <globalContext.Provider value={{ count }}>


      <div className="App">
        <button onClick={() => {
          setcount(count + 1)
        }}>add</button>  我是父组件的值 {count}
        <Son></Son>
      </div>
    </globalContext.Provider >
  );
}


function Son() {
  const context = useContext(globalContext);
  return <div>
    我是父组件传过来的值 {context.count}
  </div>
}

export default App;
