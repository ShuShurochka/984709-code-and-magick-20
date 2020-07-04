'use strict';
(function () {
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  var userDialog = document.querySelector('.setup');
  var setupPlayer = userDialog.querySelector('.setup-player');
  var wizardAppearance = setupPlayer.querySelector('.setup-wizard-appearance');
  var bigWizard = setupPlayer.querySelector('.setup-wizard');
  var cloak = bigWizard.querySelector('.wizard-coat');
  var eyes = bigWizard.querySelector('.wizard-eyes');
  var fireBall = setupPlayer.querySelector('.setup-fireball-wrap');

  var getRandomColor = function (element) {
    switch (element) {
      case eyes:
        return window.util.getRandomArrayElement(window.util.EYES_COLORS);

      case cloak:
        return window.util.getRandomArrayElement(window.util.CLOAK_COLORS);

      case fireBall:
        return window.util.getRandomArrayElement(FIREBALL_COLORS);

      default:
        return 'black';
    }
  };

  window.colorize = function (element) {
    element.addEventListener('click', function () {
      var color = getRandomColor(element);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
        if (element === fireBall) {
          fireBall.querySelector('input').value = color;
        }
      } else {
        element.style.fill = color;
        if (element === eyes) {
          wizardAppearance.querySelector('input[name="eyes-color"]').value = color;
          window.wizard.onEyesChange(color);
        } else if (element === cloak) {
          wizardAppearance.querySelector('input[name="coat-color"]').value = color;
          window.wizard.onCoatChange(color);
        }
      }
    });
  };
})();
