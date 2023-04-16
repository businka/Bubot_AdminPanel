<script>
import BaseTemplateMixin from '../../BubotCore/helpers/mixinTemplate/baseForm'
import ActionMixin from '../../BubotCore/helpers/mixinTemplate/action'
import { updateObject, objHasOwnProperty } from '../../Helpers/BaseHelper'
import { initDataSource } from '../../BubotCore/components/DataSource/DataSourceLoader'
import storage from './store'
// import Vue from 'vue'
import schemaStorage from './OcfSchema.store'


export default {
  name: 'OcfDriver',
  components: {
    OcfResourceTmpl: () => import('./OcfDriverResource'),
    PanelToolBar: () => import('../../BubotCore/components/Simple/PanelToolBar'),
  },
  mixins: [BaseTemplateMixin, ActionMixin],
  props: {
    toolBar: {
      type: Object,
      default: function () {
        return { items: [] }
      }
    },
    defaultAction: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dataSource: {
      type: Object,
      default: function () {
        return {}
      }
    },
    item: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },
  data: () => ({
    visible: false,
    loading: false,
    active: [],
    avatar: null,
    open: [],
    props_schema: null,
    props_data: null,
    source: null,
    itemFull: {},
    resIndex: {},
    mainRes: [],
    serviceRes: [],
    actionForm: {},
  }),
  computed: {
    title() {
      if (this.itemFull && this.itemFull.links) {
        return this.itemFull.links['/oic/d']['n']
      }
      return this.item['n']
    },
    items () {
      return this.props
    },
    resources () {
      try {
        return this.item.links
      } catch (e) {
        return []
      }
    },
    selected () {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.users.find(user => user.id === id)
    },
    uid () {
      if (this.item && this.source && this.source.keyProperty)
        return this.item[this.source.keyProperty]
      return undefined
    }
  },
  watch: {
    uid: function (value) {
      if (value) {
        this.init()
      }
    },
    dataSource () {
      this.source = initDataSource(this.dataSource, this.$store)
    }
  },
  async beforeMount () {
    this.source = initDataSource(this.dataSource, this.$store)
  },
  beforeCreate () {
    if (!objHasOwnProperty(this.$store.state, this.$options.name)) {
      this.$store.registerModule(this.$options.name, storage)
    }
    if (!objHasOwnProperty(this.$store.state, 'OcfSchema')) {
      this.$store.registerModule('OcfSchema', schemaStorage)
    }
  },
  methods: {
    async init () {
      // this.deviceLink = await this.source.read(this.uid)
      this.itemFull = updateObject({}, this.item)
      this.resIndex = {}
      this.mainRes = []
      this.serviceRes = []
      let links = this.itemFull['links']
      if (links) {

        for (let href in links) {
          if (Object.prototype.hasOwnProperty.call(links, href)) {
            let _path = `ocfServiceRes.${href}`
            try {
              if (links[href]['p']['bm'] === 0) {  // необнаруживаемые ресурсы нам не нужны
                continue
              }
            } catch {
              //
            }
            let res = this.mainRes
            if (this.$t(_path) === _path) { // для служебных ресурсов имя показывается стандартное и оно локализовано
              res = this.mainRes
            } else {
              res = this.serviceRes
            }
            res.push(href)
          }
        }
        this.mainRes = this.mainRes.sort()
        this.serviceRes = this.serviceRes.sort()
      }
    },
    async actionUpdateHeader (action) {
      if (action.data.action === 'change') {
        this.itemFull.links['/oic/d']['n'] = action.data.value
      }
    },
    // eslint-disable-next-line no-unused-vars
    actionSelectItem(data, component) {
      console.log
    },
    actionCallDataSourceForSelectedItems: function (actionData) {
      let source
      let payload = updateObject({ data: {} }, actionData)
      if (objHasOwnProperty(actionData, 'dataSource')) {
        source = initDataSource(actionData.dataSource, this.$store)
      } else {
        source = this.source
      }
      payload.data.items = [this.itemFull]
      payload.data.filter = null
      source.call(payload)
    },
    async actionUpdateRes (data) {
      this.itemFull.links[data['href']] = data['res']
    },
    async actionShowSelectForm (data) {
      this.actionForm = data
    },
    // eslint-disable-next-line no-unused-vars
    actionCloseForm(data, component) {
      if (component==='actionForm') {
        this.actionForm.visible = false

      } else (
        this.emitAction('CloseForm', data)
      )
    }
  }
}
</script>

<style lang="scss">
  div .PanelHeader {
    .v-text-field > .v-input__control > .v-input__slot:before {
      border-style: none;
    }
    input {
      font-size: x-large;
    }
  }
  .v-toolbar__content {
    padding-right: 0;
  }
</style>

<template>
  <v-container class="pa-0 ma-0">
    <v-progress-linear
      :indeterminate="loading"
      height="2"
      background-color="header1_bg"
    />
    <PanelToolBar
      :tool-bar="toolBar"
      :header-value="title"
      :edit-header="true"
      :loading="loading"
      @action="onAction"
    ></PanelToolBar>
    <v-container
      v-if="!loading"
      class="pa-4 ma-0"
    >
      <v-container
        v-if="mainRes.length"
        class="pa-0 ma-0"
      >
        <OcfResourceTmpl
          v-for="(href, i) in mainRes"
          :key="i"
          :res="itemFull.links[href]"
          :href="href"
          @action="onAction"
        />
      </v-container>
      <div
        v-if="serviceRes.length"
        class="text-h6 py-2"
      >
        {{ $t('ocfServiceResTitle') }}
      </div>
      <v-container
        v-if="serviceRes.length"
        class="pa-0 ma-0"
      >
        <OcfResourceTmpl
          v-for="(href, i) in serviceRes"
          :key="i"
          :res="itemFull.links[href]"
          :href="href"
          @action="onAction"
        />
      </v-container>
    </v-container>
    <component
      :is="actionForm.handler || 'RightDrawerFormViewer2'"
      v-if="actionForm && actionForm.visible"
      :form-uid="actionForm.formUid"
      :visible="actionForm.visible"
      @action="onAction($event, 'actionForm')"
    />
  </v-container>
</template>
