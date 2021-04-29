
var player = [];
var villains = [];
var pwrOptions = [];
var villainDb = [];
var missionArray = [];
var statAdd, statRemv, statPts, allocated, beginBtn, thisMission, missionStartBtn, autoSpendBtn, currentMission, currentVillain;
var playerInputBox = document.getElementById('player-name');
var pageUrl = ["../data/power-selection.html",
			   "../data/stat-allocation.html",
			   "../data/char-sheet-1.html",
			   "../data/char-sheet-2.html",
			   null,
			   null,
			   "../data/mission-choice.html"];
var indexPage = document.getElementById('main-content')
var charsheet = document.getElementsByClassName('charsheet');


function characterSheet() {
	console.log(currentMission)
}
//////////////////////////////////////
/////////////////////////////////////////
//////////////////// PLAYER NAME INPUT//////////////
/////////////////////////////////////////
//////////////////////////////////////

var addPlayer = function (y) {
		var x = player.length;
	if (x < 4) {
		if (y != 1){ 
		var playerInput = playerInputBox.value;
		player[x] = {};
		player[x].name = playerInput;
		player[x].number = "player " + (x + 1);
		player[x].power = {};
		player[x].stats = {
			might: 1, speed: 1, energy: 1, health: 1  
		}
	};
		var html = " "
			for (i=0; i<player.length; i++) {
				var j = (i + 1)
				html += "<h2 class='p" + j +"'>Player " + j + ": </h2>"
				html += "<div class='col-sm-3'>" + player[i].name + "</div>";
			}
			if (player.length > 0) {
				html += "<div class='form-control'><label for='playerremoval'>Remove Player: <input type='text' class='form-control' id='playerremoval'>";
				html += "<button class='btn btn-primary' onclick='removePlayer()' type='button' id='rmvBtn'>Remove Player (#)</button></div>"
			};
				html += "<button type='button' id='powerStartBtn' class='btn btn-primary'>Begin Game</button>";
		$("#player-name-list").html(html);
		document.getElementById('player-name').value = ""
			} else {
			alert('Cannot Have More Than Four Players!')
		};}
document.getElementById('nameBtn').addEventListener("click", addPlayer)
$(playerInputBox).keypress(function (e) {
	if (e.which == 13) {
		addPlayer();
	}
})

function removePlayer() {
	var rP = document.getElementById('playerremoval').value;
		if (rP > 0 && rP <= player.length) {
			removedPlayer = (rP - 1);
			player.splice(removedPlayer, 1);
		} else {
			alert('Not a valid entry');
		}
		addPlayer(1);
}
////////////////////////////////////////////////////////////////////
////////////////////////////////////////START GAME/////////////////////////////////
////////////////////////////////////////////////////////////////////
///////////////////////////////POWER SELECTION PAGE////////////////////////////
///////////////////////////////////////////////////////////////////

function powerSelection() {
	$.get(pageUrl[0], function (data){
		$(indexPage).html(data);
		var x = getRandomInteger(0, powers.length);
		var y = getRandomInteger(0, powers.length);
		var z = getRandomInteger(0, powers.length);
		pwrOptions.splice(0, 0, powers[x], powers[y], powers[z]);
		$("#pname").text(player[0].name);
			for (i=0; i<pwrOptions.length; i++){
			var target = "#choice" + i;
			var html = "<h2 class='text-center pwr-selector' id='pwr" + i + "''>" + pwrOptions[i].name + "</h2>";
				html += "<h2>Description:</h2><p> " + pwrOptions[i].description + "</p><h2>Starting Ability: " + pwrOptions[i].abilities[0].name + "</h2>";
				html +=   "<p>" + pwrOptions[i].abilities[0].info + "</p>";
				$(target).html(html);}
	})
}



