var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 15;
var nodes = [];
var isMouseDown = false;
var draggedNode;

canvas.width = 400;
canvas.height = 300;

function createNode(id, x, y, rad){
	nodes.push({"id":id, "x":x, "y":y, "rad":rad})
}

function drawNodes(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(i = 0; i < nodes.length; i++){
		var node = nodes[i];
		context.beginPath();
		context.arc(node.x, node.y, node.rad, 0, Math.PI*2);
		context.fill();
	}
}

function isIn(x, y, n){
	if(x > n.x-n.rad && x < n.x+n.rad &&
		y > n.y-n.rad && y < n.y+n.rad){
		return true;
	}
	return false;
}

function isInANode(x, y){
	for(i = 0; i < nodes.length; i++){
		if(isIn(x, y, nodes[i])){
			return nodes[i];
		}
	}
	return null;
}

var mouseDown = function(e){
	draggedNode = isInANode(e.offsetX, e.offsetY);
	if (draggedNode == null){
		createNode("000", e.offsetX, e.offsetY, radius);
		console.log("MDOWN");
		console.log("NODES SIZE : " + nodes.length);
		drawNodes();
	}
}

var mouseUp = function(e){
	draggedNode = null;
}

var mouseMove = function(e){
	if(draggedNode!=null){
		draggedNode.x = e.offsetX;
		draggedNode.y = e.offsetY;
		drawNodes();
	}
}

canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);