import React, { createRef, createContext } from 'react'
// import { render } from 'react-dom'
import PropTypes from 'prop-types'

const Child1 = (props) => {
  return (
    <div>
      <Child2>{props.children}</Child2>
    </div>
  )
}
class Child2 extends React.Component {
  static propTypes={
    children: PropTypes.string.isRequired
  }

  render() {
    return (
        <div>
          {this.props.children}
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
        <Child1>{'我是字符串'}</Child1>
      </div>
    )
  }
}

