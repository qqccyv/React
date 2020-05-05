import React from 'react'
import SearchHeader from '../../../components/SearchHeader'

import { getCurrentCity } from '../../../utils'

import styles from './HouseList.module.scss'
import Filter from './components/Filter'
import API from '../../../utils/API'
import HouseItem from '../../../components/HouseItem'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized'
import BASE_URL from '../../../utils/util'


class HouseList extends React.Component {
  state = {
    localCity: '北京',
    count: 0,
    list: []
  }
  data = {
    filter: {}
  }
  async getCity() {
    const { label: localCity } = await getCurrentCity();
    this.setState({ localCity });
  }

  async getHouseList() {
    // 拿到当前城市的 ID。
    const { value: cityId } = await getCurrentCity();

    const { body } = await API.get('/houses', { cityId, ...this.data.filters, start: 1, end: 20 });

    this.setState({ ...body });
  }

  onFilter(filters) {
    this.data.filters = filters;
    this.getHouseList();
  }

  componentWillMount() {
    this.getCity();
    this.getHouseList()
  }
  // 渲染房屋列表
  renderHouseList = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
  }) => {
    const { houseImg, houseCode, ...item } = this.state.list[index];
    item.src = BASE_URL + houseImg;
    // console.log(house);

    return houseImg ? <HouseItem key={key} style={style} {...item} /> : <div key={key} className={styles.loading}><div></div></div>
  }
  // 判断当前选项是否加载完成
  isRowLoaded({ index }) {
    return !!this.state.list[index]
  }

  //  加载更多房屋列表
  async loadMoreRows({ startIndex, stopIndex }) {
    console.log(startIndex, stopIndex);

    // 拿到当前城市的 ID。
    const { value: cityId } = await getCurrentCity();

    const { body } = await API.get('/houses', { cityId, ...this.data.filter, start: startIndex + 1, end: stopIndex + 1 });

    this.setState((prevState) => { return { list: [...prevState.list, ...body.list] } }, () => {
      console.log(this.state.list);

    });
  }

  render() {
    const { count } = this.state
    return (
      <div className={styles.houselist}>
        {/* 头部搜索栏 */}
        <div className={styles.searchHeader}>
          <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
          <SearchHeader localCity={this.state.localCity} className={styles.searchInput}></SearchHeader>
        </div>
        {/* 筛选组件 */}
        <Filter onFilter={this.onFilter}></Filter>

        <div className={styles.houseItem}>

          {/* 房屋列表区域 */}
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
      </div>
    )
  }
}

export default HouseList