
hasCarto = false;

drawMap = function() {
	carto = [];
	for (x=0; x<blueprint.length; x++) {
		for (y=0; y<blueprint.length; y++) {
			if (currentRoom.x === x && currentRoom.y === y) {
				carto.push("/\\");
			} else {
				blueprint[x][y].isAWall ? carto.push("||") : carto.push("__");
			}
		};
		carto.push("<p>");
	};
	carto[0] = carto.join("");
	document.getElementById("gfx").innerHTML = "";
	document.getElementById("gfx").innerHTML = carto[0];
};

document.getElementById("input-zone").addEventListener("submit", drawMap, false);