import { IFlowsRoot } from './flows-root';
import { VueConstructor } from 'vue';

export type Flow<TPayload = never,TResult = never,TCancelReason = never> = {
  key: FlowKey<TPayload,TResult,TCancelReason> | string;
  noFocusTrap?: boolean;
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
  /*
   * These three data members exist so that using the wrong
   * handler types when invoking a flow will cause
   * typechecking errors. (Unfortunately, the error is
   * placed on the key, not on the handler, but it's
   * better than nothing.)
   */
  private unusedPayload?: TPayload
  private unusedResult?: TResult
  private unusedCancelReason?: TCancelReason

  constructor(public label: string) {}
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
          flow,
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