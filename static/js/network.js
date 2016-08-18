var nodeIds, shadowState, nodesArray, nodes, edgesArray, edges, network;

    function startNetwork() {
        // this list is kept to remove a random node.. we do not add node 1 here because it's used for changes
        shadowState = false;
        currentNodeId = -1;


        // create an array with nodes and sensors
        nodesBaseArray = [
            {id: 'n1', label: 'Elsa', group: 'nodes'},
            {id: 'n2', label: 'Belle', group: 'sensors'},
            {id: 'n3', label: 'Aurora', group: 'sensors'}
        ];
        nodes = new vis.DataSet(nodesBaseArray);

        // create an array with edges
        edgesArray = [
            {id: 'e1', from: 'n1', to: 'n2'},
            {id: 'e2', from: 'n2', to: 'n3'}
        ];
        edges = new vis.DataSet(edgesArray);

        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: edges
        };

        var options = {
            physics: {
                enabled: false
            },
            edges: {
                dashes: true, smooth: {
                    enabled: false
                }
            },
            groups: {
                nodes: {
                    shape: 'circle'
                },
                sensors: {
                    shape: 'box',
                    color:{
                        background: '#ff9900',
                        border: '#b36b00',
                        highlight: {
                            background: '#ffc266',
                            border: '#b36b00'
                        }
                    }
                }
            }
        };

        network = new vis.Network(container, data, options);
        //network.addEventListener('selectNode', connectNode);
        network.addEventListener('doubleClick', dblclick);
        network.addEventListener('deselectNode', deselectNode);
        addNode(-200, -200);
    }

    function dblclick(data){
        console.log('dblclick');
        //addNode(data.pointer.canvas.x, data.pointer.canvas.y);
    }

    function nodeSelect(id){
        console.log(id + 'selected');
        var nodesWithId = nodes.get({ filter: function (item) { return item.id == id;}});
        if(nodesWithId.length!=0){
            network.selectNodes('n1');
            return;
        }        
    }

    function addNode(x ,y) {
        console.log('Add Node');
        var newId = 'n' + (nodes.length+1);
        //while(nodeIds.contains(newId)){
         //   newId = (Math.random() * 100).toString(32);
        //}
        nodes.add({id:newId, label:newId, x: x, y: y});
    }

    function deselectNode(data){
        if(data.nodes.length == 0){console.log('No selection'); return;}
        connectNodes(data.previousSelection.nodes[0], data.nodes[0]);
    }

    function connectNode(data) {
        console.log(doubleClickedNode + ' : ' + data.nodes[0]);
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

    function connectNodes(from, to){
        //Get all edges that go to and from these two nodes
        console.log('Attempt to connect : ' + from + " : " + to);
        var edgesExist = edges.get({ filter: function (item) { return ((item.from == from && item.to == to) || (item.from == to && item.to  == from)); }});
        console.log('Already Existing edges : ' + edgesExist);
        //If edge already exists return
        if(edgesExist != 0){return;}
        //Add edge to list
        edges.add({id: 'e'+edges.length+1, from: from, to: to});
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