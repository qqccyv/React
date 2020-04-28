import React from 'react'
import { withRouter } from "react-router-dom"
import { Flex } from "antd-mobile"
import styles from './SearchHeader.module.scss'
import '../../assets/fonts/iconfont.css'
function SearchHeader({ history,localCity }) {
  return (
    <Flex className={styles['search-box']}>
      {/* 左侧白色区域 */}
      <Flex className={styles.search}>
        {/* 位置 */}
        <div className={styles.location} onClick={() => history.push('/citylist')}>
          <span className={styles.name}>{localCity}</span>
          <i className="iconfont icon-arrow" />
        </div>

        {/* 搜索表单 */}
        <div className={styles.form} onClick={() => history.push('/search')}>
          <i className="iconfont icon-seach" />
          <span className={styles.text}>请输入小区或地址</span>
        </div>
      </Flex>
      {/* 右侧地图图标 */}
      <i className="iconfont icon-map" onClick={() => history.push('/map')} />
    </Flex>
  )
}
export default withRouter(SearchHeader)