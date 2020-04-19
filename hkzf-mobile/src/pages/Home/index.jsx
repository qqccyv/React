import React from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import News from './News'
import HouseList from './HouseList'
import Profile from './Profile'
import Index from './Index/index.jsx'
import './index.css'

// tab栏数据
const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/houselist'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
]

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //这里的location只有在初始化的时候才能拿到
      selectedTab: this.props.location.pathname
    };
  }
  // 渲染tab栏内容的方法
  renderTabbarItem(){
   return tabItems.map(item=>{
      return (
        <TabBar.Item
        title={item.title}
        key={item.icon}
        icon={
          <i className={`iconfont ${item.icon}`}></i>
        }
        selectedIcon={<i className={`iconfont ${item.icon}`}></i>
        }
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          });
          this.props.history.push(item.path)
        }}
      >
      </TabBar.Item>
      )
    })
  }

  render() {
    // console.log(this.state.selectedTab);
    
    return (
      <div className="home">
        {/* tab路由控制区域 */}
        <Route path="/home" exact component={Index}></Route>
        <Route path="/home/houselist" component={HouseList}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#21b97a"
            barTintColor="white"
            noRenderContent={true}
          >
            {/* 渲染tab栏内容 */}
            {this.renderTabbarItem.call(this)}
          </TabBar>
      </div>
    )
  }
}

export default Home
