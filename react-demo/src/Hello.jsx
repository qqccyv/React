import React from 'react'

export default class Hello extends React.Component {

  state = {
    comments: [
    //   {
    //   id: 1,
    //   name: 'jack',
    //   content: 'haha'
    // }
  ],
    name: '',
    content: ''
  }

  valueChange({ target: { value, name } }) {
    this.setState({
      [name]: value
    })
    // console.log(this.state);

  }

  addComment() {

    let { comments, name, content } = this.state
    name.trim() && content.trim() ? this.setState({
      comments: [{
        id: comments[0]? comments[0].id+1: 1,
        name: name,
        content, content
      }, ...this.state.comments]
    },()=>this.setState({name: '',content: ''})) : alert('请输入评论人和评论内容')
  }

  renderComments(){
    return this.state.comments.length === 0 ? <div>暂时还没有人评论！快来说说你的看法吧！</div> : this.state.comments.map(item => (<li key={item.id}><h3>{item.name}</h3><div>{item.content}</div></li>))
  }

  render() {
    return (
      <div>
        <div>
          评论人：<input type="text" name="name" id="" placeholder='请输入评论人' value={this.state.name} onChange={this.valueChange.bind(this)} /> <br />
        </div>
        <div>
          评论内容：<textarea name="content" id="" cols="30" rows="10" placeholder="请输入评论内容" value={this.state.content} onChange={this.valueChange.bind(this)}></textarea> <br />
        </div>
        <div>
          <button onClick={this.addComment.bind(this)}>发表评论</button>
        </div>
        <div>
          <h3>评论列表：</h3>
          <ul>
            {this.renderComments()}
          </ul>
        </div>
      </div>
    )
  }
}