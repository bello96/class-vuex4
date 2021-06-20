import { createStore } from '@/calssvuex'

export default createStore({
  // 组件中的data
  state: {
    count:1
  },
  // 计算属性，在vuex4中没有实现该功能
  getters: {
    double(state) {
      return state.count * 2
    }
  },
  // 修改状态，用于同步修改
  mutations: {
    add(state, payload) {
      state.count += payload
    }
  },
  // 调用其他的actions 或者 mutations，用于异步修改
  actions: {
    asyncAdd({ commit }, payload) {
      setTimeout(()=>{
        commit('add',payload)
      },1000)
    }
  }
})
