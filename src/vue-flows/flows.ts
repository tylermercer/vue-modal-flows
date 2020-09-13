import { FlowsRoot } from './flows-root';

import MyComponent from './MyComponent.vue';

export type FlowsOptions = {
  hideCovered: boolean
}

const defaultOptions: FlowsOptions = {
  hideCovered: true,
}

export default class Flows {
  private hideCovered: boolean;

  constructor(options: FlowsOptions) {
    const resOptions = { ...options, ...defaultOptions };
    this.hideCovered = resOptions.hideCovered;
  }

  private root: FlowsRoot | null = null;

  public start() {
    //TODO: implement
    if (this.root == null) {
      console.error("No root attached")
    }
    else {
      this.root.start(MyComponent)
    }
  }
  public _attach(t: FlowsRoot) {
    this.root = t;
    console.log("Root attached");
  }
}