import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const plugins = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  resolve(),     // Resolves node_modules
  commonjs(),    // Converts CommonJS to ESM
];

export default [
  {
    input: 'node_modules/react/index.js',
    output: {
      file: 'assets/js/react.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: 'node_modules/react-dom/client.js',
    output: {
      file: 'assets/js/react-dom-client.js',
      format: 'esm',
    },
    plugins,
  },
];
