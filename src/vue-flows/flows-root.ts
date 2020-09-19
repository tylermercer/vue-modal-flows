import { VueConstructor, CreateElement, VNode } from 'vue';
import { Vue, Component } from 'vue-property-decorator';

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
* This class contains the methods used by the Flows Plugin
* to create and control modals in the Flows root component
*/
@Component<FlowsRoot>({
  created() {
    this.$flows._attach(this);
  },
})
export class FlowsRoot extends Vue {

  modals: KeyedModal[] = []

  public renderModals(h: CreateElement, app: VueConstructor): VNode {
    return h('div',
      { style: { rootElementStyles } },
      [
        h(app, { style: this.shouldHide() ? coveredStyles : undefined}),
        this.modals.map(
          (m, i) => h(m.flow,
            {
              style: this.shouldHide(i) ? coveredStyles : modalStyles,
              on: { 'cancel-flow': this.cancel }
            }
          )
        )
      ]
    );
  }

  public mounted() {
    if (this.$router) {
      //Reject route changes when modals are open
      this.$router.beforeEach((_, __, next) => {
        if (this.modals.length > 0) {
          next(new Error("Vue Modal Flows: Route navigation out of modal is not allowed. Please cancel the modal(s) and then change route."));
        }
        else {
          next();
        }
      });
    }
  }
  public start(modal: VueConstructor, key: string): void {
    const flowKey = key + this.modals.length;
    this.modals.push(
      new KeyedModal(flowKey, modal)
      )
    window.history.pushState(
      { flowKey },
      ''
    );
    window.onpopstate = ({ state } : any) => {
      console.log(state);
      if (state == null) {
        this.modals = [];
      }
      else {
        const newTop = this.modals.findIndex(i => i.key === state.flowKey);
        this.modals = this.modals.slice(0, newTop + 1);
      }
      if (!this.modals.length) {
        window.onpopstate = () => {}
      }
    }
  }

  public cancel(): void {
    window.history.back()
  }

  public shouldHide(index = -1) {
    return this.$flows._hideCovered && this.modals.length > index + 1;
  }
}

/*
  * This HOC creates a new concrete component type dynamically,
  * so that we can define the render function to properly overlay
  * the modals on top of the app
  */
const VueFlowsRoot: (app: VueConstructor) => VueConstructor = (app) => {
  @Component<CFlowsRoot>({
    render(h) {
      return this.renderModals(h, app);
    },
  })
  class CFlowsRoot extends FlowsRoot {}
  return CFlowsRoot
}

export default VueFlowsRoot