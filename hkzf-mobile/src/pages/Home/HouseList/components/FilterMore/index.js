import React, { Component } from 'react'

import FilterFooter from '../../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    filterValues: this.props.selectedFilter
  }

  //标签点击事件
  tagOnClick(value) {
    const { filterValues } = this.state
    const newFilterValues = [...filterValues]
    let index = newFilterValues.indexOf(value)
    index === -1 ? newFilterValues.push(value) : newFilterValues.splice(index, 1)

    this.setState({
      filterValues: newFilterValues
    })

  }
  //重置事件
  onReset=()=>{
    this.setState({filterValues:[]})
  }
  //保存筛选条件
  onOk=()=>{
    const {openType,onSave} = this.props
    onSave(openType,this.state.filterValues)
  }
  // 渲染标签
  renderFilters(values) {
    // 高亮类名： styles.tagActive
    const {filterValues} = this.state
    return (
      values.map(item => {
        const isSelected = filterValues.includes(item.value)
        return <span key={item.value} className={[styles.tag,...isSelected? [styles.tagActive]:[]].join(' ')} onClick={()=>this.tagOnClick(item.value)}>{item.label}</span>
      })
    )
  }

  render() {
    const {  onCancel, data ,openType } = this.props
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={()=>onCancel(openType)} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(data.roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(data.oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(data.floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(data.characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter cancelText={'重置'} onOk={this.onOk} onCancel={this.onReset} className={styles.footer} />
      </div>
    )
  }
}
