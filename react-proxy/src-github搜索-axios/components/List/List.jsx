import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class List extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    isFirst: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    err: PropTypes.string.isRequired
  }
  render() {
    const { users, isFirst, loading, err } = this.props
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
