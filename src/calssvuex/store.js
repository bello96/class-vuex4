import { reactive } from 'vue'
import { forEachValue } from './utils'
import { storeKey } from './injectKey'

export default class Store {
  constructor(options) { 
    // vuex4 中数据响应式直接使用vue3 提供的响应式方法
    // state
    const store = this;
    store._store = reactive({ data: options.state }) // 用data属性多包一层就是为了解决重新赋值问题
    store.state = store._store.data

    // getters
    store.getters = {}
    const _getters = options.getters;
    forEachValue(_getters, function (fn,key) {
      Object.defineProperty(store.getters, key, {
        get: () => fn(store.state)
      })
    })

    // mutations
    store._mutations = Object.create(null)
    const _mutations = options.mutations
    forEachValue(_mutations, (mutations, key) => {
      store._mutations[key] = payload => {
        mutations.call(store,store.state,payload)
      }
    })

    // actions
    store._actions = Object.create(null)
    const _actions = options.actions
    forEachValue(_actions, (actions, key) => {
      store._actions[key] = payload => {
        actions.call(store,store,payload)
      }
    })
  }

  commit = (type,payload) => {
    this._mutations[type](payload)
  }

  dispatch = (type,payload) => {
    this._actions[type](payload)
  }

  install(app,injectKey) { // createApp().use(store,'xxx')
    // 全局暴漏一个变量 暴露的就是store实例
    // 给根app增加一个_provides,子组件会向上查找
    app.provide(injectKey || storeKey, this)
    // Vue.prototype.$store = this
    app.config.globalProperties.$store = this // 增加$store属性
  }
}