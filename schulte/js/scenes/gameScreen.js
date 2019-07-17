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
let prevNumber, goalNumber, signed1;

function startGameF() {

	
	
	
	const sizeWithValue = gameSettings.size;
	const gridSize = sizeWithValue * sizeWithValue;
	
	prevNumber = gameSettings.order === "direct" ? 0 : gridSize + 1;
	goalNumber = gameSettings.order === "direct" ? gridSize + 1 : 0;
	signed1 = gameSettings.order === "direct" ? 1 : -1;

	let counterTimeMs = 0;
	gameSettings.allClicks = 0;
	let time = 0;
	const firstRULetterCode = 1040;
	// const locale = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;

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
		grid.innerHTML = "";
		startTime = +new Date();
		for (let i = 0; i < gridSize; i++) {
			let griddiv = document.createElement('div');
			let textdiv = document.createElement('div');
			textdiv.setAttribute('class', 'bboxtext');


			griddiv.className = "buttonbox";
			if (difficultyWithValue == "rotated") {
				var rand = rotArray[Math.floor(Math.random() * rotArray.length)];
				textdiv.setAttribute('class', 'bboxtext rotate_' + rand);
			} else if (difficultyWithValue === "colored") {
				var randColor = ColorsList[Math.floor(Math.random() * ColorsList.length)];
				textdiv.style.color = randColor;
			}
			let appendtext = "";
			if (difficultyWithValue == "rotated" || difficultyWithValue == "colored" || difficultyWithValue == "standard") {
				if (difficultyWithValue == "rotated" & (arrayWithNumbers[counterOfWhiles] === 6 || arrayWithNumbers[counterOfWhiles] === 9)) {
					appendtext = "."
				}
				let number = document.createTextNode(arrayWithNumbers[counterOfWhiles] + appendtext);
				griddiv.setAttribute('id', arrayWithNumbers[counterOfWhiles]);
				counterOfWhiles++;
				textdiv.appendChild(number);
			} else if (difficultyWithValue == "alphabet") {
				let letter = document.createTextNode(lettersWithIndexes[counterOfWhiles][1]);
				griddiv.setAttribute('id', lettersWithIndexes[counterOfWhiles][0]);
				counterOfWhiles++;
				textdiv.appendChild(letter);
			} else if (difficultyWithValue == "alphabet_numbers") {
				let letter = document.createTextNode(lettersAndNumbersWithIndexes[counterOfWhiles][1]);
				griddiv.setAttribute('id', lettersAndNumbersWithIndexes[counterOfWhiles][0]);
				counterOfWhiles++;
				textdiv.appendChild(letter);

			}
			grid.appendChild(griddiv);
			griddiv.appendChild(textdiv);
		}

		$("#grid").css({
			"grid-template-rows": `repeat(${sizeWithValue}, 1fr)`,
			"grid-template-columns": `repeat(${sizeWithValue}, 1fr)`,
		})




	}

	clicks = 0;
	lastnumber = 0;
	successClicks = 0;
	generateGrid();
	if (gameSettings.timer == "timelimit") {
		timer();
	}
	setFont();
	setSquare();
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


//startGameF();