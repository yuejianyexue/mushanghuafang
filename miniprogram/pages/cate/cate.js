// pages/cate/cate.js
Page({
  itemActive(e){
    this.setData({
     tab:e.currentTarget.dataset.x
})
  },

  /**
   * 页面的初始数据
   */
  data: {
    // num = 1,
    itemList:['热门分类','鲜花','蛋糕','永生花','精美礼品'],
    itemClass:'cate-item',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // itemActive(0)
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