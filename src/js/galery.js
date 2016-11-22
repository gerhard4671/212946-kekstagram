'use strict';


define(['./inherit', './base-component'], function(inherit, baseComponent) {

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

  Galery.prototype.setPictures = function(picturesArray) {
    this.pictures = picturesArray;
  };

  Galery.prototype.show = function(number) {
    this.visibilityToogle(this.overlay, 'invisible');
    this.addHandler(this.overlay, this.clickHandler);
    this.setActivePicture(number);
  };

  Galery.prototype.clickHandler = function(evt) {
    if(evt.target === this.overlayClose) {
      this.hide();
    }

    if (evt.target === this.overlayImage) {
      this.setActivePicture(this.activePicture + 1);
    }
  };

  Galery.prototype.hide = function() {
    this.visibilityToogle(this.overlay, 'invisible');
    this.remove(this.overlay, this.clickHandler);
  };


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

  return new Galery();
});
