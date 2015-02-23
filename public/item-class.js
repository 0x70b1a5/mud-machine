// trying to make an item object prototype? 
itemProto = function Object(name, desc, useWith, condition, weapon, damage) {
	name = this.name;
	desc = this.desc;
	useWith = this.useWith;
	condition = this.condition;
	weapon = this.weapon;
	damage = this.damage;
	isInARoom = false;
};

var balloon = new itemProto("balloon", "a partially deflated, dull-red balloon.", [["needle", "pop balloon"],["player", "suffocate"]], 1, false, 0);