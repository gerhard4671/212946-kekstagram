'use strict';

//Модуль - возвращает код функции создания фото
define(['./galery'],
function(galery) {

  //Модуль - возвращает  Код функции конструктора
  var Picture = function(pict, pictureNumber) {
    var self = this;
    this.data = pict;
    this.element = createPictureElement(pict);

    this.element.onclick = function(evt) {
      evt.preventDefault();
      if (evt.target === self.element.querySelector('img')) {
        galery.show(pictureNumber);
      }
    };

    this.remove = function() {
      self.element.onclick = null;
    };
  };
  return Picture;
});

// Функция createPictureElement отвечает за  создание DOM-Элемента
function createPictureElement(pict) {
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
}
