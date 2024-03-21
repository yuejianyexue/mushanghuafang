// import { action, observable } from "mobx-miniprogram";

// observable 用于创建一个被监测的对象，对象的属性是应用的状态，状态会被自动转换为响应式数据
// action 函数是用来显示定义的action方法，action方法是用来修、更新状态

import {
  observable,
  action
} from 'mobx-miniprogram'

//  创建store对象
export const numStore = observable({
  // 对象的属性就是应用的状态
  numA: 1,
  numB: 2,

  // 定义action方法，用来修改状态
  // update:action(function(){})
  update: action(function () {
    // 方法中想要获取状态要用到this
    this.numA += 1
    this.numB += 1
    console.log('numA=', this.numA, 'numB=', this.numB)
  }),
  redate: action(function () {
    this.numA = 1
    this.numB = 2
  }),

  // 计算属性 computed
  // 根据已有的状态产生新的状态
  // 计算属性前面需要使用get修饰符进行修饰
  get sum() {
    // 计算属性内部必须要有返回值
    return this.numA + this.numB
  }
})