<script>
import Browser from '../../BubotCore/components/Layouts/Browser'

export default {
  name: 'OcfDeviceBrowser',
  components: {
    AddDeviceWizard: () => import('./AddDeviceWizard/AddDeviceWizard'),
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
