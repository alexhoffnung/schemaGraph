window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);
	var center = 200;
	var radius = 100;
	var node_radius = 10;
//    var circle = paper.circle(center, center, radius);

	var entitiesCount = 9;
	var items = [
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0]
	];
	
	var node_array = new Array(entitiesCount);
	var edge_array = new Array(entitiesCount);
	
    for(var i = 0; i < entitiesCount; i++) {
		console.log(circle_coords(i, entitiesCount));
		node_array[i] = paper.circle(center + circle_coords(i, entitiesCount).x * radius, center + circle_coords(i, entitiesCount).y * radius, node_radius);
		edge_array[i] = paper.path( ["M", center + circle_coords(i, entitiesCount).x * radius, center + circle_coords(i, entitiesCount).y * radius, "L", center + circle_coords(i+1, entitiesCount).x * radius, center + circle_coords(i+1, entitiesCount).y * radius ] );
	}
}

function circle_coords(theta_number, slices) {
	return {
		x: Math.cos(theta_number * (2 * Math.PI) / slices),
		y: Math.sin(theta_number * (2 * Math.PI) / slices)
	};
}