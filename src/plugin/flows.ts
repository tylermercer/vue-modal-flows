import { IFlowsRoot } from './flows-root';
import { VueConstructor } from 'vue';

export type Flow<TPayload = never,TResult = never,TCancelReason = never> = {
  key: FlowKey<TPayload,TResult,TCancelReason> | string;
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

export class FlowKey<TPayload=never,TResult=never,TCancelReason=never> {
  constructor(public label: string) {
    return { label }
  }
}

export default class Flows {
  public _hideCovered: boolean;
  private flows: Flow[];
  private root?: IFlowsRoot;

  constructor(options: FlowsOptions) {
    const resOptions = { ...defaultOptions, ...options };
    this._hideCovered = resOptions.hideCovered;
    this.flows = resOptions.flows;
  }


  public start<TPayload,TResult,TCancelReason>(
      key: FlowKey<TPayload,TResult,TCancelReason> | string,
      payload?: TPayload,
      onComplete?: (result: TResult) => void,
      onCancel?: (reason: TCancelReason) => void
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
        this.root!.start(
          flow.component,
          typeof flow.key === 'string' ? flow.key : flow.key.label,
          payload,
          onComplete,
          onCancel)
      }
    }
  }
  public _attach(t: IFlowsRoot) {
    this.root = t;
    console.log("Root attached");
  }
}