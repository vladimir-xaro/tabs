import { I_Nav, I_NavConfig, I_NavConstructorConfig, I_Tab, I_Tabs } from "./types";

export default class Nav implements I_Nav {
  config:   I_NavConfig;

  constructor(config: I_NavConstructorConfig) {
    this.config = config;

    this.clickListener = this.clickListener.bind(this);
    this.config.el.addEventListener('click', this.clickListener as EventListener);
  }

  protected clickListener(event: MouseEvent | TouchEvent): void {
    this.config.tabs.changeTab(this.config.tab.config.idx);
  }

  disactivate(): void {
    this.config.el.classList.remove(this.config.tabs.config.classes.activeNav);
  }

  activate(): void {
    this.config.el.classList.add(this.config.tabs.config.classes.activeNav);
  }
}