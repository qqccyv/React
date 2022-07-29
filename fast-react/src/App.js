import React, { /* memo, useMemo, useState */ } from 'react'
// memo 主要用于缓存纯静态组件
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
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
const getAction = () => {
  return (dispatch, getState) => {
    // 请求路径由于是在publick文件夹下，所以是基于根路径
    fetch('./data.json')
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({
          type: 'GET',
          num: res.num
        })
      })
  }
}
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.num
    case 'SQUARE':
      return state * state
    case 'GET':
      return action.num
    default:
      return state
  }

}
const store = createStore(reducer, applyMiddleware(thunk));

const Container = (props) => {
  const { add, square, num, get } = props
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
      <button onClick={() => {
        get()
      }}>请求</button>
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
    square: () => { dispatch(squareAction()) },
    get: () => { dispatch(getAction()) }
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
