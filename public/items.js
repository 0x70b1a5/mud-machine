
// yay, it's the items file!

// all items go here
window.itemLibrary = {
	// items are indexed by number because it's easier to code that way
	0: {
		// the name of the item
			name: "plank",
		// its in game description
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
		use: function() {writeLine("No. Ew.")},
		condition: 1,
		weapon: false,
		damage: 0,
		isInARoom: false
	},
	6: {
		name: "rusty pipe",
		desc: "A segment of old pipe.",
		use: player.equip(this),
		condition: 50,
		weapon: true,
		damage: 5,
		isInARoom: false
	}
};

// the function for using an item
//// see: the window.player object in MOVINGSALE.js
