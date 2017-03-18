var _paper;

window.onload = function() {
	var graphArgs = [];
	graphArgs.min = 10;
	graphArgs.max = 100;
	graphArgs.center = 500;
	graphArgs.radius = 100;
	graphArgs.node_radius = 20;
	graphArgs.entitiesCount = 40;

	createControlPanel(graphArgs);
	drawGraph(graphArgs);
}
function drawGraph(graphArgs){
	if (_paper){
		_paper.clear();
	}
	else{
		_paper = new Raphael(document.getElementById('canvas_container'), 1000, 1000);	
	}
    
	var center = graphArgs.center;
	var radius = graphArgs.radius;
	var node_radius = graphArgs.node_radius;
	var entitiesCount = graphArgs.entitiesCount;

	var min = graphArgs.min;
	var max = graphArgs.max;
	var red = 255;
	var blue = 255;
	var green = 255;
	
	var node_array = new Array(entitiesCount);
	var edge_array = new Array(entitiesCount);
	for(var i = 0; i < entitiesCount; i++) {
		console.log(circle_coords(i, entitiesCount));
		node_array[i] = _paper.circle(center + circle_coords(i, entitiesCount).x * radius, center + circle_coords(i, entitiesCount).y * radius, node_radius);
		edge_array[i] = _paper.path( ["M", center + circle_coords(i, entitiesCount).x * radius, center + circle_coords(i, entitiesCount).y * radius, "L", center + circle_coords(i+1, entitiesCount).x * radius, center + circle_coords(i+1, entitiesCount).y * radius ] );
		node_array[i].attr ("stroke", getRandomColor());
	}
}
function getInputValue(inputText){

	var valueFields = inputText.split("-");
	var value = 0;

	if (valueFields.length == 1){

		value = parseInt(inputText);
	}
	else if (valueFields.length == 2) {
		var min = parseInt(valueFields[0]);
		var max = parseInt(valueFields[1]);

		value = getRandomArbitrary(min, max);
	}

	return value;
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


function createControlPanel(defaultGraphArgs){
	var inputsContainer = document.getElementById('inputs_container');
    var inputCenter = create_input(inputsContainer, "Center", defaultGraphArgs.center);
    var inputRadius = create_input(inputsContainer, "Radius", defaultGraphArgs.radius);
    var inputNodeRadius = create_input(inputsContainer, "Node Radius", defaultGraphArgs.node_radius);
    var inputEntityCount = create_input(inputsContainer, "Entity Count", defaultGraphArgs.entitiesCount);


    var buttonRedraw = create_button(inputsContainer, "Draw", function (e) {
    	var graphArgs = read_inputs(inputCenter, inputRadius, inputNodeRadius, inputEntityCount);
        drawGraph(graphArgs);
    });
}
function read_inputs(inputCenter, inputRadius, inputNodeRadius, inputEntityCount){

    var graphArgs = [];

	graphArgs.min = 10;
	graphArgs.max = 100;
	graphArgs.center = getInputValue(inputCenter.value);
	graphArgs.radius = getInputValue(inputRadius.value);
	graphArgs.node_radius = getInputValue(inputNodeRadius.value);
	graphArgs.entitiesCount = getInputValue(inputEntityCount.value);

	return graphArgs;
}
// Creates a single text box with the provided label and default value
function create_input(parentElement, label, value) {

    // Create the label
    var labelElement = document.createElement('div');
    labelElement.innerText = label;

    // Create the text box
    var inputElement = document.createElement('input');
    inputElement.id = label;
    inputElement.type = "text";
    inputElement.value = value;

    // Add to the parent element
    parentElement.appendChild(labelElement);
    parentElement.appendChild(inputElement);

    return inputElement;
}
function create_button(parentElement, text, onClick) {

    // Create the button element
    var buttonElement = document.createElement('button');
    buttonElement.innerText = text;
    buttonElement.onclick = onClick;

    // Add to parent element
    parentElement.appendChild(buttonElement);

    return buttonElement;
}
