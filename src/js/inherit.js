'use strict';


define(function() {

  return function(ChildComponent, BaseComponent) {

    var emptyConstructor = function() {};
    emptyConstructor.prototype = BaseComponent.prototype;
    ChildComponent.prototype = new emptyConstructor();
  };

});
