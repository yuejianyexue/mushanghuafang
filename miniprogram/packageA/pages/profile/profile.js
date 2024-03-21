// pages/profile/profile.js
import {
  userBehavior
} from './behavior'
import {
  getStorage,
  setStorage
} from '../../../utils/storage'
import {
  reqUpdateUserInfo
} from '../../../api/user'
import {
  toast
} from '../../../utils/extendApi'
Page({
  // 注册userBehavior ,这样userBehavior的数据就会映射到data中
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框
  },

  //修改用户头像
  chooseAvatar(event) {
    // console.log(event)
    // 获取头像的临时路径
    // 临时路径具有时效性，需要将临时路径文件上传到服务器，获得永久路径以后再更新路径才可以
    const {
      avatarUrl
    } = event.detail
    // console.log(avatarUrl)

    // 将临时文件上传至服务器
    wx.uploadFile({
      filePath: avatarUrl,
      name: 'file',
      url: 'https://gmall-prod.atguigu.cn/mall-api/fileUpload',
      header: {
        token: getStorage('token')
      },
      success: (res) => {
        // console.log(res)
        // 要注意uploadFile的返回数据是字符串
        const uploadRes = JSON.parse(res.data)
        // console.log(uploadRes)
        this.setData({
          'userInfo.headimgurl': uploadRes.data
        })

      }
    })

  },
  getNickName(event){
    // console.log(event)
    const {nickname} = event.detail.value
    // console.log(nickname)
    this.setData({
      'userInfo.nickname':nickname,
      isShowPopup:false

    })
  },

  // 保存用户头像和昵称
  async updateUserInfo() {
    // 调用接口API更新用户信息
    console.log(this.data.userInfo)
    const res = await reqUpdateUserInfo(this.data.userInfo)
    console.log(res)
    if (res.code === 200) {
      // 用户信息更新成功以后，要将最新的信息保存到本地同时同步到Store
      // console.log(res)
      setStorage('userInfo', this.data.userInfo)
      // 同步到Store
      this.setUserInfo(this.data.userInfo)

      toast({
        title: '信息更新成功',
        icon: 'scuess'
      })

    }
  },
  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      isShowPopup: true,
      'userInfo.nickname':this.data.userInfo.nickname
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  }
})