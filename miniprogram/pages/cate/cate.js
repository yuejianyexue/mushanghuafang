// pages/cate/cate.js
import {} from '../../api/category'
import { reqCategoryData } from '../../api/category'
Page({
  itemActive(e){
    this.setData({
     tab:e.currentTarget.dataset.index
})
  },
  async getCategoryData(){
    const res = await reqCategoryData()
    console.log(res.data)
    if(res.code === 200){
      this.setData({
        itemList:res.data
      })
    }
  } ,
  /**
   * 页面的初始数据
   */
  data: {
  
      itemList:[]  ,// 商品分类数据
      tab:0,
    // itemList:['热门分类','鲜花','蛋糕','永生花','精美礼品'],
    // itemClass:'cate-item',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // itemActive(0)
    // 调用商品分类数据的方法
   
    this.getCategoryData()
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