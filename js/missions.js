


var missions = [
				
				{
					name: "Test Scenario",
					description: "is ready to help you test things",
					difficulty: null,
					src: function(v) {
						document.getElementById('villain-health-current').firstChild.nodeValue = 10;
						document.getElementById('villain-health-max').firstChild.nodeValue = 10;
						var x = getRandomInteger(0, henchmen.length);
						var html = indexPage.innerHTML;
							html += "<div class='row'>";
							for (i=0; i<4; i++) {
								html += "<div class='col-sm-3 henchmen-panel'><h2 class='text-center " + henchmen[x].class + "'>";
								html += henchmen[x].class + "</h2></div>";
							}
							html += "</div>";
						$(indexPage).html(html);
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
