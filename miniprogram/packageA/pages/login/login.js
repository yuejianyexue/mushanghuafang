// packageA/pages/login/login.js
import {toast} from '../../../utils/extendApi'
import {reqLogin} from '../../../api/user'
Page({
  // 授权登录
  login(){
    // 使用wx.login获取用户的临时登录凭证
  wx.login({
  // timeout: 0,
  success: async ({code}) => {
    console.log(code)
    if(code){
      // 获取到临时登录凭证以后，传递给服务器
    const res =  await reqLogin(code)
    console.log(res)

    }else{
      toast({
        title:'授权失败，重新授权'
      })
    }
  },
  // fail: (err) => {},
  // complete: (res) => {},
})
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})