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
      cancel:     'tabs__tab--animation-cancel',
      hide:       'tabs__tab--animation-hide',
      show:       'tabs__tab--animation-show',
    },
    transition: {
      cancel:     'tabs__tab--transition-cancel',
      hide:       'tabs__tab--transition-hide',
      show:       'tabs__tab--transition-show',
    },
    wrapper: {
      animation:  'tabs--animation',
      transition: 'tabs--transition',
      false:      'tabs--without-animation'
    }
  },

  current:  undefined,

  mutation: undefined,
}