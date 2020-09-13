import { VueConstructor } from 'vue';
import { Vue, Component } from 'vue-property-decorator';

interface HigherOrderComponent {
  (foo: VueConstructor): VueConstructor;
}

const rootElementStyles = {
  position: 'relative'
}

/*
* This interface contains the methods used by the Flows Plugin
* to create and control modals in the Flows root component
*/
export interface IFlowsRoot extends Vue {
  start(): void;
}

const VueFlowsRoot: HigherOrderComponent = (foo) => {
  /*
  * We create the component type dynamically so that the user
  * can just replace 'h(App)' with 'h(VueFlowsRoot(App))'
  */
  @Component({
    render(h) {
      return h('div', { style: rootElementStyles}, [
        h(foo),
        //Modals go here....
      ])
    },
    mounted() {
      this.$flows._attach(this as IFlowsRoot)
    },
  })
  class FlowsRoot extends Vue implements IFlowsRoot {
    public start(): void {

    }
  };
  return FlowsRoot;
}

export default VueFlowsRoot