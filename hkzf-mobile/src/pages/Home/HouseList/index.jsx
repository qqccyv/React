import React from 'react'
import SearchHeader from '../../../components/SearchHeader'

import { getCurrentCity } from '../../../utils'
import styles from './HouseList.module.scss'
import Filter from './components/Filter'
class HouseList extends React.Component {
  state = {
    localCity: '北京',
  }
  componentDidMount() {
    this.getLocalCity()
  }

  //获取当前城市定位的函数
  async getLocalCity() {
    const { label , value } = await getCurrentCity()
    this.setState({ localCity: label,cityId: value });
  }
  render() {
    return (
      <div className={styles.houselist}>
        {/* 头部搜索栏 */}
        <div className={styles.searchHeader}>
          <i className="iconfont icon-back" onClick={()=>this.props.history.go(-1)}></i>
        <SearchHeader localCity={this.state.localCity} className={styles.searchInput}></SearchHeader>
        </div>
        {/* 筛选组件 */}
        <Filter></Filter>
      </div>
    )
  }
}

export default HouseList