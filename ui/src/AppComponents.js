import Vue from 'vue'

Vue.component('OcfDriver', () => import('./components/OCF/OcfDriver'))
Vue.component('CellOcfDeviceTitle', () => import('./components/OCF/CellOcfDeviceTitle'))
Vue.component('OcfDevice', () => import('./components/OCF/OcfDevice'))
Vue.component('OcfDriverBrowser', () => import('./components/OCF/OcfDriverBrowser'))
Vue.component('OcfDeviceBrowser', () => import('./components/OCF/OcfDeviceBrowser'))
// Vue.component('OcfDriver', () => import('./components/Iot/OcfDriver'))
// Vue.component('IotDevice', () => import('./components/IotDevice'))
// Vue.component('IotResource', () => import('./components/IotResource'))
