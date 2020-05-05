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
    filterCondition: {},
    selectedFilterData: {
      area: ['area', 'null'],
      mode: ['null'],
      price: ['null'],
      more: []
    }
  }

  componentDidMount() {
    this.getFilterCondition()
  }


  //获取筛选条件
  async getFilterCondition() {
    // const id = this.props.id
    // console.log(id+"1111");
    const { value } = await getCurrentCity()
    const res = await API.get(`/houses/condition?id=${value}`)
    // console.log(res.body);
    this.setState({
      filterCondition: res.body
    })

  }


  // filterTitle模块点击事件
  titleOnclick = (type) => {
    const { titleSelectedList, selectedFilterData } = this.state
    let newTitleSelectedList = { ...titleSelectedList }
    Object.keys(newTitleSelectedList).forEach(item => {
      //当前标题
      if (item === type) {
        newTitleSelectedList[type] = true
        return
      }
      const selectedFilter = selectedFilterData[item]
      // 其他标题
      if (item === 'area' && (selectedFilter.length !== 2 || selectedFilter[0] !== 'area')) {
        newTitleSelectedList[item] = true
      } else if (item === 'mode' && selectedFilter[0] !== 'null') {
        newTitleSelectedList[item] = true
      } else if (item === 'price' && selectedFilter[0] !== 'null') {
        newTitleSelectedList[item] = true
      } else if (item === 'more' && selectedFilter.length !== 0) {
        newTitleSelectedList[item] = true
      } else {
        newTitleSelectedList[item] = false
      }
    })
    this.setState({
      titleSelectedList: newTitleSelectedList,
      openType: type
    })
    // this.setState({
    //   titleSelectedList: {
    //     ...this.state.titleSelectedList,
    //     [type]: true
    //   },
    //   openType: type
    // })
  }

  //隐藏筛选框的方法
  onCancel = (openType) => {
    //这里接收到openType  可以复用点击标题高亮的一部分逻辑，达到关闭选择框 同时关闭高亮的目的

    // 判断其他选项当前选项是否高亮
    const { titleSelectedList ,selectedFilterData } = this.state
    let newTitleSelectedList = { ...titleSelectedList }
    const selectedFilter = selectedFilterData[openType]
    // 其他标题
    if (openType === 'area' && (selectedFilter.length !== 2 || selectedFilter[0] !== 'area')) {
      newTitleSelectedList[openType] = true
    } else if (openType === 'mode' && selectedFilter[0] !== 'null') {
      newTitleSelectedList[openType] = true
    } else if (openType === 'price' && selectedFilter[0] !== 'null') {
      newTitleSelectedList[openType] = true
    } else if (openType === 'more' && selectedFilter.length !== 0) {
      newTitleSelectedList[openType] = true
    } else {
      newTitleSelectedList[openType] = false
    }
    this.setState({
      openType: '',
      titleSelectedList: newTitleSelectedList
    })
  }

  //点击确定按钮
  onSave = (openType, value) => {
    // console.log(openType,value);

    // 判断其他选项当前选项是否高亮
    const { titleSelectedList } = this.state
    let newTitleSelectedList = { ...titleSelectedList }
    const selectedFilter = value
    // 其他标题
    if (openType === 'area' && (selectedFilter.length !== 2 || selectedFilter[0] !== 'area')) {
      newTitleSelectedList[openType] = true
    } else if (openType === 'mode' && selectedFilter[0] !== 'null') {
      newTitleSelectedList[openType] = true
    } else if (openType === 'price' && selectedFilter[0] !== 'null') {
      newTitleSelectedList[openType] = true
    } else if (openType === 'more' && selectedFilter.length !== 0) {
      newTitleSelectedList[openType] = true
    } else {
      newTitleSelectedList[openType] = false
    }
    const newSelectedFilterData = {
      ...this.state.selectedFilterData,
      [openType]: value
    }
    console.log(newSelectedFilterData);
    
    const {area,mode,more,price} = newSelectedFilterData
    const filters = {
      [area[0]]: area[2]==='null'? area[1] : area[2] || 'null',
      rentType: mode[0],
      more: more.join(','),
      price: price[0]
    }
    console.log(filters);
    this.props.onFilter(filters)
    // filters.area = area[0] === 'subway'? 
    this.setState({
      openType: '',
      selectedFilterData: newSelectedFilterData,
      titleSelectedList: newTitleSelectedList
    },()=>{
      console.log(this.state.selectedFilterData);
      
    })
  }


  // 渲染筛选条件列表组件函数
  renderPicker() {
    const { openType, filterCondition: { area, price, rentType, subway }, selectedFilterData } = this.state
    let data = []
    let cols = 1
    let selectedFilter = selectedFilterData[openType]
    if (openType === 'area' || openType === 'mode' || openType === 'price') {
      switch (openType) {
        case 'area':
          data = [area, subway]
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
        <FilterPicker key={openType} selectedFilter={selectedFilter} openType={openType} data={data} cols={cols} onSave={this.onSave} onCancel={this.onCancel} />
      )
    }
    return null
  }

  //渲染筛选模块
  renderFilterMore(){
    const {openType,filterCondition: { area, price, rentType, subway,...data }, selectedFilterData} = this.state
    // console.log(data);
    
    if(openType !== 'more'){
      return null
    }
    const selectedFilter = selectedFilterData['more']
    return <FilterMore key={openType} selectedFilter={selectedFilter} data={data} openType={openType} onSave={this.onSave}  onCancel={this.onCancel}  />
  }




  render() {
    const { titleSelectedList, openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}
        {(openType === 'area' || openType === 'mode' || openType === 'price') ?
          <div className={styles.mask} onClick={()=>this.onCancel(openType)} /> : null
        }
        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle onClick={this.titleOnclick} titleSelectedList={titleSelectedList} />

          {/* 前三个菜单对应的内容： */}
          {
            this.renderPicker()
          }

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
