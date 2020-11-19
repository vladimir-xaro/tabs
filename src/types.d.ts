import { I_EventEmitter } from "@xaro/event-emitter";
import { I_CSSClassAnimations, T_DOMEventsKeys } from "@xaro/css-class-animations";

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
  after?:     () => void; // default: undefined
  animated?:  boolean;    // default: true
}


/** Nav */
export interface I_Nav {
  tabs:     I_Tabs;
  tab:      I_Tab;
  config:   I_NavConfig;

  clickListener(event: MouseEvent | TouchEvent): void;

  disactivate(): void;
  activate(): void;
}

export interface I_NavConstructorConfig {
  el:       Element;
  tabs:     I_Tabs;
  tab:      I_Tab;

  on?: {
    click?:  (tab: I_Tab, idx: number) => void | ((tab: I_Tab, idx: number) => void)[];
  }
}

export interface I_NavConfig {
  el: Element;
}