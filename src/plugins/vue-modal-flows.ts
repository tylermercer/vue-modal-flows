import { PluginObject, VueConstructor } from 'vue';

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

export class Flows {
  public start() {
    //TODO: implement
    console.log("Foobar");
  }
}

const version = '__VERSION__';

const install = (Vue: any, options: any): void => {

  if (VueModalFlows.installed) {
    return;
  }
  VueModalFlows.installed = true;

  const flows = new Flows();

  Vue.$flows = flows;

  Object.defineProperties(Vue.prototype, {
    $flows: {
      get() {
        return flows;
      },
    },
  });

};

const VueModalFlows: PluginObject<any> = {
  install,
  version,
};

export default VueModalFlows;