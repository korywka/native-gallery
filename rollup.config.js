import buble from '@rollup/plugin-buble';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    name: 'NativeGallery',
    format: 'umd',
    indent: false
  },
  plugins: [buble()],
};