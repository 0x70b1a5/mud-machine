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
				blueprint[x][y].desc += "Room #"+x+y;	// current, boring default description
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
				randomItem.isInARoom = true;
			} else {};
		}
	} else {}; 
};


// default room: a wall that talks to you
Room = function(template) {
	if (!!template) {
		this.desc = template.desc;
		this.items = template.items;
		this.actions = template.actions;
		this.isAWall = false;
		this.prob = template.prob;
		this.exists = false;
	} else {
		this.x = 0; 
		this.y = 0;
		this.desc = "";
		this.items = "There are no items in this room.";
		this.actions = "panic";
		this.isAWall = true;
		this.prob = 1;
		this.exists = true;
	}
}; 

RoomTemplate = function(desc, items, actions, isAWall, prob) {
	this.desc = desc;
	this.items = items;
	this.actions = actions;
	this.isAWall = isAWall;
	this.prob = prob;
	this.exists = false;
};


// list of unique rooms

kitchen = new RoomTemplate(
	"Some kind of machine lays in the center of the room, its wires and entrails cast about on the floor, like carrion. Mercifully, the thing is just a machine... but somehow, the autopsy is none the less disturbing. \n Heaps of trash and discarded food sag on the peeling counters and tabletop. The air burns your lungs as you inhale. A fly slips up your nose and you sneeze violently. The room is thick with the poisonous, hateful squelch of squirming maggots and buzzing flies. A narrow path of linoleum seems to have been carved out of the muck on the floor.",
	[],
	[],
	false,
	0.05
);
kitchen = new Room(kitchen);

livingRoom = new RoomTemplate(

);


RoomLibrary = {
	0: kitchen
};