'use strict';

(function () {


  var QUANTITY_OF_WIZARDS = 4;

  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];


  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


  var generateWizards = function (quantity) {
    var wizards = [];
    for (var i = 0; i < quantity; i++) {
      var wizardName = window.util.getRandomArrayElement(WIZARD_NAMES);
      var wizardSurname = window.util.getRandomArrayElement(WIZARD_SURNAMES);
      var wizardFullName = Math.random() > 0.5 ? wizardName + '\n' + wizardSurname : wizardSurname + '\n' + wizardName;

      wizards[i] = {
        name: wizardFullName,
        coatColor: window.util.getRandomArrayElement(window.util.CLOAK_COLORS),
        eyesColor: window.util.getRandomArrayElement(window.util.EYES_COLORS),
      };
    }
    return wizards;
  };

  var wizards = generateWizards(QUANTITY_OF_WIZARDS);

  var fragment = document.createDocumentFragment();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    fragment.appendChild(wizardElement);
    return fragment;
  };

  for (var j = 0; j < wizards.length; j++) {
    renderWizard(wizards[j]);
  }

  similarListElement.appendChild(fragment);

})();
