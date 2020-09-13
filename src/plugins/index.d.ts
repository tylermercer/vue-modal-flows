import { Flows } from './vue-modal-flows'

declare module 'vue/types/vue' {
  interface Vue {
    $flows: Flows;
  }
}