'use strict';

define(['../js/picture', '../js/galery.js', '../js/load.js'],
function(Picture, galery, load) {

  var currentPage = 0;
  var THROTTLE_TIMEOUT = 100;
  var picturesAtPage = 12;
  var currentFilter = 'filter-popular';
  var footer = document.querySelector('footer');
  var pictures = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var lastCall = Date.now();

  return function(data) {

  var lastCall = Date.now();
    window.addEventListener('scroll', function(evt) {

      if(Date.now() - lastCall >= THROTTLE_TIMEOUT) {
        if (footer.getBoundingClientRect().bottom - window.innerHeight <= 100) {
          loadPictures(currentFilter, ++currentPage);
        }
        lastCall = Date.now();
      }
    });

    function renderPictires() {
      data.forEach(function(pict, num) {
        var picturesListItem = new Picture(pict, num);
        pictures.appendChild(picturesListItem.element);
      });
    }
    renderPictires();

    function loadPictures(filter, pageNumber) {
      load('/api/pictures', {
        from: pageNumber * picturesAtPage,
        to: pageNumber * picturesAtPage + picturesAtPage,
        filter: filter
      }, renderPictires);
    }

    function changeFilter(filterID) {
      pictures.innerHTML = '';
      currentFilter = filterID;
      currentPage = 0;
      loadPictures(filterID, currentPage);
    }

    // Передаем в модуль галереи  данные с сервера о фотках
    galery.setPictures(data);
    filters.classList.remove('hidden');

    filters.addEventListener('change', function(evt) {
      if (evt.target.classList.contains('filters-radio')) {
        changeFilter(evt.target.id);
      }
    }, true);
  };
});
