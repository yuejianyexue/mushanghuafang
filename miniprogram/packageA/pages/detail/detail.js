import {userBehavior} from '../../../behabiors/userBehavior'
import {reqGoodsInfo, reqGoodsList}from '../../../api/goods'
import {reqAddCart} from '../../../api/cart'
import { toast } from '../../../utils/extendApi'
Page({
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
	goodsInfo: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '', // 祝福语
    buyNow:0, //区分是加入购物车还是立即购买

  },

// 全屏预览图片
  previwImage(){
    wx.previewImage({
      urls: this.data.goodsInfo.detailList,
    })
  },
  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true,
      buyNow:0
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true,
      buyNow:1
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },
  // 弹窗的确定按钮
  async handlerSubmit(){
    const {token,count,blessing,buyNow} = this.data
    const goodsId = this.goodsId
    // 判断用户是否登录
    if(!token){
      wx.navigateTo({
        url: '/packageA/pages/login/login',
      })
      return
    }
    // 判断是加购还是立即购买，0是加购，1是立购
    if(buyNow===0){

     const res =  await reqAddCart({goodsId,count,blessing})
    //  console.log(res)
    if(res.code===200){
      toast({title:'加入购物车成功'})
      this.setData({
        show:false
      })
    }
    }else{
      wx.navigateTo({
        url: `/packageB/pages/order/detail/detail?${goodsId}&blessing=${blessing}`,
      })
    }
  },


  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    // console.log(event.detail)
    this.setData({
      count:Number(event.detail)
    })
  },
  async getGoodsInfo(){
  const {data:goodsInfo} = await reqGoodsInfo(this.goodsId)
  this.setData({
    goodsInfo
  })

  },
  onLoad(options){
    // 接收传递的商品Id，并挂载到this
    this.goodsId = options.goodsId

    this.getGoodsInfo()
  }
})
