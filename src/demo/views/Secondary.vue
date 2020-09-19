<template>
  <div>
    <h2>Secondary route</h2>
    <p><button @click="doTheThingZhuLi">Start Red Modal</button></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Secondary extends Vue {
  doTheThingZhuLi(): void {
    this.$flows.start('red')
  }
}
</script>