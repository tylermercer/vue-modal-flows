import FlowsRoot from './flows-root';
import { VueConstructor } from 'vue';

export type Flow<TPayload = any,TResult = any> = {
  key: FlowKey<TPayload,TResult> | string;
  component: VueConstructor;
}

export type FlowsOptions = {
  hideCovered: boolean;
  flows: Flow[];
}

const defaultOptions: FlowsOptions = {
  hideCovered: true,
  flows: []
}

export class FlowKey<TPayload,TResult> {
  constructor(public value: string) {}
}

type Constructor<T> = {
  new (...args: any[]): T,
}
type InstanceTypeOf<T> = T extends Constructor<infer U> ? U : never;
type FlowsRootInstance = InstanceTypeOf<typeof FlowsRoot>;

export default class Flows {
  public _hideCovered: boolean;
  private flows: Flow[];
  private root?: FlowsRootInstance;

  constructor(options: FlowsOptions) {
    const resOptions = { ...defaultOptions, ...options };
    this._hideCovered = resOptions.hideCovered;
    this.flows = resOptions.flows;
    console.log(this.flows);
  }


  public start<TPayload,TResult>(
      key: FlowKey<TPayload,TResult> | string,
      // payload: TPayload,
      // onfinish: (result: TResult) => void,
      // oncancel: () => void
    ) {
    if (this.root == null) {
      console.error("No root attached")
    }
    else {
      const flow = this.flows.find(f => f.key === key);
      if (flow == null) {
        throw new Error("Unknown flow! " + key);
      }
      else {
        console.log("Starting: " + flow.key);
        //@ts-ignore
        this.root!.start(flow.component, typeof flow.key === 'string' ? flow.key : flow.key.value)
      }
    }
  }
  public _attach(t: FlowsRootInstance) {
    this.root = t;
    console.log("Root attached");
  }
}