import React from 'react'
import NavHeader from '../../components/NavHeader'
// import './index.scss'
import styles from './Map.module.scss'
import { getCurrentCity } from '../../utils/index'


const BMap = window.BMap
// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: '#fff',
  textAlign: 'center'
}


export default class MapComponent extends React.Component {
  componentDidMount() {

    this.renderMap()
  }
  //封装地图初始化函数
  async renderMap() {
    //初始化地图对象
    var map = new BMap.Map(styles.container)
    //设定初始地点
    // var point = new window.BMap.Point(116.404, 39.915);
    //获取当前城市
    let localCity = await getCurrentCity()
    // 创建地址解析器实例     
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(localCity.label, async (point) => {
      if (point) {
        //挂载地图
        map.centerAndZoom(point, 11);

        //地图mark标记，暂时不需要
        // map.addOverlay(new BMap.Marker(point));

        //添加地图控件
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());

        // 获取当前所有区域的所有房源信息

        const res = await (await fetch(`http://localhost:8080/area/map?id=${localCity.value}`)).json()

        res.body.forEach(({ coord: { latitude, longitude }, label: areaName, count,value }) => {
          // console.log(i);
          const areaPoint = new BMap.Point(longitude, latitude)
          //地图覆盖物
          var opts = {
            position: areaPoint,    // 指定文本标注所在的地理位置
            offset: new BMap.Size(-35, -35)    //设置文本偏移量
          }
          var label = new BMap.Label("", opts);  // 创建文本标注对象

          //设置覆盖物HTML结构
          label.setContent(
            `<div class="${styles.bubble}">` +
            `<p class="${styles.name}">${areaName}</p>` +
            `<p>${count}套</p>` +
            '</div>'
          );

          //设置覆盖物样式
          label.setStyle(labelStyle);

          //添加点击事件
          label.addEventListener('click',()=>{
            console.log(value);
            //重新设置地图中心放大坐标和放大倍数
            map.centerAndZoom(areaPoint, 13);
            //延时异步清除目前地图上的覆盖物，防止百度API本身报错！
            setTimeout(()=>{
              map.clearOverlays()
            },0)
            
          })

          //挂载覆盖物
          map.addOverlay(label);
        })

      }
    },
      //坐标反向解析，地址再确认
      localCity.label);
    //挂载地图
    // map.centerAndZoom(point, 15);
  }
  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        <div id={styles.container}></div>
      </div>
    )
  }
}