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


var setUpOpen = document.querySelector('.setup-open-icon');
var userDialog = document.querySelector('.setup');
var setUpClose = userDialog.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && userNameInput.classList.contains('focused') === false) {
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

setUpOpen.addEventListener('click', function () {
  openPopup();
});

setUpOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setUpClose.addEventListener('click', function () {
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


userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  }
});

// цвет персонажа
var setupPlayer = userDialog.querySelector('.setup-player');
var wizardAppearance = setupPlayer.querySelector('.setup-wizard-appearance');
var bigWizard = setupPlayer.querySelector('.setup-wizard');
var cloak = bigWizard.querySelector('.wizard-coat');

cloak.addEventListener('click', function () {
  cloak.style.fill = getRandomArrayElement(CLOAK_COLORS);
  var inputCoatColor = wizardAppearance.querySelector('input').value;
  if (!(cloak.style.fill === inputCoatColor)) {
    wizardAppearance.querySelector('input').value = cloak.style.fill;
  }
});

var eyes = bigWizard.querySelector('.wizard-eyes');
eyes.addEventListener('click', function () {
  eyes.style.fill = getRandomArrayElement(EYES_COLORS);
});

var fireBall = setupPlayer.querySelector('.setup-fireball-wrap');
var fireballInside = fireBall.querySelector('.setup-fireball');

fireballInside.addEventListener('click', function () {
  var color = getRandomArrayElement(FIREBALL_COLORS);
  fireBall.style = 'background-color:' + color;
  fireBall.querySelector('input').value = color;
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
