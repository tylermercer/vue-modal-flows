import typescript from 'rollup-plugin-typescript2'
import cleaner from 'rollup-plugin-cleaner'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: './src/plugin/index.ts',
  output: {
    format: 'esm', // This is what tells rollup to use ES6 modules
    dir: 'dist'
  },
  external: [ 'vue', 'vue-class-component', 'vue-property-decorator' ],
  plugins: [
    cleaner({ targets: [ 'dist' ] }),
    commonjs(),
    typescript({ clean: true }),
  ],
  // Prevents bundling, but doesn't rename files
  preserveModules: true
}