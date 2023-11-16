<script>
import ActionMixin from '@/BubotCore/helpers/mixinTemplate/action'
import OcfResourceTmplMixin from './OcfResourceTmplMixin'

export default {
  name: 'OcfDeviceResource',
  mixins: [ActionMixin, OcfResourceTmplMixin],
  computed: {
    resource: function () {
      let state = this.$store.state.OcfResource
      let index = `${this.di}${this.href}`
      if (this.di && this.href && state.data[index]) {
        if (this.edit) {
          return this.editData
        }
        return state.data[index]
      }
      return {}
    },

  },
  methods: {
    async updateResource () {
      this.loading = true
      await this.$store.dispatch('OcfResource/update', {
        di: this.di, eps: this.eps, href: this.href, res: this.editData.value
      }, { root: true })
      // this.emitAction('UpdateRes', { href: this.href, res: this.editData })
      this.edit = false
      this.loading = false
    },
    async loadResource () {
      await this.$store.dispatch('OcfResource/read', { di: this.di, eps: this.eps, href: this.href }, { root: true })
    },
  }
}
</script>
