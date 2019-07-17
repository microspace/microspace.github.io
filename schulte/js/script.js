let gameSettings = {
	size: 3,
	operation: "standard",
	order: "direct",
}


const gamePossibilities = [
	["standard", "rotated", "colored"],
	["standard", "rotated", "colored"],
	["standard", "rotated", "colored"],
	["standard", "rotated", "colored", "alphabet"],
	["standard", "rotated", "colored", "alphabet"],
	["standard", "rotated", "colored", "alphabet"],
	["standard", "rotated", "colored", "alphabet", "alphabet_numbers"],
	["standard", "rotated", "colored", "alphabet"],
	["standard", "rotated", "colored", "alphabet", "alphabet_numbers"],
	["standard", "rotated", "colored", "alphabet", "alphabet_numbers"],
]

function setSquareSize() {
	/* Подгоняем размер квадрата под размер окна с контентом. */
	let contentHeight = window.innerHeight - $(".navbar").outerHeight() - 15;
	let contentWidth = $(".container-fluid").innerWidth() - 30;
	let minDimension = Math.min(contentHeight, contentWidth);
	$(".stretchy-wrapper").css({
		"background": "goldenrod",
		"width": minDimension,
		"height": minDimension,

	})
}


function toggleMenu() {
	if (window.innerWidth < 600) {
		$(".btn-group-toggle").removeClass("btn-group");
		$(".btn-group-toggle").removeClass("btn-group-justified");
		$(".btn-group-toggle").addClass("btn-group-vertical");
	} else {
		$(".btn-group-toggle").addClass("btn-group");
		$(".btn-group-toggle").addClass("btn-group-justified");
		$(".btn-group-toggle").removeClass("btn-group-vertical");
	}
}


window.addEventListener('resize', function () {
	setSquareSize();
	toggleMenu();
});

