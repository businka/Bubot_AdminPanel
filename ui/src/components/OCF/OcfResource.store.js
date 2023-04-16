// import { processInDataSource } from '../../BubotCore/helpers/mixinStore/index'
// import { initForm, error } from '../../BubotCore/helpers/mixinStore/actions'
// import { initStoreKey, updateItemProps } from '../../BubotCore/helpers/mixinStore/mutations'
// import { mode, getProps } from '../../BubotCore/helpers/mixinStore/getters'
import buxios from '../../BubotCore/helpers/buxios'
import { objHasOwnProperty, updateObject } from '../../Helpers/BaseHelper'
import Vue from 'vue'

export default {
  namespaced: true,
  mutations: {
    change (state, { di, href, value, error, loading }) {
      let id = `${di}${href}`;
      let current_value = objHasOwnProperty(state, id) ? state[id]['value'] : {}
      let data
      if (error) {
        data = { error, loading: false, value: {} }
      } else {
        data = { value: updateObject(current_value, value), loading: loading, error: undefined }
      }
      Vue.set(state, id, data)
    },
  },
  actions: {
    async read (store, resourceLink) {
      let result = {}
      store.commit('change', {
        di: resourceLink['di'],
        href: resourceLink['href'],
        value: {},
        error: undefined,
        loading: true
      })
      try {
        const response = await buxios.get(`/api/${store.rootState.app}/OcfResource/read`, { params: resourceLink })
        result = response.data
        store.commit('change', { di: resourceLink['di'], href: resourceLink['href'], value: result, loading: false })
      } catch (err) {
        store.commit('change', { di: resourceLink['di'], href: resourceLink['href'], error: err.toDict() })
      }
      return result
    },
    async update (store, resourceLink) {
      let result = {}
      try {
        const response = await buxios.post(`/api/${store.rootState.app}/OcfResource/update`, resourceLink)
        result = response.data
      } catch (e) {
        result = {}
      }
      store.commit('change', { di: resourceLink['di'], href: resourceLink['href'], value: result })
      return result
    }
  }
}

