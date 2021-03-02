<script>
import ActionMixin from '../../BubotCore/helpers/mixinTemplate/action'
import OcfResourceTmplMixin from './OcfResourceTmplMixin'


export default {
  name: 'OcfDriverResource',
  components: {
    JsonElem: () => import('../../BubotCore/components/JsonEditor/JsonElem'),
    // JsonEditor: () => import('./JsonEditor'),
  },
  mixins: [ActionMixin, OcfResourceTmplMixin],
  computed: {
    resource: function () {
      if (this.edit) {
        return { value: this.editData }
      }
      return { value: this.res }
    },

  },
  methods: {
    async loadResource () {
    },
    async updateResource () {
      this.emitAction('UpdateRes', { href: this.href, res: this.editData })
      this.edit = false
    },
  }
}
</script>
