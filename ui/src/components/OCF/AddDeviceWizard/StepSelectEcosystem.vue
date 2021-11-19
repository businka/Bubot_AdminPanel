<script>


export default {
  name: 'Step1Ecosystem',
  data () {
    return {
      homekit: {
        result: {ecosystem: 'HomeKit'},
        step: 2,
        steps: [
          {
            title: 'Input PIN',
            template: 'StepAppleInputPin',
          },
          {
            title: 'Select device',
            template: 'StepDiscoverDevice',
            props: {
              "dataSource": {
                "type": "Vuex",
                "storeName": "LongOperations",
                "dispatchName": "run",
                "keyProperty": "id",
                "objName": "OcfDevice"
              }
            }
          },
          {
            title: 'Configure resources',
            template: 'StepConfigureResources',
          }
        ]
      },
      ocf: {
        result: {ecosystem: 'OCF'},
        step: 2,
        steps: [          {
          title: 'Select device',
          template: 'StepDiscoverDevice',
          props: {
            "toolbarItemsBeforeFilter": [
              {
                "name": "Reload",
                "icon": "mdi-reload",
                "title": "Reload"
              }
            ],
            "dataSource": {
              "type": "WebSocket",
              "keyProperty": "id",
              "objName": "OcfDevice",
              "query": "discover",
              "filter": {"owner": false}
            }
          }
        },]
      }
    }
  }
}
</script>
<style scoped>

</style>
<template>
  <v-container class="pa-0">
    <v-btn
      class="ma-3"
      outlined
      @click.stop="$emit('onStep', homekit)"
    >
      Apple HomeKit
    </v-btn>
    <v-btn
      class="ma-3"
      outlined
      @click.stop="$emit('onStep', 'MiHome')"
    >
      Xiaomi MiHome
    </v-btn>
    <v-btn
      class="ma-3"
      outlined
      @click.stop="$emit('onStep', 'Tuya')"
    >
      Tuya Smart
    </v-btn>
    <v-btn
      class="ma-3"
      outlined
      @click.stop="$emit('onStep', ocf)"
    >
      OCF
    </v-btn>
    <v-btn
      class="ma-3"
      outlined
      @click.stop="$emit('onStep', 'ModBus')"
    >
      Modbus
    </v-btn>
    <v-btn
      class="ma-3"
      outlined
      @click.stop="$emit('onStep', 'Radio433')"
    >
      Radio 433MHz
    </v-btn>
    <v-btn
      class="ma-3"
      outlined
      @click.stop="$emit('onStep', 'ZigBee')"
    >
      ZigBee
    </v-btn>
  </v-container>
</template>
