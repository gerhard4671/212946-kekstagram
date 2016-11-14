'use strict';

//Модуль - возвращает код функции load
define(function() {

  function createGetParams(params) {
    var paramString = '';
    for(var prop in params) {
      if (params.hasOwnProperty(prop) ) {
        paramString += prop + '=' + params[prop] + '&';
      }
    }
    return paramString.slice(0, -1);
  }

  return function(url, requestParams, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?' + createGetParams(requestParams));

    xhr.addEventListener('load', function(evt) {
      try {
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      } catch(err) {
        console.log(err);
      }
    });

    xhr.send();

  };
});
