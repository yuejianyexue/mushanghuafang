// 导入模块
import WxRequest from 'mina-request'
import {getStorage,clearStorage} from './storage'
import {toast,modal} from './extendApi'
import {env} from './env'
// 示例化类

const instance = new WxRequest({
  // 测试url
  // baseURL:'https://gmall-prod.atguigu.cn/mall-api',
  baseURL: env.baseURL,
  timeout: 15000,
  isLoading: false
})

//添加请求拦截器（在请求发送之前，对请求参数进行新增或者修改）
instance.interceptors.request = (config) => {
  // 在实际开发中，有一些接口需要使用访问令牌 token
  // 访问令牌token通常是存储到本地的
  // 需要先从本地获取到存储的token
  const token = getStorage('token')

  // 如果本地存在token，则在请求头中添加token字段
  if(token){
    config.header['token']=token
  }

  // 在发送请求之前做些什么
  return config
}

// 添加响应拦截器（在服务器响应数据以后，对返回的数据进行逻辑处理）
instance.interceptors.response= async (response)=>{
  // response是服务器响应的数据，只是被wx.request进行了一层包装

  //解构response方便后续使用
  const {isSuccess,data} = response; 

  // response.config封装的包里面提供的config属性，是请求的参数信息
  // 可以使用参数信息进行代码的调试

  // response.data服务器真正响应的数据
  // response.isSuccess判断代码执行了哪个回调函数
  // isSuccess = true 说明代码执行了 wx.request方法的success回调函数，
  // 反之是fail回调函数，也代表网络出现了问题
  if(!isSuccess){
    toast({
      title:'网络异常请重试',
      icon:'error'
    })
    return response
  }
// 如果isSuccess = true，说明diam执行到了success回调函数
// 需要对返回的参数进行逻辑判断
// 需要对状态码进行判断
// 状态 === 200，调用成功，服务器成返回数据
// 状态码 ===208 ，没有token或者token已经过期，需要让用户重新登录
// 状态码等于其他，则是出现了其他异常，需要同意给用户提示

switch(data.code){
  case 200:
    // 接口调用成功
    return data
  case 208:
    const res = await modal({
      content:'登录已过期，请重新登录',
      showCancel:false
    })
    if(res){
      // 当用户点击确定时
      // 既然用户需要进行重新登录，就需要把之前存储的信息（过期token）删除
      clearStorage()
      wx.navigateTo({
        url: '/packageA/pages/login/login',
      })

    }
    default:
      toast({
        title:'程序出现异常，请联系客服，或稍后重试'
      })
      return Promise.reject(response)
  }
}
  // 导出实例
export default instance