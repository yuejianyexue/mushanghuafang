// components/Store-test/Store-test.js
// 如果需要在组件中使用Store中的数据和方法，需要引入componentWithStore方法

import {ComponentWithStore} from 'mobx-miniprogram-bindings'
// import {ComponentWithStore} 
// 当前组件需要使用的Store对象也要导入
import {numStore} from '../../stores/numstore'
// 然后将component替换成componentWithStore

ComponentWithStore({
 //  新增一个可用配置项：storeBindings
// 用来配置当前组件需要与哪些Store进行关联
// 配置项中引入的数据和方法会被注入到data、methods对象中，可以直接使用

storeBindings:{
  store:numStore,
  fields:['numA','numB','sum'],
  actions:['update','redate']
},

})