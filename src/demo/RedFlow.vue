<template>
  <p class="foobar">
  <button @click="another">Start Multiply Flow</button>
  <button @click="cancel">Cancel</button>
  Modals within modals!
  </p>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { multiplyKey } from './custom-flows'

// The @Component decorator indicates the class is a Vue component
@Component({})
export default class RedFlow extends Vue {
  another(): void {
    this.$flows.start(multiplyKey)
  }
  cancel(): void {
    this.$emit('close-flow')
  }
}
</script>

<style scoped>
.foobar {
  background-color: rgba(255,127,127,0.8);
  margin: 0;
}
</style>