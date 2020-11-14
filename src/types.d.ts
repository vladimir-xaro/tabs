import { I_EventEmitter } from "@xaro/event-emitter";

/** Tabs */
export interface I_Tabs {
  emitter:  I_EventEmitter;
  items:    I_Tab[];

  activate(index: number): void;
}

export interface I_TabsConstructorConfig {
  el: HTMLElement;

  classes?: {
    navs?:      string;
    nav?:       string;
    activeNav?: string;
    tabs?:      string;
    tab?:       string;
    activeTab?: string;
  };

  attr?: {
    target?:  string;
    tab?:     string;
  };

  items?: Array<{
    el?: HTMLElement;
    on?: {
      init?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
      hide?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
      show?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
    },
    current?: boolean;
  }>;
  nav?: string | HTMLElement | {
    
  }[];

  on?: {
    init?: (tabs: I_Tabs) => void | ((tabs: I_Tabs) => void)[];
  };
}

export interface I_TabsConfig {
  el:       HTMLElement;

  current:  number;

  classes: {
    navs:       string;
    nav:        string;
    activeNav:  string;
    tabs:       string;
    tab:        string;
    activeTab:  string;
  };

  attr: {
    target: string;
    tab:    string;
  };

  items?: Array<{
    el?: HTMLElement;
    on?: {
      init?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
      hide?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
      show?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
    },
    current?: boolean;
  }>;

  on?: {
    init?: (tabs: I_Tabs) => void | ((tabs: I_Tabs) => void)[];
  };
}


/** Tab */
export interface I_Tab {
  emitter:  I_EventEmitter;
  config:   I_TabConfig;

  hide(): void;
  show(): void;
}

export interface I_TabConstructorConfig {
  tabs:     I_Tabs;
  index:    number;
  current?: boolean;
  el:       HTMLElement;

  on?: {
    init?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
    hide?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
    show?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
  }
}
export interface I_TabConfig {
  tabs:     I_Tabs;
  index:    number;
  current:  boolean;
  el:       HTMLElement;

  on?: {
    init?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
    hide?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
    show?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
  }
}


/** Nav */
export interface I_Nav {
  tabs:     I_Tabs;
  tab:      I_Tab;
  emitter:  I_EventEmitter;
  el:       HTMLElement;

  click(): void;
}

export interface I_NavConstructorConfig {
  el:       HTMLElement;
  tabs:     I_Tabs;
  tab:      I_Tab;

  on?: {
    click?:  (tab: I_Tab, index: number) => void | ((tab: I_Tab, index: number) => void)[];
  }
}