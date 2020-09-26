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

  public async doTheThingZhuLi() {
    const result: number = await this.$flows.start(
      blackKey, //The type of this FlowKey allows TypeScript to infer the return and payload types
      this.value
    );
    if (result != null) {
      this.value = result;
    }
  }
}
</script>