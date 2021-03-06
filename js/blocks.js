'use strict';

Blockly.Blocks['maze_up'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "up") + ' %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1,

            }]
        });
    }
};

Blockly.JavaScript['maze_up'] = function (block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    var code = `
    Pegman.isGladeAbove = Pegman.isGladeBelow = Pegman.isGladeToRight = Pegman.isGladeToLeft = false;
    var operator = ` + operator + `;

    Pegman.nextAction("up",  operator);
    


    if (TopDownGame.game.state.getCurrentState().key == "lesson5") {
        var step = Maze.getStepInDirection["NORTH"];
        Pegman.vdposY = Pegman.vdposY + step[1] * operator; 
        try {
        var tileLeft = map.getTile(Pegman.vdposX - 1, Pegman.vdposY, flour);
        Pegman.isGladeToLeft = tileLeft.index == 235;
        } catch (e) {}
        try {
        var tileRight = map.getTile(Pegman.vdposX + 1, Pegman.vdposY, flour);
        Pegman.isGladeToRight = tileRight.index == 235;
        } catch (e) {}
        try {
        var tileAbove = map.getTile(Pegman.vdposX, Pegman.vdposY - 1, flour);
        Pegman.isGladeAbove = tileAbove.index == 235;
        } catch (e) {}
    }
    `
    return code;
};




Blockly.Blocks['maze_down'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "down") + ' %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
            }]
        });
    }
};

Blockly.JavaScript['maze_down'] = function (block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    var code = `
    Pegman.isGladeAbove = Pegman.isGladeBelow = Pegman.isGladeToRight = Pegman.isGladeToLeft = false;
    var operator = ` + operator + `;

    Pegman.nextAction("down",  operator);
     
    if (TopDownGame.game.state.getCurrentState().key == "lesson5") {
        var step = Maze.getStepInDirection["SOUTH"];
        Pegman.vdposY = Pegman.vdposY + step[1] * operator; 

        try {
            var tileLeft = map.getTile(Pegman.vdposX - 1, Pegman.vdposY, flour);
            Pegman.isGladeToLeft = tileLeft.index == 235;
        } catch (e) {}

        try {
        var tileRight = map.getTile(Pegman.vdposX + 1, Pegman.vdposY, flour);
        Pegman.isGladeToRight = tileRight.index == 235;
        } catch (e) {}

        try {
        var tileDown = map.getTile(Pegman.vdposX, Pegman.vdposY + 1, flour);
        
        Pegman.isGladeBelow = tileDown.index == 235;
        } catch (e) {}


    }
    `
    return code;
};





Blockly.Blocks['maze_right'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "right") + ' %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
            }]
        });
    }
};

Blockly.JavaScript['maze_right'] = function (block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');


    var code = `
    Pegman.isGladeAbove = Pegman.isGladeBelow = Pegman.isGladeToRight = Pegman.isGladeToLeft = false;
    var operator = ` + operator + `;

    Pegman.nextAction("right",  operator);
    
    if (TopDownGame.game.state.getCurrentState().key == "lesson5") {
        var step = Maze.getStepInDirection["EAST"];
        Pegman.vdposX = Pegman.vdposX + step[0] * operator; 
 


    try {
        var tileAbove = map.getTile(Pegman.vdposX, Pegman.vdposY - 1, flour);
        Pegman.isGladeAbove = tileAbove.index == 235;
    } catch (e) { 
        
    }
    try {
        var tileBelow = map.getTile(Pegman.vdposX, Pegman.vdposY + 1, flour);
        Pegman.isGladeBelow = tileBelow.index == 235;
    } catch (e) { 
        
    }
    try {
        var tileRight = map.getTile(Pegman.vdposX + 1, Pegman.vdposY, flour);
        Pegman.isGladeToRight = tileRight.index == 235;
    } catch (e) { 
        
    }

        
    }
    `
    return code;
};



Blockly.Blocks['maze_left'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "left") + ' %1',
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": 'maze_turnRightTooltip',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "STEPCOUNT",
                "value": 1
            }]
        });
    }
};

