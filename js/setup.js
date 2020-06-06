'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var CLOAK_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_OF_WIZARDS = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var wizards = [];
for (var i = 0; i < QUANTITY_OF_WIZARDS; i++) {
  var wizardName = getRandomArrayElement(WIZARD_NAMES);
  var wizardSurname = getRandomArrayElement(WIZARD_SURNAMES);
  var wizardFullName = Math.random() > 0.5 ? wizardName + '\n' + wizardSurname : wizardSurname + '\n' + wizardName;

  wizards[i] =
  {
    name: wizardFullName,
    coatColor: getRandomArrayElement(CLOAK_COLORS),
    eyesColor: getRandomArrayElement(EYES_COLORS),
  };
}

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
