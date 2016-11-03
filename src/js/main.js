'use strict';

define([
  '../js/resizer',
  '../js/upload',
  '../js/load',
  '../js/pictures'
], function(resizer, upload, load, pictures) {
  resizer();
  upload();
  load('/api/pictures', pictures, '__getData');
});
