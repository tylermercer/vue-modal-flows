<template>
  <div>
    <h2>Primary route</h2>
    <p><button @click="doTheThingZhuLi">Start Black Modal</button></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Primary extends Vue {
  doTheThingZhuLi(): void {
    this.$flows.start('black')
  }
}
</script>