window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 1000, 1000);
	var center = 500;
	var radius = 100;
//	var node_radius = 10;
	var min = 10;
	var max = 100;
	var red = 255;
	var blue = 255;
	var green = 255;
//    var circle = paper.circle(center, center, radius);

	var node_radius = getRandomArbitrary(min,max);
	var entitiesCount = getRandomArbitrary(min, max);
	
	var node_array = new Array(entitiesCount);
	var edge_array = new Array(entitiesCount);
	for(var i = 0; i < entitiesCount; i++) {
		console.log(circle_coords(i, entitiesCount));
		node_array[i] = paper.circle(center + circle_coords(i, entitiesCount).x * radius, center + circle_coords(i, entitiesCount).y * radius, node_radius);
		edge_array[i] = paper.path( ["M", center + circle_coords(i, entitiesCount).x * radius, center + circle_coords(i, entitiesCount).y * radius, "L", center + circle_coords(i+1, entitiesCount).x * radius, center + circle_coords(i+1, entitiesCount).y * radius ] );
		node_array[i].attr ("stroke", getRandomColor());
	}
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function circle_coords(theta_number, slices) {
	return {
		x: Math.cos(theta_number * (2 * Math.PI) / slices),
		y: Math.sin(theta_number * (2 * Math.PI) / slices)
	};
}