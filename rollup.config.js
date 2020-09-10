import commonjs from '@rollup/plugin-commonjs';     // Convert CommonJS modules to ES6
import resolve from '@rollup/plugin-node-resolve';  // Locate and bundle third-party dependencies in node_modules
import babel from '@rollup/plugin-babel';           // Compile your files with Babel
import { terser } from "rollup-plugin-terser";      // Uglify
import filesize from 'rollup-plugin-filesize';

const extensions = [ '.js', '.jsx', '.ts', '.tsx', ];
const getOutputConfig = (format, mergedConfig = {}) => {
    return [false, true].map((isProd) => {
        const fileSuffix = isProd ? '.min' : '';
        const file = `dist/${format}/index${fileSuffix}.js`;
        const sourcemap = !isProd;
        const plugins = isProd ? [terser()] : [];
        return { file, format, sourcemap, plugins, ...mergedConfig };
    });
}

export default {
    // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en#external-e-external
    external: [],

    plugins: [
        // Allows node_modules resolution
        resolve({ extensions }),

        // Allow bundling cjs modules. Rollup doesn't understand cjs
        commonjs(),

        // Compile TypeScript/JavaScript files
        babel({
            extensions,
            babelHelpers: 'bundled',
            include: ['src/**/*']
        }),

        // Show bundled and minified size
        filesize()
    ],

    input: './src/index.ts',

    /**
     * either use `dir` or `file`
     * - `dir`: path only, the filename will be def. to the entry file name
     * - `file`: can contain path and file name (recommended)
     *  e.g.
     *  file: 'dist/cjs/index.js',
     *  file: 'dist/cjs/index.min.js',
     *
     * `name` is the global variable name for "umd" format where the output bundle is store under
     */
    output: [
        ...getOutputConfig('cjs', { exports: 'auto' }),
        ...getOutputConfig('esm'),
        ...getOutputConfig('umd', { name: 'PaginationHandle' }),
    ],
};