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

var isGameIntro = true; // if intro, then forbids player from submitting non-integers into the world-gen function.

// the player
var player = {
	currentX: 0,
	currentY: 0,

	// looks around the room (actually just reads the description)
	look: function() { 
		writeLine(blueprint[this.currentX][this.currentY].desc);
	},

	// where the player is
	canMoveToPosition: function(x, y) { // is the player even????
		if (!!blueprint[x][y]) {
			if (debug) console.log("now in room: " + blueprint[x][y]); else {};
			if (!blueprint[x][y].isAWall)
				return true; else return false;
		} else {
			return false;
		} 
	},
	setPosition: function(x, y) { 
		if (this.canMoveToPosition(x, y)) {
			this.currentX = x;
			this.currentY = y;

			this.look(); // automagically looks around the room whenever you move
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
	writeLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
};

document.getElementById("input-zone").addEventListener("submit", submitAction, false);

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
		p: function() {
			panic();
		},
		default: function() {
			writeLine("I don't understand your moonspeak....");
		}
	}

	event.preventDefault(); // this has to go after the actions object otherwise it breaks 

	if (!!isGameIntro) {
		var isInt = function(i) {
			return !isNaN(i) && 
	        parseInt(Number(i)) == i && 
	        !isNaN(parseInt(i, 10));
		};

		if (!!isInt(inputVal)) { // to-do: figure out how to check only the first input of the game... 
			if (debug) {console.log("inputVal =" + inputVal)} else {};
			writeLine("Generating store of size = " + inputVal + " meters...")
			var blueprintX = inputVal;
			var blueprintY = blueprintX;
			drawBlueprint(blueprintX, blueprintY); // i know it's redundant having two identical arguments, but it's a pain in the ass asking for two different values
		} else {
			var blueprintX = Math.floor(100 * Math.random() + 1); // just to fuck with them
			var blueprintY = blueprintX;
			writeLine("Invalid size. ('" + inputVal + "') Autogenerating store...")
			drawBlueprint(blueprintX, blueprintY);
		} isGameIntro = false;
		gameIntro();
	} else (actions[inputVal] || actions.default)();

	input.select(); // makes it easy to re-enter text
};

function gameIntro() {
	var checkAlleyLength = function() { // why of course i need a function for this
		if (blueprint.length < 10)
			return "stumpy";
		else if (blueprint.length < 20)
			return "gloomy";
		else if (blueprint.length < 30)
			return "unsettling";
		else if (blueprint.length < 50)
			return "haunting";
		else return "improbably gargantuan";
	};

	writeLine(
		"<br> You are standing outside of a store. <p>"
		+
		"The store is only allegedly a store, because you can't see any indication that the dubious building slouching in front of you has ever been anything but an empty place for dreams to die. Then again, you could say that about this entire neighborhood, but that's a story for another game. Anyway, the internet says it's a store, so a store it must be. <p>"
		+
		"<br>'MOVING SALE', the tacky plastic tarp shouts at you. <p>" +
		"'Better than a garage sale, it's the whole house!'<p>"
		+
		"<br>You aren't sure what to make of that.<p>"
		+
		"The storefront is about " + blueprint.length + " meters wide, with a low, cramped door accessible only through the " + checkAlleyLength() + " side alley."
	);
};

(function buildWorld() {
	writeLine("Enter a store size, in meters:");
})();