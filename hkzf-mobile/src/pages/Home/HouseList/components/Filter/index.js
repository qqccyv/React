import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
import API from '../../../../../utils/API'
import { getCurrentCity } from '../../../../../utils'

export default class Filter extends Component {
  state = {
    titleSelectedList: {
      area: false,
      mode: false,
      price: false,
      more: false
    },
    openType: '',
    filterCondition: {}
  }

  componentDidMount() {
    this.getFilterCondition()
  }
  // filterTitle模块点击事件
  titleOnclick = (type) => {
    this.setState({
      titleSelectedList: {
        ...this.state.titleSelectedList,
        [type]: true
      },
      openType: type
    })
  }

  //隐藏筛选框的方法
  onCancel = () => {

    this.setState({
      openType: ''
    })
  }

  //点击确定按钮
  onSave = () => {
    this.setState({
      openType: ''
    })
  }

  //获取筛选条件
  async getFilterCondition() {
    // const id = this.props.id
    // console.log(id+"1111");
    const { value } = await getCurrentCity()
    const res = await API.get(`/houses/condition?id=${value}`)
    console.log(res.body);
    this.setState({
      filterCondition: res.body
    })

  }
  // 渲染筛选条件列表组件函数
  renderPicker(){
    const {openType,filterCondition: {area,price,rentType,subway}} = this.state
    let data = []
    let cols = 1
    if(openType === 'area' || openType === 'mode' || openType === 'price'){
    switch (openType) {
      case 'area':
        data = [area,subway]
        cols = 3
        break;
      case 'mode':
        data = rentType
        cols = 1
        break;
      case 'price':
        data = price
        cols = 1
        break;
    
      default:
        break;
    }
    return (
            <FilterPicker data={data} cols={cols} onSave={this.onSave} onCancel={this.onCancel} />
    )}
    return null
  }
  render() {
    const { titleSelectedList, openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}
        {(openType === 'area' || openType === 'mode' || openType === 'price') ?
          <div className={styles.mask} onClick={this.onCancel} /> : null
        }
        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle onClick={this.titleOnclick} titleSelectedList={titleSelectedList} />

          {/* 前三个菜单对应的内容： */}
          {
            this.renderPicker()
          }

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
