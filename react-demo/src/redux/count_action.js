import { INCREMENT, DECREMENT } from './constant';
import store from './store';

export const createIncrementAction = (data) => {
  return {
    type: INCREMENT,
    data
  }
}
export const createDecrementAction = (data) => {
  return {
    type: DECREMENT,
    data
  }
}
export const createDecrementActionAsync = (data, time) => {
  return () => {
    setTimeout(() => {
      store.dispatch(createIncrementAction(data))
    }, time)
  }
}