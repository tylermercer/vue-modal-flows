import { Flow, FlowKey } from '../plugin'
import MyComponent from './MyComponent.vue'
import MyRedComponent from './MyRedComponent.vue'

export const blackKey = new FlowKey<number,number>('black');

const flows: Flow[] = [
  {
    key: blackKey,
    component: MyComponent
  },
  {
    key: 'red',
    component: MyRedComponent
  }
]

export default flows;