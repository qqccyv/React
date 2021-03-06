import React, { Component } from 'react'
import PubSub from 'pubsub-js'
export default class List extends Component {
  state = {
    users: [],
    isFirst: true,
    loading: false,
    err: ''
  }
  componentDidMount() {
    // 订阅发布
    this.subscribeList = PubSub.subscribe('updateStateStatus'/* 订阅发布事件名 */, (msg/* 订阅发布事件名 */, statusObj/* 订阅发布参数 */) => this.setState(statusObj))
  }
  componentWillUnmount() {
    // 解除订阅
    PubSub.unsubscribe(this.subscribeList)
  }
  render() {
    const { users, isFirst, loading, err } = this.state
    return (
      <div className="row">
        {
          isFirst ? <h2>输入关键字，点击搜索</h2> :
            loading ? <h2>loading..</h2> :
              err ? <h2>err</h2> :
                users.map(userObj => {
                  return (
                    <div key={userObj.id} className="card">
                      <a href={userObj.html_url} target="_blank" rel="noreferrer">
                        <img src={userObj.avatar_url} style={{ width: '100px' }} alt="avatar" />
                      </a>
                      <p className="card-text">{userObj.login}</p>
                    </div>
                  )
                })
        }

      </div>
    )
  }
}
