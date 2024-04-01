import {reqGoodsList} from '../../../../api/goods'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
    total:0, //数据总条数
    isFinish: false ,// 判断数据是否加载完毕

    // 商品列表请求参数
    requestData:{
      page:1, // 页码
      limit:10, // 每页请求条数
      category1Id:'', //一级分类id
      category2Id:'' //二级分类id

    }
  },
  // 获取商品列表数据
  async getGoodList(){
   const {data} =  await reqGoodsList(this.data.requestData)
  //  console.log(res)
  this.setData({
    goodsList:data.records,
    total:data.total
  })

  },
  onLoad(option){
    // console.log(option)
    // 合并对象
    Object.assign(this.data.requestData,option),
    
    this.getGoodList()

  },
  gotoBack(){
    wx.navigateBack()
  }

})
