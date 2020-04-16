import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello';

// const div = React.createElement('div',{class: 'btn'},'hello!')
// ReactDOM.render(div,document.querySelector('#root'))


// let a = 666
// let classss = 'btn'
// const h1 = <h1 className={classss}>hello jsx{a}</h1>
// ReactDOM.render(h1,document.querySelector('#root'))

// const songs = [
//   {id: 1, name: '需要人陪'},
//   {id: 2, name: '像我这样的人'},
//   {id: 3, name: '痴心绝对'}
// ]

// const ul = (
//   <ul>
//     {songs.map(item=><li style={
//       {color: 'red'}
//     } key={item.id}>{item.name}</li>)}
//   </ul>
// )

// ReactDOM.render(ul,document.querySelector('#root'))

// function Hello(){
//   return (
//     <div>这是我的第一个函数组件</div>
//   )
// }

// ReactDOM.render(<Hello />,document.querySelector('#root'))

// class MyInput extends React.Component {
//   render() {
//     return (
//       <div>
//         <laber htmlFor="ill">姓名</laber>
//         <input id="ill" type="text"></input>
//       </div>
//     )
//   }
// }


class LifeCycle extends React.Component {
  constructor() {
    super()
    // console.log('钩子函数：constructor')
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    // console.log('钩子函数：componentDidMount')
  }
  btnHandler() {
    this.setState({
      count: this.state.count + 1
    })
    // this.forceUpdate()  强制刷新方法  会触发render方法
  }
  render() {
    // console.log('钩子函数：render')
    return (
      <div>
        {
          this.state.count > 3 ? <p>豆豆被打死了</p> : <Child count={this.state.count}></Child>
        }

        <button onClick={this.btnHandler.bind(this)}>打豆豆</button>
      </div>
    )
  }
}

class Child extends React.Component {
  render() {
    return (
      <h3>豆豆被打了几次了：{this.props.count}</h3>
    )
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      console.log('一个定时器');
      
    }, 1000);
    console.log('这里是子组件第一次更新:componentDidMount');
    //只在第一次挂载时调用，后续不再触发
  }
  componentDidUpdate(prevProps) {
    console.log('子组件componentDidUpdate更新了：' + prevProps.count);
    console.log('这一次的props：' + this.props.count);


  }
  componentWillUnmount(){
    console.log('子组件被卸载了');
    clearInterval(this.timerId)
  }

}
ReactDOM.render(<LifeCycle />, document.querySelector('#root'))
