

function startGame(next) {

	const GameHTML = `

<div id="game">

    <div class="menu-time">
        
        <p id="time"></p>
       
    </div>

    <div class="statistics">
        
        <p id="next">Найдите: 1</p>
       
    </div>

    <div class="main">

    </div>
</div>

`
	$(".screen").html(GameHTML);


if (next === true) {
	gameSettings.level++;
	gameSettings.size = LevelProgress[gameSettings.level].size;
	gameSettings.difficulty = LevelProgress[gameSettings.level].difficulty;
}



	let main = document.querySelector('.main');
	let counter = 0;
	let counterBtn = true;
	let counterTimeMinute = 0;
	let counterTimeSeconds = 0;
	let counterTimeMs = 0;
	let time = 0;
	let clicks = 0;
	gameSettings.allClicks = 0;
	let successClicks = 0;
	let lastnumber = 0;
	let menu_time = document.querySelector('.menu-time');
	let statistics = document.querySelector('.statistics');

	let sizeWithValue = gameSettings.size;
	let cellSizeWithValue = gameSettings.cellSize;
	let borderWithValue = gameSettings.border;
	let typeWithValue = 1;
	let difficultyWithValue = gameSettings.difficulty;

	const rotArray = [0, 90, 180, 270];
	if (!typeWithValue || !borderWithValue || !cellSizeWithValue || !sizeWithValue || !difficultyWithValue) {
		alert("fill all values");
	} else {
		let arrayWithNumbers = [];
		let arrayWithLetters = [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z'
		];
		let counterOfWhiles = 0;
		let tab = document.getElementsByTagName('table');
		let td = document.getElementsByTagName('td');
		let tr = document.getElementsByTagName('tr');
		let pTime = document.getElementById('time');
		let cl = document.getElementById('clicks');
		let next = document.getElementById('next');
		let clickspeed = document.getElementById('clickspeed');


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


		// Generate table
		function generateTable() {
			let table = document.createElement('table');
			table.setAttribute('id', 'main-table');
			startTime = +new Date();
			table.onclick = function (obj) {
				clicks++;
				gameSettings.allClicks++;
			//	cl.innerHTML = "Клики: " + clicks;

				if (lastnumber + 1 == arrayWithNumbers.length - 1) {
					successClicks++;
					clickTime = +new Date();
					let rate = successClicks / (clickTime - startTime) * 1000.0;
					gameSettings.rate = rate;
				//	clickspeed.innerHTML = rate.toFixed(2) + " кликов/сек";
					clearInterval(time);
					fsm.levelFinished();
				} else {
					let clickednumber = parseInt(obj.path[0].id);

					if (clickednumber == lastnumber + 1) {

						successClicks++;

						lastnumber = clickednumber;
						let expectednumber = lastnumber + 1
						next.innerHTML = "Найдите: " + expectednumber;
					}
				}

			};
			for (let i = 0; i < sizeWithValue; i++) {
				let row = document.createElement('tr');
				row.setAttribute('class', 'row_list');
				for (let j = 0; j < sizeWithValue; j++) {
					let cell = document.createElement('td');
					if (difficultyWithValue == "rotation") {
						var rand = rotArray[Math.floor(Math.random() * rotArray.length)];
						cell.setAttribute('class', 'cell_list rotate_' + rand);
					} else if (difficultyWithValue === "strait") {
						cell.setAttribute('class', 'cell_list');
					} else if (difficultyWithValue === "multicolour") {
						var randColor = ColorsList[Math.floor(Math.random() * ColorsList.length)];
						console.log(randColor)
						cell.setAttribute('class', 'cell_list');
						cell.style.color = randColor;
					}
					let appendtext = "";
					if (typeWithValue == 1) {
						if(difficultyWithValue == "rotation" && (arrayWithNumbers[counterOfWhiles] === 6 || arrayWithNumbers[counterOfWhiles] === 9)) {
							 appendtext = "."
						} else {
							 appendtext = ""
						}
						let number = document.createTextNode(arrayWithNumbers[counterOfWhiles] + appendtext);
						cell.setAttribute('id', arrayWithNumbers[counterOfWhiles]);
						counterOfWhiles++;
						cell.appendChild(number);

						row.appendChild(cell);
					} else if (typeWithValue == 2) {
						let letter = document.createTextNode(arrayWithLetters[counterOfWhiles]);
						counterOfWhiles++;
						cell.appendChild(letter);
						row.appendChild(cell);
					}
				}
				table.appendChild(row);
			}
			main.appendChild(table);
			counter++;
		}



		// Set a value of border style
		function setValueOfBorder() {
			if (borderWithValue == 2) {
				for (let i = tab.length - 1; i >= 0; i--) {
					tab[i].style.border = '1px solid white';
				}
				for (let i = td.length - 1; i >= 0; i--) {
					td[i].style.border = '1px solid white';
				}
				for (let i = tr.length - 1; i >= 0; i--) {
					tr[i].style.border = '1px solid white';
				}
			}
		}

		// Set a value of cell size
		function setValueOfCell() {
			if (cellSizeWithValue > 0) {
				for (let i = 1; i < 5; i++) {
					if (cellSizeWithValue == i * 10) {
						for (let j = tab.length - 1; j >= 0; j--) {
							tab[j].style.width = i * 120 + 300 + 'px';
							tab[j].style.height = i * 120 + 300 + 'px';
							tab[j].style.tableLayout = 'fixed';
						}
					}
				}
			}
		}

		// Removing table every click on button
		function removingTableEveryClick() {
			if (counter > 0) {
				for (let i = tab.length - 1; i >= 0; i--) {
					tab[i].remove();
				}
			}
		}

		// Timer

		function timer() {
			time = setInterval(clockUp, 10);
		}

		function clockUp() {
			if (counterTimeMs == 100) {
				counterTimeSeconds++;
				counterTimeMs = 0;
			}
			if (counterTimeSeconds == 60) {
				counterTimeMinute++;
				counterTimeSeconds = 0;
			}
			counterTimeMs++;
			
			gameSettings.pTime = `0${counterTimeMinute} : ${counterTimeSeconds} : ${counterTimeMs}`;
			if (counterTimeSeconds < 10) {
				pTime.innerHTML = `0${counterTimeMinute} : 0${counterTimeSeconds} : ${counterTimeMs}`;
			} else if (counterTimeSeconds >= 10) {
				pTime.innerHTML = `0${counterTimeMinute} : ${counterTimeSeconds} : ${counterTimeMs}`;
			}

			if (counterTimeMinute >= 1 && counterTimeSeconds < 10) {
				pTime.innerHTML = `0${counterTimeMinute} : 0${counterTimeSeconds} : ${counterTimeMs}`;
			} else if (counterTimeMinute >= 1 && counterTimeSeconds >= 10) {
				pTime.innerHTML = `0${counterTimeMinute} : ${counterTimeSeconds} : ${counterTimeMs}`;
			}

			if (counterTimeMinute >= 10 && counterTimeSeconds < 10) {
				pTime.innerHTML = `${counterTimeMinute} : 0${counterTimeSeconds} : ${counterTimeMs}`;
			} else if (counterTimeMinute >= 10 && counterTimeSeconds >= 10) {
				pTime.innerHTML = `${counterTimeMinute} : ${counterTimeSeconds} : ${counterTimeMs}`;
			}

			clickTime = +new Date();
			let rate = successClicks / (clickTime - startTime) * 1000.0;
		//	clickspeed.innerHTML = rate.toFixed(2) + " кликов/сек";
		}

		if (counterBtn) {
			menu_time.style.display = 'flex';
			statistics.style.display = 'flex';
			//btn.value = "СТОП";
			counterBtn = !counterBtn;
			// call the function
			clicks = 0;
			lastnumber = 0;
			successClicks = 0;
			next.innerHTML = "Найдите: 1";
		//	cl.innerHTML = "Клики: " + clicks;
			removingTableEveryClick();
			generateTable();
			setValueOfBorder();
			setValueOfCell();
			timer();
		} else {
			//btn.value = 'СТАРТ';
			counterBtn = !counterBtn;
			clearInterval(time);
			counterTimeMinute = 0;
			counterTimeMs = 0;
			counterTimeSeconds = 0;
		}
	}
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}