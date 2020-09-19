import { PluginObject, VueConstructor } from 'vue';
import VueFlowsRoot from './flows-root';
import Flows, { FlowsOptions, Flow } from './flows'

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const version = '__VERSION__';

const install = (Vue: any, options: FlowsOptions): void => {

  if (VueFlows.installed) {
    return;
  }
  VueFlows.installed = true;

  const flows = new Flows(options);

  Vue.$flows = flows;

  Object.defineProperties(Vue.prototype, {
    $flows: {
      get() {
        return flows;
      },
    },
  });

};

const VueFlows: PluginObject<any> = {
  install,
  version,
};

export {
  VueFlows,
  VueFlowsRoot,
  Flow
};