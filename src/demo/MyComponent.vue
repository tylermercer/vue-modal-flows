<template>
  <p class="foobar">
  <button @click="another">Start Red Modal!</button>
  <button @click="cancel">Cancel</button>
  <router-link to="/secondary">Try to change route</router-link>
  Modals within modals!
  </p>
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

  public created() {
    console.log(this.payload);
  }

  another(): void {
    this.$flows.start('red')
  }
  cancel(): void {
    this.$emit('complete-flow', this.payload! * 7)
  }
}
</script>

<style scoped>
.foobar {
  background-color: rgba(0,0,0,0.2);
  margin: 0;
}
</style>