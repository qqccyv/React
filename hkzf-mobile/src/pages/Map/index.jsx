import React from 'react'
import NavHeader from '../../components/NavHeader'
// import './index.scss'
import Styles from './Map.module.scss'
import { getCurrentCity } from '../../utils/index'
const BMap = window.BMap
export default class MapComponent extends React.Component {
  componentDidMount() {

    this.renderMap()
  }
  //封装地图初始化函数
  async renderMap() {
    //初始化地图对象
    var map = new BMap.Map(Styles.container)
    //设定初始地点
    // var point = new window.BMap.Point(116.404, 39.915);
    //获取当前城市
    let localCity = await getCurrentCity()
    // 创建地址解析器实例     
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(localCity.label, (point) => {
      if (point) {
        map.centerAndZoom(point, 11);
        // map.addOverlay(new BMap.Marker(point));
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
      }
    },
      localCity.label);
    //挂载地图
    // map.centerAndZoom(point, 15);
  }
  render() {
    return (
      <div className={Styles.map}>
        <NavHeader>地图找房</NavHeader>
        <div id={Styles.container}></div>
      </div>
    )
  }
}