import './scss/index.dev.scss';
import Tabs from "./";
import { I_Tabs } from "./types";
import _ from '@xaro/micro-dom';

// const tabs = new Tabs({
//   el:       '.tabs-0',
//   mutation: 'transition',
//   // mutation: 'animation',
//   // mutation: false,
//   // on: {
//   //   init: (tabs: I_Tabs) => {
//   //     console.log('[init]');
//   //   },
//   //   beforeChange: (tabs: I_Tabs, prevIdx: number, nextIdx: number) => {
//   //     console.log('[beforeChange]', prevIdx, nextIdx);
//   //   },
//   //   afterChange: (tabs: I_Tabs, prevIdx: number, nextIdx: number) => {
//   //     console.log('[afterChange]', prevIdx, nextIdx);
//   //   }
//   // }
// });

const tabs = _('.tabs').map(el => new Tabs({
  el,
  mutation: 'animation',
}));

let interval;

function test(delay: number = 50) {
  interval = setInterval(() => {
    for (const tab of tabs) {
      tab.changeTab(Math.floor(Math.random() * tab.items.length));
    }
  }, delay);
};
function stop() {
  clearInterval(interval);
  
  setTimeout(check, 1500);
};
function check() {
  let completed = 0;

  for (const _tabs of tabs) {
    const current:  number = _tabs.config.current;
    const navIdx:   number = _tabs.config.el.get('.tabs__nav').indexOf(_tabs.config.el.get('.tabs__nav--active')[0]);
    const tabIdx:   number = _tabs.config.el.get('.tabs__tab').indexOf(_tabs.config.el.get('.tabs__tab--active')[0]);

    if (current === navIdx && navIdx === tabIdx) {
      completed++;
    }
  }

  console.log('Length: ', tabs.length);
  console.log('Completed: ', completed);
};

(window as any).test  = test;
(window as any).stop  = stop;
(window as any).check = check;

(window as any).tabs = tabs[0];