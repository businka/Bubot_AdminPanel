<script>
import Browser from '../../../BubotCore/components/Layouts/Browser'

export default {
  name: 'Step2Ecosystem',
  mixins: [Browser],
  props: {
    result: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },
  data () {
    return {
      homekit: {
        result: { ecosystem: 'HomeKit' },
        step: 2,
        steps: [
          {
            title: 'Input PIN',
          },
          {
            title: 'Select device',
          },
          {
            title: 'Configure resources',
          }
        ]
      }
    }
  }
}
</script>
<style scoped>

</style>
