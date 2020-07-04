'use strict';

(function () {
  var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };

  var wizardElement = document.querySelector('.setup-wizard');

  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  wizardCoatElement.addEventListener('click', function () {
    window.colorize(wizardCoatElement);
  });

  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  wizardEyesElement.addEventListener('click', function () {
    window.colorize(wizardEyesElement);
  });
  window.wizard = wizard;
  return window.wizard;
})();

