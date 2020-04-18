import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello';
import img from './images/menu1.15200d52.png'
import PropTypes from 'prop-types'
import './index.css'
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


// class LifeCycle extends React.Component {
//   constructor() {
//     super()
//     // console.log('钩子函数：constructor')
//     this.state = {
//       count: 0
//     }
//   }
//   componentDidMount() {
//     // console.log('钩子函数：componentDidMount')
//   }
//   btnHandler() {
//     this.setState({
//       count: this.state.count + 1
//     })
//     // this.forceUpdate()  强制刷新方法  会触发render方法
//   }
//   render() {
//     // console.log('钩子函数：render')
//     return (
//       <div>
//         {
//           this.state.count > 3 ? <p>豆豆被打死了</p> : <Child count={this.state.count}></Child>
//         }

//         <button onClick={this.btnHandler.bind(this)}>打豆豆</button>
//       </div>
//     )
//   }
// }

// class Child extends React.Component {
//   render() {
//     return (
//       <h3>豆豆被打了几次了：{this.props.count}</h3>
//     )
//   }

//   componentDidMount() {
//     this.timerId = setInterval(() => {
//       console.log('一个定时器');

//     }, 1000);
//     console.log('这里是子组件第一次更新:componentDidMount');
//     //只在第一次挂载时调用，后续不再触发
//   }
//   componentDidUpdate(prevProps) {
//     console.log('子组件componentDidUpdate更新了：' + prevProps.count);
//     console.log('这一次的props：' + this.props.count);


//   }
//   componentWillUnmount(){
//     console.log('子组件被卸载了');
//     clearInterval(this.timerId)
//   }

// }

// const getDisplayName = (WrappedComponent)=>{
//   return WrappedComponent.displayName || WrappedComponent.name || 'Component'
// }
// function withMouse(WrappedComponent){
//   class Mouse extends React.Component {
//     // static propTypes = {
//     //   x: PropTypes.number.isRequired,
//     //   y: PropTypes.number.isRequired
//     // }
//     state = {
//       x: 0,
//       y: 0
//     }
//     methods= {

//     }
//     componentDidMount() {
//       window.addEventListener('mousemove',this.methods.m = this.mouseHandler.bind(this))
//     }
//     componentWillUnmount(){
//       window.removeEventListener('mousemove',this.methods.m)
//     }
//     mouseHandler(e) {
//       // console.log(e.clientX);
//       this.setState({
//         x: e.clientX,
//         y: e.clientY
//       })

//     }
//     render() {
//       return <WrappedComponent {...this.state}{...this.props}></WrappedComponent>
//     }
//   }
//   Mouse.displayName = `withMouse${getDisplayName(WrappedComponent)}`
//   return Mouse
// }



// const Position = (props)=> {

//     return (
//       <p>mouse的坐标是x:{props.x} y:{props.y}</p>
//     )

// }

// const MousePosition = withMouse(Position)
// class App extends React.Component {

//   render() {
//     return (
//       <div>
//         <MousePosition></MousePosition>
//         {/* <Mouse>
//           {(mouse) => {
//             return (
//               <p>mouse的坐标是x:{mouse.x} y:{mouse.y}</p>
//             )
//           }}
//         </Mouse> */}
//         {/* <Mouse>
//           {(mouse) => {
//             return (
//               <img src={img} style={{
//                 position: 'absolute',
//                 top: mouse.y,
//                 left: mouse.x
//               }}></img>
//             )
//           }}
//         </Mouse> */}
//       </div>
//     )
//   }
// }

// class App extends React.Component {
//   state = {
//     count: 0
//   }
//   btnHandler(){
//     //推荐setstate写法，设置函数方法，可以获取即时最新的state，props的值
//     this.setState((state,props)=>{
//       return {
//         count: state.count+1
//       }
//     },()=>{
//       //回调函数，在设置完状态值，且render渲染页面结束后调用
//       document.title = `更新后的count值为${this.state.count}`
//     })
//   }
//   render(){
//     return (
//       <div>
//         <h3>最新的count值为：{this.state.count}</h3>
//         <button onClick={this.btnHandler.bind(this)}>+1</button>
//       </div>
//     )
//   }
// }


// //纯组件内部自动实现了shouldComponentUpdate的作用，同时会影响子组件
// class App extends React.PureComponent {
//   state = {
//     count: 0
//   }
//   btnHandler(){
//     this.setState(()=>{
//     return  {count: Math.floor(Math.random()*3)}
//     })
//   }
//   // //这里的形参顺序不能改变
//   // shouldComponentUpdate(nextProps,nextState){
//   //   // console.log(nextState);
//   //   return nextState.count !== this.state.count
//   // }
//   render(){
//     console.log('父亲render');

//     return (
//       <div>
//         <Child count={this.state.count}></Child>
//         <button onClick={this.btnHandler.bind(this)}>重置</button>
//       </div>
//     )
//   }
// }
// class Child extends React.Component {
//   //  //这里的形参顺序不能改变
//   //  shouldComponentUpdate(nextProps){
//   //   // console.log(nextState);
//   //   return nextProps.count !== this.props.count
//   // }
//   render(){
//     console.log('儿子render');
//     return (
//       <h3>count的值：{this.props.count}</h3>
//     )
//   }
// }


