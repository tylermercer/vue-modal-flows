import Flows from './flows'

declare module 'vue/types/vue' {
  interface Vue {
    $flows: Flows;
  }
}