import React from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import { getCurrentCity } from '../../../utils/index'
import nav1 from '../../../assets/images/nav-1.png'
import nav2 from '../../../assets/images/nav-2.png'
import nav3 from '../../../assets/images/nav-3.png'
import nav4 from '../../../assets/images/nav-4.png'
import './index.scss'

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
    swiperList: [],
    groupsList: [],
    newsList: [],
    localCity: '北京'
  }

  //获取当前城市定位的函数
  async getLocalCity() {
    const { label } = await getCurrentCity()
    this.setState({ localCity: label });
  }
  //获取轮播图数据
  async getSwiperList() {
    let res = await (await fetch('http://127.0.0.1:8080/home/swiper')).json()
    // console.log(res);
    if (res.status === 200) this.setState(() => {
      return {
        swiperList: res.body
      }
    })
  }
  //获取租房小组数据
  async getGroupsList() {
    const res = await (await fetch(`http://127.0.0.1:8080/home/groups`, {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })).json()
    // console.log(data);
    if (res.status === 200) this.setState(() => {
      return {
        groupsList: res.body
      }
    })

  }
  //获取最新资讯数据
  // 获取最新资讯
  async getNewsList() {
    const { body: newsList } = await (await fetch('http://127.0.0.1:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')).json()
    this.setState({
      newsList
    })
  }
  //-------------------------------------------------------------------------------------------------------
  componentDidMount() {
    this.getSwiperList()
    this.getGroupsList()
    this.getNewsList()
    this.getLocalCity()
  }
  //渲染顶部搜索栏函数
  renderSearchBar() {
    return (
      <Flex className='search-box'>
        {/* 左侧白色区域 */}
        <Flex className="search">
          {/* 位置 */}
          <div className="location" onClick={() => this.props.history.push('/citylist')}>
            <span className="name">{this.state.localCity}</span>
            <i className="iconfont icon-arrow" />
          </div>

          {/* 搜索表单 */}
          <div className="form" onClick={() => this.props.history.push('/search')}>
            <i className="iconfont icon-seach" />
            <span className="text">请输入小区或地址</span>
          </div>
        </Flex>
        {/* 右侧地图图标 */}
        <i className="iconfont icon-map" onClick={() => this.props.history.push('/map')} />
      </Flex>
    )
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
  renderNavItem() {
    return navList.map(item => (
      <Flex.Item key={item.title} onClick={() => this.props.history.push('/home/list')}>
        <img src={item.img} alt="" />
        <span>{item.title}</span>
      </Flex.Item>
    ))
  }
  //租房小组渲染函数
  renderGroup() {
    /* 租房小组 */
    return <div className="group">
      <h3 className="group-title">
        租房小组 <span className="more">更多</span>
      </h3>

      {/* 宫格组件 */}
      <Grid
        data={this.state.groupsList}
        columnNum={2}
        square={false}
        hasLine={false}
        renderItem={({ id, title, desc, imgSrc: src }) => (
          <Flex className="group-item" justify="around" key={id}>
            <div className="desc">
              <p className="title">{title}</p>
              <span className="info">{desc}</span>
            </div>
            <img src={`http://127.0.0.1:8080${src}`} alt="" />
          </Flex>
        )}
      />
    </div>
  }

  // 渲染最新资讯
  renderNewsList() {
    return this.state.newsList.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://127.0.0.1:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  render() {
    return (
      <div className="index">
        {/* 顶部搜索栏 */}
        {this.renderSearchBar()}
        {/* 轮播图 */}
        <Carousel
          autoplay
          infinite
          key={this.state.swiperList.length}
        >

          {/* 轮播图 */}
          {this.renderSwiperList()}
        </Carousel>
        {/* 导航按钮 */}
        <Flex className="nav">
          {this.renderNavItem()}
        </Flex>

        {/* 租房小组 */}
        {this.renderGroup()}

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNewsList()}</WingBlank>
        </div>
      </div>
    )
  }
}

export default Index