'use strict';


define(function() {

  return function(ChildComponent, BaseComponent) {

    var EmptyConstructor = function() {};
    EmptyConstructor.prototype = BaseComponent.prototype;
    ChildComponent.prototype = new EmptyConstructor();
  };

});
