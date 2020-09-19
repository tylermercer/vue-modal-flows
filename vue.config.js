const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new DeclarationBundlerPlugin({
          moduleName:'VueModalFlows',
          out:'./index.d.ts',
      })
    ]
  }
}
