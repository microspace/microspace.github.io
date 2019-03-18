



function viewStats() {

  let rate = gameSettings.size * gameSettings.size / gameSettings.pTime * 1000.0;

    const stats = `

    <h1>Статистика по игре</h1>
<table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">Показатель</th>
      <th scope="col">Результат</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Время:</th>
      <td>${msToTime(gameSettings.pTime)} сек</td>
    </tr>
    <tr>
      <th scope="row">Скорость:</th>
      <td>${rate.toFixed(2)} кликов/сек</td>

    </tr>
    <tr>
      <th scope="row">Общее количество кликов: </th>
      <td>${gameSettings.allClicks}</td>

    </tr>
    <tr>
      <th scope="row">Количество ошибочных кликов: </th>
      <td>${gameSettings.allClicks - gameSettings.size * gameSettings.size }</td>

    </tr>
  </tbody>
</table>

<div class="btn-group btn-group-lg" role="group" aria-label="...">
  <button type="button" class="btn btn-secondary my-restart">РЕСТАРТ</button>
  <button type="button" class="btn btn-secondary my-gotomenu">МЕНЮ</button>
</div>
    `
    const upperMenu = ``

	$(".uppermenu").html(upperMenu);
    $( ".screen" ).html(stats );

    $('.my-restart').on('click', function () {
      startGameF();
	});
	$('.my-gotomenu').on('click', function () {
		chooseLevelScreen();
	});
}




function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs + '.' + ms;
}