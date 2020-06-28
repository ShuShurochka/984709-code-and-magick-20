'use strict';

(function () {
  var URL_SAVE = 'https://javascript.pages.academy/code-and-magick';
  var URL_LOAD = 'https://javascript.pages.academy/code-and-magick/data';
  var POST_REQUEST = 'POST';
  var GET_REQUEST = 'get';

  var statusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;
  var requestServer = function (requestType, URL, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(requestType, URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(requestType, URL);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };


  window.backend = {
    save: function (data, onLoad, onError) {
      requestServer(POST_REQUEST, URL_SAVE, onLoad, onError, data);
    },

    load: function (onLoad, onError) {
      requestServer(GET_REQUEST, URL_LOAD, onLoad, onError);
    },
  };
})();