// class App extends React.PureComponent {
//   state = {
//     obj: {
//       number: 0
//     }
//   }

//   btnHandler(){
//     const newObj = {...this.state.obj}
//     newObj.number = Math.floor(Math.random()*3)
//     this.setState(()=>{
//       return {
//         obj: newObj
//       }
//     },()=>{console.log(this.state.obj);
//     })
//   }
//   render(){
//     console.log('render');

//     return (
//     <div>
//       <h3>number的值为{this.state.obj.number}</h3>
//       <button onClick={this.btnHandler.bind(this)}>重置</button>
//     </div>
//     )
//   }
// }

// import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
// const First = ()=>{
//   return (
//     <h3>这里是第一个页面</h3>
//   )
// }
// const Second = ()=>{
//   return <h3>这里是第二个页面</h3>
// }
// class App extends React.Component {
//   render() {
//     return (
//       <Router>
//         <h1>React路由基础使用</h1>
//         <Link to="/first">页面一</Link>
//         <Link to="/second">页面二</Link>
//         <Route path="/first" component={First}></Route>
//         <Route path="/second" component={Second}></Route>
//       </Router>
//     )
//   }
// }
class Header  extends React.Component {
  components= {
    input: ''
  }
  addHandler(){
    let content = this.components.input.value.trim()
    if(!content) return alert('输入内容不能为空')
    this.props.todoItemAdd(content)
    this.components.input.value = ''
  }
  render(){
    return (
      <div>
        <input placeholder="请输入需要跟踪的任务" ref={el => this.components.input = el} /> <button onClick={this.addHandler.bind(this)}>添加</button>
      </div>
    )
  }
}
class Body extends React.Component {
  state = {

  }

  inputHandler(id,e) {
    this.props.todoItemChange(id, e.target.checked)
  }
  btnHandler(id){
    this.props.todoItemDel(id)
  }
  render() {
    const {filterValue} = this.props
    console.log(filterValue==='ALL');
    
    return (
      <div>
        {this.props.todoList.map(item => {
          if(filterValue==='ALL'){
            return (
              <li key={item.id}>
                <input checked={item.completed} type="checkbox" onChange={this.inputHandler.bind(this,item.id)}></input>
                <span>{item.content}</span>
                <button onClick={this.btnHandler.bind(this,item.id)}>删除</button>
              </li>
            )
          }
          if(filterValue==='Completed' && item.completed){
            return (
              <li key={item.id}>
                <input checked={item.completed} type="checkbox" onChange={this.inputHandler.bind(this,item.id)}></input>
                <span>{item.content}</span>
                <button onClick={this.btnHandler.bind(this,item.id)}>删除</button>
              </li>
            )
          }
          if(filterValue==='unCompleted' && !item.completed){
            return (
              <li key={item.id}>
                <input checked={item.completed} type="checkbox" onChange={this.inputHandler.bind(this,item.id)}></input>
                <span>{item.content}</span>
                <button onClick={this.btnHandler.bind(this,item.id)}>删除</button>
              </li>
            )
          }
        })}
      </div>
    )
  }
}
class Footer extends React.Component {
  btnHandler(e){
    // console.log(e.target.value);
    this.props.filterItemValue(e.target.value)
  }
  render() {
    return (
      <div>
        <button value="ALL" onClick={this.btnHandler.bind(this)}>全部</button>
        <button value="Completed" onClick={this.btnHandler.bind(this)}>已完成</button>
        <button value="unCompleted" onClick={this.btnHandler.bind(this)}>未完成</button>
      </div>
    )
  }
}
class App extends React.Component {
  state = {
    todoList: [
      {
        id: 1,
        content: '打豆豆',
        completed: false
      }
    ],
    filterValue: 'ALL'
  }
  todoItemChange(id, completed) {
    // console.log(completed);
    const newTodoList = [...this.state.todoList]
    newTodoList.find(item => item.id == id).completed = completed
    this.setState({
      todoList: newTodoList
    },()=>console.log(this.state.todoList))
  }

  todoItemAdd(content){
    const newTodoList = [...this.state.todoList]
    newTodoList.unshift({
      id: newTodoList[0]? newTodoList[0].id+1 : 1,
      content: content,
      completed: false
    })
    this.setState({
      todoList: newTodoList
    },()=>console.log(this.state.todoList)
    )
  }
  todoItemDel(id){
    this.setState({
      todoList: this.state.todoList.filter(item=>item.id != id)
    })
  }
  filterItemValue(value){
    this.setState({
      filterValue: value
    },()=>console.log(this.state.filterValue)
    )
  }
  render() {
    return (
      <div className="container">
        <Header todoItemAdd={this.todoItemAdd.bind(this)}></Header>
        <Body filterValue={this.state.filterValue}  todoList={this.state.todoList} todoItemChange={this.todoItemChange.bind(this)} todoItemDel={this.todoItemDel.bind(this)}></Body>
        <Footer filterItemValue={this.filterItemValue.bind(this)}></Footer>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.querySelector('#root'))
