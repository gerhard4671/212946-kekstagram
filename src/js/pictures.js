'use strict';

define(['../js/picture', '../js/galery.js'],
function(Picture, galery) {
  return function(data) {
    var pictures = document.querySelector('.pictures');
    var filters = document.querySelector('.filters');
    data.forEach(function(pict, num) {
      var picturesListItem = new Picture(pict, num);
      pictures.appendChild(picturesListItem.element);
    });
    // Передаем в модуль галереи  данные с сервера о фотках
    galery.setPictures(data);
    filters.classList.remove('hidden');
  };
});
