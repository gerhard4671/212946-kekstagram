'use strict';

//Модуль - возвращает код функции создания фото
define(['./galery', './inherit', './base-component'],
function(galery, inherit, baseComponent) {

  //Модуль - возвращает  Код функции конструктора
  var Picture = function(pict, pictureNumber) {
    this.data = pict;
    this.pictureNumber = pictureNumber;

    this.element = this.createPictureElement(pict);
    baseComponent.call(this);

    this.galeryShow = this.galeryShow.bind(this);
    this.element.addEventListener('click', this.galeryShow);

  };

  inherit(Picture, baseComponent);

  Picture.prototype.galeryShow = function(evt) {
    evt.preventDefault();
    if (evt.target === this.element.querySelector('img')) {
      galery.show(this.pictureNumber);
    }
  };

  Picture.prototype.removeHandlers = function() {
    this.element.removeEventListener('click', this.galeryShow);
  };


  Picture.prototype.createPictureElement = function(pict) {
    var template = document.querySelector('#picture-template');
    var templateContainer = 'content' in template ? template.content : template;
    var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);
    var imgTag = pictureElement.querySelector('img');
    pictureElement.querySelector('.picture-likes').textContent = pict.likes;
    pictureElement.querySelector('.picture-comments').textContent = pict.comments;

    var image = new Image();

    image.onload = function() {
      imgTag.width = 182;
      imgTag.height = 182;
      imgTag.src = String(image.src);
    };

    image.onerror = function() {
      pictureElement.classList.add('picture-load-failure');
    };

    image.src = pict.url;

    return pictureElement;
  };


  return Picture;

});
