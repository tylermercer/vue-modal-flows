import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { VueFlows, VueFlowsRoot } from './vue-flows'
import flows from './custom-flows'
import routes from './routes'

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VueRouter);

Vue.use(VueFlows, {
  hideCovered: false,
  flows,
  hashPrefix: 'flow-'
})

new Vue({
  router,
  render: h => h(VueFlowsRoot(App)),
}).$mount('#app')
