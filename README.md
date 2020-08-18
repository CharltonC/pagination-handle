# Pagination Handle
> Generic Pagination Handling JavaScript Library

[![Build Status](https://travis-ci.org/CharltonC/pagination-handle.svg?branch=master)](https://travis-ci.org/github/CharltonC/pagination-handle)
[![Coverage Status](https://coveralls.io/repos/github/CharltonC/pagination-handle/badge.svg?branch=master)](https://coveralls.io/github/CharltonC/pagination-handle?branch=master)

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
#### Setup:
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

#### General Use:
```JavaScript
const sampleData = [ 'a', 'b', 'c' ];
const pgnOption = {
    page: 0,
    increment: [ 1, 2 ],
    incrementIdx: 0,
    maxSpread: 3
};
const pgnState = pgnHandle.getState(sampleData, pgnOption);
const {
    perPage,
    totalPage,
    curr,
    pageNo,
    startIdx,
    endIdx,
    first,
    prev,
    next,
    last,
    totalRecord,
    startRecord,
    endRecord,
    ltSpread,
    rtSpread,
    maxSpread
} = pgnState;
```

#### Use with Component Lbrary:
```JavaScript
const {
    firstBtnAttr,
    prevBtnAttr,
    nextBtnAttr,
    lastBtnAttr,
    ltSpreadBtnsAttr,
    rtSpreadBtnsAttr,
    pageSelectAttr,
    perPageSelectAttr,
} = pgnHandle.createGenericCmpAttr({
    data: sampleData,
    state: pgnState,
    option: pgnOption
    callback: () => console.log('pgn state changed');
});

// JavaScript
const btn = document.createElement('button');
btn.type = 'button';
btn.disabled = firstBtnAttr.disabled;
btn.addEventListener('click', firstBtnAttr.onClick);
btn.textContent = firstBtnAttr.title;

// React
const PgnFristBtn = (firstBtnAttr) => {
    const { title, disabled, onClick } = firstBtnAttr;
    return (
        <button disabled={disabled} onClick={onClick}>
            {title}
        </button>
    );
};
```


## API
#### Pagination State
| Property Name | Type              | Description                                                                               |
|---------------|-------------------|-------------------------------------------------------------------------------------------|
| perPage       | integer           | current total number allowed per page                                                     |
| totalPage     | integer           | total number of pages                                                                     |
| curr          | integer           | current page index (starts from 0)                                                        |
| pageNo        | integer           | current page number (starts from 1)                                                       |
| startIdx      | integer           | index for start page                                                                      |
| endIdx        | integer           | index for last page                                                                       |
| first         | integer           | index for first page                                                                      |
| prev          | integer           | index for previous page                                                                   |
| next          | integer           | index for next page                                                                       |
| last          | integer           | index for last page                                                                       |
| totalRecord   | integer           | total number of records in data                                                           |
| startRecord   | integer           | starting index for current displayed data                                                 |
| endRecord     | integer           | end index (exclusive) for current displayed data                                          |
| ltSpread      | integer or string | either a number (if less than the maxSpread) or '...' to indicate the non-displayed pages |
| rtSpread      | integer or string | either a number (if less than the maxSpread) or '...' to indicate the non-displayed pages |
| maxSpread     | integer           | total page interval that is represented by the spread '...', i.e. not shown               |

#### Pagination Option
| Property Name | Type              | Description                                                             |
|---------------|-------------------|-------------------------------------------------------------------------|
| page          | integer           | index for default/starting page number (starts from 0)                  |
| increment     | array of integers | available increments typically for the dropdown, e.g. [10, 20]          |
| incrementIdx  | integer           | the default increment value above                                       |
| maxSpread     | integer           | maximum number of page interval that is represented by the spread '...' |


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
