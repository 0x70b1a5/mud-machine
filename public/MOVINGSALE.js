
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
// [] 3. Make unique rooms!
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
			writeLine("And on the floor, there is: <br>");
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
			writeLine("You walk to the next room...");
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
			writeLine("#" + (player.inventory.indexOf(item) + 1) + ". " + item.name);
		})
	},

	// the only reaction i will ever need
	panic: function() {
		var madRamblings = ["<p>and.... and... oh god... oh NO.... OH GOD! I "];
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
			writeLine("You land a ferocious blow with the "+weapon.name+" and the "+enemy.name+" collapses, dead.");
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
		"<p> You are standing outside of a store. <p>"
		+
		"The store is only allegedly a store, because you can't see any indication that the dubious building slouching in front of you has ever been anything but an empty place for dreams to die. Then again, you could say that about this entire neighborhood, but that's a story for another game. Anyway, the internet says it's a store, so a store it must be. <p>"
		+
		"<p>'MOVING SALE', the tacky plastic tarp shouts at you. <br>" +
		"'Better than a garage sale, it's the whole house!'<p>"
		+
		"<p>You aren't sure what to make of that.<p>"
		+
		"<p>The storefront is about " + blueprint.length*10 + " meters wide, with a low, cramped door accessible only through the " + checkAlleyLength() + " side alley."
		+
		"<p>> Controls: N,S,E,W: move / I: inventory / ?: help<br>"
	);
};

window.onload = (function powerOn() {
	var power = true;
	window.takinAnItem = false;
	window.usinAnItem = false;
	window.combineItem = false;

	if (!!power) {
		writeLine("Welcome to Moving Sale, a game of horror, adventure, and escape.<p>"
			+
			"Please choose a size for the game world: (ex. '5', '20', '300')<p>"
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
					writeLine("<p>-----------------------------------------<br>"
						+ "You are playing a game from which there is no escape.<br>"
						+ "Not even God himself could help you. But me... I can try.<p>"
						+ "<p>Controls:<br>"
						+ "N,S,E,W: move around<p>"
						+ "I: check inventory<p>"
						+ "T: take an item<p>"
						+ "U: use item<p>"
						+ "C: combine items<p>"
						+ "L: look around...<p>")
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
// remember this for later before you spend 100,000 hours trying to figure your your stupid input parsing l0l
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
					writeLine("Generating store of size = " + inputVal*10 + " meters...<p>" + "<p> -------------------------------------")
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
							if (anItem.use[i][0] === "player") {
								anItem.use[i][1](); 
							} else {
								writeLine("You shouldn't do that to yourself.");
							};
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
			isInARoom: false
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
		isInARoom: false
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
		isInARoom: true
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
		isInARoom: true
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
		isInARoom: true
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
		isInARoom: false
	},
	6: {
		name: "rusty pipe",
		desc: "A segment of old pipe.",
		use: 	[
					["default", function() {player.equip(itemLibrary[6])}],
					["player", function() {
						writeLine("You bash yourself in the head. <p> CLANG.... <p> and your vision swims... <p> You feel dizzy... might want to wait a few minutes before trying that one again.");
						player.vitality--;
					}],
					["dead rat", function() {player.kill(itemLibrary[1], itemLibrary[6])}],
					["dirty doll", function() {player.kill(itemLibrary[7], itemLibrary[6])}]
				],
		condition: 50,
		weapon: true,
		damage: 5,
		isInARoom: false
	},
	7: {
		name: "dirty doll",
		desc: "A worn-down doll with a cracked button eye. Seems to be missing a mouth.",
		use: 	[ 
					["default", function() {writeLine("As you stare at the doll and consider what you should do with it, you find its broken eye strangely captivating. Something about the pattern in the plastic, and the way the coarse string has been woven through the odd number of button-holes, seems to draw you in. You want to keep looking. The dark patch where the doll's mouth should have been almost quivers as though it's going to speak, and then -- <p> Ah, what was that? Hm, must have been a rat or something in the next room.");}], 
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
		isInARoom: false
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
		isInARoom: false
	},
	9: {
		name: "syringe",
		desc: "One long, wicked hypodermic needle, recently used. You narrowly avoided stepping on it...",
		use: 	[
					["default", function() {player.equip(itemLibrary[9])}],
					["player", function() {
						writeLine("You gore yourself with the sickening point of the contaminated needle. A purple stream of blood pumps out of the wound - a messy job you've made of it. But you thumb the plunger all the same, squeezing the last bit of... whatever it was... into your bloodstream. <p> Your heart begins to surge with adrenaline. Is it excitement? Or is the substance working itself through your system? Either way, you're bleeding pretty badly...");
						player.bleeding = true;
					}]
				],
		condition: 5,
		weapon: true,
		damage: 6,
		isInARoom: false
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
		isInARoom: false
	}
};