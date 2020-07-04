'use strict';
(function () {
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
    userDialog.style = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

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

  var setupPlayer = userDialog.querySelector('.setup-player');
  var fireBall = setupPlayer.querySelector('.setup-fireball-wrap');
  window.colorize(fireBall);

  var form = userDialog.querySelector('.setup-wizard-form');

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, window.util.errorHandler);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);
})();
