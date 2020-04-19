import React from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import News from './News'
import HouseList from './HouseList'
import Profile from './Profile'
import Index from './Index/index.jsx'
import './index.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //这里的location只有在初始化的时候才能拿到
      selectedTab: this.props.location.pathname
    };
  }


  render() {
    // console.log(this.state.selectedTab);
    
    return (
      <div className="home">
        <Route path="/home/index" component={Index}></Route>
        <Route path="/home/houselist" component={HouseList}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#21b97a"
            barTintColor="white"
            noRenderContent={true}
          >
            <TabBar.Item
              title="首页"
              key="Life"
              icon={
                <i className="iconfont icon-ind"></i>
              }
              selectedIcon={<i className="iconfont icon-ind"></i>
              }
              selected={this.state.selectedTab === '/home/index'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/index',
                });
                this.props.history.push('/home/index')
              }}
              data-seed="logId"
            >
            </TabBar.Item>
            <TabBar.Item
              icon={
                <i className="iconfont icon-findHouse"></i>
              }
              selectedIcon={
                <i className="iconfont icon-findHouse"></i>
              }
              title="找房"
              key="Koubei"
              selected={this.state.selectedTab === '/home/houselist'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/houselist',
                });
                this.props.history.push('/home/houselist')
              }}
              data-seed="logId1"
            >
            </TabBar.Item>
            <TabBar.Item
              icon={
                <i className="iconfont icon-infom"></i>
              }
              selectedIcon={
                <i className="iconfont icon-infom"></i>
              }
              title="资讯"
              key="Friend"
              selected={this.state.selectedTab === '/home/news'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/news',
                });
                this.props.history.push('/home/news')
              }}
            >
            </TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-my"></i>}
              selectedIcon={<i className="iconfont icon-my"></i>}
              title="我的"
              key="my"
              selected={this.state.selectedTab === '/home/profile'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/profile',
                });
                this.props.history.push('/home/profile')
              }}
            >
            </TabBar.Item>
          </TabBar>
      </div>
    )
  }
}

export default Home
