import React, { Component } from 'react'
import WithRouter from './WithRouter';

class FilItem extends Component {

  filmClickHandler = () => {
  }
  render() {
    console.log(this.props);
    return (
      <li onClick={this.filmClickHandler}>
        {this.props.filmName}
      </li>
    )
  }
}
export default WithRouter(FilItem)
