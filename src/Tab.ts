import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import { I_Tab, I_TabConfig, I_TabConstructorConfig, I_TabDisplayConfig, I_Tabs } from "./types";
import CSSClassAnimations, { I_CSSClassAnimations, T_DOMEventsKeys } from "@xaro/css-class-animations";

export default class Tab implements I_Tab {
  emitter:    I_EventEmitter;
  config:     I_TabConfig;
  animation?: I_CSSClassAnimations;
  pending:    boolean = false;

  constructor(config: I_TabConstructorConfig) {
    this.config   = config as I_TabConfig;
    this.emitter  = new EventEmitter({ ...this.config.on });

    const tabsConfig = this.config.tabs.config;

    if (tabsConfig.mutation !== false) {
      this.animation = new CSSClassAnimations({
        el: this.config.el,
        allow: tabsConfig.mutation + 'end' as T_DOMEventsKeys,
        on: {
          end: this.__mutationEndCallback.bind(this)
        }
      });
    }
  }

  protected __mutationStartCallback(event: AnimationEvent | TransitionEvent) {
    this.pending = true;

    this.emitter.emit('__techMutationStart__', event);

    this.emitter.emit('mutationStart', event);
  }
  protected __mutationEndCallback(event: AnimationEvent | TransitionEvent) {
    this.pending = false;

    this.emitter.emit('__techMutationEnd__', event);
    
    this.config.tabs.currentPendingTab = undefined;
    
    this.emitter.emit('mutationEnd', event);
  }

  hide(config?: I_TabDisplayConfig): void {
    const classes   = this.config.tabs.config.classes;
    const mutation  = this.config.tabs.config.mutation;

    if (mutation === false) {
      this.config.el.removeClass(classes.activeTab);
    } else if (config && config.animated === false) {
      this.config.el.removeClass(classes.activeTab);
      this.config.visible = false;
    } else {
      const mtClsLeave = classes[mutation].leave;

      this.config.tabs.currentPendingTab = this;

      if (config && config.after) {
        this.emitter.once('mutationEnd', () => {
          config.after!();
        });
      }

      this.emitter.once('__techMutationEnd__', () => {
        this.config.el.removeClass(classes.activeTab, mtClsLeave.active, mtClsLeave.from, mtClsLeave.to);
        this.config.visible = false;
      });

      this.config.el.addClass(mtClsLeave.from, mtClsLeave.active);

      // this.config.el.nextTick( () => this.config.el.addClass(mtClsLeave.to) );
      if (mutation === 'animation') {
        this.config.el.addClass(mtClsLeave.to);
      } else {
        this.config.el.nextTick( () => this.config.el.addClass(mtClsLeave.to) );
      }
    }
  }

  show(config?: I_TabDisplayConfig): void {
    const classes   = this.config.tabs.config.classes;
    const mutation  = this.config.tabs.config.mutation;

    if (mutation === false) {
      this.config.el.addClass(classes.activeTab);
    } else if (config && config.animated === false) {
      this.config.el.addClass(classes.activeTab);
      this.config.visible = true;
    } else {
      const mtClsEnter = classes[mutation].enter;

      this.config.tabs.currentPendingTab = this;

      if (config && config.after) {
        this.emitter.once('mutationEnd', () => {
          config.after!();
        });
      }

      this.emitter.once('__techMutationEnd__', () => {
        this.config.el.removeClass(mtClsEnter.active, mtClsEnter.from, mtClsEnter.to);
      });

      this.config.el.addClass(mtClsEnter.from, mtClsEnter.active, classes.activeTab);

      if (mutation === 'animation') {
        this.config.el.addClass(mtClsEnter.to);
      } else {
        this.config.el.nextTick( () => this.config.el.addClass(mtClsEnter.to) );
      }

      this.config.visible = true;
    }
  }
}