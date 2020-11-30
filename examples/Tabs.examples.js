/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@xaro/extend/index.js":
/*!********************************************!*\
  !*** ./node_modules/@xaro/extend/index.js ***!
  \********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ extend,
/* harmony export */   "isObject": () => /* binding */ isObject
/* harmony export */ });
function extend(...args) {
  const to = Object(args[0]);
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null) {
      const keysArray = Object.keys(Object(nextSource));
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            extend(to[nextKey], nextSource[nextKey]);
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            extend(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}

function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}

/***/ }),

/***/ "./src/scss/index.examples.scss":
/*!**************************************!*\
  !*** ./src/scss/index.examples.scss ***!
  \**************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/@xaro/css-class-animations/src/CSSClassAnimations.ts":
/*!***************************************************************************!*\
  !*** ./node_modules/@xaro/css-class-animations/src/CSSClassAnimations.ts ***!
  \***************************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ CSSClassAnimations
/* harmony export */ });
/* harmony import */ var _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xaro/event-emitter */ "./node_modules/@xaro/event-emitter/src/index.ts");
/* harmony import */ var _xaro_micro_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xaro/micro-dom */ "./node_modules/@xaro/micro-dom/src/index.ts");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables */ "./node_modules/@xaro/css-class-animations/src/variables.ts");



class CSSClassAnimations {
    constructor(config) {
        this.emitter = new _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__.default(config.on);
        if (Array.isArray(config.el)) {
            this.els = (0,_xaro_micro_dom__WEBPACK_IMPORTED_MODULE_1__.default)(...config.el);
        }
        else {
            this.els = (0,_xaro_micro_dom__WEBPACK_IMPORTED_MODULE_1__.default)(config.el);
        }
        if (config.allow) {
            this.allow = (Array.isArray(config.allow) ? config.allow : [config.allow]).filter(value => _variables__WEBPACK_IMPORTED_MODULE_2__.events.includes(value));
        }
        else if (config.disallow) {
            this.allow = (Array.isArray(config.disallow) ? config.disallow : [config.disallow]).filter(value => _variables__WEBPACK_IMPORTED_MODULE_2__.events.includes(value));
        }
        else {
            this.allow = _variables__WEBPACK_IMPORTED_MODULE_2__.events;
        }
        for (const key in _variables__WEBPACK_IMPORTED_MODULE_2__.eventsListeners) {
            this[_variables__WEBPACK_IMPORTED_MODULE_2__.eventsListeners[key]] = this[_variables__WEBPACK_IMPORTED_MODULE_2__.eventsListeners[key]].bind(this);
        }
        for (const el of this.els) {
            for (const event of this.allow) {
                el.addEventListener(event, this[_variables__WEBPACK_IMPORTED_MODULE_2__.eventsListeners[event]]);
            }
        }
    }
    __mutationStartListener(event) {
        this.emitter.emit('start', this, event);
    }
    __mutationCancelListener(event) {
        this.emitter.emit('cancel', this, event);
    }
    __mutationEndListener(event) {
        this.emitter.emit('end', this, event);
    }
    __mutationIterationListener(event) {
        this.emitter.emit('iteration', this, event);
    }
    __mutationRunListener(event) {
        this.emitter.emit('run', this, event);
    }
    addEvent(domEventKey) {
        if (!this.allow.includes(domEventKey)) {
            return;
        }
        for (const el of this.els) {
            el.addEventListener(domEventKey, this[_variables__WEBPACK_IMPORTED_MODULE_2__.eventsListeners[domEventKey]]);
        }
    }
    removeEvent(domEventKey) {
        if (!this.allow.includes(domEventKey)) {
            return;
        }
        for (const el of this.els) {
            el.removeEventListener(domEventKey, this[_variables__WEBPACK_IMPORTED_MODULE_2__.eventsListeners[domEventKey]]);
        }
    }
    on(eventKey, cb) {
        this.emitter.subscribe(eventKey, cb);
    }
}


/***/ }),

