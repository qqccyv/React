import React, { createRef } from 'react'
import { Toast } from 'antd-mobile';
import NavHeader from '../../components/NavHeader'
import { List, AutoSizer } from 'react-virtualized';
import { getCurrentCity } from '../../utils/index.js'
import './index.scss'
const indexesMapper = {
  '#': '当前城市',
  hot: '热门城市'
}
const hasHouseCities = ['北京','上海','广州','深圳']
class CityList extends React.Component {
 constructor(props){
   super(props)
   this.state = {
    cityListObject: {},
    cityIndexes: [],
    activeIndex: 0
  }
  this.listComponent = createRef()
 }
 async componentDidMount() {
  await  this.getCityList()
       // 在获取列表数据后马上计算列表高度，方便移动高度的准确度
       // 在周期函数中时  因为要确保执行计算方法时，列表数据要已经存在，
       // 所以为前面的获取列表方法添加了await关键字
   this.listComponent.current.measureAllRows()
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
   // 在获取列表数据后马上计算列表高度，方便移动高度的准确度
  //  this.listComponent.current.measureAllRows()
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
        {cityListObject[lowwerTitle].map(i => <div className="name" key={i.value} onClick={this.cityChange.bind(this,i)}>{i.label}</div>)}
      </div>
    )
  }

  //渲染城市序列函数
  renderCityIndex(){
    const {activeIndex , cityIndexes: [...cityIndexes] } = this.state
    cityIndexes[1] = '热'
    return cityIndexes.length>2 && cityIndexes.map((item,index)=>{
      return (
        <li className="city-index-item" key={item} onClick={this.goTargetRow.bind(this,index)}>
          <span className={activeIndex===index? "active-index": ''}>{item.toUpperCase()}</span>
          </li>
      )
    })
  }
  //移动到目标行
  goTargetRow(index){
    // this.listComponent.current.scrollToRow(index)
    this.setState({
      activeIndex: index
    })
  }
  //自动获取每行高度
  rowHeight({ index }) {
    const { cityListObject, cityIndexes } = this.state

    return 36 + 50 * cityListObject[cityIndexes[index]].length
  }
  //选择选定城市
  cityChange({label,value}){
    // console.log(label,value);
    if(hasHouseCities.includes(label)){
      localStorage.setItem('hkzf-city',JSON.stringify({label,value}))
      this.props.history.go(-1)
    } else Toast.info('该城市没有房源信息',1,null,false)
    
  }
  //列表滚动切换序列高亮
  onRowsRendered({startIndex}){

  startIndex !== this.state.activeIndex &&  this.setState({
    activeIndex: startIndex
  })
  }
  render() {
    return (
      <div className="cityList">
        {/* 顶部导航栏 */}
        <NavHeader>城市选择</NavHeader>
        {/* 城市列表区域 */}
        <AutoSizer className="renderCityList">
          {({ height, width }) => <List
          ref={this.listComponent}
            width={width}
            height={height - 45}
            rowCount={this.state.cityIndexes.length}
            rowHeight={this.rowHeight.bind(this)}
            rowRenderer={this.rowRenderer.bind(this)}
            scrollToAlignment="start"
            scrollToIndex={this.state.activeIndex}
            onRowsRendered = {this.onRowsRendered.bind(this)}
          />}
        </AutoSizer>
        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
      </div>
    )
  }
}

export default CityList
