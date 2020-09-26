import Vue, { VueConstructor, CreateElement, VNode, ComponentOptions } from 'vue';
import Flows, { Flow } from './flows'
import { createFocusTrap, FocusTrap } from 'focus-trap'

class KeyedModal {
  constructor(
    public key: string,
    public flow: Flow,
    public payload: any,
    public onComplete: (result: any) => void,
    public onCancel: (result: any) => void
  ){}
  public focusTrap?: FocusTrap;
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
  modals: KeyedModal[];
  shouldHide: (n?: number) => boolean;
  cancel: (reason: any, callback: (reason: any) => void) => void;
  complete: (result: any, callback: (reason: any) => void) => void;
}
export default {
  render(h: CreateElement): VNode {
    const renderedFlows = (this as IFlowsRoot).modals!.map(
      (m:KeyedModal, i:number) => h(m.flow.component,
        {
          attrs: {
            'data-flow-layer': i
          },
          style: (this as IFlowsRoot).shouldHide(i) ? coveredStyles : modalStyles,
          on: {
            'cancel-flow': (reason: any) => (this as IFlowsRoot).cancel(reason, m.onCancel),
            'complete-flow': (result: any) => (this as IFlowsRoot).complete(result, m.onComplete)
          },
          props: {
            payload: m.payload
          }
        }
      )
    )

    return h('div',
      { style: { rootElementStyles } },
      [
        h(
          'div',
          { style: (this as IFlowsRoot).shouldHide() ?
            coveredStyles :
            {}
          },
          (this as IFlowsRoot).$slots.default
        ),
        ...renderedFlows
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
    start(
      modal: Flow,
      key: string,
      payload: any,
      onComplete: (result: any) => void,
      onCancel: (reason: any) => void
    ): void {
      const flowKey = key + this.modals.length;
      this.modals.push(
        new KeyedModal(flowKey, modal, payload, onComplete, onCancel)
        )
      window.history.pushState(
        { flowKey },
        ''
      );
      window.onpopstate = ({ state } : any) => {
        if (state == null) {
          this.modals = [];
        }
        else {
          const newTop = this.modals.findIndex(i => i.key === state.flowKey);
          this.modals.slice(newTop + 1)
            .forEach(m => m.focusTrap? m.focusTrap.deactivate() : null);

          this.modals = this.modals.slice(0, newTop + 1);
        }
        if (!this.modals.length) {
          window.onpopstate = () => {}
        }
      }
      this.$nextTick(() => {
        let lastModal = this.modals[this.modals.length-1]
        if (lastModal.flow.noFocusTrap) return;

        let n = this.modals.length - 1
        let el = document.querySelector(`*[data-flow-layer='${n}']`)
        if (!el) {
          console.error(
            `Vue Modal Flows: No \"*[data-flow-layer='${n}']\" found. ` +
            `Are you manipulating the attributes on your modal's root?`
          );
        }
        else {
          lastModal.focusTrap = createFocusTrap((el as HTMLElement));
          lastModal.focusTrap.activate();
        }
      })
    },
    cancel(reason: any, callback?: (reason: any) => void): void {
      window.history.back();
      if (callback) callback(reason);
    },
    complete(result: any, callback?: (result: any) => void): void {
      window.history.back();
      if (callback) callback(result);
    },
    shouldHide(index = -1): boolean {
      return this.$flows._hideCovered && this.modals.length > index + 1;
    }
  },
  data: () => {
    return {
      modals: [] as KeyedModal[],
    }
  }
} as ComponentOptions<IFlowsRoot>;
