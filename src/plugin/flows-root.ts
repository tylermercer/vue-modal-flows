import { VueConstructor, CreateElement, VNode } from 'vue';

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
* Vue.use(VueFlows)). It's really not ideal because it
* means we have to @ts-ignore all of our `this` statements,
* but it's the only way I could find to get everything to
* work properly
*
* For some extremely bizarre reason, the above bug only
* occurs in projects that use this library as a library;
* it does not work in the demo project.
*
* If you know of a way to fix this bug, please submit a PR
* or file an issue with an explanation of the solution!
*/
export default {
  render(h: CreateElement): VNode {
    return h('div',
      { style: { rootElementStyles } },
      [
        //@ts-ignore because we're not using Vue.extend
        h('div', { style: this.shouldHide() ? coveredStyles : {}}, this.$slots.default),
        //@ts-ignore because we're not using Vue.extend
        ...this.modals!.map(
          (m:any, i:number) => h(m,
            {
              //@ts-ignore because we're not using Vue.extend
              style: this.shouldHide(i) ? coveredStyles : modalStyles,
              //@ts-ignore because we're not using Vue.extend
              on: { 'cancel-flow': this.cancel }
            }
          )
        )
      ]
    )
  },
  created() {
    //@ts-ignore because we're not using Vue.extend
    this.$flows._attach(this);
  },
  mounted() {
    //@ts-ignore because we don't know if they're using router
    if (this.$router) {
      //Reject route changes when modals are open
      //@ts-ignore because we don't know if they're using router
      this.$router.beforeEach((_, __, next) => {
        //@ts-ignore because we're not using Vue.extend
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
      //@ts-ignore
      this.modals.push(modal)
      window.history.pushState(
        {flowsKey: key},
        "Modal"
      );
      window.onpopstate = () => {
        //@ts-ignore because we're not using Vue.extend
        this.modals.pop();
        //@ts-ignore because we're not using Vue.extend
        if (!this.modals.length) {
          window.onpopstate = () => {}
        }
      }
    },
    cancel(): void {
      window.history.back()
    },
    shouldHide(index = -1): boolean {
      //@ts-ignore because we're not using Vue.extend
      return this.$flows._hideCovered && this.modals.length > index + 1;
    }
  },
  data: () => {
    return {
      modals: [] as VueConstructor[],
    }
  }
};
