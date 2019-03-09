



function finishGame() {

	// clearInterval(time);
	// document.getElementById('main-table').onclick = '';
	// btn.value = 'СТАРТ';
    // counterBtn = !counterBtn;
    
    

    const stats = `
    <h1>Статистика по игре</h1>
            <p>Время: ${gameSettings.pTime}</p>
            <p>Скорость: ${gameSettings.rate.toFixed(2)} кликов/сек</p>
            <p>Общее количество кликов: ${gameSettings.allClicks}</p>
            <p>Количество ошибочных кликов: ${gameSettings.allClicks - gameSettings.size * gameSettings.size }</p>
            
            <div id="titlemenu">
                <button class="button-secondary button-xlarge pure-button" onclick="fsm.restartLevel()">
                    ЗАНОВО
                </button>
                <button class="button-secondary button-xlarge pure-button" onclick="fsm.nextLevel()">
                    СЛЕДУЮЩИЙ
                </button>
                <button class="button-secondary button-xlarge pure-button" onclick="fsm.exitLevel()">
                    ВЫБРАТЬ УРОВЕНЬ
                </button>
                <button class="button-secondary button-xlarge pure-button">
                    В МЕНЮ 
                </button>
            </div>
    `
    
    $( ".screen" ).html(stats );
}