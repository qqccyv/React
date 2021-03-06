import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js' // 引入pubsub订阅库


export default class Search extends Component {

  search = () => {
    const { value: keyWord } = this.searchElement
    // 发布订阅
    PubSub.publish('updateStateStatus'/* 发布订阅事件名 */, { isFirst: false, loading: true }/* 发布订阅参数 */)
    axios.get(`/api1/search/users?q=${keyWord}`).then(res => {
      PubSub.publish('updateStateStatus', { users: res.data.items, loading: false })
    }, error => {
      console.error(error);
      PubSub.publish('updateStateStatus', { err: error.message, loading: false })
    })
  }
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text" ref={(el) => this.searchElement = el} placeholder="搜索试试" />&nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}
