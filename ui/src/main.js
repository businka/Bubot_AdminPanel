import Vue from 'vue'
import App from './BubotCore/App'
import vuetify from './BubotCore/plugins/vuetify';
import './BubotCore/plugins/cookies';
import store from './store'
import './BubotCore/plugins/websocket'
import { i18n, loadLanguageAsync } from './BubotCore/plugins/i18n'
import router from './router'

import './BubotCore/AppComponents'
import './AppComponents'

Vue.config.productionTip = false

// import VueNativeSock from 'vue-native-websocket'
//
// Vue.use(VueNativeSock, `ws://${window.location.host}/ws`, {
//   reconnection: true, // (Boolean) whether to reconnect automatically (false)
//   // reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
//   reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
//   // store: store,
//   // format: 'json'
// })
loadLanguageAsync()

new Vue({
  vuetify,
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
