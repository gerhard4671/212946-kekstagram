'use strict';

define(['../js/picture', '../js/galery.js'],
function(picture, galery) {
  return function(data) {
    var pictures = document.querySelector('.pictures');
    var filters = document.querySelector('.filters');
    data.forEach(function(pict, num) {
      pictures.appendChild(picture(pict, num));
    });
    // Передаем в модуль галереи  данные с сервера о фотках
    galery.setPictures(data);
    filters.classList.remove('hidden');
  };
});
