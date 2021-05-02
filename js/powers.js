
var heat;

function checkPwrRequirement(user, cost, param, paramCost) {
	if (user.currentEnergy < cost){
		return 0;
	} else if (param) {
		if (param < paramCost) {
			return 1;
		}
	} else {
	return true;
	}
}

var powers = [
	{
		id: "00",
		name: "fire", 
		description: "A very offensive oriented playstyle.",
		abilities: [
			{
			id: "00a1",
			name: "heat", 
			info: "Spend all your heat to deal damage to a foe, dealing 1 damage per heat spent.", 
			cost: 6,
			isLearned: true,
			src: function(attacker, target) {
				
			}
		},
			{
			name: "flare"
			}
		],
		isAvailable: true,
		innerHeat: 0,
		battleLog: {
			default: function() {
			var html = "<h2>" + attacker.name + " gained " + heat + " heat!</h2>";
				return html;
		},
			enemyDefeated: ""
		}
	},
	{
		name: "ice",
		description: "A more defensive playstyle.",
		abilities: [
			{
			name: "freeze",
			info: "Stuns an opponent for a certain amount of turns.",
			cost: 6,
			isLearned: true
		},
			 {
			 name:"frostbite"
			 }
		],
		isAvailable: true,
		battleLog: {
			default: function() {
				return " "
			},
			enemyDefeated: ""
		}
	}
]