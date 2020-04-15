import React, { createRef, createContext } from 'react'
// import { render } from 'react-dom'
const {Provider,Consumer} = createContext()


const Child1 = (props) => {
  return (
    <Child2 />
  )
}
class Child2 extends React.Component {
  render() {
    return (
      <Consumer>
        {data => <h1>{data}</h1>}
      </Consumer>
    )
  }
}
export default class Hello extends React.Component {
  state = {
    value: '666'
  }
 
  render() {
    return (
      <Provider value={this.state.value}>
      <div>
        <Child1 />
      </div>
       </Provider>
    )
  }
}

