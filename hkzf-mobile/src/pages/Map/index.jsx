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
    //将map实例交给this，让全局使用
    this.map = map
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

        //渲染地图覆盖物
        this.renderOverlays(localCity.value)
      }
    },
      //坐标反向解析，地址再确认
      localCity.label);
    //挂载地图
    // map.centerAndZoom(point, 15);
  }

  //封装后的覆盖物渲染函数
  async renderOverlays(id) {
    const res = await (await fetch(`http://localhost:8080/area/map?id=${id}`)).json()
    console.log(res);
    const { nextZoom, type } = this.getTypeAndZoom()
    console.log(nextZoom, type);
    
    res.body.forEach((item) => {
      this.createOverlay(item, nextZoom, type)
    })
  }
  // 获取下一阶段地图的缩放等级和覆盖物类型
  getTypeAndZoom() {
    const curZoom = this.map.getZoom()
    let nextZoom, type
    if (curZoom >= 11 && curZoom <= 13) {
      nextZoom = curZoom === 11 ? 13 : 15
      type = 'cycle'
    } else if (curZoom === 15) {
      type = 'rect'
    }
    return { nextZoom, type }
  }
  // 封装后的覆盖物创建函数
  createOverlay({ coord: { latitude, longitude }, label: areaName, count, value }, nextZoom, type) {
    const areaPoint = new BMap.Point(longitude, latitude)
    if (type === 'cycle') {
     this.createCycle(areaPoint,areaName, count, value, nextZoom)
    }else if(type==='rect'){
      this.createRect(areaPoint,areaName, count, value)
    }

  }

  // 圆形覆盖物渲染函数
  createCycle(areaPoint,areaName, count, value, nextZoom){
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
    label.addEventListener('click', () => {
      // console.log(value);
      //重新调用渲染覆盖物函数
      this.renderOverlays(value)
      //重新设置地图中心放大坐标和放大倍数
      this.map.centerAndZoom(areaPoint, nextZoom);
      //延时异步清除目前地图上的覆盖物，防止百度API本身报错！
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0)

    })

    //挂载覆盖物
    this.map.addOverlay(label);
  }
  // 矩形覆盖物渲染函数
  createRect(areaPoint,areaName, count, value){
    var opts = {
      position: areaPoint,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-50, -28)    //设置文本偏移量new Size(-50, -22)
    }
    var label = new BMap.Label("", opts);  // 创建文本标注对象

    //设置覆盖物HTML结构
    label.setContent(
      `
<div class="${styles.rect }">
<span class="${styles.housename }">${ areaName }</span>
<span class="${styles.housenum }">${ count }套</span>
<i class="${styles.arrow }"></i>
</div>
`
  )

    //设置覆盖物样式
    label.setStyle(labelStyle);

    //添加点击事件
    label.addEventListener('click', () => {
     console.log('hahahahaha');
     

    })

    //挂载覆盖物
    this.map.addOverlay(label);
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