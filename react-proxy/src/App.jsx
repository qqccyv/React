import React, { Component } from 'react';

import List from './components/List/List';
import Search from './components/Search/Search';
import './App.css';
import axios from 'axios'
export default class App extends Component {
  state = {
    users: [],
    isFirst: true,
    loading: false,
    err: ''
  }
  updateStateStatus = (statusObj) => {
    this.setState(statusObj)
  }
  search = (keyWord) => {
    this.updateStateStatus({ isFirst: false, loading: true })
    axios.get(`/api1/search/users?q=${keyWord}`).then(res => {
      // console.log(res);
      this.updateStateStatus({ users: res.data.items, loading: false })
    }, error => {
      console.error(error);
      this.updateStateStatus({ err: error.message, loading: false })
    })
  }
  render() {
    return (
      <div className="container">
        <Search search={this.search}></Search>
        <List {...this.state}></List>
      </div>
    );
  }
}


