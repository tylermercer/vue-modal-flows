<template>
  <p class="foobar">
  <button @click="another">Another!</button>
  <button @click="cancel">Cancel</button>
  Modals within modals!
  </p>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// The @Component decorator indicates the class is a Vue component
@Component({})
export default class MyComponent extends Vue {
  another(): void {
    this.$flows.start()
  }
  cancel(): void {
    this.$emit('cancel-flow')
  }
}
</script>

<style>
.foobar {
  background-color: rgba(0,0,0,0.2);
  margin: 0;
}
</style>