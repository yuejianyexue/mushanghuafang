import {ComponentWithStore} from 'mobx-miniprogram-bindings'
import {userStore} from '../../stores/userStores'
import {reqCartList}from '../../api/cart'
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
  methods: {
    async showTipGetList(){
      // 解构数据
      const {token} = this.data

      // 判断是否登录
      if(!token){
        this.setData({
          emptyDes:'您尚未登录，点击登录获取更多权益',
          cartList:[]
        })
        return
      }
      //获取数据
      const res = await reqCartList()
      console.log(res)
    },
    onShow(){
      // console.log(this.data.token)
      this.showTipGetList()

    }
  }
})
