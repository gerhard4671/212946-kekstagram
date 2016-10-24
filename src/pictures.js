'use strict';


(function() {

var IMAGE_LOAD_URL = '../bin/data/data.json';

var loadData = function(url, callback, callbackName) {
  if (!callbackName) {
    callbackName = 'cb'+ Date.now();
  }

  window[callbackName] = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
};

loadData(IMAGE_LOAD_URL, function(data) {
  var data = data;
  console.log(data);
}, '__jsonpCallback');


})();
