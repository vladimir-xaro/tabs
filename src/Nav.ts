import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import { I_Nav, I_NavConstructorConfig, I_Tab, I_Tabs } from "./types";

export default class Nav implements I_Nav {
  el:       HTMLElement;
  tabs:     I_Tabs;
  tab:      I_Tab;
  emitter:  I_EventEmitter;

  constructor(config: I_NavConstructorConfig) {
    this.el       = config.el;
    this.tabs     = config.tabs;
    this.tab      = config.tab;
    this.emitter  = new EventEmitter(config.on);

    this.el.addEventListener('click', (() => this.click).bind(this));
  }

  click() {
    this.tabs.activate(this.tab.config.index);
  }
}