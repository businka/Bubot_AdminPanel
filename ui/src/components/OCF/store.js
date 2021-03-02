import { processInDataSource } from '../../BubotCore/helpers/mixinStore/index'
import { initForm, error } from '../../BubotCore/helpers/mixinStore/actions'
import { initStoreKey, updateItemProps } from '../../BubotCore/helpers/mixinStore/mutations'
import { mode, getProps } from '../../BubotCore/helpers/mixinStore/getters'

export default {
  namespaced: true,
  state: {},
  //   namespace: 'OcfDriver',
  //   formCheckProperty: 'columns'
  // },
  getters: {
    // get: get,
    mode: mode,
    getProps: getProps
  },
  mutations: {
    initStoreKey: initStoreKey,
    updateItemProps: updateItemProps,
    loading(state, { uid, loading, item} ) {
      state[uid] = { loading, item}
    },
  },
  actions: {
    initForm: initForm,
    error: error,
    read: async (store, payload) => {
      store.commit('loading', { uid: payload.store.uid, item: {}, loading: true })
      let item = await processInDataSource('read', store, payload)
      store.commit('loading', { uid: payload.store.uid, item, loading: false })
    },
    update: async (store, payload) => {
      // store.commit('loading', { uid: payload.store.uid, value: true })
      payload.data = store.state[payload.store.uid].item
      await processInDataSource('update', store, payload)
      // store.commit('read', { uid: payload.store.uid, data: data })
    }
  }
}
