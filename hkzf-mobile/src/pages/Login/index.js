import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'
import API from '../../utils/API'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/
const TOKEN_KEY = 'HKZF_TOKEN'
class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  // 表单绑定
  inputChangeHandler = ({ target: { name, value } }) => {

    this.setState({
      [name]: value
    }, () => {
      console.log(this.state);

    })
  }

  // 表单提交
  submitHandler = async (e) => {
    e.preventDefault();
    const { username, password } = this.state
    const {status , description ,body} = await API.post('/user/login', {
      username,
      password
    })
    // console.log(res);
    if(status === 200) {
      window.localStorage.setItem(TOKEN_KEY,body.token)
      // console.log(body);
      
    }
    Toast.info(description,2,null,false)
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.submitHandler}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                onChange={this.inputChangeHandler}
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
                onChange={this.inputChangeHandler}
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/register">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login
