export const defaults = {
  el: null,

  classes: {
    navs:       'tabs__navs',
    nav:        'tabs__nav',
    tabs:       'tabs__tabs',
    tab:        'tabs__tab',
    activeTab:  'tabs__tab--active',
    activeNav:  'tabs__nav--active',

    animation: {
      leave: {
        from:     'tabs__tab--animation-leave',
        active:   'tabs__tab--animation-leave-active',
        to:       'tabs__tab--animation-leave-to',
      },
      enter: {
        from:     'tabs__tab--animation-enter',
        active:   'tabs__tab--animation-enter-active',
        to:       'tabs__tab--animation-enter-to',
      },
    },

    transition: {
      leave: {
        from:     'tabs__tab--transition-leave',
        active:   'tabs__tab--transition-leave-active',
        to:       'tabs__tab--transition-leave-to',
      },
      enter: {
        from:     'tabs__tab--transition-enter',
        active:   'tabs__tab--transition-enter-active',
        to:       'tabs__tab--transition-enter-to',
      },
    },
  },

  current:  undefined,

  mutation: undefined,
}