/***/ "./node_modules/@xaro/css-class-animations/src/index.ts":
/*!**************************************************************!*\
  !*** ./node_modules/@xaro/css-class-animations/src/index.ts ***!
  \**************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _CSSClassAnimations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CSSClassAnimations */ "./node_modules/@xaro/css-class-animations/src/CSSClassAnimations.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_CSSClassAnimations__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ }),

/***/ "./node_modules/@xaro/css-class-animations/src/variables.ts":
/*!******************************************************************!*\
  !*** ./node_modules/@xaro/css-class-animations/src/variables.ts ***!
  \******************************************************************/
/*! namespace exports */
/*! export events [provided] [no usage info] [missing usage info prevents renaming] */
/*! export eventsListeners [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventsListeners": () => /* binding */ eventsListeners,
/* harmony export */   "events": () => /* binding */ events
/* harmony export */ });
const eventsListeners = {
    animationstart: '__mutationStartListener',
    animationcancel: '__mutationCancelListener',
    animationend: '__mutationEndListener',
    animationiteration: '__mutationIterationListener',
    transitionstart: '__mutationStartListener',
    transitioncancel: '__mutationCancelListener',
    transitionend: '__mutationEndListener',
    transitionrun: '__mutationRunListener'
};
const events = Object.keys(eventsListeners);


/***/ }),

/***/ "./node_modules/@xaro/event-emitter/src/EventEmitter.ts":
/*!**************************************************************!*\
  !*** ./node_modules/@xaro/event-emitter/src/EventEmitter.ts ***!
  \**************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ EventEmitter
/* harmony export */ });
class EventEmitter {
    /**
     * Create Emitter
     */
    constructor(on = {}) {
        /**
         * Event list
         */
        this.events = {};
        for (let key in on) {
            if (on[key]) {
                this.subscribe(key, on[key]);
            }
        }
    }
    /**
     * Creates a key for the event and subscribes the passed callback to it.
     */
    subscribe(key, cb) {
        if (!this.has(key)) {
            this.events[key] = [];
        }
        let removes = [];
        if (Array.isArray(cb)) {
            for (const _cb of cb) {
                removes.push(...this.subscribe(key, _cb));
            }
        }
        else {
            this.events[key].push(cb);
            removes.push(() => this.removeListener(key, cb));
        }
        return removes;
    }
    /**
     * Unsubscribes all callback functions from the event and removes the event
     * key.
     */
    unsubscribe(...keys) {
        for (const key of keys) {
            if (this.events[key]) {
                delete this.events[key];
            }
        }
    }
    /**
     * Removes a specific event key callback function.
     */
    removeListener(key, cb) {
        // if (typeof this.events[key] === 'object') {
        if (Array.isArray(this.events[key])) {
            const idx = this.events[key].indexOf(cb);
            if (idx > -1) {
                this.events[key].splice(idx, 1);
            }
        }
    }
    /**
     * Calls the callback function only once, and then removes it.
     */
    once(key, cb) {
        const remove = this.subscribe(key, () => {
            remove[0]();
            if (Array.isArray(cb)) {
                for (const _cb of cb) {
                    _cb();
                }
            }
            else {
                cb();
            }
        });
    }
    /**
     * Checks for an event by key.
     * (Doesn't check for callback functions)
     */
    has(key) {
        return !!this.events[key];
    }
    /**
     * Returns the number of callback functions for the event key or "false" if
     * there is no key
     */
    listenerCount(key) {
        if (!this.events.hasOwnProperty(key)) {
            return false;
        }
        return this.events[key].length;
    }
    /**
     * Calls all callback functions on events using the event key.
     */
    emit(key, ...args) {
        const event = this.events[key];
        if (event) {
            for (let cb of event) {
                cb(...args);
            }
        }
    }
    /**
     * Just like "emit" calls all callback functions. However, the callback must
     * return a boolean value, which determines whether or not the next callback
     * will execute.
     * As a result, it returns the result of the last executed callback function.
     */
    validateEmit(key, ...args) {
        const event = this.events[key];
        if (!event) {
            return false;
        }
        for (const cb of event) {
            if (!cb(...args)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Just like "emit" calls all callbacks, but unlike "emit" it passes the
     * result of the previous callback to the next one as an argument.
     * As aresult, it will return the result of the last callback.
     */
    seriesEmit(key, ...args) {
        const event = this.events[key];
        if (!event) {
            return;
        }
        let params;
        for (let i = 0; i < event.length; i++) {
            if (i === 0) {
                params = event[i](...args);
            }
            else {
                params = event[i](params);
            }
        }
        return params;
    }
}


/***/ }),

/***/ "./node_modules/@xaro/event-emitter/src/index.ts":
/*!*******************************************************!*\
  !*** ./node_modules/@xaro/event-emitter/src/index.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./node_modules/@xaro/event-emitter/src/EventEmitter.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_EventEmitter__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ }),

/***/ "./node_modules/@xaro/micro-dom/src/MicroDOM.ts":
/*!******************************************************!*\
  !*** ./node_modules/@xaro/micro-dom/src/MicroDOM.ts ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ MicroDOM
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@xaro/micro-dom/src/helpers.ts");

class MicroDOM extends Array {
    constructor(...args) {
        super(...args);
    }
    get(...args) {
        let newInstance = new MicroDOM;
        if (this.length) {
            for (const el of this) {
                newInstance.push(...(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getEls)(el, ...args));
            }
        }
        else {
            newInstance.push(...(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getEls)(document, ...args));
        }
        return newInstance;
    }
    create(...entities) {
        let newInstance = new MicroDOM;
        for (const entity of entities) {
            if (typeof entity === 'string') {
                newInstance.push(document.createElement(entity));
            }
            else if (entity instanceof Object) {
                const el = document.createElement(entity.tagName || 'div');
                if (entity.content) {
                    if (Array.isArray(entity.content)) {
                        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.recursiveAppend)(el, ...entity.content);
                    }
                    else {
                        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.recursiveAppend)(el, entity.content);
                    }
                }
                newInstance.push(el);
            }
        }
        return newInstance;
    }
    empty() {
        for (const el of this) {
            el.innerHTML = '';
        }
        return this;
    }
    append(...append) {
        for (const el of this) {
            (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.recursiveAppend)(el, ...append);
        }
        return this;
    }
    addClass(...classes) {
        for (const el of this) {
            el.classList.add(...classes);
        }
        return this;
    }
    removeClass(...classes) {
        for (const el of this) {
            el.classList.remove(...classes);
        }
        return this;
    }
    toggleClass(classname) {
        for (const el of this) {
            el.classList.toggle(classname);
        }
        return this;
    }
    hasClass(classname, reqtForAll = false) {
        if (reqtForAll) { // The presence of a class for each element of the set
            let number = 0;
            for (const el of this) {
                if (el.classList.contains(classname)) {
                    number++;
                }
            }
            return number === this.length;
        }
        else { // the presence of a class for at least one element of the set
            for (const el of this) {
                if (el.classList.contains(classname)) {
                    return true;
                }
            }
            return false;
        }
    }
    addEventListener(type, listener, options) {
        for (const el of this) {
            el.addEventListener(type, listener, options);
        }
        return this;
    }
    removeEventListener(type, listener, options) {
        for (const el of this) {
            el.removeEventListener(type, listener, options);
        }
        return this;
    }
    css(obj) {
        for (const el of this) {
            for (const key in obj) {
                el.style[key] = obj[key];
            }
        }
        return this;
    }
    attr(obj) {
        for (const el of this) {
            for (const key in obj) {
                el.setAttribute(key, obj[key]);
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/@xaro/micro-dom/src/entry.ts":
/*!***************************************************!*\
  !*** ./node_modules/@xaro/micro-dom/src/entry.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ _
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@xaro/micro-dom/src/helpers.ts");
/* harmony import */ var _MicroDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MicroDOM */ "./node_modules/@xaro/micro-dom/src/MicroDOM.ts");


function _(...args) {
    if (args instanceof _MicroDOM__WEBPACK_IMPORTED_MODULE_1__.default) {
        return args;
    }
    return new _MicroDOM__WEBPACK_IMPORTED_MODULE_1__.default(...(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getEls)(document, ...args));
}


