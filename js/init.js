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

function attack(attacker, target, name) {
	var damage = attacker.stats.might;
	var hitModifier = getRandomInteger(1, 6);
	if (hitModifier == 1) {
		alert('The attack missed!')
		damage = 0;
	} else
	if (hitModifier == 6) {
		alert('A critical hit!')
		damage += (attacker.stats.might/2);
	}
		if (damage >= target.currentHealth) {
			damage = target.currentHealth;
		}
		target.currentHealth -= damage;
		for (i=0; i<currentHenchmen.length; i++) {
			if (target == currentHenchmen[i]) {
				if (target.currentHealth == 0) {
					target.lives -= 1;
					if (target.lives == 0) {
					var html = "<h2>DEFEATED</h2>";
						henchPanels[i].innerHTML = html;
						html = "<h2>" + player[currentTurn].name + " defeated " + target.class + "!</h2>";
						battleMenu.innerHTML = html;
						delete target;
					} else {
						document.getElementById("hench-lives-" + i).firstChild.nodeValue = target.lives;
						document.getElementById("hench-health-" + i).firstChild.nodeValue = target.maxHealth;
						var html = "<h2>" + name + " dealt " + damage + " damage, " + target.class + " has lost a life!</h2>";
						battleMenu.innerHTML = html;
					}

				} else {
					document.getElementById("hench-health-" + i).firstChild.nodeValue = target.currentHealth;
					var html = "<h2>" + name + " dealt " + damage + " damage.</h2>";
						battleMenu.innerHTML = html;

				}
			}
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

function Henchmen() {
	var x = getRandomInteger(0, henchmen.length);
	this.maxHealth = henchmen[x].health;
	this.lives = henchmen[x].lives;
	this.currentHealth = this.maxHealth;
	this.class = henchmen[x].class;
}