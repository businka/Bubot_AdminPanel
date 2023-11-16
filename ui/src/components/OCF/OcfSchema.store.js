// import { processInDataSource } from '@/BubotCore/helpers/mixinStore/index'
// import { initForm, error } from '@/BubotCore/helpers/mixinStore/actions'
// import { initStoreKey, updateItemProps } from '@/BubotCore/helpers/mixinStore/mutations'
// import { mode, getProps } from '@/BubotCore/helpers/mixinStore/getters'
import axios from 'axios'
import {initStoreKey} from "@/BubotCore/helpers/mixinStore/mutations"
import appConst from "@/AppConst"
// import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    'data': {}
  },
  // getters: {},
  mutations: {
    initStoreKey: initStoreKey,
    // schema (state, { uid, schema }) {
    //   Vue.set(state, uid, schema)
    // },
  },
  actions: {
    async read (store, schemaUid) {
      if (!schemaUid) {
        return {}
      }
      // if (!payload.href && !payload.schemaUid) {
      //   console.error(`not defined schema for "${payload.href}"`)
      //   return {}
      // }
      // const schemaUid = payload.schemaUid
      // const schemaId = rt.join('+')
      if (Object.prototype.hasOwnProperty.call(store.state.data, schemaUid)) {
        return await store.state.data[schemaUid]
      } else {
        console.log('load scheme ' + schemaUid)
        let result = {}
        try {
          const response = await axios.get(`/${appConst.appName}/api/OcfSchema/read`, { params: { id: schemaUid } })
          result = response.data
        } catch (e) {
          result = {}
        }
        store.commit('initStoreKey', {
          uid: schemaUid, data: result
        })
        return result
      }
    }
  }
}
