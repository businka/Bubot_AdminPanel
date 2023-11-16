<script>
import BaseTemplateMixin from '@/BubotCore/helpers/mixinTemplate/baseForm'
import ActionMixin from '@/BubotCore/helpers/mixinTemplate/action'
import storage from './store'
import schemaStorage from './OcfSchema.store'
import {defineAsyncComponent} from "vue"


export default {
  name: 'OcfDriver',
  components: {
    IotResource: defineAsyncComponent(() => import('./OcfResourceTmpl')),
  },
  mixins: [BaseTemplateMixin, ActionMixin],
  // props: ['item'],
  data: () => ({
    visible: false,
    active: [],
    avatar: null,
    open: [],
    props_schema: null,
    props_data: null
  }),
  computed: {
    // inputListeners: function () {
    //   var vm = this
    //   // `Object.assign` merges objects together to form a new object
    //   return Object.assign({},
    //     this.$listeners,
    //     {
    //       input: function (value) {
    //         vm.$emit('input', value)
    //       }
    //     }
    //   )
    // },
    items () {
      return this.props
    },
    resources () {
      return null
    },
    selected () {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.users.find(user => user.id === id)
    }
  },
  watch: {
    // resources: function (val) {
    //   console.log('action ' + val.name + ' view', val.id)
    //   this.loading = true
    //
    //   if (!this.visible && this.item.id !== val.id) {
    //     val.item = {}
    //   }
    //   this.visible = true
    //
    //   this.$http.get(`resource`, { params: { id: val.id } }).then(response => {
    //     this.item = response.data
    //     this.loading = false
    //   })
    // }
  },
  mounted () {
    this.init()
  },
  beforeCreate () {
    if (!Object.prototype.hasOwnProperty.call(this.$store.state, this.$options.name)) {
      this.$store.registerModule(this.$options.name, storage)
    }
    if (!Object.prototype.hasOwnProperty.call(this.$store.state, 'OcfSchema')) {
      this.$store.registerModule('OcfSchema', schemaStorage)
    }
  },
  methods: {
    async loadSchema () {
      // let result = {}
      // this.modeParams.links.forEach((item) => {
      //   result = await this.$store.dispatch('OcfSchema/read', {
      //     itemstore: this.store,
      //     params: this.params,
      //     id: this.modeParams.id
      //
      //   }, { root: true })
      // })
    },
    async init () {
      this.initStore()
      await this.initForm()
      await this.$store.dispatch(`${this.namespace}/read`, {
        store: this.store,
        params: this.params,
        id: this.modeParams.id

      }, { root: true })
    },
    async actionUpdate () {
      await this.$store.dispatch(
        `${this.store.namespace}/update`,
        {
          store: this.store,
          params: this.params,
        },
        { root: true })
      this.emitAction({ name: '' })
    },
    actionUpdateProp ({ path, action, value }) {
      this.$store.commit(`${this.store.namespace}/updateItemProps`, {
        uid: this.store.uid,
        path: 'item' + path,
        action,
        value
      }, { root: true })
    },
    // onChange(action, path, value) {
    //   this.$store.commit(`${this.namespace}/updateItemProps`, {
    //     uid: this.store.uid,
    //     action,
    //     path: 'item' + path,
    //     value
    //   }, { root: true })
    //   console.log('ress' + event)
    // },
    viewItem () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    emitInternalAction (action) {
      const context = this.$refs[this.store.uid]
      context.emitAction(action)
    },
    async defaultAction () {
      // await this.dispatchInternalAction({ name: this.form.components.defaultAction.name })
      // this.emitAction({ name: 'CloseForm', data: { name: this.name, result: true } })
      await this.dispatchAction({ name: 'update' })
      this.$emit('action', { name: 'CloseEditForm', data: { name: this.name, result: false } })
    },
    onClose () {
      this.$emit('action', { name: 'CloseEditForm', data: { name: this.name, result: false } })
    },
  }
}
</script>

<style lang="scss">
  .v-toolbar__content {
    padding-right: 0;
  }
</style>

<template>
  <v-container class="pa-0 ma-0">
    <v-progress-linear
      :indeterminate="data.loading"
      height="2"
      background-color="header1_bg"
    />
    <v-toolbar
      height="30"
      density="compact"
      class="header1_bg pa-0"
    >
      <v-spacer />
      <v-toolbar-items
        v-if="params.components.toolBar"
        class="pa-0"
      >
        <component
          :is="item.template || 'ActionBtn'"
          v-for="item in params.components.toolBar.items"
          :key="item.name"
          :params="item"
          @action="emitInternalAction"
        />
      </v-toolbar-items>
      <ActionBtnDefault
        v-if="params.components.defaultAction"
        :params="params.components.defaultAction"
        @action="defaultAction"
      />
      <v-toolbar-items>
        <v-btn
          icon
          dense
          small
          @click="onClose"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-toolbar
      v-if="params.components && params.components.tabs"
      density="compact"
      height="30"
      class="header1_bg"
    >
      <v-toolbar-items>
        <v-btn
          text
          :class="activeTab===0? 'activeTab text-none' : 'Tab text-none'"
          @click="activeTab=0"
        >
          {{ params.components.tabs[0][`title_${$i18n.locale}`] || params.components.tabs[0].title }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items>
        <v-btn
          v-for="(tab, index) in params.components.tabs"
          v-if="index>0"
          :key="index"
          text
          :class="activeTab===index ? 'activeTab text-none' : 'text-none'"
          @click="activeTab=index"
        >
          {{ tab[`title_${$i18n.locale}`] || tab.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container
      v-if="!data.loading"
      class="pa-0 ma-0"
    >
      <template>
        <div
          class="pa-0 ma-0"
        >
          <v-container
            v-for="href in resources"
            :key="href"
            class="pa-0 ma-0"
          >
            <IotResource
              :href="href"
              :value="resources[href]"
              :read-only="false"
              @action="onAction"
            />
          </v-container>
        </div>
      </template>
    </v-container>
  </v-container>
</template>
