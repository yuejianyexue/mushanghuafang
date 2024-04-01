// 导入接口 API
import { reqIndexData } from '../../api/index'

Page({
  // 初始化数据
  data: {
    bannerList: [], // 轮播图数据
    categoryList: [], // 分类数据
    activeList: [], // 活动广告
    hotList: [], // 人气推荐
    guessList: [], // 猜你喜欢
    loading:true //是否显示骨架屏，默认显式

  },

  // 获取首页数据
  async getIndexData() {
  
    // 数组每一项是 Promise 产生的结果，并且是按照顺序返回。
    const res = await reqIndexData()
    // console.log(res)

    //依次对数据进行赋值
    this.setData({
      bannerList: res[0].data,
      categoryList: res[1].data,
      activeList: res[2].data,
      hotList: res[3].data,
      guessList: res[4].data,
      loading:false
    })
  },

  // 监听页面加载
  onLoad() {
    // 调用获取首页数据的回调
    this.getIndexData()
  }
})
