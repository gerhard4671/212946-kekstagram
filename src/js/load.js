'use strict';

//Модуль - возвращает код функции load
define(function() {
  return load;
});


function load(url, callback, callbackName) {
  if (!callbackName) {
    callbackName = 'cb' + Date.now();
  }

  window[callbackName] = callback;

  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
}
