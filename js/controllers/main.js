(function () {
  'use strict';

  function MainCtrl (GameService) {
    var vm = this;

    // get games
    GameService.get()
      .then(function (res) {
        vm.games = res.data;
      }, function (err) {
        console.log(err);
      });
  }

  angular
    .module('games')
    .controller('MainCtrl', MainCtrl);
})();
