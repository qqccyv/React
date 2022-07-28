import React, { /* memo, useMemo, useState */ } from 'react'
// memo 主要用于缓存纯静态组件
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
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

const Container = (props) => {
  const { add, square, num } = props
  return (
    <>
      <h1>{num}</h1>
      <button onClick={() => {
        add(1)
      }}>加一</button>
      <button onClick={() => {
        add(2)
      }}>加二</button>
      <button onClick={() => {
        square()
      }}>平方</button>
    </>
  )
}
// state映射
const mapSateToProps = (state) => {
  return {
    num: state
  }
}
// dispatch和action映射
const mapDiapatchToProps = (dispatch) => {
  return {
    add: (value) => { dispatch(addAction(value)) },
    square: () => { dispatch(squareAction()) }
  }
}
// 通过react-redux提供的connect方法，将redux的state，dispatch和action映射到子容器的props上，然后包裹子容器触发视图更新
const ConnectContainer = connect(mapSateToProps, mapDiapatchToProps)(Container)
export default function App() {
  return (
    // 通过react-redux提供的容器，包裹UI视图
    <Provider store={store}>
      <ConnectContainer></ConnectContainer>
    </Provider>
  )
}
