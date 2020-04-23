import React from 'react'
import { NavBar } from 'antd-mobile';
import {getCurrentCity} from '../../utils/index.js'
import './index.scss'

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
    console.log(currCity);
    
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
  render() {
    return (
      <div className="cityList">
        <NavBar
          className="navBar"
          mode="light"
          icon={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
      </div>
    )
  }
}

export default CityList
