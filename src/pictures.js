'use strict';

(function() {

  var pictures = document.querySelector(".pictures");
  var filters = document.querySelector(".filters");
  var template = document.querySelector("#picture-template");
  var templateContainer = 'content' in template ? template.content : template;
  var loadedData = null;
  var IAGE_LOAD_URL = 'http://localhost:1507/api/pictures';

  filters.classList.add('hidden');


  function load(url, callback, callbackName) {
    if (!callbackName) {
      callbackName = 'cb' + Date.now();
    }

    window[callbackName] = function(data) {
      loadedData = data;
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);
  }

  load(IAGE_LOAD_URL, function(data) {
    renderImage(loadedData);
  }, '__getData');


  function createPicture(pict) {
    var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);
    var imgTag = pictureElement.querySelector('img');
    pictureElement.querySelector('.picture-likes').textContent = pict.likes;
    pictureElement.querySelector('.picture-comments').textContent = pict.comments;

    var image = new Image();

    image.onload = function(evt) {
      imgTag.width = 182;
      imgTag.height = 182;
      imgTag.src = String(image.src);
    };

    image.onerror = function() {
      pictureElement.classList.add('picture-load-failure');
    };

    image.src = pict.url;
    return pictureElement;
  }

  function renderImage(loadedData) {
    loadedData.forEach(function(pict) {
      pictures.appendChild(createPicture(pict));
    });

    filters.classList.remove('hidden');
  }

})();
