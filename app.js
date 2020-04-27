var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalMonster;
var setting;
var empryCell = 0;
var food_remain;
var emptyCell = new Array();
var numOfBalls;
var monsters;
var life;
$(document).ready(function () {

	context = canvas.getContext("2d");
	life=5;
});

function Start() {
	
	setting = JSON.parse(sessionStorage.getItem("setting"));
	numOfBalls = setting.numOfBall;
	board = new Array();
	Cell = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	food_remain = setting.numOfBall;
	var pacman_remain = 1;
	var monster_remain = setting.monster;
	monsters = new Array();
	for (var i = 0; i < monster_remain; i++) {

		monsters[i] = new Object();
	}
	let isPacmanDrow = false;
	var index = 0;
	start_time = new Date();
	for (var i = 0; i < 10 && cnt > 0; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10 && cnt > 0; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;//wall!!!!
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain * 0.1) / cnt) {
					food_remain--;
					board[i][j] = 25;//25 point
				} else if (randomNum <= (1.0 * food_remain * 0.3) / cnt) {
					food_remain--;
					board[i][j] = 15;//15 point
				} else if (randomNum <= (1.0 * food_remain * 0.6) / cnt) {
					food_remain--;
					board[i][j] = 5;//5 point
				} else if ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) && pacman_remain > 0) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;// enter once time- pacmen place
				} else if ((randomNum < (1.0 * (monster_remain + food_remain)) / cnt) && monster_remain > 0) {
					monster_remain--;
					board[i][j] = 1;// enter once time- pacmen place
					monsters[monster_remain].i = i;
					monsters[monster_remain].j = j;
					console.log(monsters[monster_remain]);

				} else {
					board[i][j] = 0;//empty place;
					Cell.push(i);
					Cell.push(j);

					index++;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var randomNum = Math.random();
		if (randomNum <= (1.0 * food_remain * 0.1) / cnt) {
			food_remain--;
			board[emptyCell[0]][emptyCell[1]] = 25;//5 point
		} else if (randomNum <= (1.0 * food_remain * 0.3) / cnt) {
			food_remain--;
			board[emptyCell[0]][emptyCell[1]] = 15;//15 point
		} else if (randomNum <= (1.0 * food_remain * 0.6) / cnt) {
			food_remain--;
			board[emptyCell[0]][emptyCell[1]] = 5;//25 point
		}

	}

	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	intervalMonster=setInterval(updateMonsterPosition,500);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * Cell.length - 1);
	while (i < 0) {
		var i = Math.floor(Math.random() * Cell.length - 1);
	}
	var row = Cell[i];
	var col = Cell[i + 1];
	while (board[row][col] != 0) {
		var i = Math.floor(Math.random() * Cell.length - 1);
		while (i < 0) {
			var i = Math.floor(Math.random() * Cell.length - 1);
		}
		row = Cell[i];
		col = Cell[i + 1];
	}

	return [Cell[i], Cell[i + 1]];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {//pacman
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1 ||board[i][j] == 6||board[i][j] == 16||board[i][j] == 26 ) {//monster
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = "blue"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.fivePoint; //color
				context.fill();
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.fifteenPoint; //color
				context.fill();
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.twentyFivePoint; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if(!isMonsterCell(board[shape.i][shape.j])){
		if(--life==0){
			openDialog(document.getElementById("loserDialog"));
		}
		document.getElementById("lblLife").value=life;
	}
	if (board[shape.i][shape.j] == 5) {
		score += 5;
		numOfBalls--;
	}
	else if (board[shape.i][shape.j] == 15) {
		score += 15;
		numOfBalls--;
	}
	else if (board[shape.i][shape.j] == 25) {
		score += 25;
		numOfBalls--;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	var userTime = setting.duration;
	time_elapsed = Math.floor((currentTime - start_time) / 1000);
	var time = userTime - time_elapsed;
	time_elapsed = time;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}

	if (numOfBalls == 0) {
		Draw();
		openDialog(document.getElementById("winnerDialog"));
		window.clearInterval(interval);
	} else {
		Draw();
	}
}
function updateMonsterPosition() {
	for (var i = 0; i < setting.monster; i++) {
		let cellNumber = board[monsters[i].i][monsters[i].j];
		if (cellNumber == 6) {
			board[monsters[i].i][monsters[i].j] = 5;
		}
		else if (cellNumber == 16) {
			board[monsters[i].i][monsters[i].j] = 15;
		}
		else if (cellNumber == 26) {
			board[monsters[i].i][monsters[i].j] = 25;
		} else {
			board[monsters[i].i][monsters[i].j] = 0;
		}
		var x =Math.floor(Math.random() * 4)+1;
		if (x == 1) {
			if (monsters[i].i > 0 && board[monsters[i].i][monsters[i].j - 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j - 1])) {
				monsters[i].j--;
			}
		}
		if (x == 2) {
			if (monsters[i].j < 9 && board[monsters[i].i][monsters[i].j + 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j + 1])) {
				monsters[i].j++;
			}
		}
		if (x == 3) {
			if (monsters[i].i > 0 && board[monsters[i].i - 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i - 1][monsters[i].j])) {
				monsters[i].i--;
			}
		}
		if (x == 4) {
			if (monsters[i].i < 9 && board[monsters[i].i + 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i + 1][monsters[i].j])) {
				monsters[i].i++;
			}
		}
		cellNumber = board[monsters[i].i][monsters[i].j];


		if(cellNumber == 2){
			if(--life==0){
				openDialog(document.getElementById("loserDialog"));
			}
			document.getElementById("lblLife").value=life;
		}
		if (cellNumber == 5 || cellNumber==6) {
			board[monsters[i].i][monsters[i].j] = 6;
		}
		else if (cellNumber == 15|| cellNumber==16) {
			board[monsters[i].i][monsters[i].j] = 16;
		}
		else if (cellNumber == 25|| cellNumber==26) {
			board[monsters[i].i][monsters[i].j] = 26;
		} else {
			board[monsters[i].i][monsters[i].j] = 1;
		}


	}
	Draw();


}
function isMonsterCell(cell){
	return cell!=6 && cell!=16 && cell!=26 && cell!=1;
}
