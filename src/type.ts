//// Pagination Option (full)
export interface IOption {
    page: number;
    increment: number[];
    incrementIdx: number;
    maxSpread: number;
}


//// Pagination State
export interface IState extends IPageCtx, IPageSlice, IRelPage, IRecordCtx, ISpreadCtx {
    perPage: number;
    totalPage: number;
}

export interface IPageCtx {
    curr: number;
    pageNo: number;
}

export interface IPageSlice {
    startIdx: number;
    endIdx: number;
}

export type IRelPage = {
    first: number;
    prev: number;
    next: number;
    last: number;
}

export interface IRecordCtx {
    totalRecord: number;
    startRecord: number;
    endRecord: number;
}

export interface ISpreadCtx {
    ltSpread: TSpreadCtx;
    rtSpread: TSpreadCtx;
    maxSpread: number;
}

export type TSpreadCtx = (number | '...')[];


//// Pagination Request/Query
// Current Page Index Range
export interface IPageRange {
    curr: number;
    last: number;
}

// Navigation Target Request
export interface IPageNavQuery {
    type: string;
    target?: number;
}

// Whether relevant pages are navigatable
export interface IRelPageCtx extends TRelPageCtx {}
type TRelPageCtx = {
    [K in keyof IRelPage]: boolean;
}


//// Generic Component Attributes
export interface ICmpAttr {
    firstBtnAttr: ICmpBtnAttr;
    prevBtnAttr: ICmpBtnAttr;
    nextBtnAttr: ICmpBtnAttr;
    lastBtnAttr: ICmpBtnAttr;
    ltSpreadBtnsAttr: ICmpBtnAttr[];
    rtSpreadBtnsAttr: ICmpBtnAttr[];
    pageSelectAttr: ICmpSelectAttr;
    perPageSelectAttr: ICmpSelectAttr;
}

export interface ICmpAttrQuery {
    totalRecord: number;
    option: IOption;
    state: IState;
    callback: TFn;
}

export interface ICmpBtnAttr extends ICommonCmpAttr {
    isSpread?: boolean;
    onClick: TFn;
}

export interface ICmpSelectAttr extends ICommonCmpAttr {
    options: (string | number)[];
    selectedOptionValue: string | number;
    selectedOptionIdx: number;
    onSelect: TFn;
}

interface ICommonCmpAttr {
    [k: string]: any;
    title: string;
    disabled?: boolean;
}

export interface ISelectEvt extends Event {
    target: HTMLSelectElement;
}

export type TPageList = (string | number)[];


//// Misc
export type TFn = (...args: any[]) => any;
