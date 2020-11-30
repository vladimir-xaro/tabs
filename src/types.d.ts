import { I_EventEmitter } from "@xaro/event-emitter";
import { I_CSSClassAnimations } from "@xaro/css-class-animations";
import { I_MicroDOM } from "@xaro/micro-dom";


/** Tabs */

export interface I_Tabs {
  emitter:            I_EventEmitter;
  items:              I_Tab[];
  config:             I_TabsConfig;
  currentPendingTab?: I_Tab;

  changeTab(idx: number): void;
}

export interface I_TabsConstructorConfig {
  el: string | Element | I_MicroDOM;

  classes?: {
    navs?:      string;
    nav?:       string;
    activeNav?: string;
    tabs?:      string;
    tab?:       string;
    activeTab?: string;
    animation?: {
      leave?: {
        from?:    string;
        active?:  string;
        to?:      string;
      };
      enter?: {
        from?:    string;
        active?:  string;
        to?:      string;
      };
    };
    transition?: {
      leave?: {
        from?:    string;
        active?:  string;
        to?:      string;
      };
      enter?: {
        from?:    string;
        active?:  string;
        to?:      string;
      };
    };
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
  el:       I_MicroDOM;

  current:  number;

  classes: {
    navs:       string;
    nav:        string;
    activeNav:  string;
    tabs:       string;
    tab:        string;
    activeTab:  string;
    animation: {
      leave: {
        from:     string;
        active:   string;
        to:       string;
      };
      enter: {
        from:     string;
        active:   string;
        to:       string;
      };
    };
    transition: {
      leave: {
        from:     string;
        active:   string;
        to:       string;
      };
      enter: {
        from:     string;
        active:   string;
        to:       string;
      };
    };
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
  el:       I_MicroDOM;
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
  el:       I_MicroDOM;
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
  el:       I_MicroDOM;
  tabs:     I_Tabs;
  tab:      I_Tab;
}

export interface I_NavConfig {
  el:   I_MicroDOM;
  tabs: I_Tabs;
  tab:  I_Tab;
}