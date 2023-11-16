<script>
import { updateObject } from '@/Helpers/BaseHelper'
import {defineAsyncComponent} from "vue"

export default {
  name: 'AddDeviceWizard',
  components: {
    StepSelectEcosystem: defineAsyncComponent(() => import('./StepSelectEcosystem')),
    StepDiscoverDevice: defineAsyncComponent(() => import('./StepDiscoverDevice')),
    StepAppleInputPin: defineAsyncComponent(() => import('./StepAppleInputPin')),
    StepConfigureResources: defineAsyncComponent(() => import('./StepConfigureResources'))
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 600
    },
  },
  data () {
    return {
      step: 1,
      result: {},
      device: '',
      steps: [
        {
          title: 'Select device',
          template: 'StepDiscoverDevice',
        },
        {
          title: 'Configure resources',
          template: 'StepConfigureResources',
        }

      ]
    }
  },
  methods: {
    onStep (data) {
      updateObject(this.result, data.result)
      if (Object.prototype.hasOwnProperty.call(data, 'steps'))
        this.steps = data.steps
      this.step = data.step
    },
  }
}
</script>

<style scoped>

</style>
<template>
  <v-navigation-drawer
    right
    :width="width"
    fixed
    class="elevation-6"
    permanent
    :value="visible"
  >
    <v-toolbar
      height="30"
      flat
      dense
      class="pl-2"
    >
      {{ $t('Add device') }}
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          icon
          dense
          small
          @click="$emit('action', { name: 'CloseForm' })"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-stepper
      v-model="step"
      vertical
      style="box-shadow: none"
    >
      <v-stepper-step
        :complete="step > 1"
        step="1"
      >
        <v-container
          class="pa-0"
          v-if="step === 1"
        >
          Select IoT ecosystem
        </v-container>
        <v-container v-else class="pa-0">{{result.ecosystem}}</v-container>
        <!--        <small v-if="step > 1">-->
        <!--          Select IoT ecosystem-->
        <!--        </small>-->
      </v-stepper-step>
      <v-stepper-content
        step="1"
        class="pa-0 pl-1"
      >
        <StepSelectEcosystem @onStep="onStep" />
      </v-stepper-content>
      <v-container
        v-for="(data, i) in steps"
        :key="`s${i + 2}`"
        class="pa-0"
      >
        <v-stepper-step
          :step="i + 2"
          :complete="step > i + 2"
        >
          {{data.title}}
        </v-stepper-step>

        <v-stepper-content
          :step="i + 2"
        >
          <component
            :is="data.template"
            v-if="step===i+2 && data.template"
            v-bind="data.props"
            :result="result"
          ></component>
        </v-stepper-content>
      </v-container>
    </v-stepper>
  </v-navigation-drawer>
</template>
