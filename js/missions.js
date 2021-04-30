


var missions = [
				
				{
					name: "Test Scenario",
					description: "is ready to help you test things",
					difficulty: null,
					src: function(v) {
						document.getElementById('villain-health-current').firstChild.nodeValue = 10;
						document.getElementById('villain-health-max').firstChild.nodeValue = 10;						
							currentHenchmen = [];
						var html = indexPage.innerHTML;
							html += "<div class='row'>";
							for (i=0; i<4; i++) {
								currentHenchmen[i] = new Henchmen();
									html += "<div class='col-sm-3 henchmen-panel'><h2 class='text-center " + currentHenchmen[i].class + "'>";
									html += currentHenchmen[i].class + "</h2><h3>Health: <span id='hench-health-" + i + "'>" + currentHenchmen[i].currentHealth + "</span>";
									html += "/<span id='hench-maxhealth-" + i + "'>" + currentHenchmen[i].maxHealth +  "</span></h3>";
									html += "<h3>Lives: <span id='hench-lives-" + i + "'>" + currentHenchmen[i].lives + "</span></h3>";
									html += "<button type='button' class='btn btn-primary hench-attack'>Attack</button></div>";
									
							}
							html += "</div>";
						$(indexPage).html(html);
						henchAttack = document.getElementsByClassName('hench-attack');
						henchPanels = document.getElementsByClassName('henchmen-panel');
						this.completed = true;
						

					},
					completed: false
				},
				{
					name:"Bank Robbery",
					description:"is robbing the Main Street Bank! Knock out their goons and don't let them get away with any money!",
					difficulty: 1,
					src: function(v) {
						
					},
					completed: false
				},
				{
					name:"Lab Heist",
					description: "is stealing valuable tech from the local lab!",
					dificulty: 1,
					src: function(v) {

					},
					completed: false
				}
]
