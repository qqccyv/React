import React, { memo, useMemo, useState } from 'react'
// memo 主要用于缓存纯静态组件
import { createStore } from 'redux'
const addAction = (num) => {
  return {
    type: 'ADD',
    num
  }
}
const squareAction = () => {
  return {
    type: 'SQUARE'
  }
}
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.num
    case 'SQUARE':
      return state * state
    default:
      return state
  }

}
const store = createStore(reducer);
console.log(store.getState());
store.dispatch(addAction(1))
store.dispatch(addAction(2))
console.log(store.getState());
store.dispatch(squareAction())
console.log(store.getState());
const Father = memo((props) => {
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
