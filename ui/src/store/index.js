import { createStore } from "vuex";
import AppConst from '../AppConst'

import { coreGetters, coreModules } from '../BubotCore/store/index'
// import { wsState, wsActions, wsMutations} from '../BubotCore/store/ws'

export default createStore({
  // state: Object.assign({}, wsState),
  // mutations: Object.assign({}, wsMutations),
  // actions: Object.assign({}, wsActions),
  devtools: true,
  state: {
    appName: AppConst.appName
  },
  getters: Object.assign({}, coreGetters),
  modules: Object.assign({}, coreModules)
})
