import http from '../utils/http'

/**
 * @description [商品详情加入购物车]以及[购物车更新商品数量]
 * @param {Object} parm {goodsId:商品ID，count:购买数量，blessing:祝福语} 
 */
export const reqAddCart = (data) =>{
  return http.get(`/mall-api/cart/addToCart/${goodsId}/${count}`,data)
}
/**
 * @description 获取购物车列表数据
 * @returns Promise
 */
export const reqCartList = () => {
  return http.get('/mall-api/cart/getCartList')
}

/**
 * @description 更新商品的选中状态
 * @param {*} goodsId 商品 id
 * @param {*} isChecked 商品的选中状态,0是取消勾选，1是勾选
 * @returns Promise
 */
export const reqUpdateChecked = (goodsId, isChecked) => {
  return http.get(`/mall-api/cart/checkCart/${goodsId}/${isChecked}`)
}

/**
 * @description 全选和全不选
 * @param {*} isChecked 商品的选中状态
 * @returns Promise
 */
export const reqCheckAllCart = (isChecked) => {
  return http.get(`/mall-api/mall-api/cart/checkAllCart/${isChecked}`)
}

/**
 * @description 删除购物车商品
 * @param {*} goodsId 商品 id
 * @returns Promise
 */
export const reqDelCart = (goodsId) => {
  return http.get(`/mall-api/cart/delete/${goodsId}`)
}