var MVC = MVC || {};
MVC.Controller = MVC.Controller || {};

var ccc = MVC.Controller;
ccc.controllerType;

ccc.init = function(type, view) {
    if (type == 'mouse') {
        ccc.controller = new ccc.mouse();
    }
    else if (type == 'vive') {
        ccc.controller = new ccc.viveController();
    }
    else {
        ccc.controller = new ccc.mouse();
    }
    ccc.controllerType = type;
    ccc.view = view;
    ccc.controller.init();
}

ccc.update = function() {
    ccc.controller.update();
};

ccc.viveController = function() {
	this.raycaster = new THREE.Raycaster();
    this.intersectedLeft = null;
	this.intersectedRight = null;
	//this.controllerLeft = controller1;
	this.controllerRight = controller1;
    this.event = null;
    this.data = null;
	this.tempMatrix = new THREE.Matrix4();
    this.pressedKeys = new Set();
	
    var self = this;
	
	this.init = function() {
        // controller 1
        this.controllerRight.addEventListener( 'selectstart', this.onSelectStart );
        this.controllerRight.addEventListener( 'selectend', this.onSelectEnd );
        this.controllerRight.addEventListener( 'connected', function ( event ) {
            gamepad = event.data.gamepad;
            this.add( buildController( event.data ) );
        } );
        this.controllerRight.addEventListener( 'disconnected', function () {
            this.remove( this.children[ 0 ] );
        } );

        // controller 2
        if(globalTwoControllers) {
            this.controllerLeft.addEventListener( 'selectstart', this.onSelectStart );
            this.controllerLeft.addEventListener( 'selectend', this.onSelectEnd );
            this.controllerLeft.addEventListener( 'connected', function ( event ) {
                this.add( buildController( event.data ) );
            } );
            this.controllerLeft.addEventListener( 'disconnected', function () {
                this.remove( this.children[ 0 ] );
            } );
        }
    };

    this.updateMoves = function() {
        this.pressedKeys.forEach(function(key) {
            tempCamera.position.x += key.x/10;
            tempCamera.position.z += key.y/10;
            controls.update();
            self.pressedKeys.delete(key);
        });
    };

    function buildController( data ) {
        let geometry, material;

        switch ( data.targetRayMode ) {
            case 'tracked-pointer':
                geometry = new THREE.BufferGeometry();
                geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) );
                geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );
                material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending } );
                return new THREE.Line( geometry, material );

            case 'gaze':
                geometry = new THREE.RingGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
                material = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: true } );
                return new THREE.Mesh( geometry, material );
        }
    }
	
	this.getIntersections = function(controller, toRaycast) {
		this.tempMatrix.identity().extractRotation(controller.matrixWorld);
		this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
		this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix);
        
		var intersects = this.raycaster.intersectObjects(toRaycast);
        var keyboardIntersect = raycast(this.raycaster);

        var line = controller.getObjectByName("line");
		
		if (intersects.length != 0 && keyboardIntersect == null) {
            line.scale.z = intersects[0].distance;
            if (GUIsettings.aimedNode == null) {
                GUIsettings.aimedNode = intersects[0].object;
                GUIsettings.aimedNode.material.color.setHex( 0x0cbfe9 );
            }
            else if (GUIsettings.aimedNode != intersects[0].object) {
                GUIsettings.aimedNode.material.color.set( GUIsettings.aimedNode.__data.color );
                GUIsettings.aimedNode = intersects[0].object;
                GUIsettings.aimedNode.material.color.setHex( 0x0cbfe9 );
            }
			return intersects[0];
		} 
        else if (intersects.length == 0 && keyboardIntersect != null) {
            line.scale.z = keyboardIntersect.distance;
			return keyboardIntersect;
        }
        else if (intersects.length != 0 && keyboardIntersect != null) {
            if (intersects[0].distance < keyboardIntersect.distance) {
                line.scale.z = intersects[0].distance;
                if (GUIsettings.aimedNode == null) {
                    GUIsettings.aimedNode = intersects[0].object;
                    GUIsettings.aimedNode.material.color.setHex( 0x0cbfe9 );
                }
                else if (GUIsettings.aimedNode != intersects[0].object) {
                    GUIsettings.aimedNode.material.color.set( GUIsettings.aimedNode.__data.color );
                    GUIsettings.aimedNode = intersects[0].object;
                    GUIsettings.aimedNode.material.color.setHex( 0x0cbfe9 );
                }
                return intersects[0];
            }
            else {
                line.scale.z = keyboardIntersect.distance;
			    return keyboardIntersect;
            }
        }
        else {
            line.scale.z = 5;
            if (GUIsettings.aimedNode) {
                GUIsettings.aimedNode.material.color.set( GUIsettings.aimedNode.__data.color );
                GUIsettings.aimedNode = null;
            }
			return null;
		}
	};
	
	this.getIntersected = function(controller) {
		return controller == self.controllerLeft ? this.intersectedLeft : this.intersectedRight;
	};
	
	this.update = function () {   
        // controller 1  
		this.intersectedRight = this.getIntersections(this.controllerRight, ccc.view.myGraph.children.filter(child => child.__graphObjType == 'node'));

        // controller 2
        if(globalTwoControllers) {
            this.intersectedLeft = this.getIntersections(this.controllerLeft, ccc.view.myGraph.children.filter(child => child.__graphObjType == 'node'));
        }

        if (gamepad) {
            self.pressedKeys.add({'x': gamepad.axes[0], 'y': gamepad.axes[1]});
            numberOfKeysPressed++;
            /*if (gamepad.axes[0] != gamepadOld.axes[0] || gamepad.axes[1] != gamepadOld.axes[1]) {
                gamepadOld.axes[0] = gamepad.axes[0];
                gamepadOld.axes[1] = gamepad.axes[1];

                self.pressedKeys.add({'x': gamepad.axes[0], 'y': gamepad.axes[1]});
            }*/
        }   

        this.updateMoves();
    };

    this.onSelectEnd = function(event) {
        var controller = event.target;

        if (controller.userData.selected !== undefined) {
            const object = controller.userData.selected;
            object.parent.attach(object);

            controller.userData.selected = undefined;
        }
    }

	this.onSelectStart = function(event) {
		var controller = event.target;
		var intersects = self.getIntersected(controller);
        numberOfClicks++;

        if (intersects)
            intersectedObject = intersects.object;

        if (intersectedObject && intersectedObject.isUI){
            intersectedObject.setState( 'selected' );

            if (intersectedObject.name == "layoutHeaderTitle") {
                controller.attach(intersectedObject.parent.parent);
			    controller.userData.selected = intersectedObject.parent.parent;
            }

            if (intersectedObject.type == 'Key' && intersectedObject.info.input == 'enter')
                buttonEnterFunction(intersectedObject);

            if (intersectedObject.name == "buttonMinimalize")
                intersectedObject.parent.parent.visible = false;

            if (intersectedObject.name == "buttonOpen")
                buttonOpenFunction(intersectedObject);

            if (intersectedObject.name == "buttonGraphUp" || intersectedObject.name == "buttonGraphDown")
                buttonGraphMove(intersectedObject.name);

            if (intersectedObject.name == "buttonHistory")
                buttonHistoryFunction(intersectedObject);

            if (intersectedObject.name == "buttonHistoryOpen")
                buttonCommitFunction(intersectedObject);

            if (intersectedObject.name == "buttonHistoryDiff")
                buttonCommitDiffFunction(intersectedObject);

            if (intersectedObject.name == "buttonKeyboard")
                buttonKeyboardFunction();

            if (intersectedObject.name == "buttonStartTest")
                buttonStartTestFunction();

            if (intersectedObject.name == "buttonEndTest")
                buttonEndTestFunction();

            if (intersectedObject.info)
                if (intersectedObject.info.type == 'button')
                    buttonHoreDoleFunction(intersectedObject);

            if (intersectedObject.info)
                if (intersectedObject.info.type == 'historyButton')
                    buttonHistoryHoreDoleFunction(intersectedObject);

            if (intersectedObject.name == "buttonCommit") 
                GUIsettings.clickedHistoryButton = intersectedObject;

            objsToTest.forEach( (obj)=> {

                if ( obj.isUI ) {
        
                    // Component.setState internally call component.set with the options you defined in component.setupState
                    if ( obj.states['idle'] ) obj.setState( 'idle' );
        
                };
        
            });
        }
        else if (intersectedObject && !intersectedObject.isUI) {
            GUIsettings.clickedNode = intersectedObject;

            var nodeInfoBlock = scene.children.filter(obj => { return obj.name == "baseGUI" })[0]
                                     .children.filter(obj => { return obj.name == "nodeInfoBlock" })[0];
            nodeInfoBlock.remove(nodeInfoBlock.children.filter(obj => { return obj.name == "nodeInfoSubBlock" })[0]);

            if (intersectedObject.__data.repoInfo) {
                var nodeInfoSubBlock = ccc.view.addRepoInfoSubBlock(intersectedObject);
            }
            else {
                var nodeInfoSubBlock = ccc.view.addNodeInfoSubBlock(intersectedObject);
            }

            nodeInfoBlock.add(nodeInfoSubBlock);
        }
		
	};
	
};

