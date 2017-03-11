window.onload = function () {

    // Draw controls section to configure graph parameters
    create_inputs(200, 100, 10, 9);
}

var _paper;

function circle_coords(theta_number, slices) {
    return {
        x: Math.cos(theta_number * (2 * Math.PI) / slices),
        y: Math.sin(theta_number * (2 * Math.PI) / slices)
    };
}

function draw_graph(center, radius, node_radius, entitiesCount) {
    if (!_paper) {
        _paper = new Raphael(document.getElementById('canvas_container'), 500, 500);
    }
    else {
        _paper.clear();
    }

    var items = [
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0]
    ];

    var node_array = new Array(entitiesCount);
    var edge_array = new Array(entitiesCount);

    for (var i = 0; i < entitiesCount; i++) {
        console.log(circle_coords(i, entitiesCount));
        node_array[i] = _paper.circle(center + circle_coords(i, entitiesCount).x * radius, center + circle_coords(i, entitiesCount).y * radius, node_radius);
        edge_array[i] = _paper.path(["M", center + circle_coords(i, entitiesCount).x * radius, center + circle_coords(i, entitiesCount).y * radius, "L", center + circle_coords(i + 1, entitiesCount).x * radius, center + circle_coords(i + 1, entitiesCount).y * radius]);
    }
}

// Creates input elements to configure various parameters of the graph. Accepts parameters to show as default values.
function create_inputs(center, radius, node_radius, entitiesCount) {

    var inputsContainer = document.getElementById('inputs_container');
    var inputCenter = create_input(inputsContainer, "Center", center);
    var inputRadius = create_input(inputsContainer, "Radius", radius);
    var inputNodeRadius = create_input(inputsContainer, "Node Radius", node_radius);
    var inputEntityCount = create_input(inputsContainer, "Entity Count", entitiesCount);

    var buttonRedraw = create_button(inputsContainer, "Draw", function (e) {
        draw_graph(parseInt(inputCenter.value),
            parseInt(inputRadius.value),
            parseInt(inputNodeRadius.value),
            parseInt(inputEntityCount.value));
    });
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