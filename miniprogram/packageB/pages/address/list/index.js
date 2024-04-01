// pages/address/list/index.js
import {
  reqAddressList,
  reqAddressInfodel
} from '../../../../api/address'
import { modal, toast } from '../../../../utils/extendApi'

Page({
  // 页面的初始数据
  data: {
    addressList: []
  },

  // 去编辑页面
  toEdit(event) {
    // 获取要更新的收货地址id
    // console.log(event)
    const {
      id
    } = event.currentTarget.dataset
    wx.navigateTo({
      
      url: `/packageB/pages/address/add/index?id=${id}`,

    })
  },

  // 获取收货地址列表数据
  async getAddressList() {
    // const res = await reqAddressList()
    // console.log(res)
    const {
      data: addressList
    } = await reqAddressList()
    this.setData({
      addressList
    })
  },

  //删除收货地址
 async delAddress(event){
    console.log(event)
    const {id} = event.currentTarget.dataset
    const modalRes = await modal({
      content:'您确认删除该收货地址吗？'
    })
    if(modalRes){
      await reqAddressInfodel(id)
      toast({title:'收货地址删除成功'})
      this.getAddressList()
    }
  } ,
  onShow() {
    this.getAddressList()
  }
})