
var Maze = Maze || {};
/*
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Maze.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};


Maze.DirectionType = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};



Maze.SQUARE_SIZE = 64;





Maze.start_ = {};
Maze.finish_ = {};


Maze.start_ = {x: 2, y: 8};



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


