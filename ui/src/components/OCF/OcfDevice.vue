<script>
import BaseTemplateMixin from '../../BubotCore/helpers/mixinTemplate/baseForm'
import ActionMixin from '../../BubotCore/helpers/mixinTemplate/action'
import { updateObject, objHasOwnProperty, sortArrayObject } from '../../BubotCore/helpers/baseHelper'
import { initDataSource } from '../../BubotCore/components/Types/Source/DataSourceLoader'
import storage from './store'
// import Vue from 'vue'
import schemaStorage from './OcfSchema.store'


export default {
  name: 'OcfDevice',
  components: {
    OcfResourceTmpl: () => import('./OcfDeviceResource'),
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
    deviceLink: {},
    resIndex: {},
    mainRes: [],
    serviceRes: []
  }),
  computed: {
    title() {
      if (this.deviceLink.res && this.resIndex) {
        return this.deviceLink.res[this.resIndex['/oic/d']]['n']
      }
      return this.item['n']
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
      if (objHasOwnProperty(this.item, 'res')) {
        this.deviceLink = this.item
      } else {
        this.deviceLink = await this.source.read(this.uid)
      }
      this.resIndex = {}
      this.mainRes = []
      this.serviceRes = []
      let links = this.deviceLink['res']
      if (links) {
        for (let i = 0; i < links.length; i++) {
          let href = links[i]['href']
          let _path = `ocfServiceRes.${href}`
          this.resIndex[href] = i
          let res = this.mainRes
          if (this.$t(_path) === _path) { // для служебных ресурсов имя показывается стандартное и оно локализовано
            res = this.mainRes
          } else {
            res = this.serviceRes
          }
          res.push({ href: href, index: i })

        }
        sortArrayObject(this.mainRes, 'href')
        sortArrayObject(this.serviceRes, 'href')
      }
    },
    async actionUpdateHeader (action) {
      if (action.data.action === 'change') {
        this.loading = true
        await this.$store.dispatch('OcfResource/update', {
          di: this.item._id, ep: this.item.ep, href: '/oic/d', res: { 'n': action.data.value }
        }, { root: true })
        // this.emitAction('UpdateRes', { href: this.href, res: this.editData })
        this.edit = false
        this.loading = false

      }
    },
    actionCallDataSourceForSelectedItems: function (actionData) {
      let source
      let payload = updateObject({ data: {} }, actionData)
      if (objHasOwnProperty(actionData, 'dataSource')) {
        source = initDataSource(actionData.dataSource, this.$store)
      } else {
        source = this.source
      }
      payload.data.items = [this.deviceLink]
      payload.data.filter = null
      source.call(payload)
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
          v-for="(elem, i) in mainRes"
          :key="i"
          :res="deviceLink.res[elem.index]"
          :href="elem.href"
          :di="item._id"
          :ep="item.ep"
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
          v-for="(elem, i) in serviceRes"
          :key="i"
          :res="deviceLink.res[elem.index]"
          :href="elem.href"
          :di="item._id"
          :ep="item.ep"
          @action="onAction"
        />
      </v-container>
    </v-container>
  </v-container>
</template>
