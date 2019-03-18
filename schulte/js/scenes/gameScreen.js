function restartGameF() {
	let size = $(".size-select option:selected").val();
	let operation = $(".operation-select option:selected").val();
	gameSettings.order = $(".order-select option:selected").val();
	gameSettings.timer = $(".timer-select option:selected").val();
	gameSettings.size = size;
	gameSettings.operation = operation;
	clearInterval(0);
	startGameF();

}

function startGameF() {


	const uppermenu = `
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<button class="btn btn-primary my-gotomenu">МЕНЮ</button>
	
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
	</button>
	
  <div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav">
			<li class="nav-item">
				<button class="btn btn-success my-launch">РЕСТАРТ</button>
			</li>
      <li class="nav-item">
		<select class="custom-select size-select">
			<option value="3">Размер: 3</option>
			<option value="4">Размер: 4</option>
			<option value="5">Размер: 5</option>
			<option value="6">Размер: 6</option>
			<option value="7">Размер: 7</option>
		</select>
      </li>
      <li class="nav-item">
				<select class="custom-select operation-select">
					<option value="standard">Стандартные числа</option>
					<option value="rotated">Числа перевертыши</option>
					<option value="colored">Цветные числа</option>
					<option value="alphabet">Алфавит</option>
					<option value="alphabet_numbers">Алфавит + числа</option>
				</select>
			</li>
      <li class="nav-item">
					<select class="custom-select order-select ">
						<option value="direct">Прямой</option>
						<option value="reverse">Обратный</option>
					</select>
			</li>
      <li class="nav-item">
					<select class="custom-select timer-select ">
						<option value="notimelimit">Без дедлайна</option>
						<option value="timelimit">С дедлайном</option>
					</select>
			</li>
		</ul>
  </div>
</nav>
`

	const progressbar = `
<div class="progress" style="height: 3px;">
<div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
`

	const NewGame = `
	<br />
	<div class="stretchy-wrapper d-block mx-auto">
	${gameSettings.timer === "timelimit" ? progressbar : ""}
		<div id="grid">

		</div>
	</div>
`

	$(".uppermenu").html(uppermenu);
	$(".screen").html(NewGame);

	setSquareSize();
	updateUpperMenuWithConfig();

	$('#navbarNav').on('change', function () {
		getReady();
	});

	function getReady() {
		$(".my-launch").html("СТАРТ");
		clearInterval(time);
		$("#grid").html(`<button class="btn btn-lg my-launch" style="background-color:transparent">
	<img src="img/play-button.svg" height="50%" alt="play"><br />
	</button>`)
		$('.my-launch').on('click', function () {
			restartGameF();
		});
		$("#grid").css({
			"grid-template-rows": `1fr`,
			"grid-template-columns": `1fr`,
		})
	}

	$('.my-launch').on('click', function () {
		clearInterval(time);
		restartGameF();
	});

	$('.my-gotomenu').on('click', function () {
		clearInterval(time);
		chooseLevelScreen();
	});

	let counterTimeMs = 0;
	gameSettings.allClicks = 0;
	let time = 0;
	const firstRULetterCode = 1040;
	// const locale = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
	const sizeWithValue = gameSettings.size;
	const gridSize = sizeWithValue * sizeWithValue;
	let tlimit = 0;
	if (sizeWithValue == 3) {
		tlimit = 10 * 1000;
	} else if (sizeWithValue == 4) {
		tlimit = 15 * 1000;
	} else if (sizeWithValue == 5) {
		tlimit = 30 * 1000;
	} else if (sizeWithValue == 6) {
		tlimit = 45 * 1000;
	} else if (sizeWithValue == 7) {
		tlimit = 60 * 1000;
	}
	let difficultyWithValue = gameSettings.operation;
	let lettersWithIndexes = [];
	let lettersAndNumbersWithIndexes = [];
	const rotArray = [0, 90, 180, 270];
	let arrayWithLetters = [];
	let arrayWithNumbers = [];
	/* 		const arrayWithLetters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖДИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split(''); */
	for (let i = 0; i < gridSize; i++) {
		lettersWithIndexes.push([i + 1, String.fromCharCode(firstRULetterCode + i)])
	}
	let index = 1;
	for (let i = 1; i <= gridSize; i++) {
		if (i % 2 == 1) {
			lettersAndNumbersWithIndexes.push([i, index])
			lettersAndNumbersWithIndexes.push([i + 1, String.fromCharCode(firstRULetterCode + index - 1)])
		} else {
			index++;
		}
	}
	lettersAndNumbersWithIndexes.splice(gridSize, lettersAndNumbersWithIndexes.length - gridSize);
	// var lettersWithIndexes = arrayWithLetters.map( i => [i, arrayWithLetters.indexOf(i) + 1] )
	let counterOfWhiles = 0;
	// Add numbers to array
	for (let i = 1; i <= sizeWithValue * sizeWithValue; i++) {
		arrayWithNumbers[i] = i;
	}
	// Select a size of table with letters to randomize
	let size_of_letters = sizeWithValue * sizeWithValue;
	arrayWithLetters.splice(size_of_letters, 24);
	// Sort random table
	arrayWithNumbers.sort(() => Math.random() - 0.5);
	arrayWithLetters.sort(() => Math.random() - 0.5);
	lettersWithIndexes.sort(() => Math.random() - 0.5);
	lettersAndNumbersWithIndexes.sort(() => Math.random() - 0.5);

	function timer() {
		time = setInterval(clockUp, 100);
	}

	function clockUp() {
		counterTimeMs = counterTimeMs + 100;
		let valeur = Math.floor((tlimit - counterTimeMs) / tlimit * 100);
		if (valeur <= 0) {
			getReady();
		}
		$('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
	}

	function generateGrid() {
		let grid = document.getElementById('grid');
		startTime = +new Date();
		for (let i = 0; i < gridSize; i++) {
			let griddiv = document.createElement('div');
			if (difficultyWithValue == "rotated") {
				var rand = rotArray[Math.floor(Math.random() * rotArray.length)];
				griddiv.setAttribute('class', 'cell_list rotate_' + rand);
			} else if (difficultyWithValue === "colored") {
				var randColor = ColorsList[Math.floor(Math.random() * ColorsList.length)];
				griddiv.style.color = randColor;
			}
			let appendtext = "";
			if (difficultyWithValue == "rotated" || difficultyWithValue == "colored" || difficultyWithValue == "standard") {
				if (difficultyWithValue == "rotated" & (arrayWithNumbers[counterOfWhiles] === 6 || arrayWithNumbers[counterOfWhiles] === 9)) {
					appendtext = "."
				}
				let number = document.createTextNode(arrayWithNumbers[counterOfWhiles] + appendtext);
				griddiv.setAttribute('id', arrayWithNumbers[counterOfWhiles]);
				counterOfWhiles++;
				griddiv.appendChild(number);
			} else if (difficultyWithValue == "alphabet") {
				let letter = document.createTextNode(lettersWithIndexes[counterOfWhiles][1]);
				griddiv.setAttribute('id', lettersWithIndexes[counterOfWhiles][0]);
				counterOfWhiles++;
				griddiv.appendChild(letter);
			} else if (difficultyWithValue == "alphabet_numbers") {
				let letter = document.createTextNode(lettersAndNumbersWithIndexes[counterOfWhiles][1]);
				griddiv.setAttribute('id', lettersAndNumbersWithIndexes[counterOfWhiles][0]);
				counterOfWhiles++;
				griddiv.appendChild(letter);

			}
			grid.appendChild(griddiv);
		}

		$("#grid").css({
			"grid-template-rows": `repeat(${sizeWithValue}, 1fr)`,
			"grid-template-columns": `repeat(${sizeWithValue}, 1fr)`,
		})

		let prevNumber = gameSettings.order === "direct" ? 0 : gridSize + 1;
		let goalNumber = gameSettings.order === "direct" ? gridSize + 1 : 0;
		let signed1 = gameSettings.order === "direct" ? 1 : -1;

		$('#grid').on('click', 'div', function () {
			gameSettings.allClicks++;
			let clickedNumber = parseInt($(this).attr('id'));
			if (clickedNumber === prevNumber + signed1) {
				successClicks++;
				if (prevNumber === goalNumber - 2 * signed1) {
					clickTime = +new Date();

					gameSettings.pTime = clickTime - startTime;
					clearInterval(time);
					viewStats();
				}
				prevNumber = clickedNumber;
			}
		});
	}

	clicks = 0;
	lastnumber = 0;
	successClicks = 0;
	generateGrid();
	if (gameSettings.timer == "timelimit") {
		timer();
	}

}



function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateUpperMenuWithConfig() {

	$(`.size-select option[value=${gameSettings.size}]`).each(function (index) {
		$(this).prop('selected', true);
	});
	$(`.operation-select option[value=${gameSettings.operation}]`).each(function (index) {
		$(this).prop('selected', true);
	});
	$(`.order-select option[value=${gameSettings.order}]`).each(function (index) {
		$(this).prop('selected', true);
	});
	$(`.timer-select option[value=${gameSettings.timer}]`).each(function (index) {
		$(this).prop('selected', true);
	});
}


startGameF();