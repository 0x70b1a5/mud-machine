// master map of rooms
var room = {
	"x0y0": null,
	"x0y1": {
		desc: "this is room #01. welcome!",
		items: ["puppy", "machete", "urn of ashes"]
	},
	"x0y2": "this is room #02. welcome!", 
	"x0y3": null, 
	"x0y4": null,
	"x0y5": "this is room #05. welcome!",
	"x0y6": "this is room #06. welcome!", 
	"x0y7": "this is room #07. welcome!",
	"x1y0": "this is room #10. welcome!", 
	"x1y1": "this is room #11. welcome!", 
	"x1y2": "this is room #12. welcome!", 
	"x1y3": "this is room #13. welcome!", 
	"x1y4": "this is room #14. welcome!",
	"x1y5": "this is room #15. welcome!",
	"x1y6": "this is room #16. welcome!", 
	"x1y7": "this is room #17. welcome!",
	"x2y0": null, 
	"x2y1": "this is room #21. welcome!", 
	"x2y2": "this is room #22. welcome!", 
	"x2y3": null, 
	"x2y4": null,
	"x2y5": "this is room #25. welcome!",
	"x2y6": "this is room #26. welcome!", 
	"x2y7": "this is room #27. welcome!"
};

var blueprint = function(xSize, ySize) {
	for (var x = 0; x <= xSize; x++) {
		for (var y = 0; y <= ySize; y++) {
			var objname = "x" + x + "y" + y;
			room[objname];
		}
	}
}