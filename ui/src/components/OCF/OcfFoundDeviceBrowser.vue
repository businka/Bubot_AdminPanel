<script>
import Browser from '../../BubotCore/components/Layouts/TableBrowser'

export default {
    name: 'OcfFoundDeviceBrowser',
    props: ['value'],
    components: {
        AddDeviceWizard: () => import('./AddDeviceWizard/AddDeviceWizard'),
    },
    mixins: [Browser],
    beforeMount() {
      this.options.rows = this.value
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
