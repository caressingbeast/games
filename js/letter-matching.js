(function () {
  'use strict';

  var complete = new Audio('../sounds/complete.wav');
  var error = new Audio('../sounds/error.wav');
  var success = new Audio('../sounds/success.wav');

  function getRandomSelection () {
    var obj = Game;

    return Math.floor(Math.random() * obj.uppercase.length);
  }

  var Game = {

    init: function () {

      this.$board = $('#game-board');
      this.$wrapper = this.$board.find('.wrapper');

      this.selectedLetter = {};
      this.answers = [];
      this.answered = [];

      this.uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      this.lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

      this.prepareBoard();
    },

    prepareBoard: function () {
      if (this.answered.length === this.uppercase.length) {
        this.resetGame();
        return false;
      }

      this.answers = [];
      this.selectLetter();
      this.getRandomAnswers();
      this.randomizeAnswers();
      this.render();
      this.bindClickEvents();
    },

    selectLetter: function () {
      var r = getRandomSelection();
      var letter = this.uppercase[r];

      if (this.answered.indexOf(letter) > -1) {
        this.selectLetter();
      } else {
        this.selectedLetter.uppercase = this.uppercase[r];
        this.selectedLetter.lowercase = this.lowercase[r];
        this.answers.push(this.selectedLetter.lowercase);
      }
    },

    getRandomAnswers: function () {
      var obj = this;

      function selectAndPush () {
        var r = getRandomSelection();
        var letter = obj.lowercase[r];

        if (obj.answers.indexOf(letter) === -1) {
          obj.answers.push(letter);
        } else {
          selectAndPush();
        }
      }

      while (obj.answers.length < 4) {
        selectAndPush();
      }
    },

    randomizeAnswers: function () {
      var length = this.answers.length;

      while (length !== 0) {
        var r = Math.floor(Math.random() * length);

        length -= 1;

        var temp = this.answers[length];

        this.answers[length] = this.answers[r];
        this.answers[r] = temp;
      }
    },

    render: function () {
      var output = '';

      this.$wrapper.find('.uppercase').html(this.selectedLetter.uppercase);

      for (var i = 0; i < this.answers.length; i++) {
        output += '<div>' + this.answers[i] + '</div>';
      }

      this.$wrapper.find('.lowercase').html(output);
    },

    bindClickEvents: function () {
      $('.lowercase div', this.$wrapper)
        .off('click')
        .on('click', this.checkAnswer);
    },

    checkAnswer: function () {
      var obj = Game;
      var $answer = $(this);

      if ($answer.text() === obj.selectedLetter.lowercase) {
        obj.answered.push(obj.selectedLetter.uppercase);
        success.play();

        setTimeout(function () {
          obj.prepareBoard();
        }, 1500);
      } else {
        error.play();
      }
    },

    resetGame: function () {
      var obj = this;

      success.pause();
      complete.play();

      setTimeout(function () {
        obj.answered = [];
        obj.prepareBoard();
      }, 3000);
    }
  };

  Game.init();
})();
