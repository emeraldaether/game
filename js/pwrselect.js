var powerTable = document.getElementsByClassName('pwr-selector')
document.addEventListener("click", function(e) {
	var target = e.target;
	if (target == powerTable[0] || target == powerTable[1] || target == powerTable[2]) {
		console.log(target)
	} 
})