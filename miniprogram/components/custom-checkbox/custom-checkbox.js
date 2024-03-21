// components/test/test.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isCheckde:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateChecked(){
      
      this.setData({
        isCheckde: !this.data.isCheckde
      })
      console.log(this.data.isCheckde)
    }

  }
})