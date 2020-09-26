<template>
  <section>
    <h1>Multiply</h1>
    <p>
      Multiply {{payload}} by
      <input type="number"
             placeholder="Type a number"
             v-model="multiplier"/>
    </p>
    <p>
      <button @click="confirm">Multiply</button>
      <button @click="another">Start Red Modal!</button>
      <button @click="cancel">Cancel</button>
    </p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

// The @Component decorator indicates the class is a Vue component
@Component({})
export default class MyComponent extends Vue {
  @Prop()
  public payload?: number;

  multiplier = 1;

  public created() {
  }

  async another(): Promise<void> {
    await this.$flows.start('red', 'foo')
    console.log("Red modal (launched from multiply modal) was closed");
  }
  cancel(): void {
    this.$emit('close-flow')
  }
  confirm(): void {
    this.$emit('close-flow', this.multiplier * this.payload!);
  }
}
</script>

<style scoped>
section {
  background-color: rgba(255,255,255,0.8);
  margin: 0;
}
</style>