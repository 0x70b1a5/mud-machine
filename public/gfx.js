drawMap = function() {
	carto = ["/="]; // corner of border
	var wallOne = 24;
	for (i=0; i<wallOne; i++) {
		carto.push("==");
	};
	carto.push("=\\<p>");
	for (x=currentRoom.x-10; x<currentRoom.x+10; x++) {
		carto.push("||");
		for (y=currentRoom.y-12; y<currentRoom.y+12; y++) {
			if (currentRoom.x === x && currentRoom.y === y) {
				carto.push("<span id='player-icon'>/\\</span>");
			} else {
				if (blueprint[x] && blueprint[x][y]) {
					blueprint[x][y].isAWall ? carto.push("||") : carto.push("__");
				} else {
					carto.push("~~");
				}
			}
		};
		carto.push("||<p>"); // the border
	};
	carto.push("\\=");
	var wallTwo = wallOne; // for solidarity :)
	for (i=0; i<wallOne; i++) {
		carto.push("==");
	};
	carto.push("=/");
	carto[0] = carto.join("");
	document.getElementById("gfx").innerHTML = "";
	document.getElementById("gfx").innerHTML = carto[0];
};

document.getElementById("input-zone").addEventListener("submit", drawMap, false);