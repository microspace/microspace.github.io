let timer_numb, timer_animate;
let fieldGame = { level: '', record: '', minPoints: '', maxPoints: '', points: '', time: '', progressBar: '' };
let dataGame = { level: '', editLevel: false, record: '', minPoints: '', maxPoints: '', points: '', time: '', delay_time: '' };

function initProgressLine() {
    $('#modalEndGame').modal('hide');

    generateLine();
    fieldGame.level = document.querySelector(".level");
    fieldGame.record = document.querySelector(".record");
    fieldGame.minPoints = document.querySelector(".min_points");
    fieldGame.maxPoints = document.querySelector(".max_points");
    fieldGame.points = document.querySelector(".points");
    fieldGame.time = document.querySelector('.time');
    fieldGame.timerbox = document.querySelector('.timerbox');
    fieldGame.progressBar = document.querySelector(".progressBar");

    let initialData = JSON.parse(getInitialDataServer());
    dataGame.level = initialData.startLevel;
    dataGame.record = initialData.record;

    let dataLevel = getDataLevel(dataGame.level);
    dataGame.minPoints = dataLevel.minPoints;
    dataGame.maxPoints = dataLevel.maxPoints;
    dataGame.time = dataLevel.time;
    dataGame.points = 0;
    if (dataLevel.delay_time) {
        dataGame.delay_time = dataLevel.delay_time;
    } else {
        dataGame.delay_time = 0;
    }
    fieldGame.level.textContent = dataGame.level;
    fieldGame.record.textContent = dataGame.record;
    fieldGame.minPoints.textContent = dataGame.minPoints;
    fieldGame.maxPoints.textContent = dataGame.maxPoints;
    fieldGame.points.textContent = dataGame.points;

    // startTimer(dataGame.time);
    delay_timer();
}

function getInitialDataServer() {
    // TODO связь с сервером, получение данных
    let data = '{ "startLevel": "1", "record": "0" }';
    return data;
}
function setInitialDataServer(startLevel, record) {
    // TODO связь с сервером, отправка данных

}

function delay_timer() {
    let time_del = dataGame.delay_time * 1000;
    fieldGame.time.textContent = '00:00';
    fieldGame.timerbox.textContent = '00:00';
    setTimeout(function () {
        startTimer(dataGame.time);

        return true;
    }, time_del);

}

function newSessionGame() {
    dataGame.points = 0;

    if (dataGame.editLevel) {
        let dataLevel = getDataLevel(dataGame.level);
        dataGame.minPoints = dataLevel.minPoints;
        dataGame.maxPoints = dataLevel.maxPoints;
        dataGame.time = dataLevel.time;

        fieldGame.minPoints.textContent = dataGame.minPoints;
        fieldGame.maxPoints.textContent = dataGame.maxPoints;

        if (dataLevel.delay_time) {
            dataGame.delay_time = dataLevel.delay_time;
        } else {
            dataGame.delay_time = 0;
        }

        dataGame.editLevel = false;
    }
    fieldGame.points.textContent = dataGame.points;
    // startTimer(dataGame.time);
    delay_timer();

}

function startTimer(time) {
    let minutes, seconds, diff,
        intervalVal = 20,
        widthProgress = 100,
        start = Date.now(),
        percentVal = (intervalVal * 100) / (time * 1000);

    function timer() {
        diff = time - (((Date.now() - start) / 1000) | 0);
        if (diff <= 0) {
            fieldGame.time.textContent = '00:00';
            endTimer(true, time);
            return;
        }
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        fieldGame.time.textContent = minutes + ":" + seconds;
        fieldGame.timerbox.textContent = minutes + ":" + seconds;

    }

    function timer_line() {
        let timePassed = Date.now() - start;
        if (timePassed >= (time * 1000)) {
            fieldGame.progressBar.querySelector('div').style.width = "0";
            return;
        }
        widthProgress = Math.floor((widthProgress - percentVal) * 1000) / 1000;
        fieldGame.progressBar.querySelector('div').style.width = widthProgress + "%";
    }
    timer();
    timer_numb = setInterval(timer, 1000);
    timer_animate = setInterval(timer_line, intervalVal);
}

