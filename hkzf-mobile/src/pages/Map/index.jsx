import React from 'react'
import { Link } from 'react-router-dom'
import {Toast} from 'antd-mobile'
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


export default class MapComponent extends React.PureComponent {

  state = {
    houseList: [],
    isShowList: false
  }

  componentDidMount() {
    this.renderMap()
   
  }
  //封装地图初始化函数
  async renderMap() {
    //初始化地图对象
    var map = new BMap.Map(styles.container)
    //将map实例交给this，让全局使用
    this.map = map
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
        //添加地图移动隐藏房源列表事件
        map.addEventListener('movestart', () => this.setState({ isShowList: false }))

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
   try {
    Toast.loading('加载中..',0,null,false)
    const res = await (await fetch(`http://localhost:8080/area/map?id=${id}`)).json()
    Toast.hide()
     // console.log(res);
     const { nextZoom, type } = this.getTypeAndZoom()
     // console.log(nextZoom, type);
 
     res.body.forEach((item) => {
       this.createOverlay(item, nextZoom, type)
     })
   } catch (error) {
    Toast.hide()
   }
   
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
      this.createCycle(areaPoint, areaName, count, value, nextZoom)
    } else if (type === 'rect') {
      this.createRect(areaPoint, areaName, count, value)
    }

  }

  // 圆形覆盖物渲染函数
  createCycle(areaPoint, areaName, count, value, nextZoom) {
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
  createRect(areaPoint, areaName, count, value) {
    var opts = {
      position: areaPoint,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-50, -28)    //设置文本偏移量new Size(-50, -22)
    }
    var label = new BMap.Label("", opts);  // 创建文本标注对象

    //设置覆盖物HTML结构
    label.setContent(
      `
<div class="${styles.rect}">
<span class="${styles.housename}">${areaName}</span>
<span class="${styles.housenum}">${count}套</span>
<i class="${styles.arrow}"></i>
</div>
`
    )

    //设置覆盖物样式
    label.setStyle(labelStyle);

    //添加点击事件
    label.addEventListener('click', ({ changedTouches: [{ clientX, clientY }]}) => {
      //  console.log('hahahahaha');
      //移动点击元素到视图区域的中心位置
      this.map.panBy(window.innerWidth / 2 - clientX, (window.innerHeight - 330) / 2 - clientY)
      this.getHouseList(value)
    })

    //挂载覆盖物
    this.map.addOverlay(label);
  }

  //获取房屋信息列表
  async getHouseList(id) {
    const res = await (await fetch('http://localhost:8080/houses?cityId=' + id)).json()
    // console.log(res);
    if (res.status === 200) this.setState({
      houseList: res.body.list,
      isShowList: true
    })

  }

  //渲染房屋详情列表
  renderHouseList() {
    return (
        <div className={styles.houseItems}>
            {/* 房屋结构 */}
            {this.state.houseList.map(item => (
                <div className={styles.house} key={item.houseCode}>
                    <div className={styles.imgWrap}>
                        <img
                            className={styles.img}
                            src={'http://127.0.0.1:8080' + item.houseImg}
                            alt=""
                        />
                    </div>
                    <div className={styles.content}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <div className={styles.desc}>{item.desc}</div>
                        <div>
                            {item.tags.map((tag, idx) => (
                                <span
                                    key={tag}
                                    className={[styles.tag, styles[`tag${idx % 3 + 1}`]].join(' ')}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className={styles.price}>
                            <span className={styles.priceNum}>{item.price}</span>&nbsp;元/月</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
  render() {
    // console.log(1);
    
    const {isShowList} = this.state
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        {/* 地图区域 */}
        <div id={styles.container}></div>

        {/* 房源列表区域 */}
        <div
          className={[styles.houseList, ...isShowList ? [styles.show] : []].join(' ')}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/search">更多房源</Link>
          </div>
          {/* 房屋信息列表 */}
          {this.renderHouseList()}
        </div>
      </div>
    )
  }
}