Blockly.JavaScript['maze_left'] = function (block) {
    // Generate JavaScript for moving forward.
    var operator = block.getFieldValue('STEPCOUNT');
    var code = `
    Pegman.isGladeAbove = Pegman.isGladeBelow = Pegman.isGladeToRight = Pegman.isGladeToLeft = false;
    var operator = ` + operator + `;

    Pegman.nextAction("left",  operator);
    
    if (TopDownGame.game.state.getCurrentState().key == "lesson5") {
        var step = Maze.getStepInDirection["WEST"];
        Pegman.vdposX = Pegman.vdposX + step[0] * operator; 


    try {
        var tileAbove = map.getTile(Pegman.vdposX, Pegman.vdposY - 1, flour);
        Pegman.isGladeAbove = tileAbove.index == 235;
    } catch (e) {}
    try {
        var tileBelow = map.getTile(Pegman.vdposX, Pegman.vdposY + 1, flour);
        Pegman.isGladeBelow = tileBelow.index == 235;
    } catch (e) {}
    try {
        var tileLeft = map.getTile(Pegman.vdposX - 1, Pegman.vdposY, flour);
        Pegman.isGladeToLeft = tileLeft.index == 235;
    } catch (e) {}

    }
    `
    return code;
};


Blockly.Blocks['fire'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "fire"),
            "previousStatement": null,
            "nextStatement": null,
            "colour": 0,
            "tooltip": 'Выстрел'
        });
    }
};

Blockly.JavaScript['fire'] = function (block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("fire");\n';
};



Blockly.Blocks['factory_base'] = {

    init: function () {
        this.jsonInit({
            "type": "block_type",
            "message0": get_l10n("blocks", "press") + ' %1',
            "args0": [{
                "type": "field_image",
                "src": "assets/images/play_icon.png",
                "width": 17,
                "height": 17,
                "alt": "▶"
            }],
            "message1": get_l10n("blocks", "to_launch") + ' %1',
            "args1": [{
                "type": "input_statement",
                "name": "STACK"
            }],
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};


Blockly.JavaScript['factory_base'] = function (block) {
    var statements_stack = Blockly.JavaScript.statementToCode(block, 'STACK');
    return statements_stack;
};




Blockly.Blocks['floatto'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "type": "floatto",
            "message0": get_l10n("blocks", "float"),
            "args0": [{
                "type": "field_number",
                "name": "seconds",
                "value": 3,
                "min": 2,
                "max": 20
            },

            {
                "type": "field_number",
                "name": "tox",
                "value": 0,
                "min": -20,
                "max": 20
            },

            {
                "type": "field_number",
                "name": "toy",
                "value": 0,
                "min": -20,
                "max": 20
            }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};

Blockly.JavaScript['floatto'] = function (block) {
    var number_seconds = block.getFieldValue('seconds');
    var number_tox = block.getFieldValue('tox');
    var number_toy = block.getFieldValue('toy');

    return 'Pegman.nextAction("nswe", ' + number_seconds + ', ' + number_tox + ', ' + number_toy + ');\n';
};


Blockly.Blocks['changeskin'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "changeskin"),
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": '',
            "colour": 160,
            "args0": [{
                "type": "field_dropdown",
                "name": "TILES",
                "options": [
                    [{
                        "src": "assets/images/build/tileid_02.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id2"
                    }, "1"],
                    [{
                        "src": "assets/images/build/tileid_03.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id3"
                    }, "2"],
                    [{
                        "src": "assets/images/build/tileid_06.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id6"
                    }, "5"],
                    [{
                        "src": "assets/images/build/tileid_14.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id14"
                    }, "13"],
                    [{
                        "src": "assets/images/build/tileid_19.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id19"
                    }, "18"],
                    [{
                        "src": "assets/images/build/tileid_27.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id27"
                    }, "26"],
                    [{
                        "src": "assets/images/build/tileid_32.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id32"
                    }, "31"],
                    [{
                        "src": "assets/images/build/tileid_40.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id40"
                    }, "39"],
                    [{
                        "src": "assets/images/build/tileid_56.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id56"
                    }, "55"],
                    [{
                        "src": "assets/images/build/tileid_134.png",
                        "width": 24,
                        "height": 24,
                        "alt": "tile_id134"
                    }, "133"],
                ]

            }]
        });
    }
};

Blockly.JavaScript['changeskin'] = function (block) {
    // Сгенерировать код для смены костюма
    var tile_id = block.getFieldValue('TILES');
    return 'Pegman.nextAction("changeskin", ' + tile_id + ');\n';



};


Blockly.Blocks['changex'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "changex"),
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": '',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "dx",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['changex'] = function (block) {
    // Generate JavaScript for moving forward.
    var dx = block.getFieldValue('dx');
    var number_seconds = Math.abs(dx);
    return 'Pegman.nextAction("changex", ' + number_seconds + ', ' + dx + ', ' + 0 + ');\n';
};


Blockly.Blocks['changey'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "changey"),
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": '',
            "colour": 160,
            "args0": [{
                "type": "field_number",
                "name": "dy",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['changey'] = function (block) {
    // Generate JavaScript for moving forward.
    var dy = block.getFieldValue('dy');
    var number_seconds = Math.abs(dy);
    return 'Pegman.nextAction("changey", ' + number_seconds + ', ' + 0 + ', ' + dy + ');\n';
};




Blockly.Blocks['build'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "build"),
            "previousStatement": null,
            "nextStatement": null,
            "colour": 0,
            "tooltip": ''
        });
    }
};

Blockly.JavaScript['build'] = function (block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("build");\n';
};


Blockly.Blocks['setx'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "setx"),
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": '',
            "colour": 60,
            "args0": [{
                "type": "field_number",
                "name": "setx",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['setx'] = function (block) {
    // Generate JavaScript for moving forward.
    var setx = block.getFieldValue('setx');
    return 'Pegman.nextAction("setx", ' + 1 + ', ' + setx + ', ' + Pegman.dposY + ');\n';
};


Blockly.Blocks['sety'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "sety"),
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": '',
            "colour": 60,
            "args0": [{
                "type": "field_number",
                "name": "sety",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['sety'] = function (block) {
    // Generate JavaScript for moving forward.
    var sety = block.getFieldValue('sety');
    return 'Pegman.nextAction("sety", ' + 1 + ', ' + Pegman.dposX + ', ' + sety + ');\n';
};



Blockly.Blocks['setxy'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "setxy"),
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": '',
            "colour": 60,
            "args0": [{
                "type": "field_number",
                "name": "setx",
                "value": 1,
                "min": -20,
                "max": 20
            }, {
                "type": "field_number",
                "name": "sety",
                "value": 1,
                "min": -20,
                "max": 20
            }]
        });
    }
};

Blockly.JavaScript['setxy'] = function (block) {
    // Generate JavaScript for moving forward.
    var setx = block.getFieldValue('setx');
    var sety = block.getFieldValue('sety');
    return 'Pegman.nextAction("setxy", ' + 1 + ', ' + setx + ', ' + sety + ');\n';
};



Blockly.Blocks['repeat_n_times'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({

            "message0": get_l10n("blocks", "repeat"),
            "args0": [
                {
                    "type": "field_number",
                    "name": "times",
                    "value": 4
                }
            ],
            "message1": get_l10n("blocks", "times"),
            "args1": [
                { "type": "input_statement", "name": "DO" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120
        });
    }
};
var i = 0;
Blockly.JavaScript['repeat_n_times'] = function (block) {
    // Generate JavaScript for moving forward.
    var stc = Blockly.JavaScript.statementToCode(block, 'DO');
    var times = block.getFieldValue('times');
    i++;
    var vn = 'ip' + i;

    return 'for (var ' + vn + ' = 0; ' + vn + ' < ' + times + ';  ' + vn + '++){\n' + stc + '\n}\n';
};








Blockly.Blocks['uturn'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "uturn"),
            "previousStatement": null,
            "nextStatement": null,
            "colour": 100,
            "tooltip": ''
        });
    }
};

Blockly.JavaScript['uturn'] = function (block) {
    // Generate JavaScript for moving forward.
    return 'Pegman.nextAction("uturn");\n';
};



Blockly.Blocks['obstacle'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "obstacle"),
            "output": "Boolean",
            "colour": 215,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "DIRECTION",
                    "options": [[get_l10n("blocks", "onright"), "RIGHT"], [get_l10n("blocks", "onleft"), "LEFT"], [get_l10n("blocks", "above"), "ABOVE"], [get_l10n("blocks", "below"), "BELOW"]]
                }
            ]
        });
    }
};

Blockly.JavaScript['obstacle'] = function (block) {
    // Generate JavaScript for moving forward.
    var direct = block.getFieldValue('DIRECTION');
    if (direct == "LEFT") {
        return ['Pegman.isGladeToLeft'];
    } else if (direct == "RIGHT") {
        return ['Pegman.isGladeToRight'];
    } else if (direct == "ABOVE") {
        return ['Pegman.isGladeAbove'];
    } else if (direct == "BELOW") {
        return ['Pegman.isGladeBelow'];
    }

};


Blockly.Blocks['fill_the_pit'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "fill_the_pit"),
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": '',
            "colour": 0,
            "args0": [{
                "type": "field_dropdown",
                "name": "FILLDIRECTION",
                "options": [[get_l10n("blocks", "onright"), "RIGHT"], [get_l10n("blocks", "onleft"), "LEFT"], [get_l10n("blocks", "above"), "ABOVE"], [get_l10n("blocks", "below"), "BELOW"]]
            }]
        });
    }
};

Blockly.JavaScript['fill_the_pit'] = function (block) {
    // Сгенерировать код для смены костюма
    var direction = block.getFieldValue('FILLDIRECTION');
    var dirnum;
    if (direction == "LEFT") {
        dirnum = 0;
    } else if (direction == "RIGHT") {
        dirnum = 1;
    } else if (direction == "ABOVE") {
        dirnum = 2;
    } else if (direction == "BELOW") {
        dirnum = 3;
    }

    var code = `
    Pegman.isGladeAbove = Pegman.isGladeBelow = Pegman.isGladeToRight = Pegman.isGladeToLeft = false;
    

    Pegman.nextAction("fillpit", ` + dirnum + `);
    
    if (TopDownGame.game.state.getCurrentState().key == "lesson5") {
 

    try {
        var tileAbove = map.getTile(Pegman.vdposX, Pegman.vdposY - 1, map.getLayer());
        Pegman.isGladeAbove = tileAbove.index == 235;
    } catch (e) {}
    try {
        var tileBelow = map.getTile(Pegman.vdposX, Pegman.vdposY + 1, map.getLayer());
        Pegman.isGladeBelow = tileBelow.index == 235;
    } catch (e) {}
    try {
        var tileLeft = map.getTile(Pegman.vdposX - 1, Pegman.vdposY, map.getLayer());
        Pegman.isGladeToLeft = tileLeft.index == 235;
    } catch (e) {}

  }
    `
    return code;
};




Blockly.Blocks['if_block'] = {

    init: function () {
        this.jsonInit({
            "type": "if_block",
            "message0": get_l10n("blocks", "if_block"),
            "args0": [
                {
                    "type": "input_value",
                    "name": "condition",
                    "check": "Boolean"
                },
                {
                    "type": "input_statement",
                    "name": "true_statement"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 210,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};

Blockly.JavaScript['if_block'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var true_code = Blockly.JavaScript.statementToCode(block, 'true_statement');

    // TODO: Assemble JavaScript into code variable.
    var code = 'if (' + value_condition + ') {' + true_code + '};'
    return code;
};


Blockly.Blocks['pickup'] = {
    /**
     * Block for moving forward.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": get_l10n("blocks", "pickup"),
            "previousStatement": null,
            "nextStatement": null,
            "colour": 0,
            "tooltip": ''
        });
    }
};

Blockly.JavaScript['pickup'] = function (block) {
    var code = `

    var playerCopy = TopDownGame.game.add.sprite(player.x, player.y, player.key, player.frame);
    playerCopy.x = Pegman.vdposX * 64;
    playerCopy.y = Pegman.vdposY * 64;
   `
    return code;



};