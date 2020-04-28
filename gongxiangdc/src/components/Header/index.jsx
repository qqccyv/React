import React from 'react'
import './index.less'
import { Row, Col } from 'antd'
import Util from '../../utils/utils'
import Axios from '../../axios/index'
export default class Header extends React.Component {
  state = {
    currTime: Util.dateFormate(new Date().getTime()),
    degree: 0,
    weather: ''
  }
  componentDidMount() {
    //定时更新时间
   this.timer =  setInterval(() => {
      let currTime = Util.dateFormate(new Date().getTime())
      this.setState({
        currTime
      })
      // console.log(this);

    }, 1000)
    this.getWeatherAPI()
  }

  //跨域获取天气方法
  getWeatherAPI = () => {
    Axios.jsonp({
      url: 'https://wis.qq.com/weather/common',
      data: {
        source: 'pc',
        weather_type: 'forecast_1h',
        // weather_type: 'forecast_1h|forecast_24h',
        province: '四川省',
        city: '成都市'
      },
      success: (data) => {
        const { degree, weather } = data.data.forecast_1h[0]
        this.setState({
          degree, weather
        })

      }
    })
  }
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，测试号一号</span>
            <a href="www.baidu.com">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.currTime !== 0 && this.state.currTime}</span>
            <span className="weather-detail">{this.state.degree}度，{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}