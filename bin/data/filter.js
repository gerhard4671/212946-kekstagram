'use strict';

module.exports = function(list, filterID) {
  switch(filterID) {
    case 'filter-popular':
      return list;

    case 'filter-discussed':
      return list.sort(function(a, b) {
         return a.comments - b.comments;
      });

    case 'filter-new':
      var filteredList = list.filter(function(image, i, arr) {
        return (Date.now() - image.created)/(1000 * 60 * 60 *24) <= 3;
      });
      return filteredList.sort(function(a, b) {
        return a.created - b.created;
      });

  }
  return list;

};
