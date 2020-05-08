import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'
import API from '../../utils/API'

// 导入withFormik
import { withFormik ,Form,Field ,ErrorMessage} from 'formik'

import * as Yup from 'yup'
import Auth from '../../utils/Auth'
// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/
const TOKEN_KEY = 'HKZF_TOKEN'
class Login extends Component {

 
  // registe = async () => {
  //   const { username, password } = this.state
  // const res = await API.get('http://localhost:3000/login')
  // console.log(res);
  

  // }

  
  // //原始表单绑定
  // inputChangeHandler = ({ target: { name, value } }) => {

  //   this.setState({
  //     [name]: value
  //   }, () => {
  //     console.log(this.state);

  //   })
  // }

  // // 表单提交
  // submitHandler = async (e) => {
  //   e.preventDefault();
  //   const { username, password } = this.state
  //   const { status, description, body } = await API.post('/user/login', {
  //     username,
  //     password
  //   })
  //   // console.log(res);
  //   if (status === 200) {
  //     window.localStorage.setItem(TOKEN_KEY, body.token)
  //     // console.log(body);

  //   }
  //   Toast.info(description, 2, null, false)
  // }

  render() {
    // const { values, handleSubmit, handleChange, handleBlur , errors, touched } = this.props
    // console.log(errors, touched );
    
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <ErrorMessage className={styles.error} name="username" component="div"></ErrorMessage>
            {/* {
              errors.username && touched.username && <div className={styles.error}>{errors.username}</div>
            } */}
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>密码为必填项</div> */}
            <ErrorMessage className={styles.error} name="password" component="div"></ErrorMessage>

            {/* {
              errors.password && touched.password && <div className={styles.error}>{errors.password}</div>
            } */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </Form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/register">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
        {/* <button type="button" onClick={this.registe}>注册</button> */}
      </div>
    )
  }
}

// 使用 withFormik 高阶组件包装 Login 组件，为 Login 组件提供属性和方法
Login = withFormik({
  // 提供状态：
  mapPropsToValues: () => ({ username: '', password: '' }),
  // 通过Yup提供验证规则和报错功能
  validationSchema: Yup.object().shape({
    username: Yup.string().required('账号为必填项').matches(REG_UNAME,'长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string().required('密码为必填项').matches(REG_PWD,'长度为5到8位，只能出现数字、字母、下划线')
  }),
  // 表单的提交事件
  handleSubmit: async (values, { props }) => {
    // 获取账号和密码
    const { username, password } = values

    // console.log('表单提交了', username, password)
    // 发送请求
    const res = await API.post('/user/login', {
      username,
      password
    })

    
    const { status, body, description } = res

    if (status === 200) {
      // 登录成功
      // localStorage.setItem(TOKEN_KEY, body.token)
      // 利用封装的方法保存token
      Auth.setToken(body.token)
      
      // 注意：无法在该方法中，通过 this 来获取到路由信息
      // 所以，需要通过 第二个对象参数中获取到 props 来使用 props
      props.history.go(-1)
    } else {
      // 登录失败
      Toast.info(description, 2, null, false)
    }
  }
})(Login)

export default Login