function endTimer(endTimeAnswer = false, time) {
    clearInterval(timer_numb);
    clearInterval(timer_animate);
    if (endTimeAnswer) {
        let widthProgress = 0;
        let percentVal = (20 * 100) / 1000;
        let line_anim = setInterval(function () {
            widthProgress = widthProgress + percentVal;
            if (widthProgress > 100) {
                clearInterval(line_anim);
                changeLevelState(true);
                return;
            }
            fieldGame.progressBar.querySelector('div').style.width = widthProgress + "%";
        }, 20);

    } else {
        fieldGame.progressBar.querySelector('div').style.width = "100%";
    }
}
/**
 * @param {number} points - кол-во очков за ответ
 */

function changePoints(points) {
    dataGame.points += points;
    fieldGame.points.textContent = dataGame.points;
}


/**
 * @param {boolean} progress - Правильность ответа
 */
function changeLevelState(timeEnd = false) {
    let progress;
    let time_del = dataGame.delay_time * 1000;
    if (timeEnd) {
        progress = -1;
    } else {
        if (dataGame.points < dataGame.minPoints) progress = -1;
        else if (dataGame.points > dataGame.maxPoints) progress = 1;
        else progress = 0;
    }

    let active_wrong_answer = [], active_correct_answer = [],
        wrong_answers = document.getElementsByClassName('wrong_answer'),
        correct_answers = document.getElementsByClassName('correct_answer');
    for (let i = 0; i < 3; i++) {
        if (wrong_answers[i].classList.contains('active')) active_wrong_answer.push(wrong_answers[i]);
        if (correct_answers[i].classList.contains('active')) active_correct_answer.push(correct_answers[i]);
    }

    if (progress == 1) { //если очков больше max очков
        if (active_wrong_answer.length != 0) {
            active_wrong_answer[0].classList.remove('active');
        } else {
            if (active_correct_answer.length == 2) {
                dataGame.level++;
                dataGame.editLevel = true;
                anim_level(true);
            } else {
                correct_answers[active_correct_answer.length].classList.add('active');
            }
        }
    } else if (progress == -1) {  //если очков меньше min очков
        if (active_correct_answer.length != 0) {
            active_correct_answer[active_correct_answer.length - 1].classList.remove('active');
        }
        else {
            if (active_wrong_answer.length == 2) {
                if (dataGame.level != 1) {
                    dataGame.level--;
                    dataGame.editLevel = true;
                    anim_level(false);
                } else {
                    wrong_answers[0].classList.add('active');
                    active_wrong_answer[2] = wrong_answers[0];
                }
            } else if (active_wrong_answer.length != 3) {
                wrong_answers[2 - active_wrong_answer.length].classList.add('active');
            }
        }
    }

    function anim_level(bool) {
        fieldGame.level.style.opacity = '0';
        if (bool) {
            correct_answers[2].classList.add('active');
            active_correct_answer[2] = correct_answers[2];
        } else {
            wrong_answers[0].classList.add('active');
            active_wrong_answer[2] = wrong_answers[0];
        }

        setTimeout(function () {
            for (let j = 0; j < 3; j++) {
                if (bool) active_correct_answer[j].classList.remove('active');
                else active_wrong_answer[j].classList.remove('active');
            }
        }, 500);
        setTimeout(function () {
            fieldGame.level.textContent = dataGame.level;
            fieldGame.level.style.opacity = '1';
        }, 500);
    }

    if (dataGame.points > dataGame.record) {
        dataGame.record = dataGame.points;
        fieldGame.record.textContent = dataGame.record;
        setInitialDataServer(dataGame.level, dataGame.record);
    }

    let optio = gamePossibilities[dataGame.level - 1].length;
    gameSettings.operation = gamePossibilities[dataGame.level - 1][dataLevels[dataGame.level - 1].playedgames % optio];

    dataLevels[dataGame.level - 1].playedgames = dataLevels[dataGame.level - 1].playedgames + 1;
    gameSettings.size = dataLevels[dataGame.level - 1].size;

    startGameF();

    endTimer();
    newSessionGame();
}

function endGame() {
    endTimer();
    document.querySelector('.button_correct_answer').disabled = true;
    document.querySelector('.button_wrong_answer').disabled = true;
    document.querySelector('.button_end_session').disabled = true;
    $('#modalEndGame').modal('show')
}

