'use strict';

define(['./picture', './galery.js', './load.js'],
function(Picture, galery, load) {

  var currentPage = 0;
  var THROTTLE_TIMEOUT = 100;
  var picturesAtPage = 12;
  var currentFilter = null;
  var preSetFilter = localStorage.getItem('savedFilter') || 'filter-popular';
  var footer = document.querySelector('footer');
  var pictures = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var picArray = [];


  return function() {

    function throttle(func, wait) {
      var timeout = null;

      return function() {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function() {
          func();
        }, wait);
      };
    }


    window.addEventListener('scroll', throttle(checkToLoad, THROTTLE_TIMEOUT));


    function checkToLoad() {
      if (footer.getBoundingClientRect().bottom - window.innerHeight <= 100) {
        loadPictures(currentFilter, ++currentPage);
      }
    }

    function renderPictires(loadedPictures) {
      picArray = picArray.concat(loadedPictures);
      if (picArray.length > loadedPictures.length) {
        var picNum = picArray.length - loadedPictures.length;
      }
      loadedPictures.forEach(function(pict, num) {
        if (picNum >= loadedPictures.length) {
          num = picNum;
        }
        var picturesListItem = new Picture(pict, num);
        pictures.appendChild(picturesListItem.element);
        picNum++;
      });
      checkToLoad();
      galery.setPictures(picArray);
    }

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
      localStorage.setItem('savedFilter', String(filterID));
    }

    filters.addEventListener('change', function(evt) {
      if (evt.target.classList.contains('filters-radio')) {
        picArray = [];
        changeFilter(evt.target.id);
      }
    }, true);

    changeFilter(preSetFilter);
    filters.querySelector('#' + localStorage.getItem('savedFilter')).setAttribute('checked', 'checked');
    filters.classList.remove('hidden');

  };
});
