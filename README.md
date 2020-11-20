# @xaro/tabs

Tabs with events and css-class-animations for web

## Install

```sh
$ npm install @xaro/css-class-animations
```

## Differences from other packages

The package has built-in events for css animation and transition events.
Therefore, for example, the afterChange event will be called only after the previous tab has disappeared and the new one has been shown. But this will only work if the "mutation" property is either animation or transition. If "mutation" property is false, events will not be assigned to tab elements and there will be a simple class change with display: block/none, beforeChange and afterChange events will also be called, but immediately before or after the class change, respectively.

## Usage
*your.html*
```html
<div class="tabs">
  <div class="tabs__navs">
    <div class="tabs__nav">0</div>
    <div class="tabs__nav">1</div>
    <div class="tabs__nav">2</div>
  </div>
  <div class="tabs__tabs">
    <div class="tabs__tab tabs__tab--active">#0 Content</div>
    <div class="tabs__tab tabs__tab--active">#1 Content</div>
    <div class="tabs__tab tabs__tab--active">#2 Content</div>
  </div>
</div>
```

*your.ts*
```ts
const tabs = new Tabs({
  el: document.querySelector('.tabs') as Element,
  on: {
    init: (tabs: I_Tabs) => {
      console.log('[init]');
    },
    beforeChange: (tabs: I_Tabs, prevIdx: number, nextIdx: number) => {
      console.log('[beforeChange]', prevIdx, nextIdx);
    },
    afterChange: (tabs: I_Tabs, prevIdx: number, nextIdx: number) => {
      console.log('[afterChange]', prevIdx, nextIdx);
    }
  }
});
```

***

> The library uses [@xaro/event-emitter](https://www.npmjs.com/package/@xaro/event-emitter) and you can use all its features through the **emitter** property of the Tabs object instance.
>
> Also library uses [@xaro/css-class-animations](https://www.npmjs.com/package/@xaro/css-class-animations)

## Interfaces & Types

*types.d.ts*
```ts
import { I_EventEmitter } from "@xaro/event-emitter";
import { I_CSSClassAnimations } from "@xaro/css-class-animations";

/** Tabs */
export interface I_Tabs {
  emitter:            I_EventEmitter;
  items:              I_Tab[];
  config:             I_TabsConfig;
  currentPendingTab?: I_Tab;

  changeTab(idx: number): void;
}

export interface I_TabsConstructorConfig {
  el: Element;

  classes?: {
    navs?:      string;
    nav?:       string;
    activeNav?: string;
    tabs?:      string;
    tab?:       string;
    activeTab?: string;
    animation?: {
      cancel?:      string;
      hide?:        string;
      show?:        string;
    },
    transition?: {
      cancel?:      string;
      hide?:        string;
      show?:        string;
    },
    wrapper?: {
      animation?:   string;
      transition?:  string;
      false?:       string;
    }
  };

  attr?: {
    nav?: string;
    tab?: string;
  };

  mutation?: 'animation' | 'transition' | false; // Tabs animation type

  on?: {
    init?:          (tabs: I_Tabs) => void | ((tabs: I_Tabs) => void)[];
    beforeChange?:  (tabs: I_Tabs, prevIdx: number, nextIdx: number) => void | ((tabs: I_Tabs, prevIdx: number, nextIdx: number) => void)[];
    afterChange?:   (tabs: I_Tabs, prevIdx: number, nextIdx: number) => void | ((tabs: I_Tabs, prevIdx: number, nextIdx: number) => void)[];
  };
}

export interface I_TabsConfig {
  el:       Element;

  current:  number;

  classes: {
    navs:       string;
    nav:        string;
    activeNav:  string;
    tabs:       string;
    tab:        string;
    activeTab:  string;
    animation: {
      cancel:     string;
      hide:       string;
      show:       string;
    },
    transition: {
      cancel:     string;
      hide:       string;
      show:       string;
    },
    wrapper: {
      animation:  string;
      transition: string;
      false:      string;
    }
  };

  attr: {
    nav:  string;
    tab:  string;
  };

  mutation: 'animation' | 'transition' | false;

  on?: {
    init?:          (tabs: I_Tabs) => void | ((tabs: I_Tabs) => void)[];
    beforeChange?:  (tabs: I_Tabs, prevIdx: number, nextIdx: number) => void | ((tabs: I_Tabs, prevIdx: number, nextIdx: number) => void)[];
    afterChange?:   (tabs: I_Tabs, prevIdx: number, nextIdx: number) => void | ((tabs: I_Tabs, prevIdx: number, nextIdx: number) => void)[];
  };
}


/** Tab */
export interface I_Tab {
  emitter:    I_EventEmitter;
  config:     I_TabConfig;
  animation?: I_CSSClassAnimations;
  pending:    boolean;

  hide(config?: I_TabDisplayConfig): void;
  show(config?: I_TabDisplayConfig): void;
}

export interface I_TabConstructorConfig {
  tabs:     I_Tabs;
  idx:      number;
  el:       Element;
  nav?:     I_Nav;
  visible?: boolean;

  on?: {
    init?:  (tab: I_Tab, idx: number) => void | ((tab: I_Tab, idx: number) => void)[];
    hide?:  (tab: I_Tab, idx: number) => void | ((tab: I_Tab, idx: number) => void)[];
    show?:  (tab: I_Tab, idx: number) => void | ((tab: I_Tab, idx: number) => void)[];
  }
}

export interface I_TabConfig {
  tabs:     I_Tabs;
  idx:      number;
  el:       Element;
  nav?:     I_Nav;
  visible:  boolean;

  on?: {
    init?:  (tab: I_Tab, idx: number) => void | ((tab: I_Tab, idx: number) => void)[];
    hide?:  (tab: I_Tab, idx: number) => void | ((tab: I_Tab, idx: number) => void)[];
    show?:  (tab: I_Tab, idx: number) => void | ((tab: I_Tab, idx: number) => void)[];
  }
}

export interface I_TabDisplayConfig {
  after?:     () => void; // default: undefined (only for animation or transition mutation)
  animated?:  boolean;    // default: true
}


/** Nav */
export interface I_Nav {
  config: I_NavConfig;

  disactivate():  void;
  activate():     void;
}

export interface I_NavConstructorConfig {
  el:       Element;
  tabs:     I_Tabs;
  tab:      I_Tab;
}

export interface I_NavConfig {
  el:   Element;
  tabs: I_Tabs;
  tab:  I_Tab;
}
```

## License
[MIT](LICENSE)