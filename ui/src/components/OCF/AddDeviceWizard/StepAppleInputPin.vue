<script>


export default {
  name: 'Step3Ecosystem',
  data () {
    return {
      homekit: {
        result: {ecosystem: 'HomeKit'},
        step: 2,
        steps: [
          {
            title: 'Input PIN',
          },
          {
            title: 'Select device',
          },
          {
            title: 'Configure resources',
          }
        ]
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
      @click.stop="$emit('onStep', 'OCF')"
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
