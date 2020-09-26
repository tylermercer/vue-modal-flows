import { IFlowsRoot } from './flows-root';
import { VueConstructor } from 'vue';

export type Flow<TPayload = any,TResult = any> = {
  key: FlowKey<TPayload,TResult> | string;
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

export class FlowKey<TPayload,TResult> {
  /*
   * These three data members exist so that using the wrong
   * handler types when invoking a flow will cause
   * typechecking errors. (Unfortunately, the error is
   * placed on the key, not on the handler, but it's
   * better than nothing.)
   */
  private unusedPayload?: TPayload
  private unusedResult?: TResult

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

  public start<TPayload,TResult>(
      key: FlowKey<TPayload,TResult> | string,
      payload?: TPayload
    ): Promise<TResult> {
    if (this.root == null) {
      throw new Error("No root attached")
    }
    else {
      const flow = this.flows.find(f => f.key === key);
      if (flow == null) {
        throw new Error("Unknown flow! " + key);
      }
      else {
        const keyStr: string = typeof flow.key === 'string' ? flow.key : flow.key.label;
        return new Promise((resolve, reject) => {
          try {
            this.root!.start(
              flow,
              keyStr,
              payload,
              resolve)
          }
          catch (e) {
            reject(e)
          }
        })
      }
    }
  }
  public _attach(t: IFlowsRoot) {
    this.root = t;
    console.log("Root attached");
  }
}