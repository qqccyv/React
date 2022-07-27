import React, { memo, useState } from 'react'
const Child = memo(() => {
  console.log(123);
  return (
    <h2>子组件</h2>
  )
})

const Father = () => {
  return <Child></Child>
}

export default function App() {
  const [num, setNum] = useState(1)
  return (
    <>
      <h1>{num}</h1>
      <button onClick={() => { setNum(num + 1) }}>加一</button>
      <Father></Father>
    </>
  )
}
