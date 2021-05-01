var powers = [
	{
		id: "00",
		name: "fire", 
		description: "A very offensive oriented playstyle.",
		abilities: [
			{
			id: "00a1",
			name: "heat", 
			info: "spend energy to increase damage dealt to a foe.", 
			cost: 6,
			isLearned: true,
			src: function() {
				
			}
		},
			{
			name: "flare"
			}
		],
		isAvailable: true,
		innerHeat: 0,
		battleLog: {
			default: function(heat) {
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