var statAdd, statRemv, statPts, allocated, beginBtn, thisMission, missionStartBtn, autoSpendBtn, missionCurrent, villainCurrent,
	henchmenCurrent, henchAttack, attackOptions;
var players = [];
var villains = [];
var pwrOptions = [];
var villainDb = [];
var missionArray = [];
var playerInputBox = document.getElementById('player-name');
var pageUrl = ["data/power-selection.html",
			   "data/stat-allocation.html",
			   "data/char-sheet.html"];
var indexPage = document.getElementById('main-content')
var charsheet = document.getElementsByClassName('charsheet');
var turnCurrent = 0;
var battleMenu = document.getElementById('battle-log-area');


function characterSheet() {
	console.log(players)
}
//////////////////////////////////////
/////////////////////////////////////////
////////////////xxx PLAYER NAME INPUT//////////////
/////////////////////////////////////////
//////////////////////////////////////

var Player = function (x) {
	var playerInput = playerInputBox.value;
	this.name = playerInput;
	this.number = "player " + (x + 1);
	this.power = {};
	this.stats = {
		might: 1, speed: 1, energy: 1, health: 1  
		}
	this.maxEnergy = 3;
	this.currentEnergy = this.maxEnergy;
	this.maxHealth = 5;
	this.currentHealth = this.maxHealth;



}

function playerSetup () {
	var html = " ";
	for (i=0; i<players.length; i++) {
		var j = (i + 1)
			html += "<h2 class='p" + j +"'>Player " + j + ": </h2>"
			html += "<div class='col-sm-3'>" + players[i].name + "</div>";
			};
	if (players.length > 0) {
				html += "<div class='form-control'><label for='playerremoval'>Remove Player: <input type='text' class='form-control' id='playerremoval'>";
				html += "<button class='btn btn-primary' onclick='removePlayer()' type='button' id='rmvBtn'>Remove Player (#)</button></div>"
			};
		html += "<button type='button' id='powerStartBtn' class='btn btn-primary'>Begin Game</button>";
		$("#player-name-list").html(html);
		document.getElementById('player-name').value = ""
			} 

document.getElementById('nameBtn').addEventListener("click", function() {
	var x = players.length;
	if (x < 4) {
		players[x] = new Player(x);
		playerSetup();
	}	
})

$(playerInputBox).keypress(function (e) {
	if (e.which == 13) {
		var x = players.length;
		if (x < 4) {
				players[x] = new Player(x);
				playerSetup();
		}
	}
})

function removePlayer() {
	var rP = document.getElementById('playerremoval').value;
	if (rP > 0 && rP <= players.length) {
			removedPlayer = (rP - 1);
			players.splice(removedPlayer, 1);
	} else {
		alert('Not a valid entry');
	}
	var x = players.length;
		playerSetup();
}
////////////////////////////////////////////////////////////////////
////////////////////////////////////////START GAME/////////////////////////////////
////////////////////////////xxx////////////////////////////////////
///////////////////////////////POWER SELECTION PAGE////////////////////////////
///////////////////////////////////////////////////////////////////

function powerSelection() {
		$.get(pageUrl[0], function (data){
		$(indexPage).html(data);
	var x = getRandomInteger(0, powers.length);
	var y = getRandomInteger(0, powers.length);
	var z = getRandomInteger(0, powers.length);
		pwrOptions.splice(0, 0, powers[x], powers[y], powers[z]);
		$("#pname").text(players[turnCurrent].name);
	for (i=0; i<pwrOptions.length; i++){
		var target = "#choice" + i;
		var html = "<h2 class='text-center pwr-selector' id='pwr" + i + "''>" + pwrOptions[i].name + "</h2>";
			html += "<h2>Description:</h2><p> " + pwrOptions[i].description + "</p><h2>Starting Ability: " + pwrOptions[i].abilities[0].name + "</h2>";
			html +=   "<p>" + pwrOptions[i].abilities[0].info + "</p>";
			$(target).html(html)
		}
	})
}



document.addEventListener("click", function(e) {	
	/////////////////xxx/////// POWER SELECTION////////////////////////////
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
			players[turnCurrent].power = pwrOptions[0];

		} else if (target == powerTable[1]) { 
			players[turnCurrent].power = pwrOptions[1];

		} else if (target == powerTable[2]) {
			players[turnCurrent].power = pwrOptions[2];

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
		})
	};

////////STAT ALLOCATION//////xxx////////////////////////////////////
	if (statAdd) {
		if (target == statAdd[0] || target == statAdd[1] || target == statAdd[2] || target == statAdd[3]) {
			if (statPtValue > 0) {
				if (target == statAdd[0]) {
					players[turnCurrent].stats.might += 1;
					allocated[0].firstChild.nodeValue = players[turnCurrent].stats.might;
					statPtValue -= 1;
				}
				if (target == statAdd[1]) {
					players[turnCurrent].stats.speed += 1;
					allocated[1].firstChild.nodeValue = players[turnCurrent].stats.speed;
					statPtValue -= 1;
				}
				if (target == statAdd[2]) {
					players[turnCurrent].stats.energy += 1;
					allocated[2].firstChild.nodeValue = players[turnCurrent].stats.energy;
					statPtValue -= 1;
				}
				if (target == statAdd[3]) {
					players[turnCurrent].stats.health += 1;
					allocated[3].firstChild.nodeValue = players[turnCurrent].stats.health;
					statPtValue -= 1;
				}
					document.getElementById('statPts').firstChild.nodeValue = statPtValue;
			}
		}
	}
	if (statRemv) {
		if (target == statRemv[0] || target == statRemv[1] || target == statRemv[2] || target == statRemv[3]) {
			if (statPtValue < 9) {
				if (target == statRemv[0]) {
					if (players[turnCurrent].stats.might > 1) {
						players[turnCurrent].stats.might -= 1;
						allocated[0].firstChild.nodeValue = players[turnCurrent].stats.might;
						statPtValue += 1;
					} else {
						alert('You cannot have less than 1 might')
					}
				};
			if (target == statRemv[1]) {
				if (players[turnCurrent].stats.speed > 1) {
					players[turnCurrent].stats.speed -= 1;
					allocated[1].firstChild.nodeValue = players[turnCurrent].stats.speed;
					statPtValue += 1;
				} else {
					alert('You cannot have less than 1 speed')
				}
			};
			if (target == statRemv[2]) {
				if (players[turnCurrent].stats.energy > 1) {
					players[turnCurrent].stats.energy -= 1;
					allocated[2].firstChild.nodeValue = players[turnCurrent].stats.energy;
					statPtValue += 1;turnCurrent
				} else {
					alert('You cannot have less than 1 energy')
				}
			};
			if (target == statRemv[3]) {
				if (players[turnCurrent].stats.health > 1) {
					players[turnCurrent].stats.health -= 1;
					allocated[3].firstChild.nodeValue = players[turnCurrent].stats.health;
					statPtValue += 1;
				} else {
					alert('You cannot have less than 1 health')
				};
			}
				document.getElementById('statPts').firstChild.nodeValue = statPtValue; 
			} else {
			alert('No stat points have been spent!')
			}
		}
	}
	if (autoSpendBtn) {
		if (target == autoSpendBtn) {
			players[turnCurrent].stats.might = 1;
			players[turnCurrent].stats.speed = 1;
			players[turnCurrent].stats.energy = 1;
			players[turnCurrent].stats.health = 1;
			autoSpendAttr(turnCurrent);
			allocated[0].firstChild.nodeValue = players[turnCurrent].stats.might;
			allocated[1].firstChild.nodeValue = players[turnCurrent].stats.speed;
			allocated[2].firstChild.nodeValue = players[turnCurrent].stats.energy;
			allocated[3].firstChild.nodeValue = players[turnCurrent].stats.health;
			statPtValue = 0;
			document.getElementById('statPts').firstChild.nodeValue = statPtValue;
			console.log(autoSpendBtn)

		}
	}
////////FIRST MISSION SELECT//////////////
/////////////////////xxx//////////////////
	if (beginBtn) {
		if (target == beginBtn) {
			if (statPtValue == 0) {
					players[turnCurrent].maxHealth = players[turnCurrent].health * 5;
					players[turnCurrent].currentHealth = players[turnCurrent].maxHealth;
					turnCurrent++;
				if (players.length > turnCurrent) {
					powerSelection();
				} else {
						turnCurrent = 0;
					randomMission();
					$.get(pageUrl[2], function(data) {									
						for (i=0; i<players.length; i++) {
							$(charsheet[i]).html(data);
							players[i].maxHealth = players[i].stats.health * 5;
							players[i].currentHealth = players[i].maxHealth;
							players[i].maxEnergy = players[i].stats.energy * 3;
							players[i].currentEnergy =	players[i].maxEnergy;					
						}
							power = document.getElementsByClassName('power');
							might = document.getElementsByClassName('might');
							speed = document.getElementsByClassName('speed');
							energy = document.getElementsByClassName('energy');
							health = document.getElementsByClassName('health');
							playerNames = document.getElementsByClassName('pname-Csheet');
						for (i=0; i<players.length; i++) {
							$(playerNames[i]).html(players[i].name + "'s");
							$(might[i]).html(players[i].stats.might);
							$(speed[i]).html(players[i].stats.speed);
							$(energy[i]).html(players[i].stats.energy);
							$(health[i]).html(players[i].stats.health);
							$(power[i]).html(players[i].power.name);
						}	
					})
				}

			} else {
					alert('Spend all your stat points first!')
			}
		}	
	} 
			
		 
		///////////////////////////////////////////
////////////////////////////////////xxx/END OF STAT ALLOCATION////////////////////////////////////
/////////////////////////////////////////////////////
	if (thisMission) {
		if (target == missionChoices[0] || target == missionChoices[1] || target == missionChoices[2]) {
			if (target == missionChoices[0]) {
					pickedMission = 0;
			} else if (target == missionChoices[1]) {
					pickedMission = 1;
			} else if (target == missionChoices[2]) {
					pickedMission = 2;
			}
				chooseMission(pickedMission);
		}
	}
	if (missionStartBtn) {
		if (target == missionStartBtn) {
			var html = "<div class='row'><h1 class='text-center'>" + missionCurrent.name + ", " + players[turnCurrent].name + "'s turn</h1><div class='col-sm-12' id='villainPanel'>";
				html += "<h1 class='text-center' id='villainName'>" + villainCurrent.alterEgo + "</h1>";
				html += "</div><div class='col-sm-3'><h2>Health: <span id='villain-health-current'>0</span>/<span id='villain-health-max'>";
				html += "0</span></h2></div></div>";
				$(indexPage).html(html);
				missionCurrent.src(villainCurrent);
		}
	}
	if (henchAttack) {
		if (target == henchAttack[0]) {
			attackMenu(0);
		}
		if (target == henchAttack[1]) {
			attackMenu(1);
		}
		if (target == henchAttack[2]) {
			attackMenu(2);
		}
		if (target == henchAttack[3]) {
			attackMenu(3);
		}
	}
	if (attackOptions) {
		if (target == document.getElementById('basic-attack')) {
			attack(attacker, victim, "Basic Attack");
		} else {
			for (i=0; i<attackOptions.length; i++) {
				if (target == attackOptions[i]) {
					attacker.power.abilities[i].src();
				}
			}
		}
	}
})
///////END OF EVENT LISTENER//////////////////////////
//////////////////////xxx/////////////////////////////
function autoSpendAttr(p) {
	var x = getRandomInteger(1, 5);
	var y = getRandomInteger(1, (7 - x))
	var z = getRandomInteger(1, (8 - (x + y)))
	var xy = 9 - (x + y + z)
		players[p].stats.might += x;
		players[p].stats.speed += y;
		players[p].stats.energy += z;
		players[p].stats.health += xy;
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
		missionCurrent = thisMission[e];
		villainCurrent = createVillain();
	var html = "<h1 class='text-center'>" + villainCurrent.alterEgo + " " + missionCurrent.description + "</h1>";
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

function attackMenu(x) {
		attacker = players[turnCurrent];
		victim = henchmenCurrent[x];
	var html = "<div class='row'><div class='col-sm-3' ><h2 id='basic-attack'>Basic Attack</h2></div>";
		for (i=0; i<attacker.power.abilities.length; i++) {
			if (attacker.power.abilities[i].isLearned == true) {
				html += "<div class='col-sm-3'><h2 class='text-center " + attacker.power.name + " ability' id='attack" + i + "'>" + attacker.power.abilities[i].name;
				html += "</h2></div>";
			}
		}	
		html += "</div>";
		$(battleMenu).html(html);
		attackOptions = document.getElementsByClassName('ability');
}
