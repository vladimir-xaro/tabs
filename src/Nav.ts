import { I_Nav, I_NavConfig, I_NavConstructorConfig, I_Tab, I_Tabs } from "./types";

export default class Nav implements I_Nav {
  tabs:     I_Tabs;
  tab:      I_Tab;
  config:   I_NavConfig;

  constructor(config: I_NavConstructorConfig) {
    this.tabs     = config.tabs;
    this.tab      = config.tab;

    this.config = {
      el: config.el
    };

    this.clickListener = this.clickListener.bind(this);
    this.config.el.addEventListener('click', this.clickListener as EventListener);
  }

  clickListener(event: MouseEvent | TouchEvent): void {
    this.tabs.changeTab(this.tab.config.idx);
  }

  disactivate(): void {
    this.config.el.classList.remove(this.tabs.config.classes.activeNav);
  }

  activate(): void {
    this.config.el.classList.add(this.tabs.config.classes.activeNav);
  }
}