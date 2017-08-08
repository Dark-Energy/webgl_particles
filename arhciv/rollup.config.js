// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/engine_main.js',
  format: 'umd',
  moduleName: "Engine",
  //treeshake: false,
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  sourceMap: true,
  dest: './build/bundle.js' // equivalent to --output
};

