import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import { I_Tab, I_TabConfig, I_TabConstructorConfig, I_Tabs } from "./types";
import extend from '@xaro/extend';

export default class Tab implements I_Tab {
  emitter:  I_EventEmitter;
  config:   I_TabConfig;

  constructor(config: I_TabConstructorConfig) {
    this.config   = config as I_TabConfig;
    this.emitter  = new EventEmitter(this.config.on);

    if (this.config.current === undefined) {
      this.config.current = false;
    }

    // if (config.)
  }

  hide(): void {
    this.emitter.emit('beforeHide', this);
    this.config.current = false;
    this.config.el.classList.remove('.tabs__item--active');
    this.emitter.emit('afterHide', this);
  }

  show(): void {
    this.emitter.emit('beforeShow', this);
    this.config.current = true;
    this.config.el.classList.add('.tabs__item--active');
    this.emitter.emit('afterShow', this);
  }
}