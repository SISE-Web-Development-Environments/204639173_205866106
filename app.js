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
var username;
var keyUp;
var keyDown;
var keyLeft;
var keyRight;
var monsterWithCandy;
$(document).ready(function () {
	context = canvas.getContext("2d");
	life=5;
});

function Start() {
	
	document.getElementById("lblUsername").value=username;
	setting = JSON.parse(sessionStorage.getItem("setting"));
	showSetting();
	numOfBalls = setting.numOfBall;
	keyDown=setting.down;
	keyUp=setting.up;
	keyRight=setting.right;
	keyLeft=setting.left;
	board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 4],
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
	var monster_remain = parseInt(setting.monster)+1;
	 monsterWithCandy=parseInt(setting.monster)+1;
	monsters = new Array();
	var isMoveRank=false;
	for (var i = 0; i < monster_remain; i++) {
		monsters[i] = new Object();
	}
	let isPacmanDrow = false;
	var index = 0;
	start_time = new Date();
	// createWall();
	for (var i = 0; i < 24 && cnt > 0; i++) {
		// board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 32 && cnt > 0; j++) {
			if (board[i][j] == 4) {
			} 
			else {
				board[i][j]=0;
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

					if(!isMoveRank){
						monster_remain--;
						monsters[monster_remain].i = i;
						monsters[monster_remain].j = j;
						monsters[monster_remain].fiftee= true;
						isMoveRank=true;
						board[i][j] = 50;
					}else{
					monster_remain--;
					board[i][j] = 1;// enter once time- pacmen place
					monsters[monster_remain].i = i;
					monsters[monster_remain].j = j;
					monsters[monster_remain].fiftee= false;
					}

				} else {

					board[i][j] = 0;//empty place;
					Cell.push(i);
					Cell.push(j);
					}


					index++;
				}
				cnt--;

			
		}
	}

	while (food_remain > 0 || pacman_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var randomNum = Math.random();
		
		
		if  ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) && pacman_remain > 0) {
			shape.i = i;
			shape.j = j;
			pacman_remain--;
		}else if (randomNum <= (1.0 * food_remain * 0.1) / cnt) {
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
	interval = setInterval(UpdatePosition, 200);
	intervalMonster = setInterval(updateMonsterPosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * Cell.length - 2);
	while (i < 0 || i%2!=0) {
		i = Math.floor(Math.random() * Cell.length - 2);
	}

	var row = Cell[i];
	var col = Cell[i + 1];
	
	while (board[row][col] != 0) {
		var i = Math.floor(Math.random() * Cell.length - 2);
		while (i < 0 || i%2!=0) {
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
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var center = new Object();
			center.x = i * 20 +100;
			center.y = j * 20 +7;
			var x = GetKeyPressed();

			if (board[i][j] == 2) {//pacman
			// 	if(x==1){//up

			// 	}else if(x==2){//down

			// 	}else if(x==3){//left

			// 	}else if(x==4){//right

			// 	}
				context.beginPath();
				context.arc(center.x+10, center.y, 10, 0.15 * Math.PI, 1.95 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 13, center.y - 8, 1.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1 || board[i][j] == 6 || board[i][j] == 16 || board[i][j] == 26 || board[i][j] == 51 ) {//monster
				context.beginPath();
				context.arc(center.x+10, center.y, 10, 0.15 * Math.PI, 1.95 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = "blue"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 13, center.y - 8, 1.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.fivePoint; //color
				context.fill();
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.fifteenPoint; //color
				context.fill();
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.twentyFivePoint; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x, center.y , 20, 20);
				context.fillStyle = "grey"; //color
				context.fill();
			}else if(board[i][j] == 50 || board[i][j]==55 || board[i][j]==65 || board[i][j]==75 ){
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
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
		if (shape.j < board[0].length && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < board.length && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (!isMonsterCell(board[shape.i][shape.j])) {
		if (--life == 0) {
			openDialog(document.getElementById("loserDialog"));
			window.clearInterval(interval);
			window.clearInterval(intervalMonster);

		}
		document.getElementById("lblLife").value = life;
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
	}else if(board[shape.i][shape.j] == 50){
		score += 50;
		console.log(monsterWithCandy);

		for(var i=0;i<monsterWithCandy;i++){

			console.log(monsters[i].fiftee);
			if(monsters[i].fiftee){
				const index = monsters.indexOf(monsters[i]);
				monsters.splice(index, 1);
				window.clearInterval(intervalMonster);
				monsterWithCandy--;
				intervalMonster = setInterval(updateMonsterPosition, 250);
				break;
			}
		}
	}
	console.log(board[shape.i][shape.j] + " " +shape.i+" "+shape.j);
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	var userTime = setting.duration;
	time_elapsed = Math.floor((currentTime - start_time) / 1000);
	var time = userTime - time_elapsed;
	time_elapsed = time;


	if (numOfBalls == 0 && time_elapsed >= 0) {
		Draw();
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
		if (cellNumber == 6 ||cellNumber==55 ) {
			board[monsters[i].i][monsters[i].j] = 5;
		}
		else if (cellNumber == 16||cellNumber==65) {
			board[monsters[i].i][monsters[i].j] = 15;
		}
		else if (cellNumber == 26||cellNumber==75) {
			board[monsters[i].i][monsters[i].j] = 25;
		}
		else if (cellNumber == 51) {
			board[monsters[i].i][monsters[i].j] = 50;
		}  else {
			board[monsters[i].i][monsters[i].j] = 0;
		}
		if(monsters[i].lastMove!=null && keepGoing(monsters[i].lastMove,monsters,i)){
			x=monsters[i].lastMove;
		}else{
			 x = Math.floor(Math.random() * 4) + 1;
		}
		if (x == 1) {
			if (monsters[i].i > 0 && board[monsters[i].i][monsters[i].j - 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j - 1])) {
				monsters[i].j--;

			}
		}
		if (x == 2) {
			if (monsters[i].j < board[0].length && board[monsters[i].i][monsters[i].j + 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j + 1])) {
				monsters[i].j++;

			}
		}
		if (x == 3) {
			if (monsters[i].i > 0 && board[monsters[i].i - 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i - 1][monsters[i].j])) {
				monsters[i].i--;

			}
		}
		if (x == 4) {
			if (monsters[i].i < board.length && board[monsters[i].i + 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i + 1][monsters[i].j])) {
				monsters[i].i++;
			}
		}
		monsters[i].lastMove=x;
		cellNumber = board[monsters[i].i][monsters[i].j];


		if (cellNumber == 2 &&!monsters[i].fiftee) {
			if (--life == 0) {
				openDialog(document.getElementById("loserDialog"));
				window.clearInterval(interval);
				window.clearInterval(intervalMonster);
			}
			document.getElementById("lblLife").value = life;
		}
		 if(cellNumber == 2 && monsters[i].fiftee){
			score+=50;
			window.clearInterval(interval);
			window.clearInterval(intervalMonster);
			lblScore.value =score;;

		}
		if(monsters[i].fiftee){//candy
			if (cellNumber == 5 || cellNumber == 55) {
				board[monsters[i].i][monsters[i].j] = 55;
			}
			else if (cellNumber == 15 || cellNumber == 65) {
				board[monsters[i].i][monsters[i].j] = 65;
			}
			else if (cellNumber == 25 || cellNumber == 75) {
				board[monsters[i].i][monsters[i].j] = 75;
			}
			else{
				board[monsters[i].i][monsters[i].j] = 50;
			}
		}else{
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
			}else{
				board[monsters[i].i][monsters[i].j] = 1;
			}
		}

	}
	Draw();


}

