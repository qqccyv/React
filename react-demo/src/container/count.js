import { connect } from 'react-redux';
import CountUI from '../components/count';
import { createIncrementAction, createDecrementAction, createDecrementActionAsync } from '../redux/count_action'
const mapStateToProps = (state) => {
  return {
    count: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    jia: (data) => {
      dispatch(createIncrementAction(data))
    },
    jian: (data) => {
      dispatch(createDecrementAction(data))
    },
    jiaAsync: (data, time) => {
      setTimeout(() => {
        dispatch(createDecrementActionAsync(data))
      }, time)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountUI)