'use strict';

module.exports = function(list, filterID) {

  if (filterID === 'filter-discussed') {
    return list.sort(function(a, b) {
      return b.comments -a.comments;
    });
  }

  if (filterID ==='filter-popular') {
    return list.sort(function(a, b){
      return b.likes - a.likes;
    });
  }

  if (filterID === 'filter-new') {
    var currTime = Date.now();
    var filterByDate = list.filter(function(pict, num, arr) {
      return ( currTime - arr[num].created ) <= 1000 * 60 * 60 * 24 *3;
    });

    return filterByDate.sort(function(a, b) {
      return b.created - a.created;
    });
  }
};
