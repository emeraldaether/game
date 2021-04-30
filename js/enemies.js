var masterminds = [];
var lowLvlVillain = [
				{
					class: "Shapeshifter",
					health: null,
					might: null,
					description: "This elusive baddie cannot be completely defeated until all of their henchmen are defeated. " +  
					"If defeated in battle before then, they are merely stunned instead.",
					lives: 1,
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
					ability: function() {

					},
					level: 1,
					nicknamePre: [
						"Fire", "Scorching", "Hot"
					],
					nicknameSuf: [
						"Phoenix", "Cannon", "Star"
					]
				}
];
var henchmen = [
				{
					class: "Thug",
					health: 5,
					might: 1,
					description: "A run of the mill bad guy with no special powers to speak of",
					lives: 1,
					ability: null,
					level: 1,
					health: 8
				},
				{
					class: "Brute",
					health: 6,
					might: 2,
					description: "A bigger badguy that requires a bit more force to put down",
					lives: 2,
					ability: null,
					level: 1,
					health: 8
				}
				];

