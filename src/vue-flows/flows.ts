import { FlowsRoot } from './flows-root';
import { VueConstructor } from 'vue'

export type Flow<TPayload = any,TResult = any> = {
  key: FlowKey<TPayload,TResult> | string;
  component: VueConstructor;
}

export type FlowsOptions = {
  hideCovered: boolean;
  laxMode: boolean;
  flows: Flow[];
}

const defaultOptions: FlowsOptions = {
  hideCovered: true,
  laxMode: false,
  flows: []
}

export class FlowKey<TPayload,TResult> {
  constructor(public value: string) {}
}

export default class Flows {
  public _hideCovered: boolean;
  private flows: Flow[];
  private root: FlowsRoot | null = null;
  public _laxMode: boolean;

  constructor(options: FlowsOptions) {
    const resOptions = { ...defaultOptions, ...options };
    this._hideCovered = resOptions.hideCovered;
    this._laxMode = resOptions.laxMode;
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
        this.root.start(flow.component, typeof flow.key === 'string' ? flow.key : flow.key.value)
      }
    }
  }
  public _attach(t: FlowsRoot) {
    this.root = t;
    console.log("Root attached");
  }
}