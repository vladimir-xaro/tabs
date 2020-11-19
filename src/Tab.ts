import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import { I_Tab, I_TabConfig, I_TabConstructorConfig, I_TabDisplayConfig } from "./types";
import CSSClassAnimations, { I_CSSClassAnimations, T_DOMEventsKeys } from "@xaro/css-class-animations";

export default class Tab implements I_Tab {
  emitter:    I_EventEmitter;
  config:     I_TabConfig;
  animation?: I_CSSClassAnimations;
  pending:    boolean = false;

  constructor(config: I_TabConstructorConfig) {
    this.config   = config as I_TabConfig;
    this.emitter  = new EventEmitter({ ...this.config.on });

    if (this.config.tabs.config.mutation !== false) {
      this.animation  = new CSSClassAnimations({
        el:     this.config.el,
        allow:  [ this.config.tabs.config.mutation + 'end' as T_DOMEventsKeys ],
        on: {
          end: [
            this.__mutationEndCallback.bind(this)
          ]
        }
      });
    }
  }

  protected __mutationEndCallback(event: AnimationEvent | TransitionEvent) {
    this.pending = false;

    this.emitter.emit('internalMutationEnd', event);
    
    this.config.tabs.currentPendingTab = undefined;
    
    this.emitter.emit('mutationEnd', event);
  }

  hide(config?: I_TabDisplayConfig): void {
    const classes   = this.config.tabs.config.classes;
    const mutation  = this.config.tabs.config.mutation;

    this.pending = true;

    this.config.tabs.currentPendingTab = config && config.animated !== false ? this : undefined;

    if (mutation === false) {
      this.config.el.classList.remove(classes.activeTab);
    } else {
      if (config && config.animated === false) {
        this.config.tabs.currentPendingTab = undefined;
        this.animation!.addClass(classes[mutation].cancel);
      }

      this.animation!.removeClass(classes[mutation].hide, classes[mutation].show);
      
      if (config && config.after) {
        this.emitter.once('internalMutationEnd', () => {
          this.animation!.removeClass(classes.activeTab);
          this.config.visible = false;
        });

        this.emitter.once('mutationEnd', () => {
          config.after!();
        });
        this.animation!.addClass(classes[mutation].hide);
      } else {
        this.animation!.removeClass(classes.activeTab);
      }

      if (config && config.animated === false) {
        this.animation!.removeClass(classes[mutation].cancel);
      }
    }
  }

  show(config?: I_TabDisplayConfig): void {
    const classes   = this.config.tabs.config.classes;
    const mutation  = this.config.tabs.config.mutation;

    this.pending = true;
    this.config.tabs.currentPendingTab = this;

    if (mutation === false) {
      this.config.el.classList.add(classes.activeTab);
    } else {
      if (config && config.animated === false) {
        this.animation!.addClass(classes[mutation].cancel);
      }

      this.animation!.removeClass(classes[mutation].hide, classes[mutation].show);

      if (config) {
        if (config.after) {
          this.emitter.once('mutationEnd', () => {
            config.after!();
          });
        }
      }

      this.animation!.addClass(classes.activeTab, classes[mutation].show);

      this.config.visible = true;

      if (config && config.animated === false) {
        this.animation!.removeClass(classes[mutation].show, classes[mutation].cancel);
      }
    }
  }
}