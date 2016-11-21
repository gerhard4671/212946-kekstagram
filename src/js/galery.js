'use strict';


define(['./inherit', './base-component'], function(inherit, baseComponent) {
//Объект Галерея

  var Galery = function(data) {
    this.data = data;
    this.activePicture = null;
    this.pictures = null;

    this.overlay = document.querySelector('.gallery-overlay');
    this.overlayClose = document.querySelector('.gallery-overlay-close');
    this.overlayImage = document.querySelector('.gallery-overlay-image');
    baseComponent.call(this);

    this.clickHandler = this.clickHandler.bind(this);

  };

  inherit(Galery, baseComponent);



//В файле pictures.js передаем в метод галереи значение - данные из load.js
  Galery.prototype.setPictures = function(picturesArray) {
    this.pictures = picturesArray;
  };

// В файле picture.js передаем в метод галереи show значение - Номер фотки по которой произошел клик, а он в свою очередь
// является параметром функции колбека при обходе массива с данными)
  Galery.prototype.show = function(number) {
    this.visibilityToogle(this.overlay, 'invisible');
    this.addHandler(this.overlay, this.clickHandler);
    this.setActivePicture(number);
  };

//-----------------обработчик событий---------------------------------------------------------
  Galery.prototype.clickHandler = function(evt) {
// Если крестик, закрываем галерею
    if(evt.target === this.overlayClose) {
      this.hide();
    }
// Если нажали на фотографию, передаем в метод галерие setActivePicture номер фотографии = текущий+1(следубщая)
    if (evt.target === this.overlayImage) {
      this.setActivePicture(this.activePicture + 1);
    }
  };

// Метод галереи hide - скрывает Галерею и обнуляет обработчик  событий
  Galery.prototype.hide = function() {
    this.visibilityToogle(this.overlay, 'invisible');
    this.remove(this.overlay, this.clickHandler);
  };


// Метод галереи setActivePicture - Проверяем если передан последний элемент в массиве pictures - то ставим активный элемент = 0
// Ставим увеличеной картинке урл, а в текстовые ноды коментарии и лайки записываем соотв значения
  Galery.prototype.setActivePicture = function(pictureNumber) {
    this.activePicture = pictureNumber;
    if (pictureNumber === this.pictures.length) {
      this.activePicture = 0;
    }

    this.likes = document.querySelector('.likes-count');
    this.comments = document.querySelector('.comments-count');
    this.overlayImage.src = String(this.pictures[this.activePicture].url);
    this.likes.textContent = String(this.pictures[this.activePicture].likes);
    this.comments.textContent = String(this.pictures[this.activePicture].comments);
  };


  console.dir(Galery);

  return new Galery();
});
