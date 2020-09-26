import { Flow, FlowKey } from '../plugin'
import MultiplierFlow from './MultiplierFlow.vue'
import RedFlow from './RedFlow.vue'

export const multiplyKey = new FlowKey<number,number>('black');

const flows: Flow[] = [
  {
    key: multiplyKey,
    component: MultiplierFlow
  },
  {
    key: 'red',
    component: RedFlow
  }
]

export default flows;