document.addEventListener("click", function(e) {
	
	////////////////////////// POWER SELECTION////////////////////////////
	var powerTable = document.getElementsByClassName('pwr-selector');
	
	var target = e.target;
	var startPwrSelection = document.getElementById('powerStartBtn');
	if (startPwrSelection) {
		if (target == startPwrSelection) {
			powerSelection();
		}
	}
	if (target == powerTable[0] || target == powerTable[1] || target == powerTable[2]) {
		if (target == powerTable[0]) {
			player[0].power = pwrOptions[0];

		} else if (target == powerTable[1]) { 
			player[0].power = pwrOptions[1];

		} else if (target == powerTable[2]) {
			player[0].power = pwrOptions[2];

	};
	$.get(pageUrl[1], function(data) {
	$(indexPage).html(data);
		document.getElementById('statPts').firstChild.nodeValue = 9;
		statPtValue = 9;
		statAdd = document.getElementsByClassName('stat-add');
		statRemv = document.getElementsByClassName('stat-remove');
		statPts = document.getElementById('statPts').firstChild.nodeValue;
		allocated = document.getElementsByClassName('stat-allocation');
		beginBtn = document.getElementById('compile-char');
		autoSpendBtn = document.getElementById('autospend')

	});}

////////STAT ALLOCATION/////////////////////////////////////////////
if (statAdd) {
	if (target == statAdd[0] || target == statAdd[1] || target == statAdd[2] || target == statAdd[3]) {
		if (statPtValue > 0) {
			if (target == statAdd[0]) {
				player[0].stats.might += 1;
				allocated[0].firstChild.nodeValue = player[0].stats.might;
				statPtValue -= 1;
			}
			if (target == statAdd[1]) {
				player[0].stats.speed += 1;
				allocated[1].firstChild.nodeValue = player[0].stats.speed;
				statPtValue -= 1;
			}
			if (target == statAdd[2]) {
				player[0].stats.energy += 1;
				allocated[2].firstChild.nodeValue = player[0].stats.energy;
				statPtValue -= 1;
			}
			if (target == statAdd[3]) {
				player[0].stats.health += 1;
				allocated[3].firstChild.nodeValue = player[0].stats.health;
				statPtValue -= 1;
			}
		}
		document.getElementById('statPts').firstChild.nodeValue = statPtValue;
	}}
if (statRemv) {
	if (target == statRemv[0] || target == statRemv[1] || target == statRemv[2] || target == statRemv[3]) {
		if (statPtValue < 9) {
			if (target == statRemv[0]) {
				if (player[0].stats.might > 1) {
					player[0].stats.might -= 1;
					allocated[0].firstChild.nodeValue = player[0].stats.might;
					statPtValue += 1;
				} else {
					alert('You cannot have less than 1 might')
				}};
			if (target == statRemv[1]) {
				if (player[0].stats.speed > 1) {
					player[0].stats.speed -= 1;
					allocated[1].firstChild.nodeValue = player[0].stats.speed;
					statPtValue += 1;
				} else {
					alert('You cannot have less than 1 speed')
				}};
			if (target == statRemv[2]) {
				if (player[0].stats.energy > 1) {
					player[0].stats.energy -= 1;
					allocated[2].firstChild.nodeValue = player[0].stats.energy;
					statPtValue += 1;
				} else {
					alert('You cannot have less than 1 energy')
				}};
			if (target == statRemv[3]) {
				if (player[0].stats.health > 1) {
					player[0].stats.health -= 1;
					allocated[3].firstChild.nodeValue = player[0].stats.health;
					statPtValue += 1;
				} else {
					alert('You cannot have less than 1 health')
			};
			} 
		} else {
			alert('No stat points have been spent!')
		}
		document.getElementById('statPts').firstChild.nodeValue = statPtValue;
	}
}
	if (autoSpendBtn) {
		if (target == autoSpendBtn) {
			player[0].stats.might = 1;
			player[0].stats.speed = 1;
			player[0].stats.energy = 1;
			player[0].stats.health = 1;
			autoSpendAttr(0);
			allocated[0].firstChild.nodeValue = player[0].stats.might;
			allocated[1].firstChild.nodeValue = player[0].stats.speed;
			allocated[2].firstChild.nodeValue = player[0].stats.energy;
			allocated[3].firstChild.nodeValue = player[0].stats.health;
			statPtValue = 0;
			document.getElementById('statPts').firstChild.nodeValue = statPtValue;

		}
	}
////////FIRST MISSION SELECT//////////////
//////////////////////////////////////////
		if (beginBtn) {
			if (target == beginBtn) {
				if (statPtValue == 0) {
					randomMission();
					$.get(pageUrl[2], function(data) {
						$(charsheet[0]).html(data);
						
					var might = document.getElementById("p1might");
					var speed = document.getElementById("p1speed");
					var energy = document.getElementById("p1energy");
					var health = document.getElementById("p1health");
					var power = document.getElementById("p1power");
						$('#pname-Csheet-1').html(player[0].name + "'s");
						$(might).html(player[0].stats.might);
						$(speed).html(player[0].stats.speed);
						$(energy).html(player[0].stats.energy);
						$(health).html(player[0].stats.health);
						$(power).html(player[0].power.name);
					})
				} else {
					alert('Spend all your stat points first!')
				}
			}
		} 
		///////////////////////////////////////////
/////////////////////////////////////////END OF STAT ALLOCATION////////////////////////////////////
/////////////////////////////////////////////////////
		if (thisMission) {
			if (target == missionChoices[0] || target == missionChoices[1] || target == missionChoices[2]) {
				if (target == missionChoices[0]) {
					pickedMission = 0;
				} else
				if (target == missionChoices[1]) {
					pickedMission = 1;
				} else
				if (target == missionChoices[2]) {
					pickedMission = 2;
				}
				chooseMission(pickedMission);
			}
		}
		if (missionStartBtn) {
			if (target == missionStartBtn) {
				var html = "<div class='row'><h1 class='text-center'>" + currentMission.name + "</h1><div class='col-sm-12' id='villainPanel'>";
							html += "<h1 class='text-center' id='villainName'>" + currentVillain.alterEgo + "</h1>";
							html += "</div><div class='col-sm-3'><h2>Health: <span id='villain-health-current'>0</span>/<span id='villain-health-max'>";
							html += "0</span></h2></div></div>";
							$(indexPage).html(html);
				currentMission.src(currentVillain);
			}
		}
})
///////END OF EVENT LISTENER//////////////////////////
//////////////////////////////////////////////////////
function autoSpendAttr(p) {
	var x = getRandomInteger(1, 5);
	var y = getRandomInteger(1, (7 - x))
	var z = getRandomInteger(1, (8 - (x + y)))
	var xy = 9 - (x + y + z)
		player[p].stats.might += x;
		player[p].stats.speed += y;
		player[p].stats.energy += z;
		player[p].stats.health += xy;
		console.log(x, y, z, xy)
}

