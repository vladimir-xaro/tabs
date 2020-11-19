import './scss/index.dev.scss';
import Tabs from "./";
import { I_Tabs } from "./types";

(window as any).tabs = new Tabs({
  el:       document.querySelector('.tabs-1') as HTMLElement,
  mutation: 'animation',
  // mutation: false,
  on: {
    init: (tabs: I_Tabs) => {
      console.log('[init]');
    },
    beforeChange: (tabs: I_Tabs, prevIdx: number, nextIdx: number) => {
      console.log('[beforeChange]', prevIdx, nextIdx);
    },
    afterChange: (tabs: I_Tabs, prevIdx: number, nextIdx: number) => {
      console.log('[afterChange]', prevIdx, nextIdx);
    }
  }
});