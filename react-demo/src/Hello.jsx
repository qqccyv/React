import React, { createRef, createContext } from 'react'
// import { render } from 'react-dom'
const {Provider,Consumer} = createContext()


const Child1 = (props) => {
  return (
    // <Consumer>
  <div>这里是兄弟给我说的话{props.value}
  {/* {
  data => <h1>{data}</h1>
  } */}
  </div>
  // </Consumer>
  )
}
class Child2 extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.saySomething('兄弟你好！')}>给兄弟说句话</button>
    )
  }
}
export default class Hello extends React.Component {
  state = {
    value: ''
  }
  saySomething(value) {
    this.setState({
      value: value
    })
  }
  render() {
    return (
      // <Provider value="666">
      <div>
        {/* <Child2 saySomething={this.saySomething.bind(this)} /> */}
        <Child2 saySomething={(value)=>this.saySomething(value)} />
        <Child1 value={this.state.value} hh={this.state.value} />
      </div>
      // </Provider>
    )
  }
}

