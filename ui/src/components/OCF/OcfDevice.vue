<script>
import BaseTemplateMixin from '@/BubotCore/helpers/mixinTemplate/baseForm'
import ActionMixin from '@/BubotCore/helpers/mixinTemplate/action'
import {updateObject, objHasOwnProperty} from '@/Helpers/BaseHelper'
import {sortArrayObject} from '@/Helpers/ArrayHelper'
import {initDataSource} from '@/BubotCore/components/DataSource/DataSourceLoader'
import storage from './store'
// import Vue from 'vue'
import schemaStorage from './OcfSchema.store'
import ocfResourceStore from './OcfResource.store'
// import {defineAsyncComponent} from "vue"
import OcfDeviceResource from "./OcfDeviceResource"
import PanelToolBar from "@/BubotCore/components/Simple/PanelToolBar"


export default {
  name: 'OcfDevice',
  components: {
    OcfDeviceResource,
    PanelToolBar,
  },
  mixins: [BaseTemplateMixin, ActionMixin],
  props: {
    toolBar: {
      type: Object,
      default: function () {
        return {items: []}
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
      if (this.deviceLink.res && this.resIndex && this.resIndex['/oic/d']) {
        return this.deviceLink.res[this.resIndex['/oic/d']]['n']
      }
      return this.item['n']
    },
    selected() {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.users.find(user => user.id === id)
    },
    uid() {
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
    dataSource() {
      this.source = initDataSource(this.dataSource, this.$store)
    }
  },
  async beforeMount() {
    this.source = initDataSource(this.dataSource, this.$store)
  },
  beforeCreate() {
    if (!objHasOwnProperty(this.$store.state, this.$options.name)) {
      this.$store.registerModule(this.$options.name, storage)
    }
    if (!objHasOwnProperty(this.$store.state, 'OcfSchema')) {
      this.$store.registerModule('OcfSchema', schemaStorage)
    }
    if (!objHasOwnProperty(this.$store.state, 'OcfResource')) {
      this.$store.registerModule('OcfResource', ocfResourceStore)
    }
  },
  methods: {
    async init() {
      this.loading = true
      if (objHasOwnProperty(this.item, 'res')) {
        this.deviceLink = this.item
      } else {
        this.deviceLink = await this.source.read(this.uid)
      }
      await this.initData()
      this.loading = false
    },
    initData: async function () {
      this.resIndex = {}
      this.mainRes = []
      this.serviceRes = []
      let res
      let links = this.deviceLink['res']
      if (links) {
        for (let i = 0; i < links.length; i++) {
          let href = links[i]['href']
          this.$store.commit('OcfResource/delete', {di: this.deviceLink['di'], href})

          let _path = `ocfServiceRes.${href}.title`
          this.resIndex[href] = i
          if (this.$t(_path) === _path) { // для служебных ресурсов имя показывается стандартное и оно локализовано
            res = this.mainRes
          } else {
            res = this.serviceRes
          }
          res.push({href: href, index: i})

        }
        sortArrayObject(this.mainRes, 'href')
        sortArrayObject(this.serviceRes, 'href')
      }
    },
    async actionUpdateHeader(action) {
      if (action.data.action === 'change') {
        this.loading = true
        await this.$store.dispatch('OcfResource/update', {
          di: this.item._id, ep: this.item.ep, href: '/oic/d', res: {'n': action.data.value}
        }, {root: true})
        // this.emitAction('UpdateRes', { href: this.href, res: this.editData })
        this.edit = false
        this.loading = false

      }
    },
    actionCallDataSourceForSelectedItems: async function (actionData) {
      this.loading = true
      let source
      let payload = updateObject({data: {}}, actionData)
      if (objHasOwnProperty(actionData, 'dataSource')) {
        source = initDataSource(actionData.dataSource, this.$store)
      } else {
        source = this.source
      }
      payload.data.items = [this.deviceLink]
      payload.data.filter = null
      try {
        let resp = await source.call(payload)
        this.deviceLink = resp[0]
        await this.initData()
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
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
        <OcfDeviceResource
          v-for="(elem, i) in mainRes"
          :key="i"
          :res="deviceLink.res[elem.index]"
          :href="elem.href"
          :di="deviceLink.di"
          :eps="deviceLink.eps"
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
        <OcfDeviceResource
          v-for="(elem, i) in serviceRes"
          :key="i"
          :res="deviceLink.res[elem.index]"
          :href="elem.href"
          :di="deviceLink.di"
          :eps="deviceLink.eps"
          @action="onAction"
        />
      </v-container>
    </v-container>
  </v-container>
</template>
