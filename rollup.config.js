import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import url from 'rollup-plugin-url'
import pkg from './package.json'

const defaultOutputOptions = {
  exports: 'named',
  globals: {
    react: 'React',
  },
}

export default {
  input: pkg.config.entry,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      ...defaultOutputOptions,
    },
    {
      file: pkg.module,
      format: 'es',
      ...defaultOutputOptions,
    },
  ],
  external: ['react'],
  plugins: [
    external(),
    url(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/index.js': ['Component', 'createContext'],
      },
    }),
    uglify({
      mangle: true,
      output: {
        preamble: [
          '/**',
          ' @name react-time-provider',
          ` @version: ${pkg.version}`,
          ` @author: ${pkg.author.name} <${pkg.author.email}> (${pkg.author.url})`,
          '*/',
        ].join('\n*'),
      },
    }),
  ],
}
