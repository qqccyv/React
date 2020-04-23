import React from 'react'
import './index.scss'
export default class MapComponent extends React.Component {
  componentDidMount(){
    //初始化地图对象
    var map = new window.BMap.Map("container")
    //设定初始地点
    var point = new window.BMap.Point(116.404, 39.915);
    //挂载地图
    map.centerAndZoom(point, 15);
    
  }
  render(){
    return (
      <div className="map">
        <div id="container"></div> 
      </div>
    )
  }
}