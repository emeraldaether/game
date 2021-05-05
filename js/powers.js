
var heat;

function checkPwrRequirement(user, cost, param, paramCost) {
	if (user.energyCurrent < cost){
		return 0;
	} else if (param) {
		if (param < paramCost) {
			return 1;
		}
	} else {
	return true;
	}
}

var powers = [{
	id: "00",
	name: "fire", 
	description: "A very offensive oriented playstyle.",
	abilities: [{
		id: "00a1",
		name: "heat", 
		info: "Spend all your heat to deal damage to a foe, dealing 1 damage per heat spent.", 
		cost: 6,
		isLearned: true,
		health: 12,
		src: function(attacker, target) {
				
		}
	},
	{
		name: "flare"
	}],
	isAvailable: true,
	innerHeat: 0,
	battleLog: {
		default: function() {
			var html = " " +  attacker.name + " gained " + heat + " heat!";
			return html;
		},
		enemyDefeated: ""
	}
},
{
	id: "01",
	name: "ice",
	description: "A more defensive playstyle.",
	abilities: [{
		id:"01a1",
		name: "freeze",
		info: "Stuns an opponent for a certain amount of turns.",
		cost: 6,
		isLearned: true
	},
	{
		name:"frostbite"
	}],
	isAvailable: true,
	battleLog: {
		default: function() {
			return " "
		},
		enemyDefeated: ""
	}
},
{
	id: "02",
	name: "storm",
	description: "",
	abilities: [{
		id: "02a1",
		name: "",
		info: "",
		cost: "",
		isLearned: true
	}],
	isAvailable: true,
	battleLog: {
		default: function() {
			return " "
		},
		enemyDefeated: ""
	}
},
{
	id: "03",
	name: "fairyborn",
	description: "",
	abilities: [{
		id: "03a1",
		name: "",
		info: "",
		cost: "",
		isLearned: true
	}],
	isAvailable: true,
	battleLog: {
		default: function() {
			return " "
		},
		enemyDefeated: ""
	}
},
{
	id: "04",
	name: "crystalline",
	description: "",
	abilities: [{
		id: "04a1",
		name: "",
		info: "",
		cost: "",
		isLearned: true
	}],
	isAvailable: true,
	battleLog: {
		default: function() {
			return " "
		},
		enemyDefeated: ""
	}
},
{
	id: "05",
	name: "sorcery",
	description: "",
	abilities: [{
		id: "05a1",
		name: "",
		info: "",
		cost: "",
		isLearned: 
	}],
	isAvailable: ,
	battleLog: {
		default: function() {
			return " "
		},
		enemyDefeated: ""
	}
},
{
	id: "",
	name: "",
	description: "",
	abilities: [{
		id: "",
		name: "",
		info: "",
		cost: "",
		isLearned: 
	}],
	isAvailable: ,
	battleLog: {
		default: function() {
			return " "
		},
		enemyDefeated: ""
	}
}]