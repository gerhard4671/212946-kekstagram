'use strict';


define([
  './resizer',
  './upload',
  './pictures'
], function(resizer, upload, pictures) {
  resizer();
  upload();
  pictures();
});
