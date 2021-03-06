# Pagination Handle
> Generic Pagination Handling JavaScript Library

[![Build Status](https://travis-ci.org/CharltonC/pagination-handle.svg?branch=master)](https://travis-ci.org/github/CharltonC/pagination-handle)
[![Coverage Status](https://coveralls.io/repos/github/CharltonC/pagination-handle/badge.svg?branch=master)](https://coveralls.io/github/CharltonC/pagination-handle?branch=master)

#### Table of Contents:
* General
    * Links
    * Build Size
* Usage
    * Import/Setup
    * Get Pagination State
    * Use the Generic Attributes to create your own element/component
    * Manual Navigation & Callback
    * API
* Contribution/Development
    * Primary Tech Stack
    * CLI Command
    * Folder Structure

---

## General
#### Links
* [NPM Package](https://www.npmjs.com/package/pagination-handle)

#### Build Size (ESM/UMD/CJS)
* Minified Size: 8KB
* Gzipped: 2.7KB


## Usage
#### Import/Setup:
* via ES Module (Js/Ts/Tsx file)
```JavaScript
import PgnHandle from 'pagination-handle';
const pgnHandle = new PgnHandle();
```
* via CommonJs (Js file)
```JavaScript
const PgnHandle = require('pagination-handle');
const pgnHandle = new PgnHandle();
```
* via UMD (Js file)
```JavaScript
const pgnHandle = new PaginationHandle();
```
* via Script Tag (HTML)
```HTML
<script src="<path>/<to>/<library>/umd/main.min.js"></script>
<script>
    const pgnHandle = new PaginationHandle();
</script>
```

#### Get Pagination State:
```JavaScript
const sampleData = [ 'a', 'b', 'c' ];
const totalRecord = sampleData.length;
const pgnOption = {
    page: 0,                // start at 1st page
    increment: [ 1, 2 ],    // typically for select dropdown: 1 per page, 2 per page
    incrementIdx: 0,        // means increment is 1 from above
    maxSpread: 3          
};

// using builtin Type under `PgnType` namespace (no import required)
let someOption: PgnType.IOption;

// get the pagination state only
const pgnState = pgnHandle.getState(totalRecord, pgnOption);
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

// get the corresponding "visible" data slice
const sampleDataSlice = sampleData.slice(startIdx, endIdx);

// get the generic pagination element attributes to construct elements on your own
const genericComponentAttr = pgnHandle.createGenericCmpAttr({
    totalRecord,
    state: pgnState,
    option: pgnOption,
    callback: () => console.log('pgn state changed')
});
const {
    firstBtnAttr,
    prevBtnAttr,
    nextBtnAttr,
    lastBtnAttr,
    ltSpreadBtnsAttr,
    rtSpreadBtnsAttr,
    pageSelectAttr,
    perPageSelectAttr,
} = genericComponentAttr;
```

#### Use the Generic Attributes to create your own element/component
```JavaScript
// JavaScript Example
const btn = document.createElement('button');
btn.type = 'button';
btn.disabled = firstBtnAttr.disabled;
btn.addEventListener('click', firstBtnAttr.onClick);
btn.textContent = firstBtnAttr.title;

// React Example
const PgnFristBtn = (firstBtnAttr) => {
    const { title, disabled, onClick } = firstBtnAttr;
    return (
        <button disabled={disabled} onClick={onClick}>
            {title}
        </button>
    );
};
```

#### Manual Navigation & Callback:
```JavaScript
// start with page 0
const pgnStateOne = pgnHandle.getState(totalRecord, pgnOption);

// go to next page
const pgnStateTwo = pgnHandle.getState(totalRecord, {
    ...pgnOption, 
    page: pgnStateOne.next
});
```


## API
#### Pagination State Object `pgnState`
| Property      | Type              | Description                                                                               |
|---------------|-------------------|-------------------------------------------------------------------------------------------|
| `perPage`     | integer           | current total number displayed/allowed per page                                           |
| `totalPage`   | integer           | total number of pages                                                                     |
| `curr`        | integer           | current page index (starts from 0)                                                        |
| `pageNo`      | integer           | current page number (starts from 1)                                                       |
| `startIdx`    | integer           | start index (inclusive) for the sliced data                                               |
| `endIdx`      | integer           | end index (exclusive) for the sliced data                                                 |
| `first`       | integer           | index for first page                                                                      |
| `prev`        | integer           | index for previous page                                                                   |
| `next`        | integer           | index for next page                                                                       |
| `last`        | integer           | index for last page                                                                       |
| `totalRecord` | integer           | total number of records in data                                                           |
| `startRecord` | integer           | starting index for current displayed data                                                 |
| `endRecord`   | integer           | end index (non-inclusive) for current displayed data                                      |
| `ltSpread`    | integer or string | either a number (if less than the maxSpread) or '...' to indicate the non-displayed pages |
| `rtSpread`    | integer or string | either a number (if less than the maxSpread) or '...' to indicate the non-displayed pages |
| `maxSpread`   | integer           | total page interval that is represented by the spread '...', i.e. not shown               |

#### Pagination Option Object `pgnOption`
| Property      | Type              | Description                                                             |
|---------------|-------------------|-------------------------------------------------------------------------|
| `page`        | integer           | index for default/starting page number (starts from 0)                  |
| `increment`   | array of integers | available increments typically for the dropdown, e.g. [10, 20]          |
| `incrementIdx`| integer           | the default increment value above                                       |
| `maxSpread`   | integer           | maximum number of page interval that is represented by the spread '...' |

#### General Button Attribute Object `firstBtnAttr`/`prevBtnAttr`/`nextBtnAttr`/`lastBtnAttr`
| Property      | Type              | Description                                                             |
|---------------|-------------------|-------------------------------------------------------------------------|
| `title`       | string            | name of the button, one of the values: `first` `prev` `next` `last`     |
| `disabled`    | boolean           | whether the button is disabled based on the current pagination state    |
| `onClick`     | function          | page navigation callback when the button is clicked                     |

#### Spread Button Attribute Object `ltSpreadBtnsAttr`/`rtSpreadBtnsAttr`
| Property      | Type              | Description                                                             |
|---------------|-------------------|-------------------------------------------------------------------------|
| `title`       | string            | name of the spread button, default: `left-spread` or `right-spread`     |
| `isSpread`    | boolean           | whether the button is the spread symbol (false if it is a number)       |
| `onClick`     | function          | page navigation callback when the button is clicked                     |

#### Select Attribute Object `perPageSelectAttr`/`getPageSelectAttr`
| Property               | Type              | Description                                                                       |
|------------------------|-------------------|-----------------------------------------------------------------------------------|
| `title`                | string            | name of select dropdown, default: `per page select`                               |
| `disabled`             | boolean           | whether select dropdown is disabled based on the current pagination               |
| `options`              | array of integers | list of total number displayed/allowed per page OR list of navigatable pages      |
| `selectedOptionValue`  | integer           | value of current total number displayed/allowed per page OR current page number   |
| `selectedOptionIdx`    | integer           | corresponding index of `selectedOptionValue` property in `options` property       |
| `onSelect`             | function          | page navigation callback when the select option is changed                        |


## Contribution/Development
#### Primary Tech Stack: 
* TypeScript 3.8.3
* Node 13.12.0 | Npm 6.14.4
* Jest 25.5.3

#### CLI Command
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

#### Folder Structure
    dist/                       // output files
        cjs/                    // common js format
            index.js            
            index.js.map
            index.min.js
        esm/                    // es module js format
            index.js            
            index.js.map
            index.min.js
        umd/                    // universal module definition format
            index.js            
            index.js.map
            index.min.js
        index.d.ts              // typings
        
    src/                        // source code
        index.ts                // main entry file
        index.spec.ts           // unit test
        type.ts                 // typings

    rollup.config.js            // rollup (bundler/build) config
    .eslintrc.js                // EsLint config
    tsconfig.json               // TypeScript config 
    babel.config.js             // Babel config - transform TS and new Js features into ES5/Standard JavaScript
    jest.config.js              // Jest config - unit test
    package.json                // dev-dependencies, dependencies for the project    
    .gitignore                  // git ignored
    README.md                   // readme
