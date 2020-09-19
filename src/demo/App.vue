<template>
  <FlowsRoot id="app">
    <p>This is a vue-modal-flows test app</p>
    <router-link to="/">Primary</router-link>
    {{" "}}
    <router-link to="/secondary">Secondary</router-link>
    <router-view/>
  </FlowsRoot>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FlowsRoot } from '../plugin'

@Component({
  components: {
    FlowsRoot
  }
})
export default class App extends Vue {
  public doTheThingZhuLi() {
    this.$flows.start('black')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 60px 10px 10px 10px;
}
body {
  margin: 0;
}
</style>
