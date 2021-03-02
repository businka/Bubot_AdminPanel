<script>
import ActionMixin from '../../BubotCore/helpers/mixinTemplate/action'
import OcfResourceTmplMixin from './OcfResourceTmplMixin'

export default {
  name: 'OcfDeviceResource',
  components: {
    JsonElem: () => import('../../BubotCore/components/JsonEditor/JsonElem'),
    // JsonEditor: () => import('./JsonEditor'),
  },
  mixins: [ActionMixin, OcfResourceTmplMixin],
  computed: {
    resource: function () {
      let state = this.$store.state.OcfResource
      if (this.di && this.href && state[`${this.di}${this.href}`]) {
        if (this.edit) {
          return { value: this.editData }
        }
        return state[`${this.di}${this.href}`]
      }
      return {}
    },

  },
  methods: {
    async updateResource () {
      this.loading = true
      await this.$store.dispatch('OcfResource/update', {
        di: this.di, ep: this.ep, href: this.href, res: this.editData
      }, { root: true })
      // this.emitAction('UpdateRes', { href: this.href, res: this.editData })
      this.edit = false
      this.loading = false
    },
    async loadResource () {
      await this.$store.dispatch('OcfResource/read', { di: this.di, ep: this.ep, href: this.href }, { root: true })
    },
  }
}
</script>
