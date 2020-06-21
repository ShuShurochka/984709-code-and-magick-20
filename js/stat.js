'use strict';
(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var COLUMNS_GAP = 50;
  var FONT_GAP = 16;
  var BAR_WIDTH = 40;
  var MAX_GRAPH_HEIGHT = 150;
  var GAP_TEXT_TOP = 15;


  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');


    // ctx.translate(0, 300);

    var maxTime = getMaxElement(times);
    for (var i = 0; i <= players.length - 1; i++) {
      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';

      } else {
        var saturation = Math.random() * 100;
        ctx.fillStyle = 'hsla(235, ' + saturation + '%' + ', 27%, 1)';
      }

      var xBarNames = CLOUD_X + COLUMNS_GAP + (COLUMNS_GAP + BAR_WIDTH) * i;
      var yText = CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP;
      var height = MAX_GRAPH_HEIGHT * times[i] / maxTime;
      var yBar = yText - GAP_TEXT_TOP - height;
      ctx.fillRect(xBarNames, yBar, BAR_WIDTH, height);
      ctx.fillStyle = 'rgba(0,0,3,1)';
      ctx.fillText(players[i], xBarNames, yText);
      var playerTime = Math.round(times[i]);
      ctx.fillText(playerTime, xBarNames, yBar - GAP);
    }
    ctx.font = '16px PT Mono';
    // ctx.fillStyle = 'rgba(0,0,3,1)';
    ctx.textBaseline = 'hanging';
    var titleX = CLOUD_X + COLUMNS_GAP;
    var titleY = CLOUD_Y + GAP;
    ctx.fillText('Ура вы победили!', titleX, titleY);
    ctx.fillText('Список результатов:', titleX, titleY + FONT_GAP);
  };
})();
