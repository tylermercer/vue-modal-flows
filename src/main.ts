import Vue from 'vue'
import App from './App.vue'
import VueModalFlows from './plugins/vue-modal-flows'

Vue.config.productionTip = false

Vue.use(VueModalFlows)

new Vue({
  render: h => h(App),
}).$mount('#app')
