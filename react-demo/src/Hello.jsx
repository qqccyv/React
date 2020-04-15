import React, { createRef } from 'react'

export default class Hello extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  transValue(text) {
    this.setState({
      value: text
    })
  }

  render() {
    return (
      <div>
        <Child transValue={this.transValue.bind(this)} />
        这是子组件传过来的：{this.state.value}
      </div>

    )
  }
}

function Child(props){
  return (
    <div>
      <h3>我是子组件</h3>
      <button onClick={() => props.transValue('我是子组件传过去的')}>传递一个值给父组件</button>
    </div>
  )
}
