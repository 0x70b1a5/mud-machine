var roomClass = function(attributes) {
	if (!!attributes) {
		this.x = attributes.x;
		this.y = attributes.y;
		this.desc = attributes.desc;
		this.items = attributes.items;
		this.actions = attributes.actions;
	} else {
		this.x = 0; 
		this.y = 0;
		this.desc = "You've reached an empty room. Oh my god!!>!"
		this.items = 0;
		this.actions = "panic";
	}
}; 

