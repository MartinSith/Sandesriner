var MVC = MVC || {};
MVC.Controller = MVC.Controller || {};

var ccc = MVC.Controller;

ccc.init = function(type, view) {
    if (type == 'mouse') {
        ccc.view = view;
        ccc.controller = new ccc.mouse();
        ccc.controller.init();
    }
    if (type == 'vive') {
        console.log("vive");
        ccc.view = view;
        ccc.controller = new ccc.viveController();
        ccc.controller.init();
    }
}

ccc.update = function() {
    ccc.controller.update();
};

ccc.viveController = function() {
	
	this.raycaster = new THREE.Raycaster();
    this.intersectedLeft = null;
	this.intersectedRight = null;
    this.intersectedLeft2 = null;
	this.intersectedRight2 = null;
	this.controllerLeft = controller1;
	this.controllerRight = controller2;
    this.event = null;
    this.data = null;
	this.tempMatrix = new THREE.Matrix4();
	
    var self = this;
	
	this.init = function() {
        this.controllerLeft.addEventListener( 'selectstart', this.onSelectStart );
        //this.controllerLeft.addEventListener( 'selectend', this.onSelectEnd );
        this.controllerLeft.addEventListener( 'connected', function ( event ) {
            this.add( buildController( event.data ) );
        } );
        this.controllerLeft.addEventListener( 'disconnected', function () {
            this.remove( this.children[ 0 ] );
        } );

        this.controllerRight.addEventListener( 'selectstart', this.onSelectStart );
        //this.controllerRight.addEventListener( 'selectend', this.onSelectEnd );
        this.controllerRight.addEventListener( 'connected', function ( event ) {
            this.add( buildController( event.data ) );
        } );
        this.controllerRight.addEventListener( 'disconnected', function () {
            this.remove( this.children[ 0 ] );
        } );
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

    /*function onSelectStart() {
        this.userData.isSelecting = true;
    }
    function onSelectEnd() {
        this.userData.isSelecting = false;
    }

    function handleController( controller ) {
        if ( controller.userData.isSelecting ) {
            console.log("isSelecting");
        }
    }*/
	
	this.getIntersections = function(controller, toRaycast) {
		this.tempMatrix.identity().extractRotation(controller.matrixWorld);
		this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
		this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix);
		var intersects = this.raycaster.intersectObjects(toRaycast);
		
		if ( intersects.length != 0 ) {
			return intersects[0];
		} else {
			return null;
		}
	};

    this.getIntersections2 = function(controller) {
		this.tempMatrix.identity().extractRotation(controller.matrixWorld);
		this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
		this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix);
        var keyboardIntersect = raycast(this.raycaster);
		
		if ( keyboardIntersect != null ) {
			return keyboardIntersect;
		} else {
			return null;
		}
	};
	
	this.getIntersected = function(controller) {
		return controller == self.controllerLeft ? this.intersectedLeft : this.intersectedRight;
	};
    this.getIntersected2 = function(controller) {
		return controller == self.controllerLeft ? this.intersectedLeft2 : this.intersectedRight2;
	};
	
	this.update = function () {        
        //console.log("update");
		this.intersectedLeft = this.getIntersections(this.controllerLeft, ccc.view.myGraph.children);
		this.intersectedRight = this.getIntersections(this.controllerRight, ccc.view.myGraph.children);
        //console.log(this.intersectedLeft);

        this.intersectedLeft2 = this.getIntersections2(this.controllerLeft);
		this.intersectedRight2 = this.getIntersections2(this.controllerRight);
        //console.log(this.intersectedLeft2);
		
        // highlight
		/*if(this.intersectedLeft != null && this.intersectedLeft.object.userData.type == "building") {
			nsc.VIEW.CITY.highlightFloor(this.intersectedLeft);
		}
		if(this.intersectedRight != null && this.intersectedRight.object.userData.type == "building") {
			nsc.VIEW.CITY.highlightFloor(this.intersectedRight);
		}*/
		
    };
	
	/*this.onGripsDown = function(event) {
		var controller = event.target;
		
		var object = controller.getObjectByName("codeBlock");
		if (object != null) {
			controller.remove(object);
			object.matrix.premultiply(controller.matrixWorld);
			object.matrix.premultiply(nsv.CODESPACE.group.matrix);
			object.matrix.decompose( object.position, object.quaternion, object.scale );
			nsv.CODESPACE.group.add(object);
		}
		else {
			var intersected = self.getIntersected(controller);
			if(intersected != null) {
				object = intersected.object;
				if(object.userData.type == "codeLabel") {
					object = object.parent;
				}
				else if(object.userData.type == "codePlane") {
					object = object.parent.parent;
				}
				else {
					object = null;
				}
				if(object != null) {
					nsv.CODESPACE.group.remove(object);
					object.matrix.premultiply(nsv.CODESPACE.group.matrixWorld);
					object.matrix.premultiply(new THREE.Matrix4().getInverse(controller.matrix));
					object.matrix.decompose( object.position, object.quaternion, object.scale );
					controller.add(object);
				}
			}
		}
	};*/

	this.onSelectStart = function(event) {
        console.log("click");
        console.log(guiInputLeft);
        //guiInputHelper.pressed( true );
		var controller = event.target;
		var intersects = self.getIntersected(controller);
        var keyboardIntersect = self.getIntersected2(controller);
        console.log(intersects);
        console.log(keyboardIntersect);

        if (keyboardIntersect && keyboardIntersect.object.isUI){
            keyboardIntersect.object.setState( 'selected' );

            if (keyboardIntersect.object.type == 'Key') {
                if (keyboardIntersect.object.info.input == 'enter') {
                    ccc.view.model.getSearchQuery(userText.queryType, userText.content).then(function(result) {
                        console.log("result");
                        console.log(result);
                        if(result.total_count > 0) {
                            ccc.view.resetGraph(result.items);
                        }
                    });
                }
            }

            if (keyboardIntersect.object.name == "buttonMinimalize") {
                keyboardIntersect.object.parent.parent.visible = false;
            }

            if (keyboardIntersect.object.name == "buttonExpand") {
                var node = keyboardIntersect.object.parent.parent;

                ccc.view.model.getContent(node.__data.user, node.__data.repository, node.__data.path).then(function(result) {
                    ccc.view.updateGraph(result, node);
                });
            }

            if (keyboardIntersect.object.name == "buttonHistory") {
                var node = keyboardIntersect.object.parent.parent;

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

                        console.log(node.__data.commitsInfo);
                        
                        /*var d = new Date(commit.commit.author.date);
                        var date = d.getDate() + "." + ("0" + (d.getMonth()+1)).slice(-2) + "." + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" +  ("0" + d.getSeconds()).slice(-2);
                        console.log(commit.commit.message + '\n' + commit.commit.author.name + '\n' + date + '\n' + commit.sha);*/
                    });

                    var historyLayout = ccc.view.createHistoryLayout(0, 0, 0, node.__data.commitsInfo);
                    node.add(historyLayout);
                });
            }

            if (keyboardIntersect.object.name == "buttonCommit") {
                var node = keyboardIntersect.object.parent.parent;

                ccc.view.model.getFileCommitContent(node.__data.user, node.__data.repository, node.__data.path, keyboardIntersect.object.info.sha).then(function(result) {
                    var commitInfo = node.__data.commitsInfo.filter(obj => { return obj.sha == keyboardIntersect.object.info.sha })[0];
                    commitInfo.content = result;
                    commitInfo.contentTokens = ccc.view.addTextContentTokens(result, node.__data.name.split('.').pop());

                    var layout = ccc.view.createLayout(0, 0, 0);
                    var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
                    layoutHeaderTitle.add(
                        new ThreeMeshUI.Text({
                            fontSize: 0.05,
                            fontColor: new THREE.Color( 0x000000 ),
                            content: node.__data.name
                        })
                    );

                    var content = ccc.view.addTextContent(commitInfo.contentTokens, 0);
                    var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                    layoutContent.add(content);

                    node.add(layout);
                    //ccc.view.addTextField(result, "java", 0, 0, 0);
                    //scene.add(textField);
                });
            }

            if (keyboardIntersect.object.name == "buttonKeyboard") {

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

            if (keyboardIntersect.object.name == "buttonGraphGUI") {

                var mainGui = scene.children.filter(obj => { return obj.name == "mainGui" })[0];

                if (mainGui.visible == true) {
                    mainGui.visible = false;
                } else {
                    mainGui.visible = true;
                }
                
            }

            if (keyboardIntersect.object.name == "buttonStartTest") {
                startTime = new Date();

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
                
            }

            if (keyboardIntersect.object.name == "buttonEndTest") {
                endTime = new Date();
                var timeDiff = endTime - startTime;
                timeDiff /= 1000;
                var seconds = Math.round(timeDiff);

                alert("Cas potrebny na splnenie ulohy: " + seconds + " sekund" + "\nPocet kliknuti: " + numberOfClicks + "\nPocet stlaceni klavesnice: " + numberOfKeysPressed);
                
            }

            if (keyboardIntersect.object.info) {
                if (keyboardIntersect.object.info.type == 'button') {
                    var button = keyboardIntersect.object;
                    var layout = keyboardIntersect.object.parent.parent;
                    var node = keyboardIntersect.object.parent.parent.parent;

                    if (layout.info.scrollPosition + button.info.scrollValue > node.__data.fileContentTokens.length) {
                        return;
                    }

                    var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                    layoutContent.remove(layoutContent.children.filter(obj => { return obj.name == "fileContentContainer" })[0]);

                    layout.info.scrollPosition += button.info.scrollValue;
                    if (layout.info.scrollPosition < 0) {
                        layout.info.scrollPosition = 0;
                    }

                    var content = ccc.view.addTextContent(node.__data.fileContentTokens, layout.info.scrollPosition);
                    layoutContent.add(content);
                }
            }

            objsToTest.forEach( (obj)=> {

                if ( obj.isUI ) {
        
                    // Component.setState internally call component.set with the options you defined in component.setupState
                    if ( obj.states['idle'] ) obj.setState( 'idle' );
        
                };
        
            });
        }

        if (intersects != null) {
            console.log("intersects != null");
            //if (intersects[0] != null) {

                console.log(intersects);

                console.log(ccc.view);

                // directory
                if (intersects.object.__data.type == "dir") {

                    GUIsettings.clickedNode = intersects.object;

                    console.log(intersects.object.__data);

                    intersects.object.__data.oldX = intersects.object.__data.x;
                    intersects.object.__data.oldY = intersects.object.__data.y;
                    intersects.object.__data.oldZ = intersects.object.__data.z;

                    //var nodeLayout = ccc.view.createNodeLayout(0, -0.115, 0.01, intersects[0].object.__data.repoInfo);
                    //intersects[0].object.add(nodeLayout);

                    // if directory is not expanded
                    /*if (intersects[0].object.__data.expanded == 0) {

                        console.log("Nie je expanded");
                        intersects[0].object.__data.expanded = 1;

                        // if data are not loaded
                        if (intersects[0].object.__data.loaded == 0) {
                            
                            console.log("Nie je expanded a nie su nacitane data");
                            intersects[0].object.__data.loaded == 1;

                            ccc.view.model.getContent(intersects[0].object.__data.user, intersects[0].object.__data.repo, intersects[0].object.__data.path).then(function(result) {
                                ccc.view.updateGraph(result, intersects[0].object.__data.user, intersects[0].object.__data.repo);
                            });
                        } else {
                            console.log("Nie je expanded a su nacitane data");
                            intersects[0].object.visible = true;
                        }

                    } else {
                        console.log("Je expanded");
                        //intersects[0].object.visible = false;
                        intersects[0].object.__data.expanded = 0;
                        intersects[0].object.__data.loaded = 1;
                    }*/
                }
                else if (intersects.object.__data.type == "file") {

                    GUIsettings.clickedNode = intersects.object;

                    //var nodeLayout = ccc.view.createNodeLayout(0, 0, 0.01);
                    //intersects[0].object.add(nodeLayout);

                    // images
                    if (intersects.object.__data.name.split('.').pop() == 'png') {
                        console.log(intersects.object.__data);

                        intersects.object.__data.oldX = intersects.object.__data.x;
                        intersects.object.__data.oldY = intersects.object.__data.y;
                        intersects.object.__data.oldZ = intersects.object.__data.z;

                        ccc.view.model.getImageContent(intersects.object.__data.user, intersects.object.__data.repository, intersects.object.__data.path).then(function(result) {
                            intersects.object.__data.fileContent = result;

                            var layout = ccc.view.createLayout(0, 0, 0);
                            var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
                            layoutHeaderTitle.add(
                                new ThreeMeshUI.Text({
                                    fontSize: 0.05,
                                    fontColor: new THREE.Color( 0x000000 ),
                                    content: intersects.object.__data.name
                                })
                            );

                            var content = ccc.view.addImageContent(result.content);
                            var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                            layoutContent.add(content);

                            intersects.object.add(layout);
                        });
                    } else {

                        // if data are not loaded
                        if (intersects.object.__data.loaded == 0) {
                            console.log(intersects);
                            console.log(intersects.object);

                            intersects.object.__data.oldX = intersects.object.__data.x;
                            intersects.object.__data.oldY = intersects.object.__data.y;
                            intersects.object.__data.oldZ = intersects.object.__data.z;

                            ccc.view.model.getFileContent(intersects.object.__data.user, intersects.object.__data.repository, intersects.object.__data.path).then(function(result) {
                                intersects.object.__data.fileContent = result;
                                intersects.object.__data.fileContentTokens = ccc.view.addTextContentTokens(result, intersects.object.__data.name.split('.').pop());

                                var layout = ccc.view.createLayout(0, 0, 0);
                                var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
                                layoutHeaderTitle.add(
                                    new ThreeMeshUI.Text({
                                        fontSize: 0.05,
                                        fontColor: new THREE.Color( 0x000000 ),
                                        content: intersects.object.__data.name
                                    })
                                );

                                var content = ccc.view.addTextContent(intersects.object.__data.fileContentTokens, 0);
                                var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                                layoutContent.add(content);

                                intersects.object.add(layout);
                            });

                        } else {
                            // intersects[0].object.__data.expanded = 1;
                        }
                    }
                }
            //}
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

        console.log(objsToTest);
        var intersects = self.raycaster.intersectObjects(ccc.view.myGraph.children);
        var keyboardIntersect = raycast(self.raycaster);

        console.log(keyboardIntersect);
        console.log(intersects[0]);
        console.log(scene);

        if (keyboardIntersect && keyboardIntersect.object.isUI){
            keyboardIntersect.object.setState( 'selected' );

            if (keyboardIntersect.object.type == 'Key') {
                if (keyboardIntersect.object.info.input == 'enter') {
                    ccc.view.model.getSearchQuery(userText.queryType, userText.content).then(function(result) {
                        console.log("result");
                        console.log(result);
                        if(result.total_count > 0) {
                            ccc.view.resetGraph(result.items);
                        }
                    });
                }
            }

            if (keyboardIntersect.object.name == "buttonMinimalize") {
                keyboardIntersect.object.parent.parent.visible = false;
            }

            if (keyboardIntersect.object.name == "buttonExpand") {
                var node = keyboardIntersect.object.parent.parent;

                ccc.view.model.getContent(node.__data.user, node.__data.repository, node.__data.path).then(function(result) {
                    ccc.view.updateGraph(result, node);
                });
            }

            if (keyboardIntersect.object.name == "buttonHistory") {
                var node = keyboardIntersect.object.parent.parent;

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

                        console.log(node.__data.commitsInfo);
                        
                        /*var d = new Date(commit.commit.author.date);
                        var date = d.getDate() + "." + ("0" + (d.getMonth()+1)).slice(-2) + "." + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" +  ("0" + d.getSeconds()).slice(-2);
                        console.log(commit.commit.message + '\n' + commit.commit.author.name + '\n' + date + '\n' + commit.sha);*/
                    });

                    var historyLayout = ccc.view.createHistoryLayout(0, 0, 0, node.__data.commitsInfo);
                    node.add(historyLayout);
                });
            }

            if (keyboardIntersect.object.name == "buttonCommit") {
                var node = keyboardIntersect.object.parent.parent;

                ccc.view.model.getFileCommitContent(node.__data.user, node.__data.repository, node.__data.path, keyboardIntersect.object.info.sha).then(function(result) {
                    var commitInfo = node.__data.commitsInfo.filter(obj => { return obj.sha == keyboardIntersect.object.info.sha })[0];
                    commitInfo.content = result;
                    commitInfo.contentTokens = ccc.view.addTextContentTokens(result, node.__data.name.split('.').pop());

                    var layout = ccc.view.createLayout(0, 0, 0);
                    var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
                    layoutHeaderTitle.add(
                        new ThreeMeshUI.Text({
                            fontSize: 0.05,
                            fontColor: new THREE.Color( 0x000000 ),
                            content: node.__data.name
                        })
                    );

                    var content = ccc.view.addTextContent(commitInfo.contentTokens, 0);
                    var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                    layoutContent.add(content);

                    node.add(layout);
                    //ccc.view.addTextField(result, "java", 0, 0, 0);
                    //scene.add(textField);
                });
            }

            if (keyboardIntersect.object.name == "buttonKeyboard") {

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

            if (keyboardIntersect.object.name == "buttonGraphGUI") {

                var mainGui = scene.children.filter(obj => { return obj.name == "mainGui" })[0];

                if (mainGui.visible == true) {
                    mainGui.visible = false;
                } else {
                    mainGui.visible = true;
                }
                
            }

            if (keyboardIntersect.object.name == "buttonStartTest") {
                startTime = new Date();

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
                
            }

            if (keyboardIntersect.object.name == "buttonEndTest") {
                endTime = new Date();
                var timeDiff = endTime - startTime;
                timeDiff /= 1000;
                var seconds = Math.round(timeDiff);

                alert("Cas potrebny na splnenie ulohy: " + seconds + " sekund" + "\nPocet kliknuti: " + numberOfClicks + "\nPocet stlaceni klavesnice: " + numberOfKeysPressed);
                
            }

            if (keyboardIntersect.object.info) {
                if (keyboardIntersect.object.info.type == 'button') {
                    var button = keyboardIntersect.object;
                    var layout = keyboardIntersect.object.parent.parent;
                    var node = keyboardIntersect.object.parent.parent.parent;

                    if (layout.info.scrollPosition + button.info.scrollValue > node.__data.fileContentTokens.length) {
                        return;
                    }

                    var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                    layoutContent.remove(layoutContent.children.filter(obj => { return obj.name == "fileContentContainer" })[0]);

                    layout.info.scrollPosition += button.info.scrollValue;
                    if (layout.info.scrollPosition < 0) {
                        layout.info.scrollPosition = 0;
                    }

                    var content = ccc.view.addTextContent(node.__data.fileContentTokens, layout.info.scrollPosition);
                    layoutContent.add(content);
                }
            }

            objsToTest.forEach( (obj)=> {

                if ( obj.isUI ) {
        
                    // Component.setState internally call component.set with the options you defined in component.setupState
                    if ( obj.states['idle'] ) obj.setState( 'idle' );
        
                };
        
            });
        }

        if (intersects[0] != null) {

            console.log(intersects[0]);

            console.log(ccc.view);

            // directory
            if (intersects[0].object.__data.type == "dir") {

                GUIsettings.clickedNode = intersects[0].object;

                console.log(intersects[0].object.__data);

                intersects[0].object.__data.oldX = intersects[0].object.__data.x;
                intersects[0].object.__data.oldY = intersects[0].object.__data.y;
                intersects[0].object.__data.oldZ = intersects[0].object.__data.z;

                //var nodeLayout = ccc.view.createNodeLayout(0, -0.115, 0.01, intersects[0].object.__data.repoInfo);
                //intersects[0].object.add(nodeLayout);

                // if directory is not expanded
                /*if (intersects[0].object.__data.expanded == 0) {

                    console.log("Nie je expanded");
                    intersects[0].object.__data.expanded = 1;

                    // if data are not loaded
                    if (intersects[0].object.__data.loaded == 0) {
                        
                        console.log("Nie je expanded a nie su nacitane data");
                        intersects[0].object.__data.loaded == 1;

                        ccc.view.model.getContent(intersects[0].object.__data.user, intersects[0].object.__data.repo, intersects[0].object.__data.path).then(function(result) {
                            ccc.view.updateGraph(result, intersects[0].object.__data.user, intersects[0].object.__data.repo);
                        });
                    } else {
                        console.log("Nie je expanded a su nacitane data");
                        intersects[0].object.visible = true;
                    }

                } else {
                    console.log("Je expanded");
                    //intersects[0].object.visible = false;
                    intersects[0].object.__data.expanded = 0;
                    intersects[0].object.__data.loaded = 1;
                }*/
            }
            else if (intersects[0].object.__data.type == "file") {

                GUIsettings.clickedNode = intersects[0].object;

                //var nodeLayout = ccc.view.createNodeLayout(0, 0, 0.01);
                //intersects[0].object.add(nodeLayout);

                // images
                if (intersects[0].object.__data.name.split('.').pop() == 'png') {
                    console.log(intersects[0].object.__data);

                    intersects[0].object.__data.oldX = intersects[0].object.__data.x;
                    intersects[0].object.__data.oldY = intersects[0].object.__data.y;
                    intersects[0].object.__data.oldZ = intersects[0].object.__data.z;

                    ccc.view.model.getImageContent(intersects[0].object.__data.user, intersects[0].object.__data.repository, intersects[0].object.__data.path).then(function(result) {
                        intersects[0].object.__data.fileContent = result;

                        var layout = ccc.view.createLayout(0, 0, 0);
                        var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
                        layoutHeaderTitle.add(
                            new ThreeMeshUI.Text({
                                fontSize: 0.05,
                                fontColor: new THREE.Color( 0x000000 ),
                                content: intersects[0].object.__data.name
                            })
                        );

                        var content = ccc.view.addImageContent(result.content);
                        var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                        layoutContent.add(content);

                        intersects[0].object.add(layout);
                    });
                } else {

                    // if data are not loaded
                    if (intersects[0].object.__data.loaded == 0) {
                        console.log(intersects[0]);
                        console.log(intersects[0].object);

                        intersects[0].object.__data.oldX = intersects[0].object.__data.x;
                        intersects[0].object.__data.oldY = intersects[0].object.__data.y;
                        intersects[0].object.__data.oldZ = intersects[0].object.__data.z;

                        ccc.view.model.getFileContent(intersects[0].object.__data.user, intersects[0].object.__data.repository, intersects[0].object.__data.path).then(function(result) {
                            intersects[0].object.__data.fileContent = result;
                            intersects[0].object.__data.fileContentTokens = ccc.view.addTextContentTokens(result, intersects[0].object.__data.name.split('.').pop());

                            var layout = ccc.view.createLayout(0, 0, 0);
                            var layoutHeaderTitle = layout.children.filter(obj => { return obj.name == "layoutHeader" })[0].children.filter(obj => { return obj.name == "layoutHeaderTitle" })[0];
                            layoutHeaderTitle.add(
                                new ThreeMeshUI.Text({
                                    fontSize: 0.05,
                                    fontColor: new THREE.Color( 0x000000 ),
                                    content: intersects[0].object.__data.name
                                })
                            );

                            var content = ccc.view.addTextContent(intersects[0].object.__data.fileContentTokens, 0);
                            var layoutContent = layout.children.filter(obj => { return obj.name == "layoutContent" })[0];
                            layoutContent.add(content);

                            intersects[0].object.add(layout);
                        });

                    } else {
                        // intersects[0].object.__data.expanded = 1;
                    }
                }
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

function raycast(raycaster) {

	return objsToTest.reduce( (closestIntersection, obj)=> {

		// keys in panels that are hidden are not tested
		if (!layoutOptions.getObjectById( obj.id ) &&
            !keyboard.getObjectById( obj.id ) &&
            !obj.name.startsWith("button")
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