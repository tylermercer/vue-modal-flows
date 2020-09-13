import { VueConstructor } from 'vue';
import { Vue, Component } from 'vue-property-decorator';

const MODAL_HASH_PREFIX = "#modal-";

const rootElementStyles = {
  position: 'relative'
}

const coveredStyles = {
  visibility: 'hidden'
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
    if (window.location.hash.startsWith(MODAL_HASH_PREFIX)) {
      this.$flows.start(
        window.location.hash.substring(
          MODAL_HASH_PREFIX.length
        )
      )
    }
  },
})
export class FlowsRoot extends Vue {
  public start(modal: VueConstructor, key: string): void {
    this.modals.push(modal)
    window.history.pushState(
      {},
      "Modal",
      window.location.pathname +
      MODAL_HASH_PREFIX + key
    );
    window.onpopstate = () => {
      this.modals.pop();
      if (!this.modals.length) {
        history.pushState('', document.title, window.location.pathname);
        window.onpopstate = () => {}
      }
    }
  }

  public cancel(): void {
    window.history.back()
  }

  modals: VueConstructor[] = []

  public shouldHide(index: number = -1) {
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
      return h('div',
        { style: { rootElementStyles } },
        [
          h(app, { style: this.shouldHide() ? coveredStyles : {}}),
          this.modals.map(
            (m, i) => h(m,
              {
                style: this.shouldHide(i) ? coveredStyles : modalStyles,
                on: { 'cancel-flow': this.cancel }
              }
            )
          )
        ]
      )
    },
  })
  class CFlowsRoot extends FlowsRoot {};
  return CFlowsRoot
}

export default VueFlowsRoot