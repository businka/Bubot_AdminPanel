// import { processInDataSource } from '@/BubotCore/helpers/mixinStore/index'
// import { initForm, error } from '@/BubotCore/helpers/mixinStore/actions'
// import { initStoreKey, updateItemProps } from '@/BubotCore/helpers/mixinStore/mutations'
// import { mode, getProps } from '@/BubotCore/helpers/mixinStore/getters'
import buxios from '@/BubotCore/helpers/buxios'
import {initStoreKey} from "@/BubotCore/helpers/mixinStore/mutations"
import { objHasOwnProperty, updateObject } from '@/Helpers/BaseHelper'
import appConst from "@/AppConst"
// import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    'data': {}
  },
  mutations: {
    update (state, { di, href, value, error, loading }) {
      let uid = `${di}${href}`;
      let current_value = objHasOwnProperty(state.data, uid) ? state.data[uid]['value'] : {}
      let data
      if (error) {
        data = { error, loading: false, value: {} }
      } else {
        data = { value: updateObject(current_value, value), loading: loading, error: undefined }
      }
      state.data = {...state.data, [uid]: data}
    },
    delete (state, { di, href }) {
      let uid = `${di}${href}`;
      if (objHasOwnProperty(state.data, uid)) {
        delete state.data[uid]
        state.data = {...state.data}
      }
    },
  },
  actions: {
    async read (store, resourceLink) {
      let result = {}
      store.commit('update', {
        di: resourceLink['di'],
        href: resourceLink['href'],
        value: {},
        error: undefined,
        loading: true
      })
      try {
        const response = await buxios.post(`/${appConst.appName}/api/OcfResource/read`, resourceLink )
        result = response.data
        store.commit('update', { di: resourceLink['di'], href: resourceLink['href'], value: result, loading: false })
      } catch (err) {
        store.commit('update', { di: resourceLink['di'], href: resourceLink['href'], error: err.toDict() })
      }
      return result
    },
    async update (store, resourceLink) {
      let result = {}
      try {
        const response = await buxios.post(`/${appConst.appName}/api/OcfResource/update`, resourceLink)
        result = response.data
      } catch (e) {
        result = {}
      }
      store.commit('update', { di: resourceLink['di'], href: resourceLink['href'], value: result })
      return result
    }
  }
}

