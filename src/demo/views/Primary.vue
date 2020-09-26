<template>
  <div>
    <h2>Primary route</h2>
    <p><button @click="doTheThingZhuLi">Start Black Modal</button></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { blackKey } from './../custom-flows'

@Component({})
export default class Primary extends Vue {
  public doTheThingZhuLi() {
    console.log(blackKey);
    this.$flows.start(blackKey, 17, this.handleResult, this.handleCancel);
  }
  public handleResult(result: string) {
    console.log(result);
  }
  public handleCancel() {

  }
}
</script>