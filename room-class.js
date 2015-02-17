var room = function(attributes) {
	if (!!attributes) {
		this.x = attributes.x;
		this.y = attributes.y;
		this.desc = attributes.desc;
		this.items = attributes.items;
		this.actions = attributes.actions;
		this.isAWall = false;
	} else {
		this.x = 0; 
		this.y = 0;
		this.desc = "I'm a default room. Sup?"
		this.items = 0;
		this.actions = "panic";
		this.isAWall = false;
	}
}; 

