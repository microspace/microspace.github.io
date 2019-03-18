function chooseLevelScreen() {
	const NewMenu = `
  <div class="container">
  <hr>
		<div class="row">
			<div class="col text-center">
        
        <div class="btn-group btn-group-toggle btn-group-justified my-grid-size btn-block" data-toggle="buttons">
					<label class="btn btn-primary disabled">
						Размер
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="size" value="3" autocomplete="off"> 3x3
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="size" value="4" autocomplete="off"> 4x4
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="size" value="5" autocomplete="off"> 5x5
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="size" value="6" autocomplete="off"> 6x6
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="size" value="7" autocomplete="off"> 7x7
					</label>
        </div>
      </div>
    </div>
    <br />
		<div class="row">
			<div class="col text-center">
        <div class="btn-group btn-group-toggle btn-group-justified my-grid-operation btn-block" data-toggle="buttons">
					<label class="btn btn-primary disabled">
						Операции
					</label>
					<label class="btn btn-primary">
					  <img src="img/number-five-in-circular-button.svg" height="40px" alt="number 5 icon"><br />
						<input type="radio" name="operation" value="standard" autocomplete="off"> Станд. числа
					</label>
					<label class="btn btn-primary">
					<img src="img/number-five-in-circular-button.svg" height="30px"  alt="number 5 icon" style="transform: rotate(180deg);"><br />

					
						<input type="radio" name="operation" value="rotated" autocomplete="off"> Числа перевертыши
					</label>
					<label class="btn btn-primary">
					<img src="img/rgb.svg" height="40px" alt="rgb icon"><br />
						<input type="radio" name="operation" value="colored" autocomplete="off"> Цветные
					</label>
					<label class="btn btn-primary">
					<img src="img/abc-block.svg" height="40px"alt="alphabet icon"><br />
						<input type="radio" name="operation" value="alphabet" autocomplete="off" > Алфавит
					</label>
					<label class="btn btn-primary">
					
					<img src="img/letter_number.svg" height="40px"  alt="letter number icon"><br />

						<input type="radio" name="operation" value="alphabet_numbers" autocomplete="off"> Алфавит+числа
					</label>
        </div>
			</div>
    </div>
    <br />
    <div class="row">
			<div class="col text-center">
        <div class="btn-group btn-group-toggle btn-group-justified my-grid-order btn-block" data-toggle="buttons">
					<label class="btn btn-primary disabled">
						Порядок
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="order" value="direct" autocomplete="off"> Прямой
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="order" value="reverse" autocomplete="off"> Обратный
					</label>
        </div>
			</div>
    </div>

    <div class="row">
			<div class="col text-center">
        <div class="btn-group btn-group-toggle btn-group-justified my-grid-timer btn-block" data-toggle="buttons">
					<label class="btn btn-primary disabled">
						Время
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="timer" value="notimelimit" autocomplete="off"> Без дедлайна
					</label>
					<label class="btn btn-primary">
						<input type="radio" name="timer" value="timelimit" autocomplete="off"> С дедлайном
					</label>
        </div>
			</div>
		</div>
		
		<hr>

    <div class="row">
			<div class="col text-center">
    		<button type="button" class="btn btn-success btn-lg my-start">СТАРТ!</button>
				<hr>
			</div>
		</div>
		
	</div>
`
const upperMenu = `
<nav class="navbar navbar-light">
<h1><a class="navbar-brand" href="#">Таблицы Шульте</a></h1>
</nav>
`

	$(".uppermenu").html(upperMenu);
	$(".screen").html(NewMenu);
	toggleMenu();
	updateMenuWithSettingsFormConfig();

	$('.my-start').on('click', function () {
		gameSettings.size = $('.my-grid-size > label.active input[value]').val();
		gameSettings.operation = $('.my-grid-operation > label.active input[value]').val();
		gameSettings.order = $('.my-grid-order > label.active input[value]').val();
		gameSettings.timer = $('.my-grid-timer > label.active input[value]').val();

		startGameF();
	});
}

function updateMenuWithSettingsFormConfig() {

	$(".my-grid-size input[name='size']").each(function (index) {

		if ($(this)[0].value === gameSettings.size.toString()) {
			$(this).parent().addClass("active")
		}
	});

	$(".my-grid-operation input[name='operation']").each(function (index) {

		if ($(this)[0].value === gameSettings.operation.toString()) {
			$(this).parent().addClass("active")
		}
	});

	$(".my-grid-order input[name='order']").each(function (index) {

		if ($(this)[0].value === gameSettings.order.toString()) {
			$(this).parent().addClass("active")
		}
	});

	$(".my-grid-timer input[name='timer']").each(function (index) {

		if ($(this)[0].value === gameSettings.timer.toString()) {
			$(this).parent().addClass("active")
		}
	});

}