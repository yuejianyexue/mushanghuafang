import {ComponentWithStore} from 'mobx-miniprogram-bindings'
import {userStore} from '../../stores/userStores'
ComponentWithStore({
  storeBindings:{
    store:userStore,
    fields:['token']
  },
  // 组件的属性列表
  properties: {},

  // 组件的初始数据
  data: {
    cartList: [],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {}
})
