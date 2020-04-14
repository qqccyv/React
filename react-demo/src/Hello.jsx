import React, { Component } from 'react'

export default class Hello extends Component {
  constructor(){
    super()
    this.state = {
      count: 0
    }
  }
  hh() {
    console.log('点击事件触发了');
  }
  countAdd(){
    this.setState({
      count: ++this.state.count
    })
  }
  render() {
    return (
      <div>
      <div onClick={this.hh}>把组件抽离到jsx中</div>
    <button onClick={()=>this.countAdd()}>count的值是：{this.state.count}</button>
      </div>
    )
  }
}