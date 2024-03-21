import {BehaviorWithStore} from 'mobx-miniprogram-bindings'
import {userStore} from '../../../stores/userStores'

export const userBehavior = BehaviorWithStore({
  storeBindings:{
    store:userStore,
    fields:['userInfo'],
    actions:['setUserInfo']
  }
})