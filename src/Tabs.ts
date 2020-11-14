import { I_Tabs, I_TabsConstructorConfig, I_TabsConfig, I_Tab } from "./types";
import EventEmitter, { I_EventEmitter } from '@xaro/event-emitter';
import extend from '@xaro/extend';
import Tab from "./Tab";
import { defaults } from "./variables";

export default class Tabs implements I_Tabs {
  emitter:  I_EventEmitter;

  items:    I_Tab[] = [];

  config:   I_TabsConfig;

  constructor(config: I_TabsConstructorConfig) {
    this.config = extend({}, defaults, config);

    this.emitter = new EventEmitter(this.config.on);

    let current: number | undefined;

    // create items
    if (config.items) {
      let index = 0;

      for (const configTab of config.items) {
        let el;
        if (configTab.el) {
          el = configTab.el;
        } else {
          for (const _el of this.config.el.querySelectorAll('.' + this.config.classes.tab)) {

          }
        }
        // const el = configTab.el || this.config.el.querySelector('.' + this.config.classes.tab) as HTMLElement,
        const tab = new Tab({
          tabs:     this,
          el:       configTab.el || this.config.el.querySelector('.' + this.config.classes.tab) as HTMLElement,
          on:       configTab.on,
          current:  configTab.current === undefined ? false : configTab.current,
          index,
        });

        if (configTab.current) {
          current = index;
        }

        this.items.push(tab);
      }
    } else {
      const els = this.config.el.querySelectorAll('.' + this.config.classes.tab);

      for (let i = 0; i < els.length; i++) {
        const tab = new Tab({
          el: els[i] as HTMLElement,
          tabs: this,
          index: i
        })

        if (els[i].classList.contains(this.config.classes.activeTab)) {
          current = i;
        }

        this.items.push(tab);
      }
    }

    if (this.config.items) {
      let index: number = 0;

      for (const _config of this.config.items) {
        const el 
      }
    }
  
    // set current index
    this.config.current = current || 0;

    // // create navs
    // if (config.nav) {
    //   if (config.nav )
    // }
  }

  activate(index: number) {
    if (index >= this.items.length) {
      return;
    }

    this.emitter.emit('beforeActivate', this, this.config.current, index);

    this.items[this.config.current].hide();
    this.items[index].show();
    this.config.current = index;

    this.emitter.emit('afterActivate', this, this.config.current, index);
  }
}