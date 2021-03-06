<<<<<<< HEAD
import typescript from "rollup-plugin-typescript3";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import path from "path";
import babel from "@rollup/plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import css from "rollup-plugin-css-porter";
import commonjs from "@rollup/plugin-commonjs";
=======
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import {terser} from "rollup-plugin-terser";
import path from 'path';
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import css from 'rollup-plugin-css-porter';
>>>>>>> master

const rootDir = path.resolve(__dirname);
const dstDir = path.join(rootDir, "dist");

const extensions = [".ts", ".js", ".tsx"];

<<<<<<< HEAD
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

export default {
  input: "src/index.ts",
  output: { file: "dist/bundle.js", format: "esm" },
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript(),
    terser(),
    css(),
    resolve({
      extensions
    }),
    commonjs({
      namedExports: {
        "node_modules/lodash/index.js": ["omit", "isEmpty"]
      }
    }),
    babel({ extensions: extensions, exclude: "node_modules/**" })
  ]
};
=======
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        terser(),
        css(),
        resolve({
            extensions,
        }),
        babel({
            extensions,
            runtimeHelpers: true
        })
    ],
}
>>>>>>> master
