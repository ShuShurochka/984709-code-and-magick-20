'use strict';

(function () {

  window.util = {
    CLOAK_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    EYES_COLORS: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },
    getRandomArrayElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
  };
})();
