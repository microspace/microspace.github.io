
function play_int(game) {
    $('#play').val("pause");
    // $('#play').text("Сброс");
    $('#play').find('span').text("Сбросить");
    runProgram(game);
    // do play
}

function play_pause(game) {
    $('#play').val("play");
    $('#play').find('span').text("Запуск");
    resetProgram(game);
    //$('#play').text("Запуск");
    // do pause
}


function runProgram(game) {
    const thisGame = game.scene.keys['GameScene'];

    var code = Blockly.JavaScript.workspaceToCode(workspace);
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
    game.scene.keys['GameScene'].player.execute();
}


function resetProgram(game) {
    game.scene.keys['GameScene'].player.reset();
}



function toogleRunButton(game) {
    $('#play').val() == "play" ? play_int(game) : play_pause(game);
    $('#play').find('i:first').toggleClass('fa-play fa-refresh');
    $('#play').toggleClass('play reset');
}

export {play_int, play_pause, toogleRunButton}