ccc.mouse = function() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.pressedKeys = new Set();

    var self = this;

    this.init = function() {
        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('click', this.onMouseClick, false);
        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
    }

    this.update = function() {
        this.updateMoves();
    }

    this.onMouseMove = function(event) {
        self.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        self.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    this.onMouseClick = function(event) {
        self.raycaster.setFromCamera(self.mouse, this.camera);

        var intersects = self.raycaster.intersectObjects(ccc.view.myGraph.children.filter(child => child.__graphObjType == 'node'));
        var keyboardIntersect = raycast(self.raycaster);
        var intersectedObject;

        if (intersects[0] && keyboardIntersect) {
            intersectedObject = intersects[0].distance < keyboardIntersect.distance ? intersects[0].object : keyboardIntersect.object;
        } 
        else if (intersects[0]) {
            intersectedObject = intersects[0].object;
        } 
        else if (keyboardIntersect) {
            intersectedObject = keyboardIntersect.object;
        }
        else {
            intersectedObject = null;
        }

        console.log(intersectedObject);

        if (intersectedObject && intersectedObject.isUI){
            intersectedObject.setState( 'selected' );

            if (intersectedObject.name == "layoutHeaderTitle") {
                console.log(intersectedObject);
            }

            if (intersectedObject.type == 'Key' && intersectedObject.info.input == 'enter')
                buttonEnterFunction(intersectedObject);

            if (intersectedObject.name == "buttonMinimalize" || intersectedObject.name == "buttonClose" 
            || intersectedObject.name == "buttonHistoryMinimalize" || intersectedObject.name == "buttonHistoryClose") {
                var layout = intersectedObject.parent.parent;
                layout.visible = false;
                console.log(layout);

                intersectedObject.parent.children.forEach(child => {
                    const index = objsToTest.indexOf(child);
                    if (index > -1) {
                        console.log(child);
                        objsToTest.splice(index, 1);
                    }
                });

                var layoutContent = layout.children.filter(obj => { return obj.name == "layoutHistoryContent" })[0];
                var historyContentContainer = layoutContent.children.filter(obj => { return obj.name == "historyContentContainer" })[0];
                historyContentContainer.children.forEach(child => {
                    const index = objsToTest.indexOf(child);
                    if (index > -1) {
                        console.log(child);
                        objsToTest.splice(index, 1);
                    }
                });

                var layoutHistoryScroll = layout.children.filter(obj => { return obj.name == "layoutHistoryScroll" })[0];
                layoutHistoryScroll.children.forEach(child => {
                    const index = objsToTest.indexOf(child);
                    if (index > -1) {
                        console.log(child);
                        objsToTest.splice(index, 1);
                    }
                });
            }
            
            if (intersectedObject.name == "buttonOpen")
                buttonOpenFunction(intersectedObject);

            if (intersectedObject.name == "buttonGraphUp" || intersectedObject.name == "buttonGraphDown")
                buttonGraphMove(intersectedObject.name);

            if (intersectedObject.name == "buttonHistory")
                buttonHistoryFunction(intersectedObject);

            if (intersectedObject.name == "buttonHistoryOpen")
                buttonCommitFunction(intersectedObject);

            if (intersectedObject.name == "buttonHistoryDiff")
                buttonCommitDiffFunction(intersectedObject);

            if (intersectedObject.name == "buttonKeyboard")
                buttonKeyboardFunction();

            if (intersectedObject.name == "buttonStartTest")
                buttonStartTestFunction();

            if (intersectedObject.name == "buttonEndTest")
                buttonEndTestFunction();

            if (intersectedObject.info)
                if (intersectedObject.info.type == 'button')
                    buttonHoreDoleFunction(intersectedObject);

            if (intersectedObject.info)
                if (intersectedObject.info.type == 'historyButton')
                    buttonHistoryHoreDoleFunction(intersectedObject);

            if (intersectedObject.name == "buttonCommit")
                GUIsettings.clickedHistoryButton = intersectedObject;

            objsToTest.forEach( (obj)=> {

                if ( obj.isUI ) {
        
                    // Component.setState internally call component.set with the options you defined in component.setupState
                    if ( obj.states['idle'] ) obj.setState( 'idle' );
        
                };
        
            });
        }
        else if (intersectedObject && !intersectedObject.isUI) {
            console.log(intersectedObject);

            GUIsettings.clickedNode = intersectedObject;

            var nodeInfoBlock = scene.children.filter(obj => { return obj.name == "baseGUI" })[0]
                                        .children.filter(obj => { return obj.name == "nodeInfoBlock" })[0];
            nodeInfoBlock.remove(nodeInfoBlock.children.filter(obj => { return obj.name == "nodeInfoSubBlock" })[0]);
            if (intersectedObject.__data.repoInfo) {
                var nodeInfoSubBlock = ccc.view.addRepoInfoSubBlock(intersectedObject);
            }
            else {
                var nodeInfoSubBlock = ccc.view.addNodeInfoSubBlock(intersectedObject);
            }
            nodeInfoBlock.add(nodeInfoSubBlock);

            if (GUIsettings.aimedNode == null) {
                GUIsettings.aimedNode = intersectedObject;
                GUIsettings.aimedNode.material.color.setHex( 0x0cbfe9 );
            }
            else if (GUIsettings.aimedNode != intersectedObject) {
                GUIsettings.aimedNode.material.color.set( GUIsettings.aimedNode.__data.color );
                GUIsettings.aimedNode = intersectedObject;
                GUIsettings.aimedNode.material.color.setHex( 0x0cbfe9 );
            }
        }
    }

    this.updateMoves = function() {
        this.pressedKeys.forEach(function(key) {
            switch(key) {
                case "w": case "W":
                    //camera.position.z -= 10;
                    camera.position.z -= 0.1;
                    break;
                case "s": case "S":
                    //camera.position.z += 10;
                    camera.position.z += 0.1;
                    break;
                case "a": case "A":
                    //camera.position.x -= 10;
                    camera.position.x -= 0.1;
                    break;
                case "d": case "D":
                    //camera.position.x += 10;
                    camera.position.x += 0.1;
                    break;
                case "Shift":
                    //camera.position.x += 10;
                    camera.position.y += 0.1;
                    break;
                case "Control":
                    //camera.position.x += 10;
                    camera.position.y -= 0.1;
                    break;
            }
        });
    };

    this.onKeyDown = function(event) {
		self.pressedKeys.add(event.key);
	};
	
	this.onKeyUp = function(event) {
		self.pressedKeys.delete(event.key);
	};

}

function buttonEnterFunction() {
    console.log("buttonEnterFunction");

    ccc.view.model.getSearchQuery("repositories", newUserText).then(function(result) {
        if(result.total_count > 0) {
            ccc.view.resetGraph(result.items);
        }
    });
}

function buttonOpenFunction() {
    console.log("buttonOpenFunction");

    var clickedNode = GUIsettings.clickedNode;
                
    // ak je to priecinok
    if (clickedNode.__data.type == "dir") {
        clickedNode.__data.oldX = clickedNode.__data.x;
        clickedNode.__data.oldY = clickedNode.__data.y;
        clickedNode.__data.oldZ = clickedNode.__data.z;

        ccc.view.model.getContent(clickedNode.__data.user, clickedNode.__data.repository, clickedNode.__data.path).then(function(result) {
            ccc.view.updateGraph(result, clickedNode);
        });

    }
    // ak je to subor
    else if (clickedNode.__data.type == "file") {

        // ak je to obrazok
        if (clickedNode.__data.name.split('.').pop() == 'png') {

            clickedNode.__data.oldX = clickedNode.__data.x;
            clickedNode.__data.oldY = clickedNode.__data.y;
            clickedNode.__data.oldZ = clickedNode.__data.z;

            ccc.view.model.getImageContent(clickedNode.__data.user, clickedNode.__data.repository, clickedNode.__data.path).then(function(result) {
                clickedNode.__data.fileContent = result;

                var layout = ccc.view.createLayout(0, 0, 0);
                var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
                layoutHeaderTitle.add(
                    new dat.GUIVR.addTextMesh(clickedNode.__data.name, { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
                );

                var content = ccc.view.addImageContent(result.content);
                var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                layoutContent.add(content);

                clickedNode.add(layout);
            });
        }
        // ak je to textovy subor 
        else {

            // if data are not loaded
            if (clickedNode.__data.loaded == 0) {

                clickedNode.__data.oldX = clickedNode.__data.x;
                clickedNode.__data.oldY = clickedNode.__data.y;
                clickedNode.__data.oldZ = clickedNode.__data.z;

                ccc.view.model.getFileContent(clickedNode.__data.user, clickedNode.__data.repository, clickedNode.__data.path).then(function(result) {
                    clickedNode.__data.fileContent = result;
                    clickedNode.__data.fileContentTokens = ccc.view.addTextContentTokens(result, clickedNode.__data.name.split('.').pop());

                    var layout = ccc.view.createLayout(0, 0, 0);
                    layout.info.contentTokens = clickedNode.__data.fileContentTokens;
                    layout.info.type = "fileContent";
                    var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
                    layoutHeaderTitle.add(
                        new dat.GUIVR.addTextMesh(clickedNode.__data.name, { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
                    );

                    var content = ccc.view.addTextContent(clickedNode.__data.fileContentTokens, 0);
                    var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                    layoutContent.add(content);

                    clickedNode.add(layout);
                });

            } else {
                // intersects[0].object.__data.expanded = 1;
            }
        }
    }
}

function buttonGraphMove(buttonName) {
    var graphMoveNumber;

    if (buttonName == "buttonGraphUp") {
        graphMoveNumber = 0.5;
    } else {
        graphMoveNumber = -0.5;
    }

    ccc.view.myGraph.children.forEach(node => {
        if (node.__graphObjType == 'node') {
            if (node.__data.oldY != null) {
                node.__data.oldY += graphMoveNumber;
            }

            node.__data.y += graphMoveNumber;
            node.position.y = node.__data.y;
            node.__data.fy = node.__data.y;
        }

        if (node.__graphObjType == 'link') {
            node.position.y += graphMoveNumber;
        }
    })
}

function buttonHistoryFunction() {
    console.log("buttonHistoryFunction");

    var node = GUIsettings.clickedNode;

    if (node.__data.commitsInfo.length > 0) {
        var historyLayout = ccc.view.createHistoryLayout(0, 0, 0, node.__data.commitsInfo, node.__data.type);
        var historyLayoutHeaderTitle = historyLayout.children.filter(obj => { return obj.name == "layoutHistoryHeader" })[0].children.filter(obj => { return obj.name == "layoutHistoryHeaderTitle" })[0];
        historyLayoutHeaderTitle.add(
            new dat.GUIVR.addTextMesh("Commity pre: " + node.__data.name, { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        );

        var historyContent = ccc.view.addHistoryContent(node.__data.commitsInfo, 0);
        var layoutHistoryContent = historyLayout.children.filter(obj => { return obj.name == "layoutHistoryContent" })[0];
        layoutHistoryContent.add(historyContent);

        node.add(historyLayout);
    } 
    else {
        ccc.view.model.getFileCommitsInfo(node.__data.user, node.__data.repository, node.__data.path).then(function(result) {
            result.forEach(commit => {

                var date = new Date(commit.commit.author.date);
                date = date.toLocaleDateString('sk-SK', dateOptions);

                node.__data.commitsInfo.push({
                    message: commit.commit.message.split('\n')[0],
                    author: commit.commit.author.name,
                    date: date,
                    sha: commit.sha
                });
            });

            var historyLayout = ccc.view.createHistoryLayout(0, 0, 0, node.__data.commitsInfo, node.__data.type);
            var historyLayoutHeaderTitle = historyLayout.children.filter(obj => { return obj.name == "layoutHistoryHeader" })[0].children.filter(obj => { return obj.name == "layoutHistoryHeaderTitle" })[0];
            historyLayoutHeaderTitle.add(
                new dat.GUIVR.addTextMesh("Commity pre: " + node.__data.name, { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
            );

            var historyContent = ccc.view.addHistoryContent(node.__data.commitsInfo, 0);
            var layoutHistoryContent = historyLayout.children.filter(obj => { return obj.name == "layoutHistoryContent" })[0];
            layoutHistoryContent.add(historyContent);

            node.add(historyLayout);
        });
    }
}

function buttonCommitFunction(intersectedObject) {
    console.log("buttonCommitFunction");

    console.log(intersectedObject);
    var node = intersectedObject.parent.parent.parent;
    var clickedHistoryButton = GUIsettings.clickedHistoryButton;
    console.log(node);
    console.log(clickedHistoryButton);

    if (!clickedHistoryButton)
        return;

    ccc.view.model.getFileCommitContent(node.__data.user, node.__data.repository, node.__data.path, clickedHistoryButton.info.sha).then(function(result) {
        var commitInfo = node.__data.commitsInfo.filter(obj => { return obj.sha == clickedHistoryButton.info.sha })[0];
        commitInfo.content = result;
        commitInfo.contentTokens = ccc.view.addTextContentTokens(result, node.__data.name.split('.').pop());

        var layout = ccc.view.createLayout(0, 0, 0);
        layout.info.contentTokens = commitInfo.contentTokens;
        layout.info.type = "history";
        var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
        layoutHeaderTitle.add(
            new dat.GUIVR.addTextMesh(node.__data.name + " (commit \"" + clickedHistoryButton.info.message + "\")", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        );

        var content = ccc.view.addTextContent(commitInfo.contentTokens, 0);
        var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
        layoutContent.add(content);

        node.add(layout);
    });
}

function buttonCommitDiffFunction(intersectedObject) {
    console.log("buttonCommitFunction");

    console.log(intersectedObject);
    var node = intersectedObject.parent.parent.parent;
    var clickedHistoryButton = GUIsettings.clickedHistoryButton;
    console.log(node);
    console.log(clickedHistoryButton);

    if (!clickedHistoryButton)
        return;

    ccc.view.model.getFileCommitInfo(node.__data.user, node.__data.repository, clickedHistoryButton.info.sha).then(function(result) {
        var commitInfo = node.__data.commitsInfo.filter(obj => { return obj.sha == clickedHistoryButton.info.sha })[0];
        commitInfo.diffContent = result.files.filter(obj => { return obj.filename == node.__data.path })[0].patch;
        commitInfo.diffContentTokens = ccc.view.addTextContentTokens(result.files.filter(obj => { return obj.filename == node.__data.path })[0].patch, node.__data.path.split('.').pop());

        var layout = ccc.view.createLayout(0, 0, 0);
        layout.info.contentTokens = commitInfo.diffContentTokens;
        layout.info.type = "historyDiff";
        var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
        layoutHeaderTitle.add(
            new dat.GUIVR.addTextMesh(node.__data.name + " (diff commit " + clickedHistoryButton.info.message + ")", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        );

        var content = ccc.view.addDiffTextContent(commitInfo.diffContentTokens, 0);
        var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
        layoutContent.add(content);

        layout.position.set(0, 0, 0);
        scene.add(layout);
    });
}

function buttonKeyboardFunction() {
    console.log("buttonKeyboardFunction");

    var keyboardTop = scene.children.filter(obj => { return obj.name == "keyboardTop" })[0];
    var keyboardBottom = scene.children.filter(obj => { return obj.name == "keyboardBottom" })[0];

    if (keyboardTop.visible == true && keyboardBottom.visible == true) {
        keyboardTop.visible = false;
        keyboardBottom.visible = false;
    } else {
        keyboardTop.visible = true;
        keyboardBottom.visible = true;
    }
}

function buttonStartTestFunction() {
    console.log("buttonStartTestFunction");

    startTime = new Date();

    if (ccc.controllerType == "mouse") {
        numberOfClicks = 0;
        document.addEventListener("click", function(event){
            numberOfClicks++;
            console.log(numberOfClicks);
        });

        numberOfKeysPressed = 0;
        document.addEventListener("keyup", function(event){
            numberOfKeysPressed++;
            console.log(numberOfKeysPressed);
        });
    } else {
        numberOfClicks = 0;
        numberOfKeysPressed = 0;
    }
}

function buttonEndTestFunction() {
    console.log("buttonEndTestFunction");

    endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);

    var nodeInfoBlock = scene.children.filter(obj => { return obj.name == "baseGUI" })[0]
                             .children.filter(obj => { return obj.name == "nodeInfoBlock" })[0];
    nodeInfoBlock.remove(nodeInfoBlock.children.filter(obj => { return obj.name == "nodeInfoSubBlock" })[0]);

    var nodeInfoSubBlock = ccc.view.addTestInfoSubBlock(seconds, ccc.controllerType);
    nodeInfoBlock.add(nodeInfoSubBlock);
}

function buttonHoreDoleFunction(intersectedObject) {
    console.log("buttonHoreDoleFunction");

    var button = intersectedObject;
    var layout = intersectedObject.parent.parent;
    var node = intersectedObject.parent.parent.parent;

    console.log(node);
    console.log(layout);
    console.log(intersectedObject);

    if (layout.info.scrollPosition + button.info.scrollValue > layout.info.contentTokens.length) {
        return;
    }

    var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
    layoutContent.remove(layoutContent.children.filter(obj => { return obj.name == "fileContentContainer" })[0]);

    layout.info.scrollPosition += button.info.scrollValue;
    if (layout.info.scrollPosition < 0) {
        layout.info.scrollPosition = 0;
    }

    if (layout.info.type == "historyDiff") {
        var content = ccc.view.addDiffTextContent(layout.info.contentTokens, layout.info.scrollPosition);
    } else {
        var content = ccc.view.addTextContent(layout.info.contentTokens, layout.info.scrollPosition);
    }
    layoutContent.add(content);
}

function buttonHistoryHoreDoleFunction(intersectedObject) {
    console.log("buttonHistoryHoreDoleFunction");

    var button = intersectedObject;
    var layout = intersectedObject.parent.parent;
    var node = intersectedObject.parent.parent.parent;

    console.log(button);
    console.log(layout);
    console.log(node);
    // tu som skoncil

    if (layout.info.scrollPosition + button.info.scrollValue > node.__data.commitsInfo.length) {
        return;
    }

    var layoutContent = layout.children.filter(obj => { return obj.name == "layoutHistoryContent" })[0];
    var historyContentContainer = layoutContent.children.filter(obj => { return obj.name == "historyContentContainer" })[0];
    historyContentContainer.children.forEach(child => {
        const index = objsToTest.indexOf(child);
        if (index > -1) {
            objsToTest.splice(index, 1);
        }
    });
    layoutContent.remove(layoutContent.children.filter(obj => { return obj.name == "historyContentContainer" })[0]);

    layout.info.scrollPosition += button.info.scrollValue;
    if (layout.info.scrollPosition < 0) {
        layout.info.scrollPosition = 0;
    }

    var content = ccc.view.addHistoryContent(node.__data.commitsInfo, layout.info.scrollPosition);
    layoutContent.add(content);
}

function raycast(raycaster) {

	return objsToTest.reduce( (closestIntersection, obj)=> {

		// keys in panels that are hidden are not tested
		if (!layoutOptions.getObjectById( obj.id ) &&
            !keyboard.getObjectById( obj.id ) &&
            !obj.name.startsWith("button") && !obj.name.startsWith("layout")
		) {
			return closestIntersection
		}

		const intersection = raycaster.intersectObject( obj, true );

		// if intersection is an empty array, we skip
		if ( !intersection[0] ) return closestIntersection

		// if this intersection is closer than any previous intersection, we keep it
		if ( !closestIntersection || intersection[0].distance < closestIntersection.distance ) {

			// Make sure to return the UI object, and not one of its children (text, frame...)
			intersection[0].object = obj;

			return intersection[0]

		} else {

			return closestIntersection

		};

	}, null );

};