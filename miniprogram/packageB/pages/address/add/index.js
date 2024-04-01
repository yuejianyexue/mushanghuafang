import Schema from 'async-validator'
import {
  toast
} from '../../../../utils/extendApi'
import {
  reqAddAddress,
  reqAddressInfo,
  reqUpdateAddress
} from '../../../../api/address'
Page({
  // 页面的初始数据
  data: {
    name: "", //收货人
    phone: "", //手机号码
    provinceCode: "", //省编码 
    provinceName: "", //省
    address: "", //详细地址
    cityCode: "", //市编码
    cityName: "", //市
    createTime: "",
    districtCode: "", //区编码
    districtName: "", //区
    fullAddress: "", //完整地址
    id: 0,
    isDefault: false, //是否设置为默认地址，默认地址值为1
    isDeleted: 0,
    tagName: "",
    updateTime: "",
    userId: 0
  },

  // 保存收货地址
  async saveAddrssForm() {
    // 凭借完整地址，将默认地址值转化为0，1
    const {
      provinceName,
      cityName,
      districtName,
      address,
      isDefault
    } = this.data
    const params = {
      ...this.data,
      funAddress: provinceName + cityName + districtName + address,
      isDefault: isDefault ? 1 : 0
    }
    // 调用方法对最终的请求参数进行验证
    const {
      valid
    } = await this.validateAddress(params)

    // 如果验证没有通过，不继续执行后续的逻辑
    if (!valid) return
    //  console.log(params)
    const res = this.addressId? await reqUpdateAddress(params) : await reqAddAddress(params)
    // console.log(res)
    if (res.code === 200) {
      // 返回上级
      wx.navigateBack()
      toast({
        title:this.addressId? '更新收货地址成功' : '新增收货地址成功'
      })
    } else {
      toast({
        title: '异常'
      })
      console.log(res)
    }
  },

  // 省市区选择
  onAddressChange(event) {
    // console.log(event)
    // 解构省市区和省市区编码
    const [provinceName, cityName, districtName] = event.detail.value
    const [provinceCode, cityCode, districtCode] = event.detail.code

    this.setData({
      provinceName,
      cityName,
      districtName,
      provinceCode,
      cityCode,
      districtCode
    })

  },
  validateAddress(prams) {
    // 验证收货人，是否只包含大小写字母、数字和中文字符
    const nameReg = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'

    // 验证手机号，是否符合中国大陆手机号码的格式
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'

    // 创建验证规则，验证规则是一个对象
    // 每一项是一个验证规则，验证规则需要和验证的数据同名
    const rules = {
      name: [{
          required: true,
          message: '请输入收货人姓名'
        },
        {
          pattern: nameReg,
          message: '收货人姓名不合法'
        }
      ],
      phone: [{
        required: true,
        message: '请输入收货人手机号码'
      }, {
        pattern: phoneReg,
        message: '收货人手机号不合法'
      }, ],
      provinceName: {
        required: true,
        message: '请选择收货人所在地区'
      },
      address: {
        required: true,
        message: '请输入详细地址'
      }

    }
    // 创建验证实例，并传入验证规则
    const validator = new Schema(rules)

    // 调用实例方法对数据进行验证
    // 由于需要通过Promise的形式返回，所以要new一个Promise对象
    return new Promise((resolve) => {
      validator.validate(prams, (errors) => {
        if (errors) {
          // 验证失败
          toast({
            title: errors[0].message,
            icon: 'none'
          })
          resolve({
            valid: false
          })
        } else {
          resolve({
            valid: true
          })
        }
      })
    })
  },

  // 更新收货
  async showAddressInfo(id) {
    if (!id) {
      return
    }
    // 挂载到this上，方便多个方法中使用id
    this.addressId = id
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '更新收货地址',
    })
    // 通过接口获得要更新的收货地址详情
    //  const res = await reqAddressInfo(id)
    //  console.log(res)
    const {
      data
    } = await reqAddressInfo(id)
    this.setData(data)

    // reqUpdateAddress
  },
  //使用微信接口定位，尚未开痛接口无法实现
  getAddress(){
    wx.navigateTo({
      url: '/packageB/pages/Repeated/Repeated',
    })
  },

  onLoad(options) {
    // console.log(options.id)
    this.showAddressInfo(options.id)
  }
})