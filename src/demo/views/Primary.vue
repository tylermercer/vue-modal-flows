<template>
  <div>
    <h2>Primary route</h2>
    <p>
      <button @click="doTheThingZhuLi">
        Start Multiplication Modal
      </button>
    </p>
    <p>
      {{value}}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { blackKey } from './../custom-flows'

@Component({})
export default class Primary extends Vue {
  value = 7;

  public doTheThingZhuLi() {
    console.log(blackKey);
    this.$flows.start(
      blackKey,
      this.value,
      this.handleResult,
      this.handleCancel
    );
  }
  public handleResult(result: number) {
    this.value = result;
  }
  public handleCancel() {

  }
}
</script>