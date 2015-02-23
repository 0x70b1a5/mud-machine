//default room: a wall that talks to you
var room = function(template) {
	if (!!template) {
		this.x = template.x;
		this.y = template.y;
		this.desc = template.desc;
		this.items = template.items;
		this.actions = template.actions;
		this.isAWall = false;
	} else {
		this.x = 0; 
		this.y = 0;
		this.desc = "";
		this.items = "There are no items in this room.";
		this.actions = "panic";
		this.isAWall = true;
	}
}; 

roomTemplate = function(x, y, desc, items, actions, isAWall) {
	this.x = x;
	this.y = y;
	this.desc = desc;
	this.items = items;
	this.actions = actions;
	this.isAWall = isAWall;
};

kitchen = roomTemplate(10,7,"Some kind of machine lays in the center of the room, its wires and entrails cast about on the floor, like carrion. Mercifully, the thing is just a machine... but somehow, the autopsy is none the less disturbing.",
								[],
								[],
								false);
