let level,
    // dataLevels - исходные данные уровней
    dataLevels = [
        {
            minPoints: 100,
            maxPoints: 400,
            time: 15, // в секундах
            delay_time: 1, //задержка перед началом игры, не обязательно
            playedgames: 1,
            size: 3
        },
        {
            minPoints: 400,
            maxPoints: 700,
            time: 25, // в секундах
            playedgames: 0,
            size: 4
        },
        {
            minPoints: 700,
            maxPoints: 1000,
            time: 45, // в секундах
            playedgames: 0,
            size: 5
        },
        {
            minPoints: 700,
            maxPoints: 1000,
            time: 45, // в секундах
            playedgames: 0,
            size: 5
        },
        {
            minPoints: 1000,
            maxPoints: 1300,
            time: 85, // в секундах
            playedgames: 0,
            size: 6
        }
        ,
        {
            minPoints: 1300,
            maxPoints: 1600,
            time: 105, // в секундах
            playedgames: 0,
            size: 7
        }
        ,
        {
            minPoints: 1300,
            maxPoints: 1600,
            time: 100, // в секундах
            playedgames: 0,
            size: 7
        }
        ,
        {
            minPoints: 1600,
            maxPoints: 1900,
            time: 120, // в секундах
            playedgames: 0,
            size: 8
        }
        ,
        {
            minPoints: 1600,
            maxPoints: 1900,
            time: 120, // в секундах
            playedgames: 0,
            size: 8
        }
        ,
        {
            minPoints: 1900,
            maxPoints: 2100,
            time: 160, // в секундах
            playedgames: 0,
            size: 9
        }
        ,

    ];



function newGame() {


    // Удалить. Кнопки Начать игру, Правильный ответ...
    /*     document.querySelector(".start").style.display = "none";
        document.querySelector(".buttons_field").style.display = "block";
        document.querySelector('.button_correct_answer').disabled = false;
        document.querySelector('.button_wrong_answer').disabled = false;
        document.querySelector('.button_end_session').disabled = false; */
    //

    initProgressLine();

    /** При правильном/неправильном ответе изменение количества очков
     * @param {number} points - кол-во очков за ответ (положительное или отрицательное число)
     *
     * changePoints(points);
     */


    /** Закончить сессию
     *
     * changeLevelState();
     */
    $('#grid').on('touchend mouseup', 'div', function (e) {


        $(this).css({
            "background": "#F2BBC9",
            "transform": "translateY(0px)",
            "-webkit-box-shadow": "10px 10px 0px 0px rgba(178, 47, 97, 1)",
            "-moz-box-shadow": "10px 10px 0px 0px rgba(178, 47, 97, 1)",
            "box-shadow": "10px 10px 0px 0px rgba(178, 47, 97, 1)",
        });

        e.preventDefault();



    });




    $('#grid').on('touchstart mousedown', 'div', function (e) {




        e.preventDefault();

        //gameSettings.allClicks++;

        let clickedNumber = parseInt($(this).attr('id'));
        if (clickedNumber === prevNumber + signed1) {

            successClicks++;
            changePoints(50);
            prevNumber = clickedNumber;
            $(this).css({
                "background": "#FFFFFF",
                "transform": "translateY(5px)",
                "-webkit-box-shadow": "5px 5px 0px 0px rgba(178, 47, 97, 1)",
                "-moz-box-shadow": "5px 5px 0px 0px rgba(178, 47, 97, 1)",
                "box-shadow": "5px 5px 0px 0px rgba(178, 47, 97, 1)",
            });
            if (prevNumber === goalNumber - 1 * signed1) {
                //clickTime = +new Date();

                // gameSettings.pTime = clickTime - startTime;
                changeLevelState();
                //viewStats();

            }

        } else {
            $(this).css({
                "background": "#EF3054",
                "transform": "translateY(5px)",
                "-webkit-box-shadow": "5px 5px 0px 0px rgba(178, 47, 97, 1)",
                "-moz-box-shadow": "5px 5px 0px 0px rgba(178, 47, 97, 1)",
                "box-shadow": "5px 5px 0px 0px rgba(178, 47, 97, 1)",
            });
            changePoints(-50);
        }
    });

}


//Получение уровня и передача данных уровня (min,max очки, время) в шапку
function getDataLevel(startLevel) {
    let dataLevel = dataLevels[startLevel - 1];
    level = startLevel;
    return dataLevel;
}