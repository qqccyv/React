import React, { Component } from 'react'

export default class Hello extends Component {
  constructor(){
    super()
    this.state = {
      count: 0,
      text: '随便写点什么'
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
  changeValue(e){
    this.setState({
      text: e.target.value
    })
  }
  render() {
    return (
      <div>
      <div onClick={this.hh}>把组件抽离到jsx中</div>
    <button onClick={()=>this.countAdd()}>count的值是：{this.state.count}</button>
    <input type="text" value={this.state.text} onChange={this.changeValue.bind(this)} />
    <div>{this.state.text}</div>
      </div>
    )
  }
}