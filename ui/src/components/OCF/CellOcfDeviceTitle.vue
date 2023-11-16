<script>
export default {
  name: 'CellOcfDeviceTitle',
  props: {
    col: {
      type: Object,
      default: () => {
      }
    },
    modelValue: {
      type: Object,
      default: () => {
      }
    },
  }
}
</script>

<template>
  <div>
    <v-row class="d-flex align-baseline  pa-0 ma-0">
      <div class="text-body-1 pa-0 ma-0">{{ modelValue.n }}</div>
    </v-row>
    <v-row class="text-caption pa-0 ma-0 text--secondary">
      {{ modelValue.di }}
    </v-row>
  </div>
</template>
