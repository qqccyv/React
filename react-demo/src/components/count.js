import React from 'react'
import store from '../redux/store'
import { createIncrementAction, createDecrementAction, createDecrementActionAsync } from '../redux/count_action'
export default function count(props) {
  function incrementCount() {
    // store.dispatch(createIncrementAction(1))
    props.jia(1)
  }
  function decrementCount() {
    // store.dispatch(createDecrementAction(1))
    props.jian(1)
  }
  function incrementCountAsync() {
    // store.dispatch(createDecrementActionAsync(1, 500))
    props.jiaAsync(1, 500)
  }
  return (
    <div>
      <h1>计算后的结果是：{props.count}</h1>
      <button onClick={incrementCount}>+</button>&nbsp;
      <button onClick={decrementCount}>-</button>&nbsp;
      <button onClick={incrementCountAsync}>异步加</button>
    </div>
  )
}
