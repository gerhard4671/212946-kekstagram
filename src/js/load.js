
define(function(){
  return function(url, callback, callbackName) {
    if (!callbackName) {
      callbackName = 'cb' + Date.now();
    }

    window[callbackName] = callback;

    var script = document.createElement('script');
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);
    };
});
