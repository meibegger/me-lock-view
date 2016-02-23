;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.meLockView = factory();
  }
}(this, function () {
  'use strict';

  /**
   * me-lock-view - A utility script to "lock" the main content of the page to prevent scrolling of the content in the
   * background if you, for instance, open a modal dialog on top of the page
   *
   * @link https://github.com/meibegger/me-lock-view
   * @license MIT
   */

  var

  /*
   ---------------
   settings
   ---------------
   */

  // name of the attribute set on an element to mark it as the view-wrapper
    viewAttribute = 'data-me-view',

  // value set to the view-attribute if the view is locked
    lockValue = 'locked',

  // value set to the view-attribute if the view isn't locked
    unlockValue = '',

  /*
   ---------------
   variables
   ---------------
   */

  // remember how many "open" locks exist
    openLocks = 0,

  // cache the body element
    body,

  // cache the documentElement
    documentElement,

  // cache the view-wrapper
    viewWrapper
    ;

  /*
   ---------------
   functions
   ---------------
   */

  /**
   * Lock the view
   */
  function lock() {
    if (viewWrapper) {
      if (!openLocks) { // view is not locked yet

        // get the current scroll values
        var scrollLeft = body.scrollLeft || documentElement.scrollLeft
          , scrollTop = body.scrollTop || documentElement.scrollTop;

        // mark the view-wrapper as locked
        viewWrapper.setAttribute(viewAttribute, lockValue);

        // scroll the view-wrapper (instead of the body)
        viewWrapper.scrollTop = scrollTop;
        viewWrapper.scrollLeft = scrollLeft;

        // scroll the body to the upper left
        window.scrollTo(0, 0);
      }

      // remember the lock request
      openLocks++;
    }
  }

  function unlock() {
    if (viewWrapper) {
      if (openLocks === 1) { // last unlock request

        // get the current scroll values
        var scrollLeft = viewWrapper.scrollLeft
          , scrollTop = viewWrapper.scrollTop;

        // mark the view-wrapper as unlocked
        viewWrapper.setAttribute(viewAttribute, unlockValue);

        // reset the scroll ot the view-wrapper
        viewWrapper.scrollTop = 0;
        viewWrapper.scrollLeft = 0;

        // scroll the body to the initial scroll position
        window.scrollTo(scrollLeft, scrollTop);
      }

      // remember the unlock request
      if (openLocks) {
        openLocks--;
      }
    }
  }

  function isLocked () {
    return !!openLocks;
  }

  /*
   ---------------
   initialization
   ---------------
   */

  function init() {

    // get the elements holding the document scroll
    body = document.body;
    documentElement = document.documentElement;

    // get the view wrapper
    viewWrapper = document.querySelector('[' + viewAttribute + ']');
    if (!viewWrapper) {
      console.error('meLockView: view-wrapper not found');
    }
  }

  // initialize the utility as soon as the document has finished loading. We can now access the DOM elements.
  if (document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', function loaded() {
      window.removeEventListener('DOMContentLoaded', loaded);
      init();
    });
  }

  /*
   ---------------
   api
   ---------------
   */

  return {

    lock: lock,
    unlock: unlock,
    isLocked: isLocked

  };

}));
