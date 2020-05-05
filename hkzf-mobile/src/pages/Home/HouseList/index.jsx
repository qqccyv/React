import React from 'react'
import SearchHeader from '../../../components/SearchHeader'

import { getCurrentCity } from '../../../utils'

import styles from './HouseList.module.scss'
import Filter from './components/Filter'
import API from '../../../utils/API'
import HouseItem from '../../../components/HouseItem'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized'
import BASE_URL from '../../../utils/util'
import Sticky from '../../../components/Sticky'
import { Toast } from 'antd-mobile'
import NoHouse from '../../../components/NoHouse'


class HouseList extends React.Component {
  state = {
    localCity: '北京',
    count: 0,
    list: [],
    filter: {},
    isLoading: false
  }
  data = {
    filter: {}
  }
  async getCity() {
    const { label: localCity } = await getCurrentCity();
    this.setState({ localCity });
  }

  // async getHouseList() {
  //   // 拿到当前城市的 ID。
  //   const { value: cityId } = await getCurrentCity();

  //   const { body } = await API.get('/houses', { cityId, ...this.state.filter, start: 1, end: 20 });

  //   this.setState({ ...body });
  // }

  onFilter(filters) {
    this.setState({
      filter: filters
    })
    this.loadMoreRows({ startIndex: 0, stopIndex: 19, toast: Toast });
  }

  componentWillMount() {
    this.Toast = Toast
    this.getCity();
    this.loadMoreRows({ startIndex: 0, stopIndex: 19, toast: Toast })
  }

  // 渲染房屋页面
  renderHouse = () => {
    const { count ,isLoading} = this.state

   if(!isLoading){
    return count?  (

      <div className={styles.houseItem}>

        <InfiniteLoader
          isRowLoaded={this.isRowLoaded.bind(this)}
          loadMoreRows={this.loadMoreRows.bind(this)}
          rowCount={count}>
          {({ onRowsRendered, registerChild }) => {
            return (
              <WindowScroller>
                {({ height, scrollTop, isScrolling }) => {
                  return (
                    <AutoSizer>
                      {({ width }) => {
                        return <List
                          ref={registerChild}
                          onRowsRendered={onRowsRendered}
                          autoHeight
                          scrollTop={scrollTop}
                          width={width}
                          height={height}
                          isScrolling={isScrolling}
                          rowCount={count}
                          rowHeight={120}
                          rowRenderer={this.renderHouseList}
                        />
                      }}
                    </AutoSizer>
                  )
                }}
              </WindowScroller>
            )
          }}
        </InfiniteLoader>

      </div>
    ) : <NoHouse></NoHouse>
   }
  }
  // 渲染房屋列表
  renderHouseList = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
  }) => {
    const { houseImg, houseCode, ...item } = this.state.list[index] || {};
    item.src = BASE_URL + houseImg;
    // console.log(house);

    return houseImg ? <HouseItem key={key} style={style} {...item} /> : <div key={key} className={styles.loading}><div></div></div>
  }
  // 判断当前选项是否加载完成
  isRowLoaded({ index }) {
    return !!this.state.list[index]
  }

  //  加载更多房屋列表
  async loadMoreRows({ startIndex, stopIndex, toast }) {
    console.log(startIndex, stopIndex);

    // 拿到当前城市的 ID。
    const { value: cityId } = await getCurrentCity();
    toast && toast.loading('加载中..', 0, null, false)
    this.setState({
      isLoading: true
    })
    const { body } = await API.get('/houses', { cityId, ...this.state.filter, start: startIndex + 1, end: stopIndex + 1 });
    toast && toast.hide()
    toast && body.count && toast.info(`共找到${body.count}套房源`, 1)
    this.setState((prevState) => { return { list: [...prevState.list, ...body.list], count: body.count ,isLoading: false} }, () => {
      console.log(this.state.list);

    });

  }

  render() {
    return (
      <div className={styles.houselist}>
        {/* 头部搜索栏 */}
        <div className={styles.searchHeader}>
          <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
          <SearchHeader localCity={this.state.localCity} className={styles.searchInput}></SearchHeader>
        </div>
        {/* 筛选组件 */}
        <Sticky>
          <Filter onFilter={this.onFilter.bind(this)}></Filter>
        </Sticky>
        {/* 房屋列表区域 */}
        {this.renderHouse()}

      </div>
    )
  }
}

export default HouseList