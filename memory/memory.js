(function () {
  'use strict';

  var Game = {

    init: function () {

      // cache elements
      this.$board = $('#game-board');

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

      for (var i = 1; i <= 15; i++) {
        this.cards.push(i);
        this.cards.push(i);
      }
    },

    randomizeCards: function () {
      var length = this.cards.length;

      while (length !== 0) {
        var r = Math.floor(Math.random() * length);
        var temp;

        length -= 1;

        temp = this.cards[length];
        this.cards[length] = this.cards[r];
        this.cards[r] = temp;
      }
    },

    render: function () {
      var output = '';

      for (var i = 0; i < this.cards.length; i++) {
        var card = this.cards[i];

        output += '<li data-value="' + card + '">' + card + '</li>';
      }

      this.$board.find('.memory-wrapper').html(output);
    },

    bindClickEvents: function () {
      this.$board.on('click', '.memory-wrapper li', this.handleClick);
    },

    handleClick: function () {
      var obj = Game;
      var $card = $(this);

      // exit if already selected
      if ($card.hasClass('selected')) {
        return false;
      }

      $card.addClass('selected');
      obj.selectedCards.push($card);

      if (obj.selectedCards.length === 2) {
        obj.checkMatch();
      }
    },

    checkMatch: function () {
      var $card1 = this.selectedCards[0];
      var $card2 = this.selectedCards[1];

      if ($card1.data('value') === $card2.data('value')) {
        alert('Match!');
        $card1.addClass('correct');
        $card2.addClass('correct');
        this.correctCards.push($card1);
        this.correctCards.push($card2);

        if (this.cards.length === this.correctCards.length) {
          this.resetGame();
        }
      } else {
        alert('No match!');
        $card1.removeClass('selected');
        $card2.removeClass('selected');
      }

      this.selectedCards = [];
    },

    resetGame: function () {
      alert('Done!');
      this.init();      
    }
  };

  Game.init();
})();
