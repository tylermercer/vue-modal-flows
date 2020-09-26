import Vue, { PluginObject, VueConstructor } from 'vue';
import FlowsRoot from './flows-root';
import Flows, { FlowsOptions, Flow, FlowKey } from './flows'

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const version = '__VERSION__';

const install = (vue: typeof Vue, options: FlowsOptions): void => {
  const flows = new Flows(options);
  vue.prototype.$flows = flows;
};

const VueFlows: PluginObject<any> = {
  install,
  version,
};

declare module 'vue/types/vue' {
  interface Vue {
    $flows: Flows;
  }
}

export {
  VueFlows,
  FlowsRoot,
  FlowKey,
  Flow,
  Flows
};