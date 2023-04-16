<script>
import ActionMixin from '../../BubotCore/helpers/mixinTemplate/action'
import { objHasOwnProperty } from '../../Helpers/BaseHelper'
import ocfSchemaStore from './OcfSchema.store'
import ocfResourceStore from './OcfResource.store'
import { updateProp } from '../../BubotCore/components/JsonEditor/JsonHelper'
import { jsonClone } from '../../Helpers/clone'

export default {
  name: 'OcfResourceTmpl2',
  components: {
    JsonElem: () => import('../../BubotCore/components/JsonEditor/JsonElem'),
    // JsonEditor: () => import('./JsonEditor'),
  },
  mixins: [ActionMixin],
  props: ['res', 'di', 'ep', 'href'],
  data: () => ({
    // schema: {},nnn
    editData: undefined,
    loaded: false,
    loading: false,
    show: false,
    changes: false,
    edit: false,
    hideReadOnly: false,
    error: undefined
  }),
  computed: {
    schemaUid () {
      if (this.res && this.res.rt)
        return this.res.rt.join('+')
      return undefined
    },

    schema () {
      if (this.schemaUid) {
        return this.$store.state.OcfSchema[this.schemaUid]
      }
      return {}
    },
    title: function () {
      let _path = `ocfServiceRes.${this.href}`
      let _locale = this.$t(_path)
      if (_path === _locale) {  // это основной ресурс
        let name = this.res['n'] || ''
        return name === this.href || `/${name}` === this.href ? '' : name
      } else {
        return _locale.title
      }
    }

  },
  watch: {
    res: function () {
      this.init()
    },
    show: function () {
      if (this.show && !this.loaded) {
        this.init()
      }
    }
  },
  mounted () {
    if (this.show) {
      this.init()
    }
  },
  beforeCreate () {
    if (!objHasOwnProperty(this.$store.state, 'OcfSchema')) {
      this.$store.registerModule('OcfSchema', ocfSchemaStore)
    }
    if (!objHasOwnProperty(this.$store.state, 'OcfResource')) {
      this.$store.registerModule('OcfResource', ocfResourceStore)
    }
  },
  methods: {
    async init () {
      this.loading = true
      await Promise.all([
        this.loadResource(),
        this.loadSchema()
      ])
      this.loaded = true
      this.loading = false
    },
    async loadSchema () {
      if (this.schemaUid)
        await this.$store.dispatch('OcfSchema/read', this.schemaUid, { root: true })
    },
    async loadResource () {
      throw new Error('Not implemented')
    },

    actionUpdateProp (data) {// ({ path, action, value }) {ц
      console.log('actionUpdateProp')
      this.changes = true
      updateProp(this.editData, data)
      // this._emitAction({ name: 'UpdateProp', data: { path: `${this.href}${path}`, action, value } })
    },
    async beginEdit () {
      if (!this.loaded)
        await this.init()
      this.show = true
      this.editData = jsonClone(this.resource.value)
      this.edit = true
    },
    onCancelEdit () {
      this.edit = false
      this.loadResource()

    }
  }
}
</script>

<style lang="scss" scoped>
  .expand-btn {
    padding: 12px 0 0;
  }
</style>

<template>
  <v-card
    class="pa-0 ma-0"
    flat
  >
    <v-hover
      v-slot="{ hover }"
    >
      <v-card-actions
        v-if="resource.error"
        class="pa-0 ma-0 pb-1"
      >
        <v-text-field
          :value="title"
          :label="href"
          flat
          :error-messages="`${resource.error.message} + ${resource.error.detail}`"
          readonlyw
        />
      </v-card-actions>
      <!--      <v-card-actions-->
      <!--        v-else-if="!resource.value || resource.loading"-->
      <!--        class="pa-0 ma-0 pb-1"-->
      <!--      >-->
      <!--        <v-text-field-->
      <!--          :value="title"-->
      <!--          :label="href"-->
      <!--          flat-->
      <!--          loading-->
      <!--          readonlyw-->
      <!--        />-->
      <!--      </v-card-actions>-->
      <v-card-actions
        v-else
        class="pa-0 ma-0 pb-1"
      >
        <div class="pt-4">
          <v-btn
            icon
            dense
            @click="show = !show"
          >
            <v-icon>{{ show ? 'mdi-minus-box-outline' : 'mdi-plus-box-outline' }}</v-icon>
          </v-btn>
        </div>
        <v-text-field
          :value="title"
          :label="href"
          flat
          hide-details
          :loading="loading"
          readonlyw
        />
        <div
          v-show="hover || show"
          class="pt-4"
        >
          <!--          <v-btn-->
          <!--            icon-->
          <!--            dense-->
          <!--            @click="hideReadOnly = !hideReadOnly"-->
          <!--          >-->
          <!--            <v-icon>{{ hideReadOnly ? 'mdi-eye-off-outline':'mdi-eye-outline' }}</v-icon>-->
          <!--          </v-btn>-->
          <v-btn
            v-if="!edit"
            icon
            dense
            @click="beginEdit"
          >
            <v-icon>{{ 'mdi-pencil' }}</v-icon>
          </v-btn>
          <v-btn
            v-if="edit"
            icon
            color="primary"
            outlined
            :disabled="!changes"
            @click="updateResource"
          >
            <v-icon>{{ 'mdi-check' }}</v-icon>
          </v-btn>
          <v-btn
            v-if="edit"
            icon
            dense
            @click="onCancelEdit"
          >
            <v-icon>{{ 'mdi-close' }}</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-hover>
    <!--<v-divider v-if="show" />-->
    <v-expand-transition>
      <v-card
        v-if="show"
        class="ml-4 pl-2"
        style="border-left: 1px solid gray"
        flat
        tile
      >
        <JsonElem
          :schema="schema"
          :elem-value="resource.value"
          elem-name=""
          :read-only="!edit"
          :hide-read-only="hideReadOnly"
          path=""
          :value="resource.value"
          @action="onAction"
        />
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
