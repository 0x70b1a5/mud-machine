
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
window.player = {
	currentX: 0,
	currentY: 0,

	// looks around the room (actually just reads the description)
	look: function() { 
		currentRoom = blueprint[this.currentX][this.currentY]; 
		writeLine(currentRoom.desc);
		thisRoomsItems = [];
		for (i = 0; i < currentRoom.items.length; i++) {
			thisRoomsItems.push(currentRoom.items[i]);
			blueprint[this.currentX][this.currentY].items[i].shift;
		};
		if (thisRoomsItems.length > 0) {
			writeLine("And on the floor, there is: <br>");
			for (i = 0; i < currentRoom.items.length; i++) 
				writeLine(thisRoomsItems[i].desc);
		} else writeLine("The moldy floor is cluttered with trash.")
	},

	// where the player is
	canMoveToPosition: function(x, y) { // is the player even????
		if (!!blueprint[x] && !!blueprint[x][y]) {
			if (debug) console.log("trying to move to room #" + blueprint[x][y].x + blueprint[x][y].y); else {};
			if (!blueprint[x][y].isAWall)
				return true; else return false;
		} else {
			return false;
		} 
	},
	setPosition: function(x, y) { 
		if (!!this.canMoveToPosition(x, y)) {
			this.currentX = x;
			this.currentY = y;
			if (debug) console.log("now in room #" + blueprint[x][y].x + blueprint[x][y].y); else {};
			this.look(); // automagically looks around the room whenever you move
		} else {
			writeLine("You hit a wall.");
		}
	},

	inventory: [
		 // your wits, hopes and dreams
	],

	displayInv: function() {
		writeLine("Your inventory:");

		this.inventory.map(function(item) {
			writeLine("#" + (player.inventory.indexOf(item) + 1) + ". " + item.desc);
		})
	},
	die: function() { 
		writeLine("It ends painfully.");
		panic();
	},

	// the only reaction i will ever need
	panic: function() {
		var madRamblings = ["<p>and.... and... oh god... oh NO.... OH GOD! I "];
		for (var p = 0; p <= Math.floor(1000*Math.random()); p++) {
			var wordOfTruth = Math.floor(100*Math.random());
			var gospelOfElderOnes = ["horrible", "dark", "AAAAAA", "DID YOU SEE THAT?", "hate. hate. hate.", "HATE. I HATE.", 
										"HATE.", "hate", "foul", "he comes...", "he sleeps", "the dreamer wakes", "even death may die", 
										"I have seen him", "I have seen the sign", "hnnn hnnn hnngnngng haanaaahhh",  "IÄ! IÄ!",
										"UAAAH...", "ACKGHHAUGH!", "EEEEE! EEEEEEE! EEEEEEEE!", "AIEEEE!", "vitim, visium, victum.", 
										"VITIM, VISIUM, VICTUM!", "ALL HAIL. ... ALL. HAIL. ... AAAALLLLLLLL HAAAAAAAAIL.", 
										"terrible", "disgusting", "vile", "vicious", "hate", "love", "sickening", "demonic", "mutant", "filthy", "blasphemous", 
										"feral", "savage", "pagan", "Satan", "blood", "foul", "sacrifice", "maddening", "bestial", "torture", "murder",
										"beast", "the","of","and","a","to","in","is","you","that","it","he","was", "Baphomet", "for","on",
										"are","as","with","his","they","I", "HIM", "HIM", "HIM...", "at","be","this","have","from","or","one","had","by",
										"word","but","not","what","all","were","we","when","your","can","said","there","use","an",
										"each","which","she","do","how","their","if","will","up","other","about","out","many", "then",
										"them","these","so","some","her","would","make","like","him","into","time","has","look","two",
										"more","write","go","see","number","no","way","could","people","my","than","first","water","been",
										"call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
			madRamblings += " " + gospelOfElderOnes[wordOfTruth];
		}
		madRamblings.concat("");
		writeLine(madRamblings);
	},

	holding: false,

	equip: function(item) {
		if (item.weapon = false) {
			writeLine("That's not a weapon.");
		} else {
			player.holding = item;
			writeLine("You pull out the "+item.name+". You hope it'll hit harder than anything else you might meet here.");
		};
	}
};


// outputting text to #terminal 
function writeLine(words) {
	var terminal = document.getElementById("terminal");

	terminal.innerHTML += words + "<p>";
	terminal.scrollTop = terminal.scrollHeight;
}



function gameIntro() {
	var checkAlleyLength = function() { // why of course i need a function for this
		if (blueprint.length < 10)
			return "stumpy";
		else if (blueprint.length < 40)
			return "gloomy";
		else if (blueprint.length < 50)
			return "unsettling";
		else if (blueprint.length < 100)
			return "haunting";
		else return "improbably gargantuan";
	};

	writeLine(
		"<p>> Controls: N,S,E,W: move, I: inventory, ?: help.<br>"
		+
		".'=========^==============^=============^========'<p>"
		+
		"<p> You are standing outside of a store. <p>"
		+
		"The store is only allegedly a store, because you can't see any indication that the dubious building slouching in front of you has ever been anything but an empty place for dreams to die. Then again, you could say that about this entire neighborhood, but that's a story for another game. Anyway, the internet says it's a store, so a store it must be. <p>"
		+
		"<p>'MOVING SALE', the tacky plastic tarp shouts at you. <br>" +
		"'Better than a garage sale, it's the whole house!'<p>"
		+
		"<p>You aren't sure what to make of that.<p>"
		+
		"<p>The storefront is about " + blueprint.length + " meters wide, with a low, cramped door accessible only through the " + checkAlleyLength() + " side alley."
	);
};

window.onload = (function powerOn() {
	var power = true;
	window.takinAnItem = false;
	window.usinAnItem = false;

	if (!!power) {
		writeLine("Welcome to Moving Sale, a game of horror, adventure, and escape.<p>" 
			+
			"<p>Enter a store size, in meters:");

		document.getElementById("input-zone").addEventListener("submit", submitAction, false);


		function submitAction(event) {
			var input = document.getElementById("user-input-field") 
				, inputVal;
			inputVal = input.value;
			if (debug) {console.log("inputVal = " + inputVal)} else {};
			// takinAnItem = false; // please never do this again: try to put the falsinator before the check for truth >_<+

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
					player.panic();
				},
				"?": function() {
					writeLine("<p>-----------------------------------------<br>"
						+ "You are playing a game from which there is no escape.<br>"
						+ "Not even God himself could help you. But me... I can try.<p>"
						+ "<p>Controls:<br>"
						+ "N,S,E,W: move around<p>"
						+ "I: check inventory<p>"
						+ "T: take an item<p>"
						+ "U: use item<p>"
						+ "L: look around...<p>")
				},
				d: function() {
					player.die();
				},
				l: function() {
					player.look();
				},
				t: function() {
					writeLine("Take which # item?");
					takinAnItem = true;
				},
				u: function() {
					writeLine("Use which # item?");
					player.displayInv();
					usinAnItem = true;
				},
				default: function() {
					writeLine("I don't understand your moonspeak....");
				}
			}

			event.preventDefault(); // this has to go after the actions object otherwise it breaks 

// below this massive line is where the game actualy interprets inputs. all code above this line is not interpretation.
// remember this for later before you spend 100,000 hours trying to figure your your stupid input parsing l0l
// ====================================================================================================================

			if (!!isGameIntro) {
				if (!!isInt(inputVal)) { // to-do: figure out how to check only the first input of the game... 
					if (debug) {console.log("inputVal = " + inputVal)} else {};
					writeLine("Generating store of size = " + inputVal + " meters...<p>" + "<p> -------------------------------------")
					var blueprintX = inputVal;
					var blueprintY = blueprintX;
					drawBlueprint(blueprintX, blueprintY); // i know it's redundant having two identical arguments, but it's a pain in the ass asking for two different values
				} else {
					var blueprintX = Math.floor(100 * Math.random() + 20); // just to fuck with them
					var blueprintY = blueprintX;
					writeLine("Invalid size. ('" + inputVal + "') Autogenerating store...")
					drawBlueprint(blueprintX, blueprintY);
				} isGameIntro = false;
				gameIntro();
			} else if (!!takinAnItem) { // are they trying to pick up an item? should only happen if they press t.
				var itemNumbah = inputVal;
				if (debug) {console.log("(taking an item) i'm trying to interpret " + itemNumbah)} else {};

				var takeDatItem = function() {	
					if (!!parseInt(itemNumbah)) {
						// todo in the morning: take the ITEM from itemLibrary, not just the string from item.desc...
						// "done": now finishing up and testing... 
						var itemInQuestion = thisRoomsItems[itemNumbah - 1]; 
						if (debug) {console.log("successfully parsed " + itemInQuestion.name)} else {};
						
						if (!!itemInQuestion) {
							player.inventory.push(itemInQuestion);
							blueprint[player.currentX][player.currentY].items.splice(itemNumbah - 1, 1);
							thisRoomsItems = blueprint[player.currentX][player.currentY].items;
							takinAnItem = false;
							if (debug) {console.log("just pushed " + itemInQuestion.name)} else {};
							writeLine("You pick up the " + itemInQuestion.name + " and place it in your inventory.");
						} else writeLine("Enter a valid item number.");
							// figure out how to parse invalid inputs.... also add a breaking mechanism!
							// writeLine("You fumble, and drop the "+itemInQuestion.name+" on the floor. You think you can see a fracture...");
							// itemInQuestion.condition--;
					} else {
						writeLine("There's nothing like that in this room.");
						takinAnItem = false;
					};
				}; takeDatItem(); // ALWAYS REMEMBER TO CALL FUNCTIONS AFTER YOU DEFINE THEM. 
			} else if (!!usinAnItem) {
				var itemNumbah = inputVal;
				if (debug) {console.log("(using an item) i'm trying to interpret " + itemNumbah)} else {};
				var itemInQuestion = player.inventory[itemNumbah - 1];
				if(!!isInt(itemNumbah) && !!itemInQuestion) {
					if (debug) {console.log("i can now use the " + itemInQuestion.name)} else {};
					if (itemInQuestion.condition === 0) {
						writeLine("The fragile "+itemInQuestion.name+" snaps in half.")
						q = player.inventory.indexOf(itemInQuestion); // remember how to do this: for arrays specifically.... 
						player.inventory.splice(q, 1);
					} else {
						itemInQuestion.condition--;
						itemInQuestion.use();
					};
				} else {
					writeLine("You aren't holding that.");
				}; 
				usinAnItem = false;
			} else (actions[inputVal] || actions.default)();

			input.select(); // makes it easy to re-enter text
		}
	};
})();

function isInt(i) {
	return !isNaN(i) && 
    parseInt(Number(i)) == i && 
    !isNaN(parseInt(i, 10));
};


// yay, it's the items file! 
// this was originally a separate file, but it kept causing errors because the page was trying to load undeclared variables.

// all items go here
window.itemLibrary = {
	// items are indexed by number because it's easier to code that way
	0: {
		// the name of the item
			name: "plank",
		// its in-game description
			desc: "A rotted wooden plank, run through with a jagged old nail.",
		// items this can interact with (format: [otherItem, action function]) // don't gave inter-item dunctionality yet but we're getting there...............
			use: function() {player.panic();},
		// uses left before breaking
			condition: 10,
		// can be equipped
			weapon: true,
		// damage dealt per round
			damage: 1,
		// set this to true once it's in a room, then, it won't be put in any other rooms. 
		// if false, it'll keep being put in randomly with the others.
			isInARoom: false
	},
	1: {
		name: "dead rat",
		desc: "A crisply mummified rat.",
		use: function() {writeLine("You pinch your nose, and force the dusty, empty-eyed rat inside your mouth. It tastes of hideous death. Faint with disgust, you keel over, and everything fades...");},
		condition: 1,
		weapon: false,
		damage: 0,
		isInARoom: false
	},
	2: {
		name: "wits",
		desc: "your wits",
		use: [["your hopes", "function() {player.panic();}"], ["your dreams", "sleep"]],
		condition: 5,
		weapon: true,
		damage: 5,
		isInARoom: true
	},
	3: {
		name: "hopes",
		desc: "your hopes",
		use: [["your wits", "function() {player.panic();}"], ["your dreams", "die"]],
		condition: -1,
		weapon: false,
		damage: 0,
		isInARoom: true
	},
	4: {
		name: "dreams",
		desc: "your dreams",
		use: [["your wits", "sleep"], ["your hopes", "die"]],
		condition: -1,
		weapon: false,
		damage: 0,
		isInARoom: true
	},
	5: {
		name: "rotten apple",
		desc: "A pile of flies, swarming on what might be an apple.",
		use: function() {writeLine("No. Ew.");},
		condition: 1,
		weapon: false,
		damage: 0,
		isInARoom: false
	},
	6: {
		name: "rusty pipe",
		desc: "A segment of old pipe.",
		use: function() {player.equip(this);},
		condition: 50,
		weapon: true,
		damage: 5,
		isInARoom: false
	},
	7: {
		name: "dirty doll",
		desc: "A worn-down doll with a cracked button eye. Seems to be missing a mouth.",
		use: [],
		condition: 5,
		weapon: false,
		damage: 0,
		isInARoom: false
	}
};
