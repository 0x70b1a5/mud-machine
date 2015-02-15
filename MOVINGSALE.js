// MOVING SALE
// a choose-your-own-adventure game
// by abatt0ir, "some dork"

// thanks for being :
// ===============
// yourself (aww),
// alive,
// literate,
// bored,
// have-computer,
// nerdy,
// and gullible,
// all of which reasons combined are probably why you're here now, wondering when the game will start.
// fear not, for soon, you'll be asking when it starts.... but when it ends!..... 
// ~~~ ooooh ~~~

// a bunch of boring code:

// master map of rooms
var room = {
	"x0y0": null,
	"x0y1": {
		desc: "this is room #01. welcome!",
		items: ["puppy", "machete", "urn of ashes"]
	},
	"x0y2": "this is room #02. welcome!", 
	"x0y3": null, 
	"x0y4": null,
	"x0y5": "this is room #05. welcome!",
	"x0y6": "this is room #06. welcome!", 
	"x0y7": "this is room #07. welcome!",
	"x1y0": "this is room #10. welcome!", 
	"x1y1": "this is room #11. welcome!", 
	"x1y2": "this is room #12. welcome!", 
	"x1y3": "this is room #13. welcome!", 
	"x1y4": "this is room #14. welcome!",
	"x1y5": "this is room #15. welcome!",
	"x1y6": "this is room #16. welcome!", 
	"x1y7": "this is room #17. welcome!",
	"x2y0": null, 
	"x2y1": "this is room #21. welcome!", 
	"x2y2": "this is room #22. welcome!", 
	"x2y3": null, 
	"x2y4": null,
	"x2y5": "this is room #25. welcome!",
	"x2y6": "this is room #26. welcome!", 
	"x2y7": "this is room #27. welcome!"
};

var zone = {
	"x0y0":       null, "x0y1": room["x0y1"], "x0y2": room["x0y2"], "x0y3":       null, "x0y4":       null, "x0y5": room["x0y5"], "x0y6": room["x0y6"], "x0y7": room["x0y7"],
	"x1y0": room["x1y0"], "x1y1": room["x1y1"], "x1y2": room["x1y2"], "x1y3": room["x1y3"], "x1y4": room["x1y4"], "x1y5": room["x1y5"], "x1y6": room["x1y6"], "x1y7": room["x1y7"],
	"x2y0":       null, "x2y1": room["x2y1"], "x2y2": room["x2y2"], "x2y3":       null, "x2y4":       null, "x2y5": room["x2y5"], "x2y6": room["x2y6"], "x2y7": room["x2y7"]
};


// the player
var player = {
	currentX: 1,
	currentY: 1,

	// looks around the room
	look: function() { 
		writeLine(zone["x" + this.currentX + "y" + this.currentY]);
	},

	// where the player is
	canMoveToPosition: function(x, y) { // is the player even????
		if (typeof zone["x" + x + "y" + y] != undefined && zone["x" + x + "y" + y] != null) {
			return true; 
		} else {
			return false;
		} 
	},
	setPosition: function(x, y) { 
		if (this.canMoveToPosition(x, y)) {
			this.currentX = x;
			this.currentY = y;

			this.look();
		} else {
			writeLine("You hit a wall.");
		}
	},

	inventory: [
		"wits",
		"hopes",
		"dreams"
	],
	displayInv: function() {
		writeLine("Your inventory:");

		this.inventory.map(function(item) {
			writeLine(item);
		})
	}
};


// outputting text to #terminal 

function writeLine(words) {
	var terminal = document.getElementById("terminal");

	terminal.innerHTML += words + "<br>";
	terminal.scrollTop = terminal.scrollHeight;
}


// the only reaction i will ever need
function panic() {
	alert("AAAAAAAAAAAAAAAAAAAAA / AAAAAAAAAAAAAAAAAAAAAAAAA / AAAAAAAAAAAAAAAAAAAAA / AAAAAAAAAAAAAAAAAAAAA");
};


function listenForInput() {
	var input = document.getElementById("user-input-field")
	  , inputVal;

	input.onkeypress = function(event) {
		event = event || window.event;
		console.log(event);

		if (event.keyCode === 13) { // enter
			console.log(input.value);
			
			inputVal = input.value;

			switch(inputVal) {
				case "n":
				case "north":
					player.setPosition(player.currentX, player.currentY + 1);
					break;
				case "s":
				case "south":
					player.setPosition(player.currentX, player.currentY - 1);
					break;
				case "w":
				case "west":
					player.setPosition(player.currentX - 1, player.currentY);
					break;
				case "e":
				case "east":
					player.setPosition(player.currentX + 1, player.currentY);
					break;
				case "i":
				case "inventory":
					player.displayInv();
					break;
				default:
					writeLine("I don't understand your moonspeak....");
			}

			input.select();
		}
	}

};


(function gameStart() {
	player.look();
	listenForInput();
})();


// "You are standing outside of a store. /
// /
// The store is only allegedly a store, because you can't see any /
// indication that the dubious building slouching in front of you /
// has ever been anything but an empty place for dreams to die. /
// Then again, you could say that about this entire neighborhood, /
// but that's a terminal for another game. Anyway, the internet says /
// it's a store, so a store it must be. /
// / 
// 'MOVING SALE', the tacky plastic tarp shouts at you. /
// 'Better than a garage sale, it's the whole house!' /
// /
// You aren't sure what to make of that."