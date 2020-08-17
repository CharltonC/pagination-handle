# Pagination Handle
> Generic Pagination Handling JavaScript Library

#### Table of Contents:
* About
* Usage
* Setup (Mac based) 
* CLI Build Command
* Folder Structure

---

## About
Primary Tech Stack: 
* TypeScript 3.8.3
* Node 13.12.0 | Npm 6.14.4
* Jest 25.5.3


## Usage (Npm Pkg)
* ES Module (Js/Ts/Tsx file)
```
import { PgnHandle } from 'pagination-handle';
const pgnHandle = new PgnHandle();
```
* CommonJs (Js file)
```
const PgnHandle = require('pagination-handle');
const pgnHandle = new PgnHandle();
```
* UMD
```
const { PgnHandle } = window.PaginationHandle;
const pgnHandle = new PgnHandle();
```


## CLI Command
* Build
```
npm run build
```
* Unit Test
```
npm run test
```
* Lint
```
npm run lint
```
* Compile Js
```
npm run compile-js
```
* Compile Bundled .d.ts file
```
npm run compile-dts
```
* Clear "dist" folder
```
npm run clean
```

## Folder Structure
    dist/                       // output files
        cjs/                    // common js format
            index.js            
            index.js.map
            index.min.js
        esm/                    // es module js format
            ..
        umd/                    // universal module definition format
            ..
        index.d.ts              // typings
        
    node_modules/               // dependencies

    src/                        // source code
        index.ts                // main entry file
        index.spec.ts           // unit test
        type.ts                 // typings

    .eslintrc.js                // EsLint config
    tsconfig.json               // TypeScript config 
    babel.config.js             // Babel config - transform TS and new Js features into ES5/Standard JavaScript
    jest.config.js              // Jest config - unit test
    package.json                // dev-dependencies, dependencies for the project    
    .gitignore                  // git ignored
    README.md                   // readme
