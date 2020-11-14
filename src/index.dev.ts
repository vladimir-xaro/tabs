import './scss';
import Tabs from "./";
import { I_Tabs } from "./types";

(window as any).tabs = new Tabs({
  el: document.querySelector('.tabs') as HTMLElement,
  on: {
    init: (tabs: I_Tabs) => {

    }
  },
  items: [
    {

    }
  ],
  // nav: undefined
});