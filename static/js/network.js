var nodeIds, shadowState, nodesArray, nodes, edgesArray, edges, network;

    function startNetwork() {
        // this list is kept to remove a random node.. we do not add node 1 here because it's used for changes
        nodeIds = [2, 3];
		sensorIds = [1001, 1002, 1003];
        shadowState = false;
        selectedNodeId = -1;


        // create an array with nodes and sensors
        nodesBaseArray = [
            {id: 1, label: 'Elsa'}
        ];
		sensorBaseArray = [
			{id: 1001, label: 'Belle'},
			{id: 1002, label: 'Aurora'}
		]
        nodes = new vis.DataSet(nodesBaseArray);
		nodes.add(sensorBaseArray);

        // create an array with edges
        edgesArray = [
            {from: 1, to: 1001},
            {from: 2, to: 1002}
        ];
        edges = new vis.DataSet(edgesArray);

        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {nodes: {shape: 'circle'}, physics: {enabled: false}, edges: {dashes: true, smooth: {enabled: false}}};
        network = new vis.Network(container, data, options);
        network.addEventListener('selectNode', connectNode);
        network.addEventListener('doubleClick', dblclick);
        network.addEventListener('deselectNode', deselectNode);
        addNode(-200, -200);
    }

    function dblclick(data){
        console.log('dblclick');
        addNode(data.pointer.canvas.x, data.pointer.canvas.y);
    }

    function addNode(x ,y) {
        console.log('Add Node');
        var newId = nodeIds.length+1;
        //while(nodeIds.contains(newId)){
         //   newId = (Math.random() * 100).toString(32);
        //}
        nodes.add({id:newId, label:'Node '+newId, x: x, y: y});
        nodeIds.push(newId);
    }

    function deselectNode(data){
        if(data.nodes.length==0){
            console.log('deselect : ' + selectedNodeId);
            selectedNodeId = -1;
        }
    }

    function connectNode(data) {
        console.log(selectedNodeId + ' : ' + data.nodes[0]);
        //Check if second selection and not the same node if so continue else return
        if(data.nodes[0] == selectedNodeId){
            return;
        }

        //Used to make sure only node to sensor conections are made
        var fromSens = sensorIds.indexOf(selectedNodeId) != -1;
        var toSens = sensorIds.indexOf(data.nodes[0]) != -1;
        if(fromSens != toSens){
            edges.add({from: selectedNodeId, to: data.nodes[0]});
        }
        selectedNodeId = data.nodes[0];
    }

    function removeRandomNode() {
        var randomNodeId = nodeIds[Math.floor(Math.random() * nodeIds.length)];
        nodes.remove({id:randomNodeId});

        var index = nodeIds.indexOf(randomNodeId);
        nodeIds.splice(index,1);
    }

    function changeOptions() {
        shadowState = !shadowState;
        network.setOptions({nodes:{shadow:shadowState},edges:{shadow:shadowState}});
    }

    function resetAllNodes() {
        nodes.clear();
        edges.clear();
        nodes.add(nodesArray);
        edges.add(edgesArray);
    }

    function resetAllNodesStabilize() {
        resetAllNodes();
        network.stabilize();
    }

    function setTheData() {
        nodes = new vis.DataSet(nodesArray);
        edges = new vis.DataSet(edgesArray);
        network.setData({nodes:nodes, edges:edges})
    }

    function resetAll() {
        if (network !== null) {
            network.destroy();
            network = null;
        }
        startNetwork();
    }

    startNetwork();