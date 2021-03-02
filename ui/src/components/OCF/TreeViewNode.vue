<script>
export default {
  name: 'TreeViewNode',
  props: {
    index: {
      type: Number
    },
    level: {
      type: Number,
      default: 0
    },
    item: {
      type: Object
    },
    itemChildren: {
      type: String,
      default: 'children'
    },
    parent: {
      type: Array
    },
    path: {
      type: String,
      default: ''
    },
    edited: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    }
  },
  data: function() { return{
    opened: true,
    lTitle: this.item.name
  }},
  computed: {
    isNode () {
      return Object.prototype.hasOwnProperty.call(this.item, this.itemChildren)
    },
    // level () {
    //   return this.path.length
    // }
    inputListeners: function () {
      // let vm = this
      // `Object.assign` объединяет объекты вместе, чтобы получить новый объект
      return Object.assign({},
        // Мы добавляем все слушатели из родителя
        this.$listeners,
        // Затем мы можем добавить собственные слушатели или
        // перезаписать поведение некоторых существующих.
        // {
        //   // Это обеспечит, что будет работать v-model на компоненте
        //   input: function (event) {
        //     vm.$emit('input', event.target.value)
        //   }
        // }
      )
    }
  },
  methods: {
    onKey(event) {
      console.log(event)
    },
    onActivate() {
      if (this.path === this.active)
        this.$emit('activate', this.path)
    },
    onChangeName() {
      // this.$emit(this.item, 'name', value)
      this.$set(this.item, 'name', this.lTitle)
      this.$emit('endNameEditing')
    },
    onCancelChangeName() {
      // this.$emit(this.item, 'name', value)
      // this.$set(this.item, name, this.lTitle)
      this.lTitle = this.item.name
      this.$emit('endNameEditing')
    },
    onPush (folder) {
      let newItem = {
        name: ''
      }
      if (folder) {
        newItem.children = []
      }
      this.item[this.itemChildren].push(newItem)
      this.opened = true
    }
  }
}
</script>
<template>
  <v-container class="pa-0 ma-0">
    <v-list-item
      dense
      :value="path"
      class='treeview-node'
      :style="`padding-left:${(isNode? 0: 10) + level * 30}px`"
      @keydown.enter="onActivate"
    >
      <v-list-item-avatar
        class="pa-0 ma-0"
        v-if="isNode"
        @click.stop="opened=!opened">
        <v-icon>
          {{opened? 'mdi-minus-box-outline' : 'mdi-plus-box-outline' }}
        </v-icon>
      </v-list-item-avatar>

      <v-list-item-content class="pa-0 ma-0">
        <v-text-field
          v-if="edited && edited===path"
          v-model="lTitle"
          dense
          hide-details
          flat
          single-line
          autofocus
          class="ma-0 pa-0"
          @change="onChangeName"
          @keydown.enter.stop="onChangeName"
          @keydown.escape.stop="onCancelChangeName"
          @keydown="onKey"
        ></v-text-field>
        <div
          v-else
          @click="onActivate"
        >
          {{item.name ? item.name: 'empty' }}
        </div>
      </v-list-item-content>
      <v-list-item-action class="d-flex flex-row ma-0 pa-0 align-self-center">
        <v-btn
          v-if="isNode"
          dense
          icon
          class="show-on-hover"
          @click.stop="onPush(false)"
        >
          <v-icon>mdi-playlist-plus</v-icon>
        </v-btn>
        <v-btn
          v-if="isNode"
          dense
          icon
          class="show-on-hover"
          @click.stop="onPush(true)"
        >
          <v-icon>mdi-folder-plus-outline</v-icon>
        </v-btn>
        <v-btn
          dense
          icon
          class="show-on-hover"
          @click.stop="parent.splice(index,1)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-container
      class="pa-0 ma-0"
      v-if="isNode && opened"
    >
      <TreeViewNode
        v-for="(_item, index) in item[itemChildren]"
        :key="`${path}.${index}`"
        :index="index"
        :item="_item"
        :level="level+1"
        :parent="item[itemChildren]"
        :item-сhildren="itemChildren"
        :path="`${path}.${index}`"
        :edited="edited"
        :active="active"
        v-on="inputListeners"
      ></TreeViewNode>
    </v-container>
  </v-container>
</template>

<style scoped>
  .show-on-hover {
    visibility: hidden;
  }

  .treeview-node:hover .show-on-hover {
    visibility: visible;
  }
</style>
