// packageA/pages/login/login.js
import {
  toast
} from '../../../utils/extendApi'
import {
  reqLogin,
  reqUserInfo
} from '../../../api/user'
import {
ComponentWithStore
} from 'mobx-miniprogram-bindings'
import {userStore} from '../../../stores/userStores'
import {setStorage} from '../../../utils/storage'

ComponentWithStore({
storeBindings:{
  store:userStore,
  fields:['token','userInfo'],
  actions:['setToken','setUserInfo']
},

  methods: {
    // 授权登录
    login() {
      // 使用wx.login获取用户的临时登录凭证
      wx.login({
        // timeout: 0,
        success: async ({
          code
        }) => {
          // 这里的返回值是 res code是从中解构得到的数据
          console.log(code)
          if (code) {
            // 获取到临时登录凭证以后，传递给服务器
            const {data} = await reqLogin(code)
            // console.log(res)
            // 登录成功以后将服务器响应的自定义登录状态存储到本地
            // setStorage('token',res.data.token)
            setStorage('token',data.token)

            // 将自定义登录态 token 存储到 Store对象，便于全局调用
            this.setToken(data.token)

            // 获取用户信息
            this.getUSerInfo(data.token)

            // 返回上一级页面
            wx.navigateBack()
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
    // 获取用户信息
    async getUSerInfo(){
      const {data} = await reqUserInfo()
      // 将用户信息存储到本地
      setStorage('userInfo',data)
      // 将用户信息存储到Store对象
      this.setUserInfo(data)

    }
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