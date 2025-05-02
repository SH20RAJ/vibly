import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

// Determine if we're in development mode
const dev = process.env.ROLLUP_WATCH === 'true';

export default [
  // Browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'Vibly',
      file: pkg.browser,
      format: 'umd',
      globals: {
        'video.js': 'videojs'
      }
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      }),
      postcss({
        extract: 'dist/vibly.css',
        minimize: true,
        sourceMap: true,
        extensions: ['.css', '.scss']
      }),
      terser(),
      ...(process.env.ROLLUP_WATCH === 'true' ? [
        serve({
          open: true,
          contentBase: ['dist', 'examples'],
          host: 'localhost',
          port: 10001
        }),
        livereload({
          watch: ['dist', 'examples']
        })
      ] : [])
    ],
    external: ['video.js', 'hls.js', 'dashjs']
  },
  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      }),
      postcss({
        extract: false,
        inject: false,
        extensions: ['.css', '.scss']
      })
    ],
    external: ['video.js', 'hls.js', 'dashjs']
  }
];