function keepGoing(x,monsters,i){
	switch(x){
		case 1:
				if (monsters[i].i > 0 && board[monsters[i].i][monsters[i].j - 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j - 1])) {
					return true;
				}else{
					return false;
				}
		case 2:
				if (monsters[i].j < board[0].length && board[monsters[i].i][monsters[i].j + 1] != 4 && isMonsterCell(board[monsters[i].i][monsters[i].j + 1])) {
					return true;
				}else{
					return false;
				}
		case 3:
			if (monsters[i].i > 0 && board[monsters[i].i - 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i - 1][monsters[i].j])) {
				return true;
			}else{
				return false;
			}
		case 4:
				if (monsters[i].i < board.length && board[monsters[i].i + 1][monsters[i].j] != 4 && isMonsterCell(board[monsters[i].i + 1][monsters[i].j])) {
					return true;
				}else{
					return false;
				}
}

}
function isMonsterCell(cell) {
	return cell != 6 && cell != 16 && cell != 26 && cell != 1 && cell!=51;
}
function createWall() {

	// for(var j=0;j<15;j++){
	// 	board[j]= new Array();
	// 	board[j][0]=4;
	// 	board[j][14]=4;
	// }

	// for(var j=0;j<15;j++){
	// 	board[0][j]=4;
	// 	board[14][j]=4;
	// }

	for (var i = 0; i < 74;) {

		var x = Math.floor(Math.random() * 14);
		var y = Math.floor(Math.random() * 14);
		var wallSize = Math.floor(Math.random() * 2) + 1;
		board[x] = new Array();
		if (wallSize == 1) {
			board[x][y] = 4;
			i++;
		}
		else if (wallSize == 2) {
			board[x][y] = 4;
			if (y - 1 < 0) {
				board[x][++y] = 4;

			} else {
				board[x][--y] = 4;
			}
			i = i + 2;
		}
	}
}

function restartGame() {
	window.clearInterval(interval);
	window.clearInterval(intervalMonster);
	document.getElementById("lblLife").value = 5;
	Start();
}

function setUserName(userName){
	username=userName;
}

function showSetting(){
	var currentDiv = document.getElementById("settingToShow").childNodes; 
	
	currentDiv[1].innerText="Button up: "+ setting.up; 
	currentDiv[3].innerText="Button Down: "+ setting.down; 
	currentDiv[5].innerText="Button Right: "+ setting.right; 
	currentDiv[7].innerText="Button Left: "+ setting.left;
	currentDiv[9].innerText="Food: "+ setting.numOfBall;
	currentDiv[11].innerText="Monsters: "+ setting.monster;
	$("#color5pointDiv").css("background-color",setting.fivePoint);
	$("#color15pointDiv").css("background-color",setting.fifteenPoint);
	$("#color25pointDiv").css("background-color",setting.twentyFivePoint);


}
