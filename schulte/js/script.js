document.addEventListener('DOMContentLoaded', function () {

	let btn = document.getElementById('btn');
	let main = document.querySelector('.main');
	let counter = 0;
	let counterBtn = true;
	let counterTimeMinute = 0;
	let counterTimeSeconds = 0;
	let counterTimeMs = 0;
	let time = 0;
	let clicks = 0;
	let successClicks = 0;
	let lastnumber = 0;
	let menu_time = document.querySelector('.menu-time');
	let statistics = document.querySelector('.statistics');
	btn.addEventListener('click', function () {
		let size = document.getElementById('size');
		let cellSize = document.getElementById('cell-size');
		let border = document.getElementById('border');
		let type = document.getElementById('type');
		let difficulty = document.getElementById('difficulty');
		let sizeWithValue = size.options[size.selectedIndex].value;
		let cellSizeWithValue = cellSize.options[cellSize.selectedIndex].value;
		let borderWithValue = border.options[border.selectedIndex].value;
		// let typeWithValue = type.options[type.selectedIndex].value;
		let typeWithValue = 1;
		let difficultyWithValue = difficulty.options[difficulty.selectedIndex].value;

		if (!typeWithValue || !borderWithValue || !cellSizeWithValue || !sizeWithValue || !difficultyWithValue) {
			return;
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
					cl.innerHTML = "Клики: " + clicks;

					if (lastnumber + 1 == arrayWithNumbers.length - 1) {
						successClicks++;
						clickTime = +new Date();
						let rate = successClicks /  (clickTime - startTime) * 1000.0  ;
						clickspeed.innerHTML = rate.toFixed(2) + " кликов/сек";
						
						finishGame();
						
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
							cell.setAttribute('class', 'cell_list rotation');
						} else if (difficultyWithValue == "strait") {
							cell.setAttribute('class', 'cell_list');
						}
						
		
						if (typeWithValue == 1) {
							let number = document.createTextNode(arrayWithNumbers[counterOfWhiles]);
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

			function finishGame() {
				
				clearInterval(time);
				document.getElementById('main-table').onclick = '';
				btn.value = 'СТАРТ';
				counterBtn = !counterBtn;
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
				let rate = successClicks /  (clickTime - startTime) * 1000.0  ;
				clickspeed.innerHTML = rate.toFixed(2) + " кликов/сек";
			
			}

			if (counterBtn) {
				menu_time.style.display = 'flex';
				statistics.style.display = 'flex';
				btn.value = "СТОП";
				counterBtn = !counterBtn;
				// call the function
				clicks = 0;
				lastnumber = 0;
				successClicks = 0;
				next.innerHTML = "Найдите: 1";
				cl.innerHTML = "Клики: " + clicks;
				removingTableEveryClick();
				generateTable();
				setValueOfBorder();
				setValueOfCell();
				timer();
			} else {
				btn.value = 'СТАРТ';
				counterBtn = !counterBtn;
				clearInterval(time);
				counterTimeMinute = 0;
				counterTimeMs = 0;
				counterTimeSeconds = 0;

			}










		}
	});
});
