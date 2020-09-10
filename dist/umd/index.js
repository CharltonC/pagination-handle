(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.PaginationHandle = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * Usage:
   *      const list = ['a', 'b', 'c', 'd'];
   *      const totalRecord = list.length;
   *
   *      const example = pgnHandle.getState(totalRecord, {
   *           page: 1,                       // optional starting page index
   *           increment: [100, 200, 300],    // used for <select>'s <option> (default 10 per page, i.e. [10])
   *           incrementIdx: 0,               // i.e. 100 per age
   *      });
   *
   *      const { startIdx, endIdx } = example;
   *      const listFor1stPage = list.slice(startIdx, endIdx);
   */
  var PgnHandle = /*#__PURE__*/function () {
    function PgnHandle() {
      _classCallCheck(this, PgnHandle);
    }

    _createClass(PgnHandle, [{
      key: "getOption",
      //// Option

      /**
       * Merge the updated option with existing option (either custom or default)
       * e.g. existingOption = this.state.sortOption
       */
      value: function getOption(modOption, existingOption) {
        var baseOption = existingOption ? existingOption : this.getDefOption();
        return _objectSpread2(_objectSpread2({}, baseOption), modOption);
      }
    }, {
      key: "getDefOption",
      value: function getDefOption() {
        return {
          page: 0,
          increment: [10],
          incrementIdx: 0,
          maxSpread: 3
        };
      } //// Full State

    }, {
      key: "getState",
      value: function getState(totalRecord, pgnOption) {
        // Merge def. option with User's option
        var defOption = this.getDefOption();

        var _defOption$increment = _slicedToArray(defOption.increment, 1),
            defIncrmVal = _defOption$increment[0];

        var _Object$assign = Object.assign(defOption, pgnOption),
            page = _Object$assign.page,
            increment = _Object$assign.increment,
            incrementIdx = _Object$assign.incrementIdx,
            maxSpread = _Object$assign.maxSpread;

        var perPage = this.getNoPerPage(increment, incrementIdx, defIncrmVal); // Skip if we only have 1 list item OR less than 2 pages

        var defState = this.getDefState(totalRecord, perPage);
        if (totalRecord <= 1) return defState;
        var totalPage = this.getTotalPage(totalRecord, perPage);
        if (totalPage <= 1) return defState; // Proceed as we have >=2 pages

        var _this$getCurrPage = this.getCurrPage(page, totalPage - 1),
            curr = _this$getCurrPage.curr,
            pageNo = _this$getCurrPage.pageNo;

        var currSlice = this.getPageSliceIdx(totalRecord, perPage, curr);
        var startIdx = currSlice.startIdx,
            endIdx = currSlice.endIdx;
        var recordCtx = this.getRecordCtx(totalRecord, startIdx, endIdx);
        var spreadCtx = this.getSpreadCtx(pageNo, totalPage, maxSpread);
        var relPage = this.getRelPage(totalPage, curr);
        var relPageCtx = this.getRelPageCtx({
          curr: curr,
          last: relPage.last
        }, relPage);
        relPage = this.parseRelPage(relPage, relPageCtx);
        return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
          curr: curr
        }, relPage), currSlice), {}, {
          pageNo: pageNo,
          perPage: perPage,
          totalPage: totalPage
        }, recordCtx), spreadCtx);
      }
    }, {
      key: "getDefState",
      value: function getDefState(totalRecord, perPage) {
        var startIdx = 0;
        var recordCtx = this.getRecordCtx(totalRecord, startIdx);
        return _objectSpread2(_objectSpread2({}, recordCtx), {}, {
          perPage: perPage,
          totalPage: 1,
          startIdx: startIdx,
          pageNo: 1
        });
      } //// Partial State

    }, {
      key: "getRecordCtx",
      value: function getRecordCtx(totalRecord, startIdx, endIdx) {
        var hsRecord = totalRecord >= 1;
        return {
          startRecord: hsRecord && Number.isInteger(startIdx) ? startIdx + 1 : 0,
          endRecord: hsRecord && Number.isInteger(endIdx) ? endIdx : totalRecord,
          totalRecord: totalRecord
        };
      }
    }, {
      key: "getNoPerPage",
      value: function getNoPerPage(incrms, incrmIdx, fallbackVal) {
        var hsIncrms = !!incrms.length;
        if (!hsIncrms) return fallbackVal;
        var incrm = incrms[incrmIdx];
        var isValidIncrm = Number.isInteger(incrm) && incrm > 0;
        var perPage = isValidIncrm ? incrms[incrmIdx] : fallbackVal;
        return perPage;
      }
    }, {
      key: "parseNoPerPage",
      value: function parseNoPerPage(incrms) {
        return incrms.filter(function (incrm) {
          return Number.isInteger(incrm) && incrm > 0;
        });
      }
    }, {
      key: "getTotalPage",
      value: function getTotalPage(lsLen, perPage) {
        var noOfPage = lsLen > perPage ? lsLen / perPage : 1;
        return Math.ceil(noOfPage);
      }
    }, {
      key: "getCurrPage",
      value: function getCurrPage(page, lastPage) {
        var curr = page >= 0 && page <= lastPage ? page : 0;
        var pageNo = curr + 1;
        return {
          curr: curr,
          pageNo: pageNo
        };
      }
    }, {
      key: "getRelPage",
      value: function getRelPage(totalPage, currPage) {
        return {
          first: 0,
          prev: currPage - 1,
          next: currPage + 1,
          last: totalPage - 1
        };
      }
    }, {
      key: "getRelPageCtx",
      value: function getRelPageCtx(pageRange, relPage) {
        var _this = this;

        var relPageKeys = Object.getOwnPropertyNames(relPage);
        return relPageKeys.reduce(function (relPageCtx, type) {
          var pageQuery = {
            type: type,
            target: relPage[type]
          };
          relPageCtx[type] = _this.canNavToPage(pageRange, pageQuery);
          return relPageCtx;
        }, {});
      }
    }, {
      key: "parseRelPage",
      value: function parseRelPage(relPage, relPageCtx) {
        var relPageKeys = Object.getOwnPropertyNames(relPage);
        relPageKeys.forEach(function (pageType) {
          var page = relPage[pageType];
          relPage[pageType] = relPageCtx[pageType] ? page : null;
        });
        return relPage;
      }
    }, {
      key: "getPageSliceIdx",
      value: function getPageSliceIdx(totalRecord, perPage, page) {
        var startIdx = page * perPage; // inclusive index

        var endIdx = startIdx + perPage; // exclusive index

        startIdx = Number.isInteger(startIdx) && startIdx <= totalRecord ? startIdx : undefined; // `undefined` is used as `null` cant be used as empty value in ES6

        endIdx = Number.isInteger(startIdx) && endIdx <= totalRecord ? endIdx : undefined;
        return {
          startIdx: startIdx,
          endIdx: endIdx
        };
      }
      /**
       * Get the page number for the left/right spread in relation to current page
       * - When remain < maxSpread, show `maxSpread` no. of pages
       * - When remain > maxSpread, show dots (either on left/right) + `maxSpread` no. of pages
       * - when remain < 1, no spread is available
       *
       * @param maxSpread: max no. of pages for each side of the spread
       */

    }, {
      key: "getSpreadCtx",
      value: function getSpreadCtx(currPageNo, totalPage) {
        var maxSpread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

        // 1 is added to `spreadRange` in case there is '...' for either 1st/last item
        var spreadRange = _toConsumableArray(Array(maxSpread + 1));

        var firstPage = 1;
        var DOTS = '...';
        var rtTotalRemain = totalPage - currPageNo;
        var ltTotalRemain = currPageNo - firstPage;
        var hsRtSpread = rtTotalRemain > 1 && rtTotalRemain < totalPage;
        var hsLtSpread = ltTotalRemain > 1 && ltTotalRemain < totalPage;
        var rtSpread = hsRtSpread ? spreadRange.reduce(function (container, item, idx) {
          var pageNo = currPageNo + idx + 1; // We exclude the 1st page or last page since its already available in the Pagination state

          var isInRange = pageNo > 1 && pageNo < totalPage; // Check if there is any pages between "last" page number in this loop and the actual last page
          // - e.g. last page in the loop is: 8 | actual last page is: 10,
          // so we have page 9 in between, which we can use '...' to represent

          var hsGtOnePageTilLastPage = idx === maxSpread && totalPage - pageNo >= 1;
          if (isInRange) container.push(hsGtOnePageTilLastPage ? DOTS : pageNo);
          return container;
        }, []) : null;
        var ltSpread = hsLtSpread ? spreadRange.reduce(function (container, item, idx) {
          var pageNo = currPageNo - idx - 1;
          var isInRange = pageNo > 1 && pageNo < totalPage;
          var hsGtOnePageTilFirstPage = idx === maxSpread && currPageNo - pageNo >= 1;
          if (isInRange) container.unshift(hsGtOnePageTilFirstPage ? DOTS : pageNo);
          return container;
        }, []) : null;
        return {
          ltSpread: ltSpread,
          rtSpread: rtSpread,
          maxSpread: maxSpread
        };
      }
      /**
       * Forumla for calculating corresponding page index for left/right spread '...' based on the
       * context of current page and the maxSpread (no. of pages between current and target page)
       *
       * e.g. maxSpread = 3
       * ------------------------------------------------------------
       * Current Page          | Spread/Target Page    | Spread Type
       * No.      | Index      | No.      | Index      |
       * ------------------------------------------------------------
       * 1          0            4          3            Right Spread
       * 10         9            6          5            Left Spread
       */

    }, {
      key: "getPageIdxForSpread",
      value: function getPageIdxForSpread(currPageIdx, maxSpread, isLtSpread) {
        return isLtSpread ? currPageIdx - maxSpread - 1 : currPageIdx + maxSpread + 1;
      } //// Helper Methods

    }, {
      key: "canNavToPage",
      value: function canNavToPage(_ref, _ref2) {
        var curr = _ref.curr,
            last = _ref.last;
        var type = _ref2.type,
            target = _ref2.target;
        if (!this.isGteZero([curr, last])) return false;

        switch (type) {
          case 'prev':
            // we dont need `target < curr` since we already know `target = curr - 1;`
            return target >= 0;

          case 'next':
            // we dont need `target > curr` since we already know `target = curr + 1;`
            return target <= last;

          case 'first':
            // we dont need `target > curr` since we already know `target = 0`
            return curr !== 0 && target < curr;

          case 'last':
            return target > curr;

          case 'page':
            // i.e. any prev or next
            return this.isGteZero(target) && target !== curr && target <= last;

          default:
            return false;
        }
      }
    }, {
      key: "isGteZero",
      value: function isGteZero(vals) {
        return Array.isArray(vals) ? vals.every(function (val) {
          return Number.isInteger(val) && val >= 0;
        }) : Number.isInteger(vals) && vals >= 0;
      } //// Generic UI Component Related

      /**
       * Create Generic Attributes that can be passed/mapped to Attributes/Inputs/Props of Static HTML or Angular/React/Vue/etc Components
       *
       * - Usage Example for React:
       * const callback = (modState => this.setState({...this.state, ...modState})).bind(this);
       * createGenericCmpProps({option, state, data, callback});
       */

    }, {
      key: "createGenericCmpAttr",
      value: function createGenericCmpAttr(_ref3) {
        var _this2 = this;

        var totalRecord = _ref3.totalRecord,
            option = _ref3.option,
            state = _ref3.state,
            callback = _ref3.callback;
        var first = state.first,
            prev = state.prev,
            next = state.next,
            last = state.last,
            ltSpread = state.ltSpread,
            rtSpread = state.rtSpread;
        var onEvt = this.getGenericCmpEvtHandler(totalRecord, option, callback);
        return {
          // Attr. for First/Prev/Next/Last as Button
          firstBtnAttr: this.getTextBtnAttr(onEvt, ['first', first]),
          prevBtnAttr: this.getTextBtnAttr(onEvt, ['prev', prev]),
          nextBtnAttr: this.getTextBtnAttr(onEvt, ['next', next]),
          lastBtnAttr: this.getTextBtnAttr(onEvt, ['last', last]),
          // Attr. for Spread as Button
          ltSpreadBtnsAttr: ltSpread ? ltSpread.map(function (page) {
            return _this2.getSpreadBtnAttr(onEvt, state, [page, true]);
          }) : null,
          rtSpreadBtnsAttr: rtSpread ? rtSpread.map(function (page) {
            return _this2.getSpreadBtnAttr(onEvt, state, [page, false]);
          }) : null,
          // Attr. for Page Select and Per Page Select
          perPageSelectAttr: this.getPerPageSelectAttr(onEvt, option),
          pageSelectAttr: this.getPageSelectAttr(onEvt, state)
        };
      }
    }, {
      key: "getTextBtnAttr",
      value: function getTextBtnAttr(onEvt, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            title = _ref5[0],
            pageIdx = _ref5[1];

        return {
          title: title,
          disabled: !Number.isInteger(pageIdx),
          onClick: function onClick() {
            return onEvt({
              page: pageIdx
            });
          }
        };
      }
    }, {
      key: "getSpreadBtnAttr",
      value: function getSpreadBtnAttr(onEvt, state, _ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            page = _ref7[0],
            isLtSpread = _ref7[1];

        var curr = state.curr,
            maxSpread = state.maxSpread; // If the page is not a number, then its likely dots '...' so page is jumped by an interval of `maxSpread`
        // - e.g. maxSpread = 3, currPageNo = 6
        // then the page is jumped to 2 (eqv. to page index of 3)

        var isNum = typeof page === 'number'; // const pageIdx = isNum ? page - 1 : curr;

        var targetPageIdx = isLtSpread ? isNum ? curr - 1 : this.getPageIdxForSpread(curr, maxSpread, true) : isNum ? curr + 1 : this.getPageIdxForSpread(curr, maxSpread, false);
        return {
          title: isNum ? page : isLtSpread ? 'left-spread' : 'right-spread',
          isSpread: !isNum,
          onClick: function onClick() {
            return onEvt({
              page: targetPageIdx
            });
          }
        };
      }
    }, {
      key: "getPageSelectAttr",
      value: function getPageSelectAttr(onEvt, state) {
        var _this3 = this;

        var pageNo = state.pageNo,
            totalPage = state.totalPage,
            ltSpread = state.ltSpread,
            rtSpread = state.rtSpread;
        var isLteOnePage = totalPage <= 1; // Options (inclusive of all pages here)

        var leftOptions = isLteOnePage || pageNo === 1 ? [1] : [1].concat(_toConsumableArray(ltSpread ? ltSpread : []), [pageNo]);
        var rightOptions = isLteOnePage || pageNo === totalPage ? [] : [].concat(_toConsumableArray(rtSpread ? rtSpread : []), [totalPage]);
        var options = [].concat(_toConsumableArray(leftOptions), _toConsumableArray(rightOptions));
        var selectedOptionIdx = leftOptions.length - 1;
        return {
          title: 'page select',
          disabled: isLteOnePage,
          options: options,
          selectedOptionValue: pageNo,
          selectedOptionIdx: selectedOptionIdx,
          onSelect: function onSelect(_ref8) {
            var target = _ref8.target;

            var targetPageIdx = _this3.getTargetPageIdxByPos(state, options, [parseInt(target.value, 10), selectedOptionIdx]);

            onEvt({
              page: targetPageIdx
            });
          }
        };
      }
    }, {
      key: "getPerPageSelectAttr",
      value: function getPerPageSelectAttr(onEvt, option) {
        var increment = option.increment,
            incrementIdx = option.incrementIdx;
        return {
          title: 'per page select',
          disabled: increment.length <= 1,
          options: increment,
          selectedOptionValue: increment[incrementIdx],
          selectedOptionIdx: incrementIdx,
          onSelect: function onSelect(_ref9) {
            var target = _ref9.target;
            return onEvt({
              page: 0,
              incrementIdx: parseInt(target.value, 10)
            });
          }
        };
      }
    }, {
      key: "getGenericCmpEvtHandler",
      value: function getGenericCmpEvtHandler(totalRecord, option, callback) {
        var _this4 = this;

        return function (modOption) {
          var pgnOption = _this4.getOption(modOption, option);

          var pgnState = _this4.getState(totalRecord, pgnOption);

          if (callback) callback({
            pgnOption: pgnOption,
            pgnState: pgnState
          });
        };
      }
    }, {
      key: "getTargetPageIdxByPos",
      value: function getTargetPageIdxByPos(state, pages, _ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            currPos = _ref11[0],
            activePos = _ref11[1];

        var curr = state.curr,
            maxSpread = state.maxSpread;
        var page = pages[currPos];
        var targetPageIdx = typeof page === 'number' ? page - 1 : this.getPageIdxForSpread(curr, maxSpread, currPos < activePos);
        return targetPageIdx;
      }
    }]);

    return PgnHandle;
  }();

  return PgnHandle;

})));
//# sourceMappingURL=index.js.map