/***/ }),

/***/ "./node_modules/@xaro/micro-dom/src/helpers.ts":
/*!*****************************************************!*\
  !*** ./node_modules/@xaro/micro-dom/src/helpers.ts ***!
  \*****************************************************/
/*! namespace exports */
/*! export getEls [provided] [no usage info] [missing usage info prevents renaming] */
/*! export recursiveAppend [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEls": () => /* binding */ getEls,
/* harmony export */   "recursiveAppend": () => /* binding */ recursiveAppend
/* harmony export */ });
function getEls(target, ...els) {
    const arr = [];
    for (const el of els) {
        if (typeof el === 'string') {
            const nodes = target.querySelectorAll(el);
            arr.push(...nodes);
        }
        else if (el instanceof Element) {
            arr.push(el);
        }
    }
    return arr;
}
function recursiveAppend(el, ...content) {
    for (const entity of content) {
        if (Array.isArray(entity)) {
            recursiveAppend(el, ...entity);
        }
        else {
            el.append(entity);
        }
    }
}


/***/ }),

/***/ "./node_modules/@xaro/micro-dom/src/index.ts":
/*!***************************************************!*\
  !*** ./node_modules/@xaro/micro-dom/src/index.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export MicroDOM [provided] [no usage info] [missing usage info prevents renaming] -> ./node_modules/@xaro/micro-dom/src/MicroDOM.ts .default */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "MicroDOM": () => /* reexport safe */ _MicroDOM__WEBPACK_IMPORTED_MODULE_1__.default
/* harmony export */ });
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entry */ "./node_modules/@xaro/micro-dom/src/entry.ts");
/* harmony import */ var _MicroDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MicroDOM */ "./node_modules/@xaro/micro-dom/src/MicroDOM.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_entry__WEBPACK_IMPORTED_MODULE_0__.default);
// ===




/***/ }),

/***/ "./src/Nav.ts":
/*!********************!*\
  !*** ./src/Nav.ts ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Nav
/* harmony export */ });
class Nav {
    constructor(config) {
        this.config = config;
        this.clickListener = this.clickListener.bind(this);
        this.config.el.addEventListener('click', this.clickListener);
    }
    clickListener(event) {
        this.config.tabs.changeTab(this.config.tab.config.idx);
    }
    disactivate() {
        this.config.el.removeClass(this.config.tabs.config.classes.activeNav);
    }
    activate() {
        this.config.el.addClass(this.config.tabs.config.classes.activeNav);
    }
}


/***/ }),

/***/ "./src/Tab.ts":
/*!********************!*\
  !*** ./src/Tab.ts ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Tab
/* harmony export */ });
/* harmony import */ var _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xaro/event-emitter */ "./node_modules/@xaro/event-emitter/src/index.ts");
/* harmony import */ var _xaro_css_class_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xaro/css-class-animations */ "./node_modules/@xaro/css-class-animations/src/index.ts");


class Tab {
    constructor(config) {
        this.pending = false;
        this.config = config;
        this.emitter = new _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__.default({ ...this.config.on });
        if (this.config.tabs.config.mutation !== false) {
            this.animation = new _xaro_css_class_animations__WEBPACK_IMPORTED_MODULE_1__.default({
                el: this.config.el,
                allow: [this.config.tabs.config.mutation + 'end'],
                on: {
                    end: [
                        this.__mutationEndCallback.bind(this)
                    ]
                }
            });
        }
    }
    __mutationEndCallback(event) {
        this.pending = false;
        this.emitter.emit('internalMutationEnd', event);
        this.config.tabs.currentPendingTab = undefined;
        this.emitter.emit('mutationEnd', event);
    }
    hide(config) {
        const classes = this.config.tabs.config.classes;
        const mutation = this.config.tabs.config.mutation;
        this.pending = true;
        this.config.tabs.currentPendingTab = config && config.animated !== false ? this : undefined;
        if (mutation === false) {
            this.config.el.removeClass(classes.activeTab);
        }
        else {
            if (config && config.animated === false) {
                this.config.tabs.currentPendingTab = undefined;
                this.animation.els.addClass(classes[mutation].cancel);
            }
            this.animation.els.removeClass(classes[mutation].hide, classes[mutation].show);
            if (config && config.after) {
                this.emitter.once('internalMutationEnd', () => {
                    this.animation.els.removeClass(classes.activeTab);
                    this.config.visible = false;
                });
                this.emitter.once('mutationEnd', () => {
                    config.after();
                });
                this.animation.els.addClass(classes[mutation].hide);
            }
            else {
                this.animation.els.removeClass(classes.activeTab);
            }
            if (config && config.animated === false) {
                this.animation.els.removeClass(classes[mutation].cancel);
            }
        }
    }
    show(config) {
        const classes = this.config.tabs.config.classes;
        const mutation = this.config.tabs.config.mutation;
        this.pending = true;
        this.config.tabs.currentPendingTab = this;
        if (mutation === false) {
            this.config.el.addClass(classes.activeTab);
        }
        else {
            if (config && config.animated === false) {
                this.animation.els.addClass(classes[mutation].cancel);
            }
            this.animation.els.removeClass(classes[mutation].hide, classes[mutation].show);
            if (config) {
                if (config.after) {
                    this.emitter.once('mutationEnd', () => {
                        config.after();
                    });
                }
            }
            this.animation.els.addClass(classes.activeTab, classes[mutation].show);
            this.config.visible = true;
            if (config && config.animated === false) {
                this.animation.els.removeClass(classes[mutation].show, classes[mutation].cancel);
            }
        }
    }
}


/***/ }),

/***/ "./src/Tabs.ts":
/*!*********************!*\
  !*** ./src/Tabs.ts ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Tabs
/* harmony export */ });
/* harmony import */ var _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xaro/event-emitter */ "./node_modules/@xaro/event-emitter/src/index.ts");
/* harmony import */ var _xaro_micro_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xaro/micro-dom */ "./node_modules/@xaro/micro-dom/src/index.ts");
/* harmony import */ var _xaro_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @xaro/extend */ "./node_modules/@xaro/extend/index.js");
/* harmony import */ var _Tab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tab */ "./src/Tab.ts");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variables */ "./src/variables.ts");
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Nav */ "./src/Nav.ts");






