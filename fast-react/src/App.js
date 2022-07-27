import React, { createContext, /* useContext, */ useState } from 'react'
const Numcontext = createContext()
const Child = () => {
  return (
    <Numcontext.Consumer>
      {
        ({ num, setNum }) => {
          return <>
            <h2>{num}</h2>
            <button onClick={() => { setNum(num + 1) }}>累加</button>
          </>
        }
      }
    </Numcontext.Consumer>
  )
}
// const Child = () => {
//   const { num, setNum } = useContext(Numcontext)
//   return (
//     <>
//       <h2>{num}</h2>
//       <button onClick={() => { setNum(num + 1) }}>累加</button>
//     </>
//   )
// }
const Father = () => {
  return <Child></Child>
}

export default function App() {
  const [num, setNum] = useState(1)
  return (
    <Numcontext.Provider value={{ num, setNum }}>
      <Father></Father>
    </Numcontext.Provider>
  )
}
