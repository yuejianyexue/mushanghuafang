// observable创建被检测的对象，对象中的属性会被变成响应式数据
// action 函数用来显式的定义 action方法
import {
  observable,
  action
} from 'mobx-miniprogram'
import {
  getStorage
} from '../utils/storage'


export const userStore = observable({
  // 定义响应式数据
  // token 身份令牌
  token: getStorage('token') || '',
  // 用户信息
  userInfo:getStorage('userInfo') || '' ,

  // 定义action
  // setToken用来修改、更新token
  setToken: action(function (token) {
    // 传入token进行赋值
    this.token = token
  }),
  setUserInfo:action(function(userInfo){
    this.userInfo = userInfo
  })
})