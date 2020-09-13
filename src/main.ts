import Vue from 'vue'
import App from './App.vue'
import { VueFlows, VueFlowsRoot } from './vue-flows'
import flows from './custom-flows'

Vue.config.productionTip = false

Vue.use(VueFlows, {
  hideCovered: false,
  flows,
})

new Vue({
  render: h => h(VueFlowsRoot(App)),
}).$mount('#app')
