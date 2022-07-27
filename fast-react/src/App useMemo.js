import React, { memo, useMemo, useState } from 'react'
// memo 主要用于缓存纯静态组件

const Father = memo((props) => {
  console.log('123123');
  return (
    <>
      <h2>子组件</h2>
      <button onClick={() => { props.add() }}>加一</button>
    </>
  )
})

export default function App() {
  const [num, setNum] = useState(1)
  // useMemo和 useCallback 使用方法差不多，区别就是不知直接调用，需要再返回一个函数，  典型的高阶函数
  const add = useMemo(
    () => {
      return () => { setNum((num) => { return num + 1 }) }
    },
    [],
  )

  return (
    <>
      <h1>{num}</h1>
      <Father add={add}></Father>
    </>
  )
}
