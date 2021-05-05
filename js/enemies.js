var masterminds = [];
var lowLvlVillain = [{
	class: "Shapeshifter",
	health: null,
	might: null,
	description: "This elusive baddie cannot be completely defeated until all of their henchmen are defeated. " +  
				"If defeated in battle before then, they are merely stunned instead.",
	lives: 1,
	health: 8,
	ability: function() {

	},
	level: 1,
	nicknamePre: [
		"Wild", "Amorphous", "Everchanging"
	],
	nicknameSuf: [
		"Changeling", "Chameleon", "Abstract"
	]
},
{
	class: "Pyro",
	health: null,
	might: null,
	description: "Get ready to feel the BURN!",
	lives: 3,
	health: 8,
	ability: function() {

	},
	level: 1,
	nicknamePre: [
		"Fire", "Scorching", "Hot"
	],
	nicknameSuf: [
		"Phoenix", "Cannon", "Star"
	]
}];
var henchmen = [{
	class: "Thug",
	health: 5,
	might: 1,
	description: "A run of the mill bad guy with no special powers to speak of",
	lives: 1,
	ability: null,
	level: 1,
	health: 8,
	attack: function() {
		if (checkTargets() == true) {
			do {
				var target = getRandomInteger(0, (players.length - 1));
			} while (players[target].status[2].isActive);
			henchmenAttack(this, target)
		} else {
			alert('There are no viable targets for the henchmen!')
			playerTurnStart()
		}		
	}
},
{
	class: "Brute",
	health: 6,
	might: 2,
	description: "A bigger badguy that requires a bit more force to put down",
	lives: 2,
	ability: null,
	level: 1,
	health: 8,
	attack: function() {
		do {
			var target = getRandomInteger(0, (players.length - 1));
		} while (players[target].status[0].isActive);
		henchmenAttack(this, target)		
	}
}];

function Villain() {
	var y = getRandomInteger(0, lowLvlVillain.length);
		this.class = lowLvlVillain[y].class
		this.secretId = randomNameGen();
		this.alterEgo = villainNameGen(y);
		this.ability = lowLvlVillain[y].ability;
		this.health = lowLvlVillain[y].health;
}

function Henchmen() {
	var x = 0 //getRandomInteger(0, henchmen.length)
	this.healthMax = henchmen[x].health + (4 * difficulty);
	this.lives = henchmen[x].lives;
	this.healthCurrent = this.healthMax;
	this.class = henchmen[x].class;
	this.name = randomNameGen();
	this.attack = henchmen[x].attack;
	this.might = henchmen[x].might + (difficulty);
}

