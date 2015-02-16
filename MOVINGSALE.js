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

// global debug switch
window.debug = true; 


// the player
var player = {
	currentX: 1,
	currentY: 1,

	// looks around the room
	look: function() { 
		writeLine(room["x" + this.currentX + "y" + this.currentY]);
	},

	// where the player is
	canMoveToPosition: function(x, y) { // is the player even????
		if (typeof room["x" + x + "y" + y] != undefined && room["x" + x + "y" + y] != null) {
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

document.getElementById("both-input-fields").addEventListener("submit", submitAction, false);

function submitAction(event) {
	var input = document.getElementById("user-input-field") 
		, inputVal;
	inputVal = input.value;

	var actions = {
		n: function() {
			player.setPosition(player.currentX, player.currentY + 1);
		},
		s: function() {
			player.setPosition(player.currentX, player.currentY - 1);
		},
		w: function() {
			player.setPosition(player.currentX - 1, player.currentY);
		},
		e: function() {
			player.setPosition(player.currentX + 1, player.currentY);
		},
		i: function() {
			player.displayInv();
		},
		default: function() {
			writeLine("I don't understand your moonspeak....");
		}
	}

	event.preventDefault(); // this has to go after the actions object otherwise we stop doing things 

	(actions[inputVal] || actions.default)()

	input.select(); // makes it easy to re-enter
};


(function () {
	player.look();
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