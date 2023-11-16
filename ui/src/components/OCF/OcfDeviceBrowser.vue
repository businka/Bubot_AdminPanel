<script>
import Browser from '@/BubotCore/components/TableBrowser/TableBrowser'
import {defineAsyncComponent} from "vue"

export default {
  name: 'OcfDeviceBrowser',
  components: {
    AddDeviceWizard: defineAsyncComponent(() => import('./AddDeviceWizard/AddDeviceWizard')),
  },
  mixins: [Browser],
  methods: {
    actionAddDevice() {
      this.actionForm = { handler: 'AddDeviceWizard', visible: true}
    },
  }
}
</script>
<style scoped>

</style>
