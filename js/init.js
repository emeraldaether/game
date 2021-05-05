
var heat;


//////////////////////////////////////////////////
// ATTACK MECHANICS/////////////////////////////
/////////////////////////////////////////////////
//////////////////////////////////////////////////
function attack(attacker, target, name, buff, modifier) {
	var html;
	var damage = attacker.stats.might;
	if (buff) {
		damage += buff;
	}
	 //////////////////////////////////////
	// HIT MODIFIER ////////////////////////////
///////////////////////////////////////////////////	
///////////////////////////////////////////////////////
	var hitModifier = getRandomInteger(1, (6 + (attacker.stats.speed)));
	if (modifier) {
		hitModifier += modifier;
	} else {
		modifier = 0;
	}
	if (hitModifier == 1) {
		alert('The attack missed!')
		damage = 0;
	} else
	if (hitModifier >= 10) {
		if (currentAbility.canCrit || name == "Basic Attack") {
					alert('A critical hit!')
		damage += (attacker.stats.might/2);
		};
	}
	///////////////////////////////////////////
/////////EXCESS DAMAGE MECHANICS////////////////
	/////////////////////////////////////////

	if (damage > 0) {
		if (attacker.power.id == "00")	{
			attacker.power.innerHeat += 1;
			heat = 1;
		}
	}
	if (damage >= target.healthCurrent) {
		if (attacker.power.id == "00") {
			attacker.power.innerHeat += damage - target.healthCurrent;
			heat += damage - target.healthCurrent;		
		}  
		damage = target.healthCurrent;
	}
	target.healthCurrent -= damage;
	for (i=0; i<henchmenCurrent.length; i++) {
		if (target == henchmenCurrent[i]) {
			if (target.healthCurrent == 0) {
					target.lives -= 1;
				if (target.lives == 0) {
					html = "<h2>DEFEATED</h2>";
					henchPanels[i].innerHTML = html;
					html = players[turnCurrent].name + " defeated " + target.class; + "!";
					henchmenCurrent.splice(i, 1);
					$(henchPanels[i]).removeClass('henchmen-panel');
				} else {
					document.getElementsByClassName("hench-lives")[i].firstChild.nodeValue = target.lives;
					document.getElementsByClassName("hench-health")[i].firstChild.nodeValue = target.healthMax;
						html = name + " dealt " + damage + " damage, " + target.class + " has lost a life!";
					target.healthCurrent = target.healthMax;
				}

			} else {
				document.getElementsByClassName("hench-health")[i].firstChild.nodeValue = target.healthCurrent;
					html = name + " dealt " + damage + " damage.";
			}
			html += attacker.power.battleLog.default();
			alert(html);
			henchmenTurnStart();			
		}
	}
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

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function henchmenAttack(attacker, target, buff) {
	var html = " ";
	var hitModifier = getRandomInteger(1, 15);
		hitModifier -= (players[target].stats.speed * 0.5)
	var damage = attacker.might;
	if (buff) {
			damage += buff;
	}
	if (hitModifier <= 1) {
			damage = 0;
			alert('The attack missed!')
			playerTurnStart();
	} else {
		if (attacker.canCrit && hitModifier >= 10) {
				damage += damage * 0.5;
		}
		if (damage > players[target].healthCurrent) {
				damage = players[target].healthCurrent
		}
		players[target].healthCurrent -= damage;
		if (players[target].healthCurrent == 0) {
			players[target].status[0].isActive = true;
			players[target].status[2].isActive = true;
			console.log(players[target].status[0])
			var	checkStun = true;
			players[target].status[0].turnsRemaining = 1;
			statusUpdate(target);
			players[target].healthCurrent == players[target].healthMax;

		}
		playerHealth[target].innerHTML = players[target].healthCurrent;
		villainBattleLog(attacker, target, damage, checkStun);
	}
}

function henchmenSetup() {
	var html = "<div class='row'>"
	for (i=0; i<4; i++) {
			henchmenCurrent[i] = new Henchmen();
			html += "<div class='col-sm-3 henchmen-panel'><h2 class='text-center " + henchmenCurrent[i].class + "'>";
			html += henchmenCurrent[i].class + "</h2><h3>Health: <span class='hench-health'>" + henchmenCurrent[i].healthCurrent + "</span>";
			html += "/<span class='hench-max-health'>" + henchmenCurrent[i].healthMax +  "</span></h3>";
			html += "<h3>Lives: <span class='hench-lives'>" + henchmenCurrent[i].lives + "</span></h3>";
			html += "<button type='button' class='btn btn-primary hench-attack'>Attack</button></div>";								
	}
		html += "</div>";
	return html;
}

var Player = function (x) {
	var playerInput = playerInputBox.value;
	this.name = playerInput;
	this.number = "player " + (x + 1);
	this.power = {};
	this.stats = {
		might: 1, speed: 1, energy: 1, health: 1  
		}
	this.energyMax = 3;
	this.energyCurrent = this.energyMax;
	this.healthMax = 5;
	this.healthCurrent = this.healthMax;
	this.status = statusEffects;
		difficulty += 1;
}

function playerAreaSetup() {
	var html = "<div class='row'>";
	for (i=0; i<players.length; i++) {
				html += "<div class='col-sm-3 player-card'><h2 class='p" + (i + 1) + "'>Player " + (i + 1) + "</h2><h2>";
				html += players[i].name + "</h2><h3>Health: <span class='player-health-current'>" + players[i].healthCurrent + "</span>/<span";
				html += "class='player-health-max'>" + players[i].healthMax + "</span></h3><h3>Energy: <span class=";
				html += "'player-energy-current'>" + players[i].energyCurrent + "</span>/<span class='player-energy-max'>";
				html += players[i].energyMax + "</span></h3><div class='player-status'></div></div>";
	}
			html += "</div>";
	return html;
}

function playerRemove() {
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

function playerSetup () {
	var html = " ";
	for (i=0; i<players.length; i++) {
		var j = (i + 1)
			html += "<h2 class='p" + j +"'>Player " + j + ": </h2>"
			html += "<div class='col-sm-3'>" + players[i].name + "</div>";
	};
	if (players.length > 0) {
				html += "<div class='form-control'><label for='playerremoval'>Remove Player: <input type='text' class='form-control' id='playerremoval'>";
				html += "<button class='btn btn-primary' onclick='playerRemove()' type='button' id='rmvBtn'>Remove Player (#)</button></div>"
	};
		html += "<button type='button' id='powerStartBtn' class='btn btn-primary'>Begin Game</button>";
	$("#player-name-list").html(html);
	document.getElementById('player-name').value = ""
} 



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

function randomNameGen() {
	var x = getRandomInteger(0, (villainFirstNames.length));
	var y = getRandomInteger(0, (villainLastNames.length));
	var villainName = villainFirstNames[x] + " " + villainLastNames[y];
		return villainName;
}

function statusUpdate(p) {
	var html = "";
	for (i=0; i<players[p].status.length; i++){
		if (players[p].status[i].isActive) {
				html += players[p].status[i].statusBar;
		}
	}
			playerStatus[p].innerHTML = html;
}

function villainBattleLog (a, t, d, s) {
	var html = a.class + " dealt " + d + " damage to " + players[t].name;
	if (s == true) {
			html += ", " + players[t].name + " was stunned";
	}
		html += "!";
	alert(html);
		playerTurnStart();
}

function villainNameGen(e) {
	var x = getRandomInteger(0, lowLvlVillain[e].nicknamePre.length);
	var y = getRandomInteger(0, lowLvlVillain[e].nicknameSuf.length);
	var fullName = "The " + lowLvlVillain[e].nicknamePre[x] + " " + lowLvlVillain[e].nicknameSuf[y];
		return fullName;
}





var villainFirstNames = ["Tom", "David", "Andrew", "Tara", "Amanda", "Wayne", "Bruce", "Wyatt", "Austin", "Chappie", "Monica", "Billy", "Joey", "James", "Sammy",
							"Alex", "Woodie", "Frank", "Wes", "Dennis", "Ronald", "Charlie", "Dee", "Wade", "Tony", "Anthony", "Michael", "Alyson", "Catherine",
							"Tim", "Sara", "Emma", "Paul", "Will", "Johnny", "Steve", "Matt", "Aaron", "Caroline", "Kevin", "Clint", "Natasha", "Nick",
							"Maria", "Wendy", "Ellis", "Nicole", "Chloe", "Jonas", "Alfred", "Barbara", "Colin", "Delilah", "Evan", "Farah", "Geoffrey",
							"Hala", "Isaiah", "Jun", "Kyle", "Lilith", "Morty", "Nora", "Oscar", "Penelope", "Quinn", "Rachel", "Silas", "Terri", "Ulric",
							"Vera", "Willis", "Xochitl", "Yusuf", "Zara", "Aria", "Bob", "Cecilia", "Don", "Ericka", "Ferris", "Gloria", "Harold", "Irena",
							"Jimmie", "Kyla", "Lyle", "Mara", "Noah", "Ophelia", "Phillip", "Quiyana", "Ray", "Sally", "Ted", "Ula", "Victor", "Willa",
							"Xavier", "Yolanda", "Zachary"]

var villainLastNames = ["Smith", "Rodriguez", "Chapman", "Texas", "Chandler", "California", "Anderson", "Gonzalez", "Woodruff", "Hitchcock", "Raimi", 
						"Craven", "Buechler", "Hodder", "Reynolds", "Kelly", "McDonald", "Wilson", "Hernandez", "Montana", "Kirzinger", "Alexander", "Berkowitz",
						"Calimari", "Derrickson", "Elwood", "Franklin", "Goodall", "Horowitz", "Iona", "Jeremiah", "Knight", "Little", "Matthews", "Niles",
						"Otis", "Perry", "Queen", "Royal", "Salt", "Thrombey", "Umbridge", "Villa", "Washer", "Young", "Zee", "Armand", "Beatriz", "Collins", "Dirge",
						"Edwards", "Fuller", "Graham", "Honda", "Ito", "Jiminez", "Kalua", "Levy", "Matsumodo", "Nakamura", "Osaka", "Palmer", "Quimby", "Russell",
						"Sasaki", "Tao", "Zhao"]

var statusEffects = [{
	id: "100",
	name: "Stun",
	effect: "stunned",
	statusBar: "stunned",
	isActive: false,
	turnsRemaining: 0
},
{
	id: "101",
	name: "Freeze",
	effect: "frozen",
	isActive: false,
	turnsRemaining: 0
},
{
	id: "102",
	name: "untargetable",
	effect: null,
	statusBar: null,
	isActive: false,
	turnsRemaining: 0
}]







// UNDER CONSTRUCTION


function playerTurnStart() {
		$(battleMenu).html(" ")
		villainTurnCurrent += 1;	
				// CHECK IF THEY ARE STUNNED//
	if (players[turnCurrent].status[0].isActive == true) {
			alert(players[turnCurrent].name + " is stunned! They cannot act this turn!");
		players[turnCurrent].status[0].turnsRemaining -= 1;
		if (players[turnCurrent].status[0].turnsRemaining == 0) {
			players[turnCurrent].status[0].isActive = false;
			players[turnCurrent].status[2].isActive = false;
		}
		henchmenTurnStart();
	} else {
		playerTitleName.innerHTML = players[turnCurrent].name;
		alert(players[turnCurrent].name + "'s turn!");
		
	}
}

function henchmenTurnStart() {
		$(battleMenu).html(" ")
		statusUpdate(turnCurrent);
		turnCurrent += 1;
	if (turnCurrent == players.length) {
			turnCurrent = 0;
	}
	if (henchmenCurrent[villainTurnCurrent] == undefined) {	
			villainTurnCurrent = 0;
	}
		alert('Henchmen turn!')
	henchmenCurrent[villainTurnCurrent].attack();
}

function checkTargets() {
	var k = 0;
	for (i=0; i<players.length; i++) {
		if (players[i].status[2].isActive){
			k += 1;
		}
	}
	var l = players.length - k;
	if (l == 0) {
		return false;
	} else {
		return true;
	}
}