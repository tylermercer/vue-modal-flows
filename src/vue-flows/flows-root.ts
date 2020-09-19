import { VueConstructor } from 'vue';
import { Vue, Component } from 'vue-property-decorator';

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
  }

  public cancel(): void {
    window.history.back()
  }

  modals: VueConstructor[] = []

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
  class CFlowsRoot extends FlowsRoot {}
  return CFlowsRoot
}

export default VueFlowsRoot