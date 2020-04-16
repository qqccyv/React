import React,{createRef} from 'react'

export default class Hello extends React.Component {
  input = createRef()
  render() {
    return (
      <div>
        <input ref={this.input} type="text" name="" id=""/>
        {/* No.3 设置一个ref的关联元素，获取非受控元素本身 */}
        <button onClick={()=>console.log(this.input.current)
        }>获取非受控组件</button>
      </div>
    )
  }
}

