(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Tabs", [], factory);
	else if(typeof exports === 'object')
		exports["Tabs"] = factory();
	else
		root["Tabs"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 471:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ src_0
});

// CONCATENATED MODULE: ./node_modules/@xaro/event-emitter/src/EventEmitter.ts
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

// CONCATENATED MODULE: ./node_modules/@xaro/event-emitter/src/index.ts
;
/* harmony default export */ const src = (EventEmitter);

// CONCATENATED MODULE: ./node_modules/@xaro/extend/index.js
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
// CONCATENATED MODULE: ./node_modules/@xaro/css-class-animations/src/variables.ts
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

// CONCATENATED MODULE: ./node_modules/@xaro/css-class-animations/src/helpers.ts
function addTo(origin, value) {
    if (typeof value === 'string') {
        origin.push(...document.querySelectorAll(value));
    }
    else if (value instanceof Element) {
        origin.push(value);
    }
}

// CONCATENATED MODULE: ./node_modules/@xaro/css-class-animations/src/CSSClassAnimations.ts
;


class CSSClassAnimations {
    constructor(config) {
        this.els = [];
        this.emitter = new src(config.on);
        if (Array.isArray(config.el)) {
            for (const val of config.el) {
                addTo(this.els, val);
            }
        }
        else {
            addTo(this.els, config.el);
        }
        if (config.allow) {
            // this.allow = config.allow.filter(value => events.includes(value));
            this.allow = (Array.isArray(config.allow) ? config.allow : [config.allow]).filter(value => events.includes(value));
        }
        else if (config.disallow) {
            // this.allow = events.filter(value => !config.disallow!.includes(value as T_DOMEventsKeys));
            this.allow = (Array.isArray(config.disallow) ? config.disallow : [config.disallow]).filter(value => events.includes(value));
        }
        else {
            this.allow = events;
        }
        for (const key in eventsListeners) {
            this[eventsListeners[key]] = this[eventsListeners[key]].bind(this);
        }
        for (const el of this.els) {
            for (const event of this.allow) {
                el.addEventListener(event, this[eventsListeners[event]]);
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
            el.addEventListener(domEventKey, this[eventsListeners[domEventKey]]);
        }
    }
    removeEvent(domEventKey) {
        if (!this.allow.includes(domEventKey)) {
            return;
        }
        for (const el of this.els) {
            el.removeEventListener(domEventKey, this[eventsListeners[domEventKey]]);
        }
    }
    addClass(...classes) {
        for (const el of this.els) {
            el.classList.add(...classes);
        }
        return this.els;
    }
    removeClass(...classes) {
        for (const el of this.els) {
            el.classList.remove(...classes);
        }
        return this.els;
    }
    css(obj) {
        for (const el of this.els) {
            for (const key in obj) {
                el.style[key] = obj[key];
            }
        }
        return this.els;
    }
    on(eventKey, cb) {
        this.emitter.subscribe(eventKey, cb);
    }
}

// CONCATENATED MODULE: ./node_modules/@xaro/css-class-animations/src/index.ts
;
/* harmony default export */ const css_class_animations_src = (CSSClassAnimations);

// CONCATENATED MODULE: ./src/Tab.ts
;

class Tab {
    constructor(config) {
        this.pending = false;
        this.config = config;
        this.emitter = new src({ ...this.config.on });
        if (this.config.tabs.config.mutation !== false) {
            this.animation = new css_class_animations_src({
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
            this.config.el.classList.remove(classes.activeTab);
        }
        else {
            if (config && config.animated === false) {
                this.config.tabs.currentPendingTab = undefined;
                this.animation.addClass(classes[mutation].cancel);
            }
            this.animation.removeClass(classes[mutation].hide, classes[mutation].show);
            if (config && config.after) {
                this.emitter.once('internalMutationEnd', () => {
                    this.animation.removeClass(classes.activeTab);
                    this.config.visible = false;
                });
                this.emitter.once('mutationEnd', () => {
                    config.after();
                });
                this.animation.addClass(classes[mutation].hide);
            }
            else {
                this.animation.removeClass(classes.activeTab);
            }
            if (config && config.animated === false) {
                this.animation.removeClass(classes[mutation].cancel);
            }
        }
    }
    show(config) {
        const classes = this.config.tabs.config.classes;
        const mutation = this.config.tabs.config.mutation;
        this.pending = true;
        this.config.tabs.currentPendingTab = this;
        if (mutation === false) {
            this.config.el.classList.add(classes.activeTab);
        }
        else {
            if (config && config.animated === false) {
                this.animation.addClass(classes[mutation].cancel);
            }
            this.animation.removeClass(classes[mutation].hide, classes[mutation].show);
            if (config) {
                if (config.after) {
                    this.emitter.once('mutationEnd', () => {
                        config.after();
                    });
                }
            }
            this.animation.addClass(classes.activeTab, classes[mutation].show);
            this.config.visible = true;
            if (config && config.animated === false) {
                this.animation.removeClass(classes[mutation].show, classes[mutation].cancel);
            }
        }
    }
}

// CONCATENATED MODULE: ./src/variables.ts
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

// CONCATENATED MODULE: ./src/Nav.ts
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
        this.config.el.classList.remove(this.config.tabs.config.classes.activeNav);
    }
    activate() {
        this.config.el.classList.add(this.config.tabs.config.classes.activeNav);
    }
}

// CONCATENATED MODULE: ./src/Tabs.ts
;




class Tabs {
    constructor(config) {
        this.items = [];
        this.currentPendingTab = undefined;
        this.config = extend({}, defaults, config);
        this.emitter = new src({ ...this.config.on });
        this.config.mutation = this.config.mutation === undefined ? 'animation' : this.config.mutation;
        this.config.el.classList.add(this.config.classes.wrapper[new String(this.config.mutation).toString()]);
        const navEls = this.config.el.querySelectorAll('.' + this.config.classes.nav);
        const tabEls = this.config.el.querySelectorAll('.' + this.config.classes.tab);
        for (let idx = 0; idx < tabEls.length; idx++) {
            if (this.config.current === undefined) {
                if (tabEls[idx].classList.contains(this.config.classes.activeTab) || navEls[idx].classList.contains(this.config.classes.activeNav)) {
                    this.config.current = idx;
                }
            }
            const tab = new Tab({
                el: tabEls[idx],
                tabs: this,
                idx
            });
            const nav = new Nav({
                tabs: this,
                el: navEls[idx],
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
                tab.config.nav?.config.el.classList.add(this.config.classes.activeNav);
            }
            else {
                tab.hide({ animated: false });
                tab.config.nav?.config.el.classList.remove(this.config.classes.activeNav);
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

// CONCATENATED MODULE: ./src/index.ts
;

/* harmony default export */ const src_0 = (Tabs);


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
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(471);
/******/ })()
.default;
});
//# sourceMappingURL=Tabs.js.map