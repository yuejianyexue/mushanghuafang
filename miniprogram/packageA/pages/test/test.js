// packageA/pages/test.js

import {
  reqLogin
} from '../../../api/user'
import {
  toast,
  modal
} from '../../../utils/extendApi'

Page({

  login() {
    // 使用wx.login获取用户的临时登录凭证
    wx.login({
      // timeout: 0,
      success: async ({
        code
      }) => {
        this.setData({
          'output[0]': code
        })
        if (code) {
          // 获取到临时登录凭证以后，传递给服务器
          const res = await reqLogin(code)
          console.log(res)
          this.setData({
            'output[1]': res.data.token
          })
          console.log(this.data.output)

        } else {
          toast({
            title: '授权失败，重新授权'
          })
        }
      },
      // fail: (err) => {},
      // complete: (res) => {},
    })
  },
  // 将数据存储到本地
  setStorage() {
    // 第一个参数：本地存储指定的key
    // 第二个参数：需要存储的数据
    wx.setStorageSync('num', 1)

    // 在小程序中，存储对象类型数据，不需要使用JSON.stringify 和JSON.parse转换
    wx.setStorageSync('obj', {
      name: 'tom',
      age: 19
    })
    toast({
      title: '数据存储成功',
      icon: 'scuess',
      duration: 1000
    })

  },

  // 获取本地存储的数据
  getStorage() {
    const num = wx.getStorageSync('num')
    const obj = wx.getStorageSync('obj')

    if (num) {
      toast({
        title: '数据获取成功',
        icon: 'scuess',
        duration: 1000
      })
      console.log('num=', num, 'obj=', obj)
    } else {
      toast({
        title: '数据不存在',
        icon: 'error',
        duration: 1000
      })
    }
  },

  // 删除本地存储的数据
  removeStorage() {
    const num = wx.getStorageSync('num')
    if (num == '') {
      toast({
        title: '数据不存在',
        icon: 'error'
      })
    } else {
      modal({
        content: '是否删除num',
        success(res) {
          if (res.confirm) {
            wx.removeStorageSync('num')
          } else if (res.cancel) { }
        }
      })
    }

  },

  // 清空本地存储的全部数据
  clearStorage() {
    modal({
      content:'是否删除所有数据？',
      success(res){
        if (res.confirm){
          modal({
            content:'请注意此项操作不可恢复',
            success(res){
              if(res.confirm){
                wx.clearStorageSync()
              }
            }
          })
        }
      }
    })

  },



  /**
   * 页面的初始数据
   */
  data: {
    output: []
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