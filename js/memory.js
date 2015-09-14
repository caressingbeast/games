(function () {
  'use strict';

  var complete = new Audio('../sounds/complete.wav');
  var error = new Audio('../sounds/error.wav');
  var success = new Audio('../sounds/success.wav');

  var Game = {

    init: function () {

      // cache elements
      this.$board = $('#game-board');
      this.$wrapper = this.$board.find('.wrapper');

      // init variables
      this.boardDisabled = false;
      this.correctCards = [];
      this.selectedCards = [];

      // generage board
      this.generateCards();
      this.randomizeCards();

      // render
      this.render();

      // bind click events
      this.bindClickEvents();
    },

    generateCards: function () {
      this.cards = [];

      for (var i = 1; i <= 9; i++) {
        this.cards.push(i);
        this.cards.push(i);
      }
    },

    randomizeCards: function () {
      var length = this.cards.length;

      while (length !== 0) {
        var r = Math.floor(Math.random() * length);

        length -= 1;

        var temp = this.cards[length];

        this.cards[length] = this.cards[r];
        this.cards[r] = temp;
      }
    },

    render: function () {
      var output = '';

      for (var i = 0; i < this.cards.length; i++) {
        var value = this.cards[i];
        output += '<div data-value="' + value + '">' + value + '</div>';
      }

      this.$wrapper.html(output);
    },

    bindClickEvents: function () {
      this.$wrapper.on('click', 'div', this.toggleCard);
    },

    toggleCard: function () {
      var obj = Game;
      var $card = $(this);

      // exit if already selected or board disabled
      if ($card.hasClass('selected') || obj.boardDisabled) {
        return false;
      }

      $card.addClass('selected');
      obj.selectedCards.push($card.data('value'));

      if (obj.selectedCards.length === 2) {
        obj.boardDisabled = true;
        obj.checkMatch();
      }
    },

    checkMatch: function () {
      var obj = this;
      var selected = obj.$wrapper.find('.selected:not(.correct)');
      var match = obj.selectedCards[0] === obj.selectedCards[1];

      if (match) {
        obj.boardDisabled = false;
        selected.addClass('correct');
        success.play();
      } else {
        error.play();

        setTimeout(function () {
          obj.boardDisabled = false;
          selected.removeClass('selected');
        }, 1500);
      }

      obj.selectedCards = [];

      if (obj.cards.length === obj.$wrapper.find('.correct').length) {
        obj.resetGame();
      }
    },

    resetGame: function () {
      var obj = this;

      success.pause();
      complete.play();

      setTimeout(function () {
        obj.init();
      }, 3000);
    }
  };

  Game.init();
})();
