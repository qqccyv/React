import React, { createRef, createContext } from 'react'
// import { render } from 'react-dom'


const Child1 = (props) => {
  return (
    <div>
    {props.children}
    </div>
  )
}
class Child2 extends React.Component {
  render() {
    return (
        <div>
        <div></div>
        </div>
    )
  }
}
export default class Hello extends React.Component {
  state = {
    value: '666'
  }
 
  render() {
    return (
      <div>
        <Child1>我是子节点</Child1>
      </div>
    )
  }
}

