import Vue from 'vue'
import Vuex from 'vuex'
import AppConst from '../AppConst'

import { coreGetters, coreModules } from '../BubotCore/store/index'
// import { wsState, wsActions, wsMutations} from '../BubotCore/store/ws'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: Object.assign({}, wsState),
  // mutations: Object.assign({}, wsMutations),
  // actions: Object.assign({}, wsActions),
  state: {
    appName: AppConst.appName
  },
  getters: Object.assign({}, coreGetters),
  modules: Object.assign({}, coreModules)
})