class Tabs {
    constructor(config) {
        this.items = [];
        this.currentPendingTab = undefined;
        this.config = (0,_xaro_extend__WEBPACK_IMPORTED_MODULE_2__.default)({}, _variables__WEBPACK_IMPORTED_MODULE_4__.defaults, config);
        this.emitter = new _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__.default({ ...this.config.on });
        this.config.mutation = this.config.mutation === undefined ? 'animation' : this.config.mutation;
        this.config.el = config.el instanceof _xaro_micro_dom__WEBPACK_IMPORTED_MODULE_1__.MicroDOM ? this.config.el : (0,_xaro_micro_dom__WEBPACK_IMPORTED_MODULE_1__.default)(config.el);
        this.config.el.addClass(this.config.classes.wrapper[new String(this.config.mutation).toString()]);
        const navEls = this.config.el.get('.' + this.config.classes.nav);
        const tabEls = this.config.el.get('.' + this.config.classes.tab);
        for (let idx = 0; idx < tabEls.length; idx++) {
            if (this.config.current === undefined) {
                if (tabEls[idx].classList.contains(this.config.classes.activeTab) || navEls[idx].classList.contains(this.config.classes.activeNav)) {
                    this.config.current = idx;
                }
            }
            const tab = new _Tab__WEBPACK_IMPORTED_MODULE_3__.default({
                el: (0,_xaro_micro_dom__WEBPACK_IMPORTED_MODULE_1__.default)(tabEls[idx]),
                tabs: this,
                idx
            });
            const nav = new _Nav__WEBPACK_IMPORTED_MODULE_5__.default({
                tabs: this,
                el: (0,_xaro_micro_dom__WEBPACK_IMPORTED_MODULE_1__.default)(navEls[idx]),
                tab
            });
            tab.config.nav = nav;
            this.items.push(tab);
        }
        if (!this.config.current) {
            this.config.current = 0;
        }
        this.fixClasses();
        this.emitter.emit('init', this);
    }
    fixClasses() {
        for (const tab of this.items) {
            if (tab.config.idx === this.config.current) {
                tab.show({ animated: false });
                tab.config.nav?.config.el.addClass(this.config.classes.activeNav);
            }
            else {
                tab.hide({ animated: false });
                tab.config.nav?.config.el.removeClass(this.config.classes.activeNav);
            }
        }
    }
    changeTab(idx) {
        if (!this.items[idx]) {
            return;
        }
        const prevIdx = this.config.current;
        const nextIdx = idx;
        if (prevIdx === nextIdx) {
            return;
        }
        const prevTab = this.items[prevIdx];
        const nextTab = this.items[nextIdx];
        this.emitter.emit('beforeChange', this, prevIdx, nextIdx);
        if (this.config.mutation === false) {
            prevTab.hide();
            nextTab.show();
        }
        else {
            if (this.currentPendingTab) {
                const pendingTab = this.currentPendingTab;
                pendingTab.emitter.unsubscribe('mutationEnd');
                pendingTab.emitter.once('mutationEnd', () => {
                    if (pendingTab.config.visible) {
                        pendingTab.hide({
                            after: () => {
                                nextTab.show({
                                    after: () => this.emitter.emit('afterChange', this, prevIdx, nextIdx)
                                });
                            }
                        });
                    }
                    else {
                        nextTab.show({
                            after: () => this.emitter.emit('afterChange', this, prevIdx, nextIdx)
                        });
                    }
                });
            }
            else {
                prevTab.hide({
                    after: () => {
                        nextTab.show({
                            after: () => this.emitter.emit('afterChange', this, prevIdx, nextIdx)
                        });
                    }
                });
            }
        }
        prevTab.config.nav?.disactivate();
        nextTab.config.nav?.activate();
        this.config.current = nextIdx;
    }
}


/***/ }),

/***/ "./src/index.examples.ts":
/*!*******************************!*\
  !*** ./src/index.examples.ts ***!
  \*******************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_examples_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/index.examples.scss */ "./src/scss/index.examples.scss");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/index.ts");


window.tabs = new ___WEBPACK_IMPORTED_MODULE_1__.default({
    el: document.querySelector('.tabs-1'),
    mutation: 'animation',
    // mutation: false,
    on: {
        init: (tabs) => {
            console.log('[init]');
        },
        beforeChange: (tabs, prevIdx, nextIdx) => {
            console.log('[beforeChange]', prevIdx, nextIdx);
        },
        afterChange: (tabs, prevIdx, nextIdx) => {
            console.log('[afterChange]', prevIdx, nextIdx);
        }
    }
});


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss */ "./src/scss/index.scss");
/* harmony import */ var _Tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tabs */ "./src/Tabs.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Tabs__WEBPACK_IMPORTED_MODULE_1__.default);


/***/ }),

/***/ "./src/variables.ts":
/*!**************************!*\
  !*** ./src/variables.ts ***!
  \**************************/
/*! namespace exports */
/*! export defaults [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaults": () => /* binding */ defaults
/* harmony export */ });
const defaults = {
    el: null,
    classes: {
        navs: 'tabs__navs',
        nav: 'tabs__nav',
        tabs: 'tabs__tabs',
        tab: 'tabs__tab',
        activeTab: 'tabs__tab--active',
        activeNav: 'tabs__nav--active',
        animation: {
            cancel: 'tabs__tab--animation-cancel',
            hide: 'tabs__tab--animation-hide',
            show: 'tabs__tab--animation-show',
        },
        transition: {
            cancel: 'tabs__tab--transition-cancel',
            hide: 'tabs__tab--transition-hide',
            show: 'tabs__tab--transition-show',
        },
        wrapper: {
            animation: 'tabs--animation',
            transition: 'tabs--transition',
            false: 'tabs--without-animation'
        }
    },
    current: undefined,
    mutation: undefined,
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.examples.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=Tabs.examples.js.map