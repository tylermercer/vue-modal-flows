import { FlowsRoot } from './flows-root';
import { VueConstructor } from 'vue'

export type Flow<TPayload = any,TResult = any> = {
  key: FlowKey<TPayload,TResult> | string;
  component: VueConstructor;
}

export type FlowsOptions = {
  hideCovered: boolean;
  flows: Flow[];
  hashPrefix: string;
}

const defaultOptions: FlowsOptions = {
  hideCovered: true,
  flows: [],
  hashPrefix: "modal-"
}

export class FlowKey<TPayload,TResult> {
  constructor(public value: string) {}
}

export default class Flows {
  public _hideCovered: boolean;
  public _hashPrefix: string;
  private flows: Flow[];

  constructor(options: FlowsOptions) {
    const resOptions = { ...defaultOptions, ...options };
    this._hideCovered = resOptions.hideCovered;
    this._hashPrefix = `#${resOptions.hashPrefix}`;
    this.flows = resOptions.flows;
    console.log(this.flows);
  }

  private root: FlowsRoot | null = null;

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