import { Flow } from './vue-flows'
import MyComponent from './MyComponent.vue'
import MyRedComponent from './MyRedComponent.vue'

const flows: Flow[] = [
  {
    key: 'black',
    component: MyComponent
  },
  {
    key: 'red',
    component: MyRedComponent
  }
]

export default flows;