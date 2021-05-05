var missions = [{
	name: "Test Scenario",
	description: "is ready to help you test things",
	difficulty: 1,
	completed: false,
	src: function(v) {
		var html = "<div class='row'><h1 class='text-center' id='currentTurnHeading'>" + missionCurrent.name;
			html +=  ", " + "<span id='current-player-id'>" + players[turnCurrent].name + "</span>";
			html += "'s turn</h1><div class='col-sm-12' id='villainPanel'>";
			html += "<h1 class='text-center' id='villainName'>" + villainCurrent.alterEgo + "</h1>";
			html += "</div><div class='col-sm-3'><h2>Health: <span id='villain-health-current'>0</span>/<span id='villain-health-max'>";
			html += "0</span></h2></div></div>";
		v.health += (difficulty + this.difficulty) * 5;
		v.healthCurrent = villainCurrent.health;
			henchmenCurrent = [];
			html += henchmenSetup(this.difficulty + difficulty) + "<div class='row'>";
		$(indexPage).html(html);
		document.getElementById('villain-health-current').firstChild.nodeValue = v.healthCurrent;
		document.getElementById('villain-health-max').firstChild.nodeValue = v.health;	
		$('#player-area').html(playerAreaSetup());
			henchAttack = document.getElementsByClassName('hench-attack');
			henchPanels = document.getElementsByClassName('henchmen-panel');
			henchHealth = document.getElementsByClassName('hench-health');
			henchLives = document.getElementsByClassName('hench-lives');
			playerHealth = document.getElementsByClassName('player-health-current');
			playerEnergy = document.getElementsByClassName('player-energy-current');
			playerStatus = document.getElementsByClassName('player-status');
			playerTitleName = document.getElementById('current-player-id')

		this.completed = true;
		console.log(this)		
	}
},
{
	name:"Bank Robbery",
	description:"is robbing the Main Street Bank! Knock out their goons and don't let them get away with any money!",
	difficulty: 1,
	completed: false,
	src: function(v) {
						
	}					
},
{
	name:"Lab Heist",
	description: "is stealing valuable tech from the local lab!",
	dificulty: 1,
	completed: false,
	src: function(v) {

	}
}]

function chooseMission(e) {	
		villainCurrent = new Villain;
		missionCurrent = thisMission[e];
		villains[villains.length] = villainCurrent; 
	var html = "<h1 class='text-center'>" + villainCurrent.alterEgo + " " + missionCurrent.description + "</h1>";
		html += "<button type='button' class='btn btn-primary' id='missionStart'>Start Mission</button>"
		$(indexPage).html(html);
		missionStartBtn = document.getElementById('missionStart')
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

