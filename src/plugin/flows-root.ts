import Vue, { VueConstructor, CreateElement, VNode, ComponentOptions } from 'vue';
import Flows from './Flows'

class KeyedModal {
  constructor(
    public key: string,
    public flow: VueConstructor){}
}

const rootElementStyles = {
  position: 'relative'
}

const coveredStyles = {
  display: 'none'
}

const modalStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}

/*
* This component contains the methods used by the Flows
* Plugin to create and control modals in the Flows root
* component
*
* NOTE: We don't use Vue.extend() here because using it
* means that the constructor is created before the $flows
* member is attached (when the plugin is attached with
* Vue.use(VueFlows)). It's really not ideal but it's the
* only way I could get everything to work properly.
*
* (For some extremely bizarre reason, the above bug only
* occurs in projects that use this library as a library;
* it does not occur in the demo project.)
*
* If you know of a better way to fix this bug, please
* submit a PR or file an issue with an explanation of
* the solution!
*/
export interface IFlowsRoot extends Vue {
  $flows: Flows;
  modals: VueConstructor[];
  shouldHide: (n?: number) => boolean;
  cancel: () => void;
}
export default {
  render(h: CreateElement): VNode {
    return h('div',
      { style: { rootElementStyles } },
      [
        h('div', { style: (this as IFlowsRoot).shouldHide() ? coveredStyles : {}}, (this as IFlowsRoot).$slots.default),
        ...(this as IFlowsRoot).modals!.map(
          (m:any, i:number) => h(m,
            {
              style: (this as IFlowsRoot).shouldHide(i) ? coveredStyles : modalStyles,
              on: { 'cancel-flow': (this as IFlowsRoot).cancel }
            }
          )
        )
      ]
    )
  },
  created() {
    (this as IFlowsRoot).$flows._attach(this as IFlowsRoot);
  },
  mounted() {
    //@ts-ignore because we don't know if they're using router
    if (this.$router) {
      //Reject route changes when modals are open
      //@ts-ignore because we don't know if they're using router
      this.$router.beforeEach((_, __, next) => {
        if ((this as IFlowsRoot).modals.length > 0) {
          next(new Error("Vue Modal Flows: Route navigation out of modal is not allowed. Please cancel the modal(s) and then change route."));
        }
        else {
          next();
        }
      });
    }
  },
  methods: {
    start(modal: VueConstructor, key: string): void {
      //@ts-ignore
      this.modals.push(modal)
      window.history.pushState(
        {flowsKey: key},
        "Modal"
      );
      window.onpopstate = () => {
        this.modals.pop();
        if (!this.modals.length) {
          window.onpopstate = () => {}
        }
      }
    },
    cancel(): void {
      window.history.back()
    },
    shouldHide(index = -1): boolean {
      return this.$flows._hideCovered && this.modals.length > index + 1;
    }
  },
  data: () => {
    return {
      modals: [] as VueConstructor[],
    }
  }
} as ComponentOptions<IFlowsRoot>;
