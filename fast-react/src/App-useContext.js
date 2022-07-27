import React, { createContext, useContext, useState } from 'react'
const NumContest = createContext()
const Child = () => {
  const { num, setNum } = useContext(NumContest)
  return (
    <>
      <h2>{num}</h2>
      <button onClick={() => { setNum(num + 1) }}>累加</button>
    </>
  )
}
const Father = () => {
  return <Child></Child>
}

export default function App() {
  const [num, setNum] = useState(1)
  return (
    <NumContest.Provider value={{ num, setNum }}>
      <Father></Father>
    </NumContest.Provider>
  )
}
