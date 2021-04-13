import React, { Component } from 'react'
import PropTypes from "prop-types";


export default class Search extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired
  }
  search = () => {
    const { value: keyWord } = this.searchElement
    this.props.search(keyWord)
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
