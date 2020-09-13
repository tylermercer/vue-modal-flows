import { IFlowsRoot } from './flows-root';

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

  public start() {
    //TODO: implement
    console.log("Foobar");
  }
  public _attach(t: IFlowsRoot) {

  }
}