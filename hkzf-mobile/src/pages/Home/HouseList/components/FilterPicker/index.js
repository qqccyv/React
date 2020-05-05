import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../../components/FilterFooter'


export default class FilterPicker extends Component {
  state = {
    value: this.props.selectedFilter
  }
  render() {
    const {data,cols,onCancel,onSave,openType} = this.props
    const {value} = this.state
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={value} cols={cols} onChange={(value)=>this.setState({value})} />

        {/* 底部按钮 */}
        <FilterFooter onOk={()=>onSave(openType,value)} onCancel={()=>onCancel(openType)} />
      </>
    )
  }
}
