import http from '../utils/http'

/**
 * @description 获取商品分类的数据
 * @returns Promise
 */
export const reqCategoryData = ()=>{
 return http.get('/index/findCategoryTree')
}