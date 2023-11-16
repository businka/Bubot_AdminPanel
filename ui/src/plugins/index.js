/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import {loadFonts} from './webfontloader'
import vuetify from '@/BubotCore/plugins/vuetify'
import {i18n, loadLocaleMessages} from '@/BubotCore/plugins/i18n'
import router from '../router'
import store from '../store/'
import highcharts from "./Highcharts"
import VueNativeSock from "vue-native-websocket-vue3";
import AppConst from "@/AppConst"


loadLocaleMessages(i18n.global)

export function registerPlugins(app) {
  loadFonts()
  app
    .use(vuetify)
    .use(i18n)
    .use(store)
    .use(router)
    .use(highcharts)
    .use(VueNativeSock, `ws://${window.location.host}/${AppConst.appName}/ws`, {
        reconnection: true, // (Boolean) whether to reconnect automatically (false)
        // reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
        reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
        // store: store,
        format: 'json'
      }
    )
}
