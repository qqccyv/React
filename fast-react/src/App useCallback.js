import React, { memo, useCallback, useState } from 'react'
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
  // useCallback 配合memo使用，达到缓存含有动态方法的子组件的作用，但是在赋值等操作时，需要注意拿取最新的状态数据
  const add = useCallback(
    () => { setNum((num) => { return num + 1 }) },
    [],
  )

  return (
    <>
      <h1>{num}</h1>
      <Father add={add}></Father>
    </>
  )
}
