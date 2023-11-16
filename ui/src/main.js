/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './BubotCore/App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import registerCoreComponents from './AppComponents'

const app = createApp(App)

registerPlugins(app)
registerCoreComponents(app)

app.mount('#app')
export default app
