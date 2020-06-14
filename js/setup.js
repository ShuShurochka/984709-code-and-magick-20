'use strict';

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
var CLOAK_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var QUANTITY_OF_WIZARDS = 4;

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];


var setupOpen = document.querySelector('.setup-open-icon');
var userDialog = document.querySelector('.setup');
var setupClose = userDialog.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && !userNameInput.classList.contains('focused')) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  userDialog.querySelector('.setup-similar').classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

// инпут имени
var userNameInput = document.querySelector('.setup-user-name');

userNameInput.addEventListener('focus', function () {
  userNameInput.classList.add('focused');
}, true);
userNameInput.addEventListener('blur', function () {
  userNameInput.classList.remove('focused');
}, true);


userNameInput.addEventListener('invalid', function (evt) {
  switch (evt) {
    case 'userNameInput.validity.tooShort':
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      break;

    case 'userNameInput.validity.tooLong':
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
      break;

    case 'userNameInput.validity.valueMissing':
      userNameInput.setCustomValidity('Обязательное поле');
      break;

    default:
      userNameInput.setCustomValidity('');
      break;
  }
});

// цвет персонажа
var setupPlayer = userDialog.querySelector('.setup-player');
var wizardAppearance = setupPlayer.querySelector('.setup-wizard-appearance');
var bigWizard = setupPlayer.querySelector('.setup-wizard');
var cloak = bigWizard.querySelector('.wizard-coat');

cloak.addEventListener('click', function () {
  var coatColor = getRandomArrayElement(CLOAK_COLORS);
  cloak.style.fill = coatColor;
  wizardAppearance.querySelector('input[name="coat-color"]').value = coatColor;
});

var eyes = bigWizard.querySelector('.wizard-eyes');
eyes.addEventListener('click', function () {
  var eyesColor = getRandomArrayElement(EYES_COLORS);
  eyes.style.fill = eyesColor;
  wizardAppearance.querySelector('input[name="eyes-color"]').value = eyesColor;
});

var fireBall = setupPlayer.querySelector('.setup-fireball-wrap');
var fireballInside = fireBall.querySelector('.setup-fireball');

fireballInside.addEventListener('click', function () {
  var fireballColor = getRandomArrayElement(FIREBALL_COLORS);
  fireBall.style = 'background-color:' + fireballColor;
  fireBall.querySelector('input').value = fireballColor;
});


// код копий магов
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var wizards = [];

var generateWizards = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    var wizardName = getRandomArrayElement(WIZARD_NAMES);
    var wizardSurname = getRandomArrayElement(WIZARD_SURNAMES);
    var wizardFullName = Math.random() > 0.5 ? wizardName + '\n' + wizardSurname : wizardSurname + '\n' + wizardName;

    wizards[i] = {
      name: wizardFullName,
      coatColor: getRandomArrayElement(CLOAK_COLORS),
      eyesColor: getRandomArrayElement(EYES_COLORS),
    };
  }
  return wizards;
};

generateWizards(QUANTITY_OF_WIZARDS);

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
