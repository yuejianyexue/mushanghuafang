  import {ComponentWithComputed} from 'miniprogram-computed'
  // 先导入再替换掉下面的 comppnent
  ComponentWithComputed({
  //  计算属性是根据已有数据产生新的数据

  // 在使用ComponentWithComputed方法构建组件以后
  // 可以新增两个配置项，computed和watch

  computed:{
  // 计算属性内部必须有返回值
  // 在计算属性那内部不能使用this来获取data数据
  // 要使用形参来获取 data 中的数据、
  total(data){
  console.log(data)
  return data.a+data.b
  }
  },

  watch:{
    'a,b':function(a,b){
      this.setData({
        'watch_output[0]':a,
        'watch_output[1]':b
      })
    }
  },
    data: {
      a:1,
      b:2,
      watch_output:[],
    },
methods:{
  update(){
    console.log('11')
    this.setData({
      a:this.data.a +1,
      b: this.data.b +1
    })
  }
}
  })