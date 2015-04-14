
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
// fear not, for soon, you won't be asking when it starts.... but when it ends!..... 
// ~~~ ooooh ~~~

// a bunch of boring code:

// TO DO LIST!
// ===========
// [x] 1. Differentiate between item DEFAULT actions, and item combine-with-player actions!
// [] 2. Make more items!
// [x] 3. Make unique rooms!
// [] 4. More room attributes!
// [] 4.5 Including generated descriptions that aren't its xy coords...............................
// [] 5. Player bleeding condition! 
// [] 6. & other conditions?

// global debug switch
window.debug = true; 

var isGameIntro = true; // if intro, then forbids player from submitting non-integers into the world-gen function.

// the player
window.currentRoom = {
	x: 0,
	y: 0
};

window.player = {
	currentX: 0,
	currentY: 0,

	// kills the player
	die: function() {
		writeLine("Exhausted, defeated, at the end of your rope... Across the room, something that once might have been a window is now molded and overgrown with unspeakable masses of tumorous celluloid. Below it on the floor, you manage to find a jagged shard of glass. Without hesitation, your grip not trembling, but steady - you slice your wrists open down the length of your forearms, and everything fades.");
		window.setInterval(player.panic, 10000);
		window.setInterval((function() { document.location.reload(); }), 20000);
	},

	// looks around the room
	look: function() {
		window.currentRoom = blueprint[this.currentX][this.currentY]; 
		writeLine(currentRoom.desc);

		thisRoomsItems = [];
		for (i = 0; i < currentRoom.items.length; i++) {
			thisRoomsItems.push(currentRoom.items[i]);
			blueprint[this.currentX][this.currentY].items[i].shift;
		};
		if (thisRoomsItems.length > 0) {
			writeLine("And on the floor, there is: \n");
			for (i = 0; i < currentRoom.items.length; i++) 
				writeLine(thisRoomsItems[i].desc);
		} else writeLine("The moldy floor is cluttered with worthless trash.")
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
			this.look(); // automagically looks around the room when you move to it
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
			writeLine("#" + (player.inventory.indexOf(item) + 1) + ". " + item.name);
		})
	},

	// the only reaction i will ever need
	panic: function() {
		var madRamblings = ["\nand.... and... oh god... oh NO.... OH GOD! I "];
		for (var p = 0; p <= Math.floor(1000*Math.random()); p++) {
			var wordOfTruth = Math.floor(100*Math.random());
			var gospelOfElderOnes = ["horrible", "dark", "AAAAAA", "DID YOU SEE THAT?", "hate. hate.", 
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
	},

	useItem: function(item) {
		item.use[0][1]();				// yeah i know it's useless. will leave this open for another solution later or something?
										// update: this is no longer useless. item.use[0][1] will be the default use, but i can 
										//			use item["player"][1] to differentiate between default-use and combine-with-player
	},

	kill: function(enemy, weapon) {
		// add combat stuff later

		if (enemy && weapon && weapon.weapon === true) {
			writeLine("You land a ferocious blow with the "+weapon.name+", destroying the "+enemy.name+".");
			// okay it's basic. add enemies.

		} else if (enemy) {
			writeLine("You destroy the "+enemy.name+" with savage hands.");
		} else {
			writeLine("Who are you trying to kill? Yourself?...");
		}
	},

	bleeding: false,

	vitality: 10,
};

setInterval(function() {
	if (player.bleeding === true) {
		player.vitality -= 0.1;
		writeLine("Blood continues to leak out of your wound...");
		if (player.vitality < 4) {
			writeLine("The room swims around you, and your vision wavers...");
		} else {};
	} else {};
}, 10000);

// outputting text to #terminal 
function writeLine(words) {
	var terminal = document.getElementById("terminal");
	var newLine = document.createTextNode(words);
	terminal.appendChild(newLine);
	terminal.appendChild(document.createElement("BR"));
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
		"\n You are standing outside of a store. \n"
		+
		"The store is only allegedly a store, because you can't see any indication that the dubious building slouching in front of you has ever been anything but an empty place for dreams to die. Then again, you could say that about this entire neighborhood, but that's a story for another game. Anyway, the internet says it's a store, so a store it must be. \n"
		+
		"\n'MOVING SALE', the tacky plastic tarp shouts at you. \n" +
		"'Better than a garage sale, it's the whole house!'\n"
		+
		"\nYou aren't sure what to make of that.\n"
		+
		"\nThe storefront is about " + blueprint.length*10 + " meters wide, with a low, cramped door accessible only through the " + checkAlleyLength() + " side alley."
		+
		"\n> Controls: N,S,E,W: move / I: inventory / ?: help\n"
	);
};

window.onload = (function powerOn() {
	var power = true;
	window.takinAnItem = false;
	window.usinAnItem = false;
	window.combineItem = false;

	if (!!power) {
		writeLine("Welcome to Moving Sale, a game of horror, adventure, and escape.\n"
			+
			"Please choose a size for the game world: (ex. '5', '20', '300')\n"
		);

		document.getElementById("input-zone").addEventListener("submit", submitAction, false);


		function submitAction(event) {
			var input = document.getElementById("user-input-field") 
				, inputVal;
			inputVal = input.value;
			inputVal = inputVal.toLowerCase();
			if (debug) {console.log("inputVal = " + inputVal)} else {};
			// takinAnItem = false; // please never do this again: try to put the falsinator before the check for truth >_<+

			var actions = {
				n: function() {
					player.setPosition(player.currentX - 1, player.currentY);
				},
				s: function() {
					player.setPosition(player.currentX + 1, player.currentY);
				},
				w: function() {
					player.setPosition(player.currentX, player.currentY - 1);
				},
				e: function() {
					player.setPosition(player.currentX, player.currentY + 1);
				},
				i: function() {
					player.displayInv();
				},
				p: function() {
					player.panic();
				},
				"?": function() {
					writeLine("\n-----------------------------------------\n"
						+ "You are playing a game from which there is no escape.\n"
						+ "Not even God himself could help you. But me... I can try.\n"
						+ "\nControls:\n"
						+ "N,S,E,W: move around\n"
						+ "I: check inventory\n"
						+ "T: take an item\n"
						+ "U: use item\n"
						+ "C: combine items\n"
						+ "L: look around...\n")
				},
				d: function() {
					player.die();
				},
				l: function() {
					player.look();
				},
				t: function() {
					if (currentRoom.items.length > 0) {
						writeLine("Take which # item? (ex. '1' '5')");
						for (i = 0; i < currentRoom.items.length; i++) 
							writeLine("#"+(i+1)+". "+thisRoomsItems[i].desc);
						takinAnItem = true;
					} else {
						writeLine("There's nothing of value to take in this room.");
					}
				},
				u: function() {
					writeLine("Use which # item?");
					player.displayInv();
					usinAnItem = true;
				},
				c: function() {
					writeLine("What will you combine? (ex: '1,2' '3,5' '6,1')");
					player.displayInv();
					writeLine("#"+(player.inventory.length+1)+". yourself");
					combineItem = true;
				},
				default: function() {
					writeLine("?");
				}
			};

			event.preventDefault(); // this has to go after the actions object otherwise it breaks 

// below this massive line is where the game actualy interprets inputs. all code above this line is not interpretation.
// remember this for later before you spend 100,000 hours trying to figure out your stupid input parsing l0l
// ====================================================================================================================
			
			var parseItem = function(input, container) {
				if (debug) {console.log("(parsing an item) i'm trying to interpret " + input)} else {};
				if (!!isInt(input) && !!container[input]) {
					if (debug) {console.log("successfully parsed " + container[input].name)} else {};
					return true;
				} else {console.log("item not found in "+container+"!")};
			};

			if (!!isGameIntro) {
				if (!!isInt(inputVal)) { // to-do: figure out how to check only the first input of the game... 
					if (debug) {console.log("inputVal = " + inputVal)} else {};
					writeLine("Generating store of size = " + inputVal*10 + " meters...\n" + "\n -------------------------------------")
					var blueprintX = inputVal;
					var blueprintY = blueprintX;
					drawBlueprint(blueprintX, blueprintY); // i know it's redundant having only square stores, but it's a pain in the ass asking for two different side lenghs
				} else {
					var blueprintX = Math.floor(100 * Math.random() + 20); // just to fuck with them
					var blueprintY = blueprintX;
					writeLine("Invalid size. ('" + inputVal + "') Autogenerating store...")
					drawBlueprint(blueprintX, blueprintY);
				} isGameIntro = false;
				gameIntro();
			} else if (!!takinAnItem) { // are they trying to pick up an item? should only happen if they press t.
				var takeDatItem = function() {	
					if (parseItem((inputVal - 1), thisRoomsItems)) {
						// todo in the morning: take the ITEM from itemLibrary, not just the string from item.desc...
						// "done": now finishing up and testing... 
						var itemInQuestion = thisRoomsItems[inputVal - 1]; 
						
						if (!!itemInQuestion) {
							player.inventory.push(itemInQuestion);
							blueprint[player.currentX][player.currentY].items.splice(inputVal - 1, 1); // we have to take it from the room in the blueprint, not "thisRoomsItems", which is actually just a copy of the blueprint...
							thisRoomsItems = blueprint[player.currentX][player.currentY].items;
							takinAnItem = false;
							if (debug) {console.log("just pushed " + itemInQuestion.name)} else {};
							writeLine("You pick up the " + itemInQuestion.name + " and place it in your inventory.");
						} else writeLine("Try again.");
							// figure out how to parse invalid inputs.... also add a breaking mechanism! 
							// writeLine("You fumble, and drop the "+itemInQuestion.name+" on the floor. You think you can see a fracture...");
							// itemInQuestion.condition--;
					} else {
						writeLine("There's nothing like that in this room.");
						takinAnItem = false;
					};
				}; takeDatItem(); // ALWAYS REMEMBER TO CALL FUNCTIONS AFTER YOU DEFINE THEM. 
			} else if (!!usinAnItem) {
				if (parseItem(inputVal - 1, player.inventory)) {
					var itemInQuestion = player.inventory[inputVal - 1];
					if (debug) {console.log("i can now use the " + itemInQuestion.name)} else {};
					--itemInQuestion.condition;
					player.useItem(itemInQuestion);
					if (itemInQuestion.condition === 0) {
						writeLine("The fragile "+itemInQuestion.name+" snaps in half.")
						var q = player.inventory.indexOf(itemInQuestion); // remember how to do this, remove a single element: for arrays specifically.... not objects
						player.inventory.splice(q, 1); // starting at q, splice 1 item
					} else {
						// do nothing, the item is fine
					};
				} else {
					writeLine("You aren't holding that.");
				}; 
				usinAnItem = false;
			} else if (!!combineItem) {		// kind of complicated, but: this thing crawls through all items, 
											// finds its .use array, searches the sub-arrays for other
											// items that can be combined, and runs the function paired with
											// that other item.
				var canUse = false;
				combineItem = false;
				
				inputVal.toString(); 
				var item1 = inputVal.slice(0,1) - 1;		// subtract 1 because the inventory numbering starts at 1
				var item2 = inputVal.slice(2,3) - 1;
				if (debug) console.log(item1, item2); else;
				if (parseItem(item1, player.inventory) && parseItem(item2, player.inventory)) { // this is about to get really ugly. i apologize in advance
					if (typeof(player.inventory[item1].use) == "object") {
						(function() {
							
							for (i = 0; i < player.inventory[item1].use.length; i++) {
								if (debug) console.log("this is working: "+i); else;
								if (player.inventory[item1].use[i][0] === player.inventory[item2].name) {
									canUse = true;
									return player.inventory[item1].use[i][1](player.inventory[item2]); 
								} else {									
									if (debug) console.log("i tried to find "+player.inventory[item1].name+"'s use function for "+player.inventory[item2].name+" and failed"); else;
								};
							};
						})(); 

						if (canUse) {
							writeLine("You combine the "+player.inventory[item1].name+" with the "+player.inventory[item2].name+"...");
						} else {
							writeLine("You can't think of a way to combine those.");
						};
					} else {
						writeLine("Nothing happens.");
					};
				} else if (Math.max(item1,item2) === player.inventory.length) { // indicates player is attempting to use item with themselves
					var nonPlayerItem = player.inventory[Math.min(item1,item2)];						// indicates which slot is not the player (e.g. 2,1 or 1,2 both return 1)

					var playerCombine = function(anItem) {
						for (i = 0; i < anItem.use.length; i++) {
							var usedIt = false;
							if (anItem.use[i][0] === "player") {
								usedIt = true;
								anItem.use[i][1](); 
							};
							if (!usedIt) writeLine("You shouldn't do that to yourself.");
						};
					};
					playerCombine(nonPlayerItem);
				};
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

function ProtoItem(name, desc, use, condition) {
	this.name = name || "i have no name";
	this.desc = desc || "i am nothing";
	this.use = use || [["default", "You have no idea how to use this."]];
	this.condition = condition || -1; 
	this.weapon = false;
	this.damage = 0;
	this.isInARoom = false;
	this.unique = true;
};

// yay, it's the items file! 
// this was originally a separate file, but it kept causing errors because the script loaded before the other variables.

// all items go here
window.itemLibrary = {
	// items are indexed by number because it's easier to code that way
	0: {
		// the name of the item
			name: "plank",
		// its in-game description
			desc: "A rotted wooden plank, run through with a jagged old nail.",
		// items this can interact with (format: [otherItem, action function]) // don't have inter-item dunctionality yet but we're getting there...............
			use: 	[
						["default", function() {player.equip(itemLibrary[0])}],
						["player", function() {writeLine("You think about it for a moment, but eventually decide not to run the jagged nail through your forehead.")}],
						["dead rat", function() {player.kill(itemLibrary[1], itemLibrary[0]);}],
						["dirty doll", function() {player.kill(itemLibrary[7], itemLibrary[0])}]
					],
		// uses left before breaking
			condition: 10,
		// can be equipped
			weapon: true,
		// damage dealt per round
			damage: 1,
		// set this to true once it's in a room, then, it won't be put in any other rooms. 
		// if false, it'll keep being put in randomly with the others.
			isInARoom: false,
			unique: true
	},
	1: {
		name: "dead rat",
		desc: "A crisply mummified rat.",
		use: 	[ 
					["default", function() {writeLine("Eugh. It's gotten crusty.")}],
					["player", function() {writeLine("You pinch your nose, and force the dusty, empty-eyed rat inside your mouth. It tastes of hideous death. Faint with disgust, you keel over, and everything fades...");}], 
					["plank", function() {player.kill(itemLibrary[1], itemLibrary[0]);}],
					["rusty pipe", function() {player.kill(itemLibrary[1], itemLibrary[6]);}]
				],
		condition: 1,
		weapon: false,
		damage: 0,
		isInARoom: false,
		unique: true
	},
	2: {
		name: "wits",
		desc: "your wits",
		use: 	[
					["your hopes", function() {player.panic();}], ["your dreams", "sleep"]
				],
		condition: 5,
		weapon: true,
		damage: 5,
		isInARoom: true,
		unique: true
	},
	3: {
		name: "hopes",
		desc: "your hopes",
		use: 	[
					["your wits", function() {player.panic();}], ["your dreams", "die"]
				],
		condition: -1,
		weapon: false,
		damage: 0,
		isInARoom: true,
		unique: true
	},
	4: {
		name: "dreams",
		desc: "your dreams",
		use: 	[
					["your wits", "sleep"], ["your hopes", "die"]
				],
		condition: -1,
		weapon: false,
		damage: 0,
		isInARoom: true,
		unique: true
	},
	5: {
		name: "rotten apple",
		desc: "A pile of flies, swarming on what might be an apple.",
		use: 	[
					["default", function() {writeLine("No. Ew.");}],
					["player", function() {writeLine("Against better judgment, you decide to snack on the putrid fruit. Your teeth sink into a squirming bed of maggots, popping their ripe guts, steaming, still writhing onto your tongue, smothering it with the abhorrent slime of decay.")}]
				],
		condition: 1,
		weapon: false,
		damage: 0,
		isInARoom: false,
		unique: true
	},
	6: {
		name: "rusty pipe",
		desc: "A segment of old pipe.",
		use: 	[
					["default", function() {player.equip(itemLibrary[6])}],
					["player", function() {
						writeLine("You bash yourself in the head. \n CLANG.... \n and your vision swims... \n You feel dizzy... might want to wait a few minutes before trying that one again.");
						player.vitality--;
					}],
					["dead rat", function() {player.kill(itemLibrary[1], itemLibrary[6])}],
					["dirty doll", function() {player.kill(itemLibrary[7], itemLibrary[6])}]
				],
		condition: 50,
		weapon: true,
		damage: 5,
		isInARoom: false,
		unique: true
	},
	7: {
		name: "dirty doll",
		desc: "A worn-down doll with a cracked button eye. Seems to be missing a mouth.",
		use: 	[ 
					["default", function() {writeLine("As you stare at the doll and consider what you should do with it, you find its broken eye strangely captivating. Something about the pattern in the plastic, and the way the coarse string has been woven through the odd number of button-holes, seems to draw you in. You want to keep looking. The dark patch where the doll's mouth should have been almost quivers as though it's going to speak, and then -- \n Ah, what was that? Hm, must have been a rat or something in the next room.");}], 
					["plank", function() {player.kill(itemLibrary[7], itemLibrary[0]);}],
					["rusty pipe", function() {player.kill(itemLibrary[7], itemLibrary[6]);}],
					["player", function() {
						writeLine("The doll bites your finger!");
						player.vitality--;
					}]
					//
					// combat START!
					//
				],
		condition: 5,
		weapon: false,
		damage: 0,
		isInARoom: false,
		unique: true
	},
	8: {
		name: "odd coin",
		desc: "An antique coin, carved with the face of a lost monarch.",
		use: 	[
					["default", function() {writeLine("The coin's surface has scratched and battered with age, rendering the ruler, and the thorny, twisted crest on the opposite side, inscrutable. Remarkable, to be sure. Bronze? Hints of silver? You can't be certain. It gleams, although the light is dim.")}],
					["player", function() {
						writeLine("You bite the coin. It seems to be genuine. Heavy for its size, but metal. Leaves a weird taste in your mouth.");
						player.vitality--;
					}]
				],
		condition: -1,
		weapon: false,
		damage: 0,
		isInARoom: false,
		unique: true
	},
	9: {
		name: "syringe",
		desc: "One long, wicked hypodermic needle, recently used. You narrowly avoided stepping on it...",
		use: 	[
					["default", function() {player.equip(itemLibrary[9])}],
					["player", function() {
						writeLine("You gore yourself with the sickening point of the contaminated needle. A purple stream of blood pumps out of the wound - a messy job you've made of it. But you thumb the plunger all the same, squeezing the last bit of... whatever it was... into your bloodstream. \n Your heart begins to surge with adrenaline. Is it excitement? Or is the substance working itself through your system? Either way, you're bleeding pretty badly...");
						player.bleeding = true;
					}]
				],
		condition: 5,
		weapon: true,
		damage: 6,
		isInARoom: false,
		unique: true
	},
	10: {
		name: "rocking-horse",
		desc: "A child's rocking-horse with a roughly carved head and grinning mouth.",
		use: 	[
					["default", function() {
						writeLine("You mount the flimsy thing, but you feel ridiculou -- CRACK!");
						this.condition = 0;
					}],
					["player", function() {
						writeLine("You mount the flimsy thing, but you feel ridiculou -- CRACK!");
						this.condition = 0;
					}]
				],
		condition: 3,
		weapon: false,
		damage: 0,
		isInARoom: false,
		unique: true
	},
	11: {
		name: "zombie",
		desc: "A half-dead slobbering thing, which occasionally mumurs. It can't weigh more than 50 pounds damp. You might even pick it up, if you really wanted to...",
		use: 	[
					["default", function() {
						writeLine("You doubt the poor vegetable could be feasibly used for anything at all.");
					}],
					["rusty pipe", function() {player.kill(itemLibrary[11], itemLibrary[6])}],
					["plank", function() {player.kill(itemLibrary[11], itemLibrary[0])}],
					["odd coin", function() {writeLine("Its vacant eyes seem to focus for a moment on the bizarre glint of the coin's unknown metal, but... nothing.")}],
					["player", function() {writeLine("You attempt to speak with it, but the limp wretch can only drool.")}]
				],
		condition: 5,
		weapon: false,
		damage: 0,
		isInARoom: true,
		unique: true
	},
	12: {
		name: "pebble",
		desc: "A tiny rock.",
		use: 	[
					["default", function() {
						writeLine("You can't fathom how you could possibly use a pebble.");
					}],
					["player", function() {
						writeLine("Well, if you insist. \n You eat the pebble. You're not dumb enough to chew it, but you cough as it's on the way down.");
					}]
				],
		condition: -1,
		weapon: false,
		damage: 0,
		isInARoom: false,
		unique: false
	},
	13: new ProtoItem(
		"screwdriver",
		"A flathead screwdriver, slightly bent. The grip has some grease on it.")
};

// BEGIN ROOMS SECTION!

// // master map of rooms
// var room = {
// 	"x0y1": {
// 		desc: "this is room #01. welcome!",
// 		items: ["puppy", "machete", "urn of ashes"]
//  }
// };

// starting empty blueprint
window.blueprint = [];

// makes a complex store array of arbitrary size (note: currently only for square stores)
var drawBlueprint = function(xSize, ySize) {
	for (var x = 0; x < xSize; x++) {
		window.blueprint[x] = [];
		for (var y = 0; y < ySize; y++) {
			window.blueprint[x][y] = new Room(); // gives each room the default attributes 
			var count = 0;
			for (var k in RoomLibrary) if (RoomLibrary.hasOwnProperty(k)) ++count; // counts the number of unique rooms 
			var uniqueRoomChance = 0.3; 
			var randUniqRm = RoomLibrary[Math.floor(Math.random()*count)];
			var theArbiter = Math.random();
			
			if (theArbiter < uniqueRoomChance && theArbiter < randUniqRm.prob && randUniqRm.exists === false) {
				randUniqRm.exists = true;
				blueprint[x][y]	= randUniqRm;
			} else {
				blueprint[x][y].desc = "Room #"+x+", "+y;	// current, boring default description
				if ((x === 0 && y === 1) || (x === 0 && y === 0)) { // the first two rooms shouldn't be walls...
					blueprint[x][y].isAWall = false;
					blueprint[x][y].items = []; // no items in the first two rooms
				} else {
					populateItems(blueprint[x][y]); 
				}; 
				if (!!Math.floor(4*Math.random())) {
					blueprint[x][y].isAWall = false;
				} else {
					// room is a wall	
				};
			}

			blueprint[x][y].x = x; 
			blueprint[x][y].y = y;

		}
	};
	return window.blueprint;
	if (debug) console.log(window.blueprint); else {}
};

var populateItems = function(room) {
	room.items = [];
	if (!!Math.floor(Math.random()*10)) {
		for (i = 0; i <= Math.floor(Math.random()*10); i++) { // 90% chance to add 1-10 items to a room
			var totalNumberItems = 0;
			var count = 0;
			for (var k in itemLibrary) if (itemLibrary.hasOwnProperty(k)) ++count; // since there's no clean way to find the number of properties in an object, 

			var randomItem = itemLibrary[Math.floor(Math.random()*count)];
			if (!randomItem.isInARoom)	{ // won't add unique items to rooms if they've already been pushed /// QUIT DOING THAT STUFF WITH THE NO BRACKETS
				room.items.push(randomItem); // randomly adds i number of items from from itemLibrary
				if (!randomItem.unique) { 
					// do nothing
					// don't set "isInARoom" to true, thereby continuing to populate rooms with it!
				} else randomItem.isInARoom = true;
			} else {};
		}
	} else {}; 
};

Room = function(desc, items, actions, isAWall, prob) {
	this.x = 0;
	this.y = 0;
	this.desc = desc;
	this.items = items;
	this.actions = actions;
	this.isAWall = true;
	this.prob = prob;
	this.exists = false;
};


// list of unique rooms

kitchen = new Room(
	"Some kind of machine lays in the center of the room, its wires and entrails cast about on the floor, like carrion. Mercifully, the thing is just a machine... but somehow, the autopsy is none the less disturbing. \n Heaps of trash and discarded food sag on the peeling counters and tabletop. The air burns your lungs as you inhale. A fly slips up your nose and you sneeze violently. The room is thick with the poisonous, hateful squelch of squirming maggots and buzzing flies. A narrow path of linoleum seems to have been carved out of the muck on the floor.",
	[],
	[],
	false,
	0.05
);

livingRoom = new Room(
	"Between the teetering piles of garbage and shelves full of decaying food, something like a light is shining between the cracks. Looking closer, it's making noise, too. A television? And across from it... dear God... something barely human, flaccid on a festering armchair, its skin flowing off its limbs like sickly rubber, gaping numbly at the antique television set with dying eyes...",
	[itemLibrary[11]],
	[],
	false,
	0.05
);

RoomLibrary = {
	0: kitchen,
	1: livingRoom
};