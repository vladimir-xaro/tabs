import { I_Tabs, I_TabsConstructorConfig, I_TabsConfig, I_Tab } from "./types";
import EventEmitter, { I_EventEmitter } from '@xaro/event-emitter';
import _, { I_MicroDOM, MicroDOM } from "@xaro/micro-dom";
import extend from '@xaro/extend';
import Tab from "./Tab";
import { defaults } from "./variables";
import Nav from "./Nav";

export default class Tabs implements I_Tabs {
  emitter:  I_EventEmitter;

  items:    I_Tab[] = [];

  config:   I_TabsConfig;

  currentPendingTab?: I_Tab = undefined;

  constructor(config: I_TabsConstructorConfig) {
    this.config = extend({}, defaults, config);

    this.emitter = new EventEmitter({ ...this.config.on });

    this.config.mutation = this.config.mutation === undefined ? 'animation' : this.config.mutation
    
    this.config.el = config.el instanceof MicroDOM ? this.config.el : _(config.el as string | Element);

    const navEls: I_MicroDOM = this.config.el.get('.' + this.config.classes.nav);
    const tabEls: I_MicroDOM = this.config.el.get('.' + this.config.classes.tab);

    for (let idx = 0; idx < tabEls.length; idx++) {
      if (this.config.current === undefined) {
        if (tabEls[idx].classList.contains(this.config.classes.activeTab) || navEls[idx].classList.contains(this.config.classes.activeNav)) {
          this.config.current = idx;
        }
      }

      const tab = new Tab({
        el:   _(tabEls[idx]),
        tabs: this,
        idx
      });

      const nav = new Nav({
        tabs: this,
        el:   _(navEls[idx]),
        tab
      });

      tab.config.nav = nav;

      this.items.push(tab);
    }
  
    if (! this.config.current) {
      this.config.current = 0;
    }

    this.fixClasses();

    this.emitter.emit('init', this);
  }

  protected fixClasses() {
    for (const tab of this.items) {
      if (tab.config.idx === this.config.current) {
        tab.show({ animated: false });
        tab.config.nav?.activate();
      } else {
        tab.hide({ animated: false });
        tab.config.nav?.disactivate();
      }
    }
  }

  changeTab(idx: number) {
    if (! this.items[idx]) {
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
    } else {
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
            })
          } else {
            nextTab.show({
              after: () => this.emitter.emit('afterChange', this, prevIdx, nextIdx)
            });
          }
        });
      } else {
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