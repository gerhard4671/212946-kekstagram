'use strict';


define(function() {

  var BaseComponent = function() {

  };

  BaseComponent.prototype.remove = function(element, handler) {
    element.removeEventListener('click', handler);
  };

  BaseComponent.prototype.addHandler = function(element, handler) {
    element.addEventListener('click', handler);
  };

  BaseComponent.prototype.visibilityToogle = function(element, hideShowClass) {
    element.classList.toggle(hideShowClass);
  };

  return BaseComponent;

});
