import registerCoreComponentsCore from '@/BubotCore/AppComponents'
import {defineAsyncComponent} from "vue"

// export default function registerComponents(app){
//   registerCoreComponentsCore(app)
//   app.component('OcfDriver', defineAsyncComponent(() => import('./components/OCF/OcfDriver')))
//   app.component('CellOcfDeviceTitle', defineAsyncComponent(() => import('./components/OCF/CellOcfDeviceTitle')))
//   app.component('OcfDevice', defineAsyncComponent(() => import('./components/OCF/OcfDevice')))
//   app.component('OcfDriverBrowser', defineAsyncComponent(() => import('./components/OCF/OcfDriverBrowser')))
//   app.component('OcfDeviceBrowser', defineAsyncComponent(() => import('./components/OCF/OcfDeviceBrowser')))
//   app.component('OcfFoundDeviceBrowser', defineAsyncComponent(() => import('./components/OCF/OcfFoundDeviceBrowser')))
// }

import OcfDriver from './components/OCF/OcfDriver'
import CellOcfDeviceTitle from './components/OCF/CellOcfDeviceTitle'
import OcfDevice from './components/OCF/OcfDevice'
import OcfDriverBrowser from './components/OCF/OcfDriverBrowser'
import OcfDeviceBrowser from './components/OCF/OcfDeviceBrowser'
import OcfFoundDeviceBrowser from './components/OCF/OcfFoundDeviceBrowser'

export default function registerComponents(app) {
  registerCoreComponentsCore(app)
  app.component('OcfDriver', OcfDriver)
  app.component('CellOcfDeviceTitle', CellOcfDeviceTitle)
  app.component('OcfDevice', OcfDevice)
  app.component('OcfDriverBrowser', OcfDriverBrowser)
  app.component('OcfDeviceBrowser', OcfDeviceBrowser)
  app.component('OcfFoundDeviceBrowser', OcfFoundDeviceBrowser)
}

