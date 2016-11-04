'use strict';

define(['../js/picture'],
function(picture) {
  return function(data) {
    var pictures = document.querySelector('.pictures');
    var filters = document.querySelector('.filters');
    data.forEach(function(pict) {
      pictures.appendChild(picture(pict));
    });
    filters.classList.remove('hidden');
  };
});
