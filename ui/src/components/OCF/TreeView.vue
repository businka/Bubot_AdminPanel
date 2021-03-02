<script>
export default {
  name: 'TreeView',
  components: {
    'TreeViewNode': () => import('./TreeViewNode'),
  },
  props: {
    value: {
      type: Array
    },
    itemChildren: {
      type: String,
      default: 'children'
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
   return {   edited: '',
      active: ''
    }
  },
  methods: {
    onKey(event) {
      console.log(event)
    },
    onActivate (path) {
      // console.log(path +'='+ this.active)
      if (path === this.active) {
        this.edited = this.active
      } else {
        this.active = path
        this.edited = ''
      }
    }
  }
}
</script>

<template>
  <v-list
    dense
  >
    <v-list-item-group
      @change="onActivate"
      mandatory
    >
      <TreeViewNode
        v-for="(item, index) in value"
        :key="index"
        :index="index"
        :item="item"
        :item-сhildren="itemChildren"
        :editable="editable"
        :parent="value"
        :path="''+index"
        :edited="edited"
        :active="active"
        @endNameEditing="edited=''"
        @activate="onActivate"
      ></TreeViewNode>
    </v-list-item-group>
  </v-list>
</template>


<style scoped>

</style>
