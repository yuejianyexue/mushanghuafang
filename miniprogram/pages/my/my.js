import {ComponentWithStore} from 'mobx-miniprogram-bindings'
import {userStore} from '../../stores/userStores'
ComponentWithStore({
storeBindings:{
  store:userStore,
  fields:['token','userInfo']
},
 
  data: {
    // 初始化第二个面板数据
    initpanel: [
      {
        url: '/pages/order/list/list',
        title: '商品订单',
        iconfont: 'icon-dingdan'
      },
      {
        url: '/pages/order/list/list',
        title: '礼品卡订单',
        iconfont: 'icon-lipinka'
      },
      {
        url: '/pages/order/list/list',
        title: '退款/售后',
        iconfont: 'icon-shouhou'
      }
    ]
  },

methods:{
  // 跳转到登录页面
  toLoginPage() {
    wx.navigateTo({
      url: '/packageA/pages/login/login'
    })
  },
}
  
})