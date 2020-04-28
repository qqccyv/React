import React from 'react'
import SearchHeader from '../../../components/SearchHeader'
import { getCurrentCity } from '../../../utils'
import './index.scss'
class HouseList extends React.Component {
  state = {
    localCity: '北京'
  }
  componentDidMount() {
    this.getLocalCity()
  }

  //获取当前城市定位的函数
  async getLocalCity() {
    const { label } = await getCurrentCity()
    this.setState({ localCity: label });
  }
  render() {
    return (
      <div className="houselist">
        <SearchHeader localCity={this.state.localCity}></SearchHeader>
      </div>
    )
  }
}

export default HouseList