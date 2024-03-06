const toast = ({title= '数据加载中...', icon='none', duration=2000, mask=true}={})=>{
wx.showToast({
  title,
  icon,
  duration,
  mask
})
}

// 在其他.js文件，需要使用toast方法，需要先导入toast再调用
// 
export{toast}