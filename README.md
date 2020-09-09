# Pagination Handle
> Generic Pagination Handling JavaScript Library

[![Build Status](https://travis-ci.org/CharltonC/pagination-handle.svg?branch=master)](https://travis-ci.org/github/CharltonC/pagination-handle)
[![Coverage Status](https://coveralls.io/repos/github/CharltonC/pagination-handle/badge.svg?branch=master)](https://coveralls.io/github/CharltonC/pagination-handle?branch=master)

#### Table of Contents:
* About
* Usage
* Development
* CLI Build Command
* Folder Structure

---

## Usage (Npm Pkg)
#### Import/Setup:
* via ES Module (Js/Ts/Tsx file)
```JavaScript
import { PgnHandle } from 'pagination-handle';
const pgnHandle = new PgnHandle();
```
* via CommonJs (Js file)
```JavaScript
const PgnHandle = require('pagination-handle');
const pgnHandle = new PgnHandle();
```
* via UMD
```JavaScript
const { PgnHandle } = window.PaginationHandle || PaginationHandle;
const pgnHandle = new PgnHandle();
```
* via Script Tag
```HTML
<script src="<path>/<to>/<library>/umd/main.min.js"></script>
<script>
    const { PgnHandle } = window.PaginationHandle || PaginationHandle;
    const pgnHandle = new PgnHandle();
</script>
```

#### Get Pagination State:
```JavaScript
import { PgnHandle } from 'pagination-handle';
const pgnHandle = new PgnHandle();

const sampleData = [ 'a', 'b', 'c' ];
const pgnOption = {
    page: 0,                // start at 1st page
    increment: [ 1, 2 ],    // typically for select dropdown: 1 per page, 2 per page
    incrementIdx: 0,        // `increment = 1` from abov
    maxSpread: 3          
};

const pgnState = pgnHandle.getState(sampleData, pgnOption);
```

#### Use with Native JavaScript or Component Lbrary:
```JavaScript
// Generate the generic attributes for each pagination elements
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
    option: pgnOption,
    callback: () => console.log('pgn state changed')
});

// JavaScript
const btn = document.createElement('button');
btn.type = 'button';
btn.disabled = firstBtnAttr.disabled;
btn.addEventListener('click', firstBtnAttr.onClick);
btn.textContent = firstBtnAttr.title;

// React (only one attribute demostrated here)
const PgnFristBtn = (firstBtnAttr) => {
    const { title, disabled, onClick } = firstBtnAttr;
    return (
        <button disabled={disabled} onClick={onClick}>
            {title}
        </button>
    );
};
```

#### Navigation & Callback:
```JavaScript
const sampleData = [ 'a', 'b', 'c' ];
const pgnOption = {
    page: 0,                // start at 1st page
    increment: [ 1, 2 ],    // typically for select dropdown: 1 per page, 2 per page
    incrementIdx: 0,        // `increment = 1` from abov
    maxSpread: 3          
};

// start with page 0
const pgnStateOne = pgnHandle.getState(sampleData, pgnOption);

// go to page 1
const pgnStateTwo = pgnHandle.getState(sampleData, {...pgnOption, page: 1});
```


## API
#### Pagination State Object `pgnState`
| Property      | Type              | Description                                                                               |
|---------------|-------------------|-------------------------------------------------------------------------------------------|
| perPage       | integer           | current total number displayed/allowed per page                                           |
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
| endRecord     | integer           | end index (non-inclusive) for current displayed data                                      |
| ltSpread      | integer or string | either a number (if less than the maxSpread) or '...' to indicate the non-displayed pages |
| rtSpread      | integer or string | either a number (if less than the maxSpread) or '...' to indicate the non-displayed pages |
| maxSpread     | integer           | total page interval that is represented by the spread '...', i.e. not shown               |

#### Pagination Option Object `pgnOption`
| Property      | Type              | Description                                                             |
|---------------|-------------------|-------------------------------------------------------------------------|
| page          | integer           | index for default/starting page number (starts from 0)                  |
| increment     | array of integers | available increments typically for the dropdown, e.g. [10, 20]          |
| incrementIdx  | integer           | the default increment value above                                       |
| maxSpread     | integer           | maximum number of page interval that is represented by the spread '...' |

#### General Button Attribute Object `firstBtnAttr`/`prevBtnAttr`/`nextBtnAttr`/`lastBtnAttr`
| Property      | Type              | Description                                                             |
|---------------|-------------------|-------------------------------------------------------------------------|
| title         | string            | name of the button, one of `first` | `prev` | `next` | `last`           |
| disabled      | boolean           | whether the button is disabled based on the current pagination state    |
| onClick       | function          | page navigation callback when the button is clicked                     |

#### Spread Button Attribute Object `ltSpreadBtnsAttr`/`rtSpreadBtnsAttr`
| Property      | Type              | Description                                                             |
|---------------|-------------------|-------------------------------------------------------------------------|
| title         | string            | name of the spread button, default: `left-spread` or `right-spread`     |
| isSpread      | boolean           | whether the button is the spread symbol (false if it is a number)       |
| onClick       | function          | page navigation callback when the button is clicked                     |

#### Select Attribute Object `perPageSelectAttr`/`getPageSelectAttr`
| Property               | Type              | Description                                                                       |
|------------------------|-------------------|-----------------------------------------------------------------------------------|
| title                  | string            | name of select dropdown, default: `per page select`                               |
| disabled               | boolean           | whether select dropdown is disabled based on the current pagination               |
| options                | array of integers | list of total number displayed/allowed per page OR list of navigatable pages      |
| selectedOptionValue    | integer           | value of current total number displayed/allowed per page OR current page number   |
| selectedOptionIdx      | integer           | corresponding index of `selectedOptionValue` property in `options` property       |
| onSelect               | function          | page navigation callback when the select option is changed                        |


## Development
#### About
Primary Tech Stack: 
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
