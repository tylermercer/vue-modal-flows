import Vue, { VueConstructor, CreateElement, VNode } from 'vue';

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
export default Vue.extend({
  render(h: CreateElement): VNode {
    return h('div',
      { style: { rootElementStyles } },
      [
        ...((this.$slots.default) ?
        this.$slots.default.map(s => ({ style: this.shouldHide() ? coveredStyles : {}, ...s})) :
        []),
        // h('div', { style: this.shouldHide() ? coveredStyles : {}}, this.$slots.default),
        ...this.modals!.map(
          (m:any, i:number) => h(m,
            {
              style: this.shouldHide(i) ? coveredStyles : modalStyles,
              on: { 'cancel-flow': this.cancel }
            }
          )
        )
      ]
    )
  },
  created() {
    this.$flows._attach(this);
  },
  mounted() {
    //@ts-ignore
    if (this.$router) {
      //Reject route changes when modals are open
      //@ts-ignore
      this.$router.beforeEach((_, __, next) => {
        if (this.modals.length > 0) {
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
});
