function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function randomNameGen() {
	var x = getRandomInteger(0, (villainFirstNames.length));
	var y = getRandomInteger(0, (villainLastNames.length));
	var villainName = villainFirstNames[x] + " " + villainLastNames[y];
		return villainName;
}

function villainNameGen(e) {
	var x = getRandomInteger(0, lowLvlVillain[e].nicknamePre.length);
	var y = getRandomInteger(0, lowLvlVillain[e].nicknameSuf.length);
	var fullName = "The " + lowLvlVillain[e].nicknamePre[x] + " " + lowLvlVillain[e].nicknameSuf[y];
		return fullName;
}

function attack(attacker, target) {
	var hitModifier = getRandomInteger(1, 6);
	if (hitModifier = 1) {
		alert('The attack missed!')
	} else
	if (hitModifier = 6) {
		var crit = true;
	}
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
