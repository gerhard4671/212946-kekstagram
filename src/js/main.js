'use strict';


define([
  '../js/resizer',
  '../js/upload',
  '../js/pictures'
], function(resizer, upload, pictures) {
  resizer();
  upload();
  pictures();
});
