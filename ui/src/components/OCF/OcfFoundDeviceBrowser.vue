<script>
import TableBrowser from '@/BubotCore/components/TableBrowser/TableBrowser'
import {defineAsyncComponent} from "vue"

export default {
  name: 'OcfFoundDeviceBrowser',
  props: ['value'],
  data() {
    return {
      options: this.value,
    }
  },
  components: {
    AddDeviceWizard: defineAsyncComponent(() => import('./AddDeviceWizard/AddDeviceWizard')),
  },
  mixins: [TableBrowser],
  watch: {
    value(value) {
      this.options = Object.assign({}, this.options, value)
    }
  },
  methods: {
    actionAddDevice() {
      this.actionForm = {handler: 'AddDeviceWizard', visible: true}
    },
  }
}
</script>
<style scoped>

</style>
