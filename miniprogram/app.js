// app.js
import {modal, toast} from './utils/extendApi'
App({
  data:{
    commodityTestURL:'/packageA/pages/commodity/commodity'
  },
onShow(){
  toast()
  
  // 获取当前小程序的账号信息
  // const accountInfo = wx.getAccountInfoSync()
  // console.log(accountInfo.miniProgram.envVersion) 
},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
