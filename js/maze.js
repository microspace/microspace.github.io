
var Maze = Maze || {};
/*
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */

 /*
Maze.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

*/
Maze.DirectionType = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

Maze.SQUARE_SIZE = 64;

Maze.coordoffset_x = -15;
Maze.coordoffset_y = 9;


Maze.directionToString = function(direction)
{
	switch (direction)
	{
		case Maze.DirectionType.EAST:
			return "EAST";
		case Maze.DirectionType.WEST:
			return "WEST";
		case Maze.DirectionType.SOUTH:
			return "SOUTH";
		case Maze.DirectionType.NORTH:
			return "NORTH";
		default:
			return "";
	}
};

Maze.getStepInDirection = {
	EAST: [1, 0],
	WEST: [-1, 0],
	SOUTH: [0, 1],
	NORTH: [0, -1],
};

Maze.scenes = [{
    "id": 0,
    "name": "Scene0",
    "status": 0,
    "startPos": [
        300,
        400
    ],
    "endPos": [
        300,
        500
    ]
}, {
    "id": 1,
    "name": "Scene1",
    "status": 0,
    "startPos": [
        300,
        400
    ],
    "endPos": [
        300,
        500
    ]
}, {
    "id": 2,
    "name": "Scene2",
    "status": 0,
    "startPos": [
        300,
        400
    ],
    "endPos": [
        300,
        500
    ]
}, {
    "id": 3,
    "name": "Scene3",
    "status": 0,
    "startPos": [
        300,
        400
    ],
    "endPos": [
        300,
        500
    ]
}, {
    "id": 4,
    "name": "Scene4",
    "status": 0,
    "startPos": [
        300,
        400
    ],
    "endPos": [
        300,
        500
    ]
}];

$(function(){
    $('#play').click(function() {
       // if the play button value is 'play', call the play function
       // otherwise call the pause function
       $(this).val() == "play" ? play_int() : play_pause();
       $(this).find('i:first').toggleClass('fa-play fa-refresh');
       $(this).toggleClass('play reset');
    });
});

function play_int() {
    $('#play').val("pause");
    // $('#play').text("Сброс");
    $('#play').find('span').text("Сбросить");
    runProgram();
    // do play
}

function play_pause() {
    $('#play').val("play");
    $('#play').find('span').text("Запуск");
    resetProgram();
    //$('#play').text("Запуск");
    // do pause
}


var scene;


function saveWorkspace() {
    var params = location.href.split('?')[1].split('&');
    data = {};
    for (x in params) {
        console.log(x);
        data[params[x].split('=')[0]] = params[x].split('=')[1];
    }
    urldata.token = decodeURIComponent(urldata.token);

    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    var newTemp = xmlText.replace(/"/g, "'");
    var datatoStore = {};
    datatoStore.code = newTemp;
    datatoStore.scene = scene;


    $.ajax({
        type: "POST",
        url: "https://backend.it.robooky.ru/api/save",
        headers: { "Authorization": urldata.token },
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify({ "data": JSON.stringify(datatoStore), "lessonId": 23 }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { console.log(data); },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadWorkspace() {
    var params = location.href.split('?')[1].split('&');
    urldata = {};
    for (x in params) {
        urldata[params[x].split('=')[0]] = params[x].split('=')[1];
    }
    urldata.token = decodeURIComponent(urldata.token);
    console.log(urldata);
    $.ajax({
        type: 'GET',
        url: 'https://backend.it.robooky.ru/api/save?lesson-id={0}&user-id={1}'.f(urldata.lesson-id, user-id),
        headers: { "Authorization": urldata.token },
        success: function (data) {
            if (data) {
                try {
                    var code = JSON.parse(data.data).code;
                    var scene = JSON.parse(data.data).scene;
                    TopDownGame.game.state.start('lesson2' + scene);
                    Blockly.mainWorkspace.clear();
                    xmlDom = Blockly.Xml.textToDom(JSON.parse(data.data).code);
                    Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
                } catch {
                    TopDownGame.game.state.start('lesson21');
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

}