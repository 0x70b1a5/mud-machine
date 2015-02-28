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
			window.blueprint[x][y] = new room(); // gives each room the default attributes 
			blueprint[x][y].desc += "#"+x+y;
			blueprint[x][y].x = x; blueprint[x][y].y = y;
			populateItems(blueprint[x][y]);
			if ((x === 0 && y === 1) || (x === 0 && y === 0)) {
				blueprint[x][y].isAWall = false;
			} else {}; // the first two rooms shouldn't be walls...
			if (!!Math.floor(5*Math.random())) 
				blueprint[x][y].isAWall = false; else {};
		}
	};
	return window.blueprint;
	if (debug) console.log(window.blueprint); else {}
};

var populateItems = function(room) {
	room.items = [];
	if (!!Math.floor(Math.random()*10)) {
		for (i = 0; i <= Math.floor(Math.random()*10); i++) // 90% chance to add 1-10 items to a room
			var totalNumberItems = 0;
			var count = 0;
			for (var k in itemLibrary) if (itemLibrary.hasOwnProperty(k)) ++count; // since there's no clean way to find the number of properties in an object, 

			var randomItem = itemLibrary[Math.floor(Math.random()*count)];
			if (!randomItem.isInARoom)	{ // won't add unique items to rooms if they've already been pushed /// QUIT DOING THAT STUFF WITH THE NO BRACKETS
				room.items.push(randomItem); // randomly adds i number of items from from itemLibrary
				randomItem.isInARoom = true;
			} else {};
	} else {}; 
};