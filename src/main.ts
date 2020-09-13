import Vue from 'vue'
import App from './App.vue'
import { VueFlows, VueFlowsRoot } from './vue-flows'

Vue.config.productionTip = false

Vue.use(VueFlows)

new Vue({
  render: h => h(VueFlowsRoot(App)),
}).$mount('#app')
