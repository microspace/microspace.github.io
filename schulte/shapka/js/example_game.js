let level,
    // dataLevels - исходные данные уровней
    dataLevels = [
    {
        minPoints: 100,
        maxPoints: 400,
        time: 10, // в секундах
    },
    {
        minPoints: 300,
        maxPoints: 600,
        time: 15, // в секундах
    }
];



function endCountdown() {
    // logic to finish the countdown here
    newGame();
  }
  
  function handleTimer() {
    $('#count_num').html(count);
    if(count === 0) {
      clearInterval(timer);
      endCountdown();
    } else {
      count--;
    }
    
  }
  
  var count = 2;
  var timer;

  function startCountdown() {
    // logic to finish the countdown here
    $('#count_num').html(3);
  timer = setInterval(function() { handleTimer(count); }, 1000);
  document.querySelector(".start_game").style.display = "none";

  }

function newGame() {
    // Удалить. Кнопки Начать игру, Правильный ответ...
    document.querySelector(".start").style.display = "none";
    document.querySelector(".buttons_field").style.display = "block";
    document.querySelector('.button_correct_answer').disabled = false;
    document.querySelector('.button_wrong_answer').disabled = false;
    document.querySelector('.button_end_session').disabled = false;
    //

    initProgressLine();
    startGameF();

    /** При правильном/неправильном ответе изменение количества очков
     * @param {number} points - кол-во очков за ответ (положительное или отрицательное число)
     *
     * changePoints(points);
     */


    /** Закончить сессию
     *
     * changeLevelState();
     */


}


//Получение уровня и передача данных уровня (min,max очки, время) в шапку
function getDataLevel(startLevel) {
    let dataLevel = dataLevels[startLevel-1];
    level = startLevel;

    return dataLevel;
}