var context;
var shape = new Object();
shape.angle = "right";
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalMonster;
var soundInterval;
var setting;
var empryCell = 0;
var food_remain;
var emptyCell = new Array();
var numOfBalls;
var monsters;
var life;
var username;
var keyUp;
var keyDown;
var keyLeft;
var keyRight;
var monsterWithCandy;
var isExtraTime;
var sound;
$(document).ready(function () {
	context = canvas.getContext("2d");
	life = 5;
	sound = new sound("sound/music.mp3");
});

function Start() {

	sound.play();
	document.getElementById("lblUsername").innerText = username;
	setting = JSON.parse(sessionStorage.getItem("setting"));
	showSetting();
	numOfBalls = setting.numOfBall;
	keyDown = setting.down;
	keyUp = setting.up;
	keyRight = setting.right;
	keyLeft = setting.left;
	board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 4],
		[4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 4, 4, 1, 4, 1, 4, 1, 4, 4, 4, 4, 1, 4],
		[4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 4],
		[4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 4, 4, 4, 4, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4],
		[4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 4],
		[4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4, 1, 4, 4, 1, 4],
		[4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 4, 1, 4],
		[4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 4],
		[4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4],
		[4, 1, 1, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 4],
		[4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 4, 1, 4],
		[4, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 4],
		[4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 4],
		[4, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 4],
		[4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 4, 4, 1, 4],
		[4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 4, 1, 1, 4],
		[4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 4, 4, 4, 1, 4, 1, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 4],
		[4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 1, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4],
		[4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4],
		[4, 1, 4, 4, 4, 1, 4, 1, 1, 1, 4, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4],
		[4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4],
		[4, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	];
	Cell = new Array();
	score = 0;
	life = 5;
	pac_color = "yellow";
	var cnt = 768;
	food_remain = setting.numOfBall;
	var pacman_remain = 1;
	var monster_remain = parseInt(setting.monster) + 1;
	monsterWithCandy = parseInt(setting.monster) + 1;
	monsters = new Array();
	var isMoveRank = false;
	isExtraTime = false;

	var counter_pill = 0;
	var counter_clock = 0;

	for (var i = 0; i < monster_remain; i++) {
		monsters[i] = new Object();
		if (i == monster_remain - 1) {
			monsters[i].fiftee = true;
		} else {
			monsters[i].fiftee = false;

		}
	}
	let isPacmanDrow = false;
	var index = 0;
	start_time = new Date();
	for (var i = 0; i < 24 && cnt > 0; i++) {
		for (var j = 0; j < 32 && cnt > 0; j++) {
			if (board[i][j] == 4) {
				continue;
			}
			board[i][j] = 0;
			var randomNum = Math.random();
			var randomCandy = Math.floor(Math.random() * (monster_remain - 1));
			if (((i == 1 && j == 1) || (i == 1 && j == 30) || (i == 22 && j == 1) || (i == 22 && j == 30)) && monster_remain > 0) {
				if(monster_remain==5 &&!isMoveRank){
						let randomX = Math.floor(Math.random() * 23);
						let randomY = Math.floor(Math.random() * 31);
						while (board[randomX][randomY] != 1) {
							randomX = Math.floor(Math.random() * 23);
							randomY = Math.floor(Math.random() * 31);
						}
						monster_remain = monster_remain - 1;
						board[randomX][randomY] = 1;// enter once time- pacmen place
						monsters[monster_remain].i =randomX;
						monsters[monster_remain].j = randomY;
						isMoveRank = true;
						monsters[monster_remain].fiftee = true;

					}else if(!isMoveRank){
						monster_remain = monster_remain - 1;
						board[i][j] = 1;// enter once time- pacmen place
						monsters[monster_remain].i = 22;
						monsters[monster_remain].j = 30;
						monsters[monster_remain].fiftee = true;
						isMoveRank = true;
					}

						monster_remain = monster_remain - 1;
						board[i][j] = 1;// enter once time- pacmen place
						monsters[monster_remain].i = i;
						monsters[monster_remain].j = j;
						monsters[monster_remain].fiftee = false;


				}
			else if (randomNum <= (1.0 * food_remain * 0.1) / cnt) {
				food_remain--;
				board[i][j] = 25;//25 point
			} else if (randomNum <= (1.0 * food_remain * 0.3) / cnt) {
				food_remain--;
				board[i][j] = 15;//15 point
			} else if (randomNum <= (1.0 * food_remain * 0.6) / cnt) {
				food_remain--;
				board[i][j] = 5;//5 point
			} else if ((randomNum <= (1.0 * (pacman_remain + food_remain)) / cnt) && pacman_remain > 0) {
				shape.i = i;
				shape.j = j;
				pacman_remain--;
				board[i][j] = 2;// enter once time- pacmen place
			

			} else {

				board[i][j] = 0;//empty place;
				Cell.push(i);
				Cell.push(j);
			}
			index++;
		}
		cnt--;


	}


	while (food_remain > 0 || pacman_remain > 0 || !isMoveRank || counter_pill < 2 || counter_clock < 1) {
		var emptyCell = findRandomEmptyCell(board);
		var randomNum = Math.random();
		if (counter_pill < 2) {
			board[emptyCell[0]][emptyCell[1]] = 100;
			counter_pill = counter_pill + 1;
		}
		else if (counter_clock < 1) {
			board[emptyCell[0]][emptyCell[1]] = 200;
			counter_clock = counter_clock + 1;
		}
		else if (!isMoveRank && monster_remain[monster_remain - 1].fiftee) {
			monster_remain = monster_remain - 1;
			monsters[monster_remain].i = emptyCell[0];
			monsters[monster_remain].j = emptyCell[1];
			monsters[monster_remain].fiftee = true;
			isMoveRank = true;
			board[emptyCell[0]][emptyCell[1]] = 50;
		} else if ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) && pacman_remain > 0) {
			shape.i = emptyCell[0];
			shape.j = emptyCell[1];
			pacman_remain--;
			board[emptyCell[0]][emptyCell[1]] = 2;
		} else if (randomNum <= (1.0 * food_remain * 0.1) / cnt) {
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
	interval = setInterval(UpdatePosition, 100);
	intervalMonster = setInterval(updateMonsterPosition, 250);
}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * Cell.length - 2);
	while (i < 0 || i % 2 != 0) {
		i = Math.floor(Math.random() * Cell.length - 2);
	}

	var row = Cell[i];
	var col = Cell[i + 1];

	while (board[row][col] != 0) {
		var i = Math.floor(Math.random() * Cell.length - 2);
		while (i < 0 || i % 2 != 0) {
			var i = Math.floor(Math.random() * Cell.length - 2);
		}
		row = Cell[i];
		col = Cell[i + 1];
	}

	return [Cell[i], Cell[i + 1]];
}

function GetKeyPressed() {

	if (keysDown[keyUp]) {//up
		return 1;
	}
	if (keysDown[keyDown]) {//down
		return 2;
	}
	if (keysDown[keyLeft]) {//left
		return 3;
	}
	if (keysDown[keyRight]) {//right
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.innerText = score;
	lblTime.innerText = time_elapsed;
	lblLife.innerText = life;
	var centerX = canvas.width / 24;
	var centerY = canvas.height / 32;
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var center = new Object();
			center.x = i * (centerX);
			center.y = j * (centerY);
			var cX = center.x + (centerX / 2);
			var cY = center.y + (centerY / 2);
			// center.x = i*42-1 ;
			// center.y = j*21.8+0.5;

			var x = GetKeyPressed();

			if (board[i][j] == 2) {//pacman
				if (x == 1) {//up
					shape.angle = "up";
				} else if (x == 2) {//down
					shape.angle = "down";
				} else if (x == 3) {//left
					shape.angle = "left";
				} else if (x == 4) {//right
					shape.angle = "right";
				}
				switch (shape.angle) {
					case "right":
						context.beginPath();
						context.arc(cX, cY, 10, 0.15 * Math.PI, 1.95 * Math.PI); // half circle
						context.lineTo(cX, cY);
						context.fillStyle = pac_color; //color
						context.fill();
						context.beginPath();
						context.arc(cX + 1, cY - 6, 1.5, 0, 2 * Math.PI); // circle
						context.fillStyle = "black"; //color
						context.fill();
						break;
					case "left":
						context.beginPath();
						context.arc(cX, cY, 10, 1.15 * Math.PI, 0.95 * Math.PI); // half circle
						context.lineTo(cX, cY);
						context.fillStyle = pac_color; //color
						context.fill();
						context.beginPath();
						context.arc(cX - 1, cY - 6, 1.5, 0, 2 * Math.PI); // circle
						context.fillStyle = "black"; //color
						context.fill();
						context.shadowBlur = 9;
						context.shadowColor = "yellow";
						break;
					case "down":
						context.beginPath();
						context.arc(cX, cY, 10, 0.65 * Math.PI, 0.45 * Math.PI); // half circle
						context.lineTo(cX, cY);
						context.fillStyle = pac_color; //color
						context.fill();
						context.beginPath();
						context.arc(cX + 5, cY + 4, 1.5, 0, 2 * Math.PI); // circle
						context.fillStyle = "black"; //color
						context.fill();
						break;
					case "up":
						context.beginPath();
						context.arc(cX, cY, 10, 1.65 * Math.PI, 1.45 * Math.PI); // half circle
						context.lineTo(cX, cY);
						context.fillStyle = pac_color; //color
						context.fill();
						context.beginPath();
						context.arc(cX + 6, cY - 2, 1.5, 0, 2 * Math.PI); // circle
						context.fillStyle = "black"; //color
						context.fill();
						break;

				}


			} else if (board[i][j] == 1 || board[i][j] == 6 || board[i][j] == 16 || board[i][j] == 26 || board[i][j] == 51 || board[i][j] == 101 || board[i][j] == 201) {//monster



				context.beginPath();
				base_image = new Image();
				var index = 0;
				candy = false;
				for (var k = 0; k < monsterWithCandy; k++) {

					if (monsters[k].fiftee) {
						candy = true;

						continue;
					} else {
						index = k;

					}
					if (monsters[index].i == i && monsters[index].j == j) {
						if (candy) {
							index = index - 1;
							base_image.src = "pictures/m" + (index) + ".png";
						} else {
							base_image.src = "pictures/m" + (index) + ".png";

						}
					}
				}
				context.drawImage(base_image, center.x, center.y, centerX - 5, centerY - 5);


			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(cX, cY, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.fivePoint; //color
				context.fill();
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(cX, cY, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.fifteenPoint; //color
				context.fill();
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(cX, cY, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.twentyFivePoint; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x, center.y, centerX * 0.9, centerY * 0.9);
				// context.rect(center.x, center.y , 42, 23);
				context.fillStyle = "grey"; //color
				context.shadowBlur = 9;
				context.shadowColor = "grey";
				// context.shadowOffsetX = 0;
				// context.shadowOffsetY = 0;
				// context.stroke();
				context.fill();
			} else if (board[i][j] == 50 || board[i][j] == 55 || board[i][j] == 65 || board[i][j] == 75) {
				context.beginPath();
				context.arc(cX, cY, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			} else if (board[i][j] == 100 || board[i][j] == 101) {
				context.beginPath();
				base_image = new Image();
				base_image.src = "pictures/life.png";
				context.drawImage(base_image, center.x, center.y, centerX - 5, centerY - 5);

			} else if (board[i][j] == 200 || board[i][j] == 201) {
				context.beginPath();
				base_image = new Image();
				base_image.src = "pictures/time.png";
				context.drawImage(base_image, center.x, center.y, centerX, centerY);
			}
		}
	}
}

function UpdatePosition() {
	var isPositionChange = false;
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			isPositionChange = true;
		}
	}
	if (x == 2) {
		if (shape.j < board[0].length && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			isPositionChange = true;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			isPositionChange = true;
		}
	}
	if (x == 4) {
		if (shape.i < board.length && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			isPositionChange = true;
		}
	}
	if (!isMonsterCell(board[shape.i][shape.j]) && isPositionChange) {
		if (--life == 0) {
			sound.stop();
			openDialog(document.getElementById("loserDialog"));
			window.clearInterval(interval);
			window.clearInterval(intervalMonster);

		}
		updateBoard();
		document.getElementById("lblLife").innerText = life;
		score = score - 10;
		document.getElementById("lblScore").innerText = score;
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
	} else if (board[shape.i][shape.j] == 50) {
		score += 50;

		for (var i = 0; i < monsterWithCandy; i++) {
			if (monsters[i].fiftee) {
				const index = monsters.indexOf(monsters[i]);
				monsters.splice(index, 1);
				window.clearInterval(intervalMonster);
				monsterWithCandy--;
				intervalMonster = setInterval(updateMonsterPosition, 250);
				break;
			}
		}
	} else if (board[shape.i][shape.j] == 100) {//medicine - life
		life = life + 1;
		document.getElementById("lblLife").innerText = life;

	}
	if (board[shape.i][shape.j] == 200) {// extra time
		isExtraTime = true;
	}

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	var userTime;
	if (!isExtraTime) {
		userTime = setting.duration;

	} else {
		userTime = Math.floor(parseInt(setting.duration) + 0.5 * parseInt(setting.duration));

	}

	time_elapsed = Math.floor((currentTime - start_time) / 1000);
	var time = userTime - time_elapsed;
	time_elapsed = time;


	if (numOfBalls == 0 && time_elapsed >= 0) {
		Draw();
		sound.stop();
		openDialog(document.getElementById("winnerDialog"));
		window.clearInterval(interval);
		window.clearInterval(intervalMonster);
	}
	else if (time_elapsed <= 0) {
		Draw();
		if (score < 100) {
			openDialog(document.getElementById("loser100Dialog"));
		} else {
			openDialog(document.getElementById("winnerDialog"));
		}
		sound.stop();
		window.clearInterval(interval);
		window.clearInterval(intervalMonster);
	}
	else {
		Draw();
	}
}

function updateMonsterPosition() {
	var x;
	for (var i = 0; i < monsterWithCandy; i++) {
		let cellNumber = board[monsters[i].i][monsters[i].j];
		if (cellNumber == 6 || cellNumber == 55) {
			board[monsters[i].i][monsters[i].j] = 5;
		}
		else if (cellNumber == 16 || cellNumber == 65) {
			board[monsters[i].i][monsters[i].j] = 15;
		}
		else if (cellNumber == 26 || cellNumber == 75) {
			board[monsters[i].i][monsters[i].j] = 25;
		}
		else if (cellNumber == 51) {
			board[monsters[i].i][monsters[i].j] = 50;
		}
		else if (cellNumber == 101) {
			board[monsters[i].i][monsters[i].j] = 100;
		}
		else if (cellNumber == 201) {
			board[monsters[i].i][monsters[i].j] = 200;
		} else {
			board[monsters[i].i][monsters[i].j] = 0;
		}
		if (monsters[i].lastMove != null && keepGoing(monsters[i].lastMove, monsters, i)) {
			x = monsters[i].lastMove;
		} else {
			x = Math.floor(Math.random() * 4) + 1;
		}
		if (x == 1 && !(monsters[i].fiftee && board[monsters[i].i][monsters[i].j - 1] == 2)) {
			if (monsters[i].i > 0 && board[monsters[i].i][monsters[i].j - 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j - 1])) {
				monsters[i].j--;

			}
		}
		if (x == 2 && !(monsters[i].fiftee && board[monsters[i].i][monsters[i].j + 1] == 2)) {
			if (monsters[i].j < board[0].length && board[monsters[i].i][monsters[i].j + 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j + 1])) {
				monsters[i].j++;

			}
		}
		if (x == 3 && !(monsters[i].fiftee && board[monsters[i].i - 1][monsters[i].j] == 2)) {
			if (monsters[i].i > 0 && board[monsters[i].i - 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i - 1][monsters[i].j])) {
				monsters[i].i--;

			}
		}
		if (x == 4 && !(monsters[i].fiftee && board[monsters[i].i + 1][monsters[i].j] == 2)) {
			if (monsters[i].i < board.length && board[monsters[i].i + 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i + 1][monsters[i].j])) {
				monsters[i].i++;
			}
		}
		monsters[i].lastMove = x;
		cellNumber = board[monsters[i].i][monsters[i].j];


		if (cellNumber == 2 && !monsters[i].fiftee) {
			if (--life == 0) {
				openDialog(document.getElementById("loserDialog"));
				sound.stop();
				window.clearInterval(interval);
				window.clearInterval(intervalMonster);
			}
			updateBoard();
			document.getElementById("lblLife").innerText = life;
			score = score - 10;
			document.getElementById("lblScore").innerText = score;


		}
		if (cellNumber == 2 && monsters[i].fiftee) {
			score += 50;
			window.clearInterval(interval);
			window.clearInterval(intervalMonster);
			lblScore.innerText = score;

		}
		if (monsters[i].fiftee) {//candy
			if (cellNumber == 5 || cellNumber == 55) {
				board[monsters[i].i][monsters[i].j] = 55;
			}
			else if (cellNumber == 15 || cellNumber == 65) {
				board[monsters[i].i][monsters[i].j] = 65;
			}
			else if (cellNumber == 25 || cellNumber == 75) {
				board[monsters[i].i][monsters[i].j] = 75;
			}
			else if (cellNumber == 100 || cellNumber == 101) {
				board[monsters[i].i][monsters[i].j] = 101;
			}
			else if (cellNumber == 200 || cellNumber == 201) {
				board[monsters[i].i][monsters[i].j] = 201;
			}
			else {
				board[monsters[i].i][monsters[i].j] = 50;
			}
		} else {
			if (cellNumber == 5 || cellNumber == 6) {
				board[monsters[i].i][monsters[i].j] = 6;
			}
			else if (cellNumber == 15 || cellNumber == 16) {
				board[monsters[i].i][monsters[i].j] = 16;
			}
			else if (cellNumber == 25 || cellNumber == 26) {
				board[monsters[i].i][monsters[i].j] = 26;
			}
			else if (cellNumber == 50 || cellNumber == 51) {
				board[monsters[i].i][monsters[i].j] = 51;
			}
			else if (cellNumber == 100 || cellNumber == 101) {
				board[monsters[i].i][monsters[i].j] = 101;
			}
			else if (cellNumber == 200 || cellNumber == 201) {
				board[monsters[i].i][monsters[i].j] = 201;
			} else {
				board[monsters[i].i][monsters[i].j] = 1;
			}
		}

	}
	Draw();
}

function keepGoing(x, monsters, i) {
	switch (x) {
		case 1:
			if (monsters[i].i > 0 && board[monsters[i].i][monsters[i].j - 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j - 1])) {
				if (!(monsters[i].fiftee && board[monsters[i].i][monsters[i].j - 1] == 2)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		case 2:
			if (monsters[i].j < board[0].length && board[monsters[i].i][monsters[i].j + 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j + 1])) {
				if (!(monsters[i].fiftee && board[monsters[i].i][monsters[i].j + 1] == 2)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		case 3:
			if (monsters[i].i > 0 && board[monsters[i].i - 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i - 1][monsters[i].j])) {
				if (!(monsters[i].fiftee && board[monsters[i].i - 1][monsters[i].j] == 2)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		case 4:
			if (monsters[i].i < board.length && board[monsters[i].i + 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i + 1][monsters[i].j])) {
				if (!(monsters[i].fiftee && board[monsters[i].i + 1][monsters[i].j] == 2)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
	}

}

function isMonsterCell(cell) {
	return cell != 6 && cell != 16 && cell != 26 && cell != 1 && cell != 51;
}

function restartGame() {
	sound.stop();
	window.clearInterval(interval);
	window.clearInterval(intervalMonster);
	document.getElementById("lblLife").innerText = 5;
	shape.angle = "right";
	Start();
}

function setUserName(userName) {
	username = userName;
}

function showSetting() {
	document.getElementById("buttonUpDiv").innerText = upKeyString;
	document.getElementById("buttonDownDiv").innerText = downKeyString;
	document.getElementById("buttonRightDiv").innerText = rightKeyString;
	document.getElementById("buttonLeftDiv").innerText = leftKeyString;
	document.getElementById("numberOfBallsDiv").innerText = setting.numOfBall;
	document.getElementById("numberOfMonsterDiv").innerText = setting.monster;

	$("#color5pointDiv").css("background-color", setting.fivePoint);
	$("#color15pointDiv").css("background-color", setting.fifteenPoint);
	$("#color25pointDiv").css("background-color", setting.twentyFivePoint);
}

function updateBoard() {
	monster_remain = parseInt(setting.monster);
	pacman_remain = 1;
	food_remain = parseInt(setting.numOfBall);
	let indexMonster = 0;
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {

			if (board[i][j] == 1 || board[i][j] == 2) {
				board[i][j] = 0;
			}
			if (((i == 1 && j == 1) || (i == 1 && j == 30) || (i == 22 && j == 1) || (i == 22 && j == 30)) && monster_remain > 0) {
				if (monsters[indexMonster].fiftee) {
					indexMonster++;
				}
				monsters[indexMonster].i = i;
				monsters[indexMonster].j = j;
				board[i][j] = 1;
				indexMonster++;
				monster_remain--;
			}
			else if (board[i][j] == 6) {
				board[i][j] = 5;

			} else if (board[i][j] == 16) {
				board[i][j] = 15;

			} else if (board[i][j] == 26) {
				board[i][j] = 15;

			} else if (board[i][j] == 51) {//for candy
				board[i][j] = 50;
			} else if (board[i][j] == 101) {//for candy
				board[i][j] = 100;
			} else if (board[i][j] == 201) {//for candy
				board[i][j] = 200;
			}

		}
	}
	while (pacman_remain > 0) {
		let randomX = Math.floor(Math.random() * 23);
		let randomY = Math.floor(Math.random() * 31);
		if (board[randomX][randomY] == 0) {
			board[randomX][randomY] = 2;
			shape.i = randomX;
			shape.j = randomY;
			pacman_remain--;
			shape.angle = "right";
		}
	}


}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.setAttribute("loop", true);
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){

	  this.sound.play();
	  this.sound.volume=0.03;



	}
	this.stop = function(){
	  this.sound.pause();
	}
  }