function randomMission() {
		thisMission = [];
	var missionInfo = "<div class='row'><h1 class='text-center'>Choose Your Mission: </h1>"
	for (i=0; i<3; i++) {
		var x =  0; //getRandomInteger(0, (missions.length));
			thisMission[i] = missions[x];
			missionInfo += "<div class='col-sm-4' id='#mission" + i + "'><h2 class='text-center mission-option'>" + missions[x].name + "</h2>";
			missionInfo += "</div>";			
							}
	$(indexPage).html(missionInfo);
	missionChoices = document.getElementsByClassName('mission-option');
	
}

function chooseMission(e) {	
		currentMission = thisMission[e];
		currentVillain = createVillain();
	var html = "<h1 class='text-center'>" + currentVillain.alterEgo + " " + currentMission.description + "</h1>";
		html += "<button type='button' class='btn btn-primary' id='missionStart'>Start Mission</button>"
		$(indexPage).html(html);
		missionStartBtn = document.getElementById('missionStart')
}

function createVillain() {
		var x = villains.length;
			villains[x] = {};
		var y = getRandomInteger(0, lowLvlVillain.length);
			villains[x].class = lowLvlVillain[y].class
			villains[x].secretId = randomNameGen();
			villains[x].alterEgo = villainNameGen(y);
			villains[x].ability = lowLvlVillain[y].ability;
		return villains[x];	
}

