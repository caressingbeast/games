(function () {
  'use strict';

  function GameService ($http) {
    var service = this;

    service.get = function () {
      return $http.get('games.json');
    };
  }

  angular
    .module('games')
    .service('GameService', GameService);
})();
