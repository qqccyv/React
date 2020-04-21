import React from 'react'
import { Carousel, Flex } from 'antd-mobile';
import nav1 from '../../../assets/images/nav-1.png'
import nav2 from '../../../assets/images/nav-2.png'
import nav3 from '../../../assets/images/nav-3.png'
import nav4 from '../../../assets/images/nav-4.png'
import './index.css'

const navList = [
  {
    title: '整租',
    img: nav1,
    path: ''
  },
  {
    title: '合租',
    img: nav2,
    path: ''
  },
  {
    title: '地图找房',
    img: nav3,
    path: ''
  },
  {
    title: '去出租',
    img: nav4,
    path: ''
  },
]
class Index extends React.Component {
  state = {
    swiperList: []
  }
  //获取轮播图数据
  async getSwiperList() {
    let res = await (await fetch('http://127.0.0.1:8080/home/swiper')).json()
    // console.log(res);
    this.setState(() => {
      return {
        swiperList: res.body
      }
    })
  }
  // 轮播图渲染函数
  renderSwiperList() {
    return this.state.swiperList.map(val => (
      <a
        key={val.imgSrc}
        href="http://www.alipay.com"
        style={{ display: 'inline-block', width: '100%', height: 212 }}
      >
        <img
          src={`http://127.0.0.1:8080${val.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
        />
      </a>
    ))
  }
  // 导航栏渲染函数
  renderNavItem(){
    return navList.map(item=>(
      <Flex.Item key={item.title} onClick={()=>this.props.history.push('/home/list')}>
      <img src={item.img} alt="" />
      <span>{item.title}</span>
    </Flex.Item>
    ))
  }
  componentDidMount() {
    this.getSwiperList()
  }
  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <Carousel
          autoplay
          infinite
          key={this.state.swiperList.length}
        >
          {this.renderSwiperList()}
        </Carousel>
        {/* 导航按钮 */}
        <Flex className="nav">
         {this.renderNavItem()}
        </Flex>
      </div>
    )
  }
}

export default Index