import React from 'react'
import { NavBar } from 'antd-mobile';
import { List, AutoSizer } from 'react-virtualized';
import { getCurrentCity } from '../../utils/index.js'
import './index.scss'
const indexesMapper = {
  '#': '当前城市',
  hot: '热门城市'
}

class CityList extends React.Component {
  state = {
    cityListObject: {},
    cityIndexes: []
  }
  componentDidMount() {
    this.getCityList()
  }
  //获取城市列表数据
  async getCityList() {
    const res = await (await fetch('http://127.0.0.1:8080/area/city?level=1')).json()
    const { cityListObject, cityIndexes } = this.parseCityList(res.body)
    const hotCities = await (await fetch('http://127.0.0.1:8080/area/hot')).json()
    // console.log(hotCities);

    cityListObject['hot'] = hotCities.body
    cityIndexes.unshift('hot')
    const currCity = await getCurrentCity()
    // console.log(currCity);
    cityListObject['#'] = [currCity]
    cityIndexes.unshift('#')
  //  console.log(cityListObject, cityIndexes);
   this.setState({
    cityListObject, 
    cityIndexes
   })

  }
  //对城市列表进行格式化
  parseCityList(arr) {
    const cityListObject = {}
    for (let i of arr) {
      let preName = i.short[0]
      cityListObject[preName] ? cityListObject[preName].push(i) : cityListObject[preName] = [i]
    }
    // console.log(cityListObject);
    const cityIndexes = Object.keys(cityListObject).sort()
    // console.log(cityIndexes);
    return { cityListObject, cityIndexes }
  }
  //对首字母进行格式化
  parseIndex(letter) {
    return indexesMapper[letter] || letter.toUpperCase();
  }
  //渲染城市列表的函数
  rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    const { cityListObject, cityIndexes } = this.state
    // console.log(cityListObject, cityIndexes);

    let lowwerTitle = cityIndexes[index];

    return (
      <div className="city" key={key} style={style}>
        <div className="title">{this.parseIndex(lowwerTitle)}</div>
        {cityListObject[lowwerTitle].map(i => <div className="name" key={i.value}>{i.label}</div>)}
      </div>
    )
  }
  //自动获取每行高度
  rowHeight({ index }) {
    const { cityListObject, cityIndexes } = this.state

    return 36 + 50 * cityListObject[cityIndexes[index]].length
  }
  render() {
    return (
      <div className="cityList">
        {/* 顶部导航栏 */}
        <NavBar
          className="navBar"
          mode="light"
          icon={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
        {/* 城市列表区域 */}
        <AutoSizer className="renderCityList">
          {({ height, width }) => <List
            width={width}
            height={height - 45}
            rowCount={this.state.cityIndexes.length}
            rowHeight={this.rowHeight.bind(this)}
            rowRenderer={this.rowRenderer.bind(this)}
          />}
        </AutoSizer>
      </div>
    )
  }
}

export default CityList
