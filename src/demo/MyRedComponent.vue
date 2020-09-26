<template>
  <p class="foobar">
  <button @click="another">Start Black Modal</button>
  <button @click="cancel">Cancel</button>
  Modals within modals!
  </p>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { blackKey } from './custom-flows'

// The @Component decorator indicates the class is a Vue component
@Component({})
export default class MyRedComponent extends Vue {
  another(): void {
    this.$flows.start(blackKey)
  }
  cancel(): void {
    this.$emit('cancel-flow')
  }
}
</script>

<style scoped>
.foobar {
  background-color: rgba(255,127,127,0.8);
  color: red;
  margin: 0;
}
</style>