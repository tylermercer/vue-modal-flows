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

// The @Component decorator indicates the class is a Vue component
@Component({})
export default class MyRedComponent extends Vue {
  another(): void {
    this.$flows.start('black')
  }
  cancel(): void {
    this.$emit('cancel-flow')
  }
}
</script>

<style scoped>
.foobar {
  background-color: rgba(255,0,0,0.2);
  color: red;
  margin: 0;
}
</style>