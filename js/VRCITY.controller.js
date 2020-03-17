var VRCITY = VRCITY || {};
VRCITY.Controller = VRCITY.Controller || {};

var nsc = VRCITY.Controller;

nsc.init = function(view) {
    nsc.VIEW = view;
    nsc.controller = new nsc.mouseController(); //replace by viveController if you gonna use VR headset
    nsc.controller.init();
};

nsc.update = function() {
    nsc.controller.update();
};

nsc.viveController = function() {
	
	this.raycaster = new THREE.Raycaster();
    this.intersectedLeft = null;
	this.intersectedRight = null;
	this.controllerLeft = controller1;
	this.controllerRight = controller2;
    this.event = null;
    this.data = null;
	this.tempMatrix = new THREE.Matrix4();
	
    var self = this;
	
	this.init = function() {
		var uigroup = nsc.VIEW.UISPACE.group;
		uigroup.rotateX(-Math.PI/2);
		uigroup.scale.multiplyScalar(0.5);
		uigroup.position.set(0.05,0,0);
		controller1.add(uigroup);
		
        this.controllerLeft.addEventListener( 'triggerup', this.onTriggerUp, false );
		this.controllerRight.addEventListener( 'triggerup', this.onTriggerUp, false );
		
		this.controllerLeft.addEventListener( 'axischanged', this.onAxisChanged, false );
		this.controllerRight.addEventListener( 'axischanged', this.onAxisChanged, false );
		
		this.controllerLeft.addEventListener( 'gripsdown', this.onGripsDown, false );
		this.controllerRight.addEventListener( 'gripsdown', this.onGripsDown, false );
    };
	
	this.getIntersections = function(controller, toRaycast) {
		this.tempMatrix.identity().extractRotation(controller.matrixWorld);
		this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
		this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix);
		var intersects = this.raycaster.intersectObjects(toRaycast, true);
		
		var line = controller.getObjectByName('line');
		if ( intersects.length != 0 ) {
			line.scale.z = intersects[0].distance;
			return intersects[0];
		} else {
			line.scale.z = 5;
			return null;
		}
	};
	
	this.getIntersected = function(controller) {
		return controller == self.controllerLeft ? this.intersectedLeft : this.intersectedRight;
	};
	
	this.update = function () {
        nsc.VIEW.CITY.resetHighlighted();
        nsc.VIEW.CITY.highlightTraceSequence();
        
		var toRaycast = nsc.VIEW.CITY.getBuildings();
        toRaycast = toRaycast.concat(nsc.VIEW.CODESPACE.getCodeBlocks());
        toRaycast = toRaycast.concat(nsc.VIEW.UISPACE.group.children);
		toRaycast = toRaycast.concat(controller1.children.filter(function(group) { return group.name == "codeBlock"; }));
		toRaycast = toRaycast.concat(controller2.children.filter(function(group) { return group.name == "codeBlock"; }));
        
		this.intersectedLeft = this.getIntersections(this.controllerLeft, toRaycast);
		this.intersectedRight = this.getIntersections(this.controllerRight, toRaycast);
		
		if(this.intersectedLeft != null && this.intersectedLeft.object.userData.type == "building") {
			nsc.VIEW.CITY.highlightFloor(this.intersectedLeft);
		}
		if(this.intersectedRight != null && this.intersectedRight.object.userData.type == "building") {
			nsc.VIEW.CITY.highlightFloor(this.intersectedRight);
		}
		
    };
	
	this.onGripsDown = function(event) {
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
	};
	
	this.onAxisChanged = function(event) {
		
		var x = event.axes[0];
		var y = event.axes[1];
		
		if(self.event == "scale") {
            nsc.VIEW.CITY.deltaScale(y*0.01);
        }
        else if(self.event == "rotate") {
            nsc.VIEW.CITY.deltaRotate(y*0.01);
        }
		else if(self.event == "translate") {
            nsc.VIEW.CITY.deltaTranslate(y*0.01);
        }
        else if(self.event == "setColor") {
            nsc.VIEW.CITY.deltaTraceColor(y*0.01);
            self.data.setHSL(nsc.VIEW.CITY.traceColor, 1, 0.5);
        }
	};
	
	this.onTriggerUp = function(event) {
		var controller = event.target;
		var intersected = self.getIntersected(controller);
		
		if(intersected != null) {
            var object = intersected.object;
            if(intersected.object.userData.type == "building") {
				if(self.event == "teleport") {
					nsc.VIEW.CITY.teleportTo(intersected.point, camera.position);
				}
				else {
					var codeBlock = nsc.VIEW.CODESPACE.addCodeBlock(intersected);
					codeBlock.parent.remove(codeBlock);
					codeBlock.position.set(0, 0, -0.1);
					controller.add(codeBlock);
				}
                //nsc.VIEW.CITY.teleportTo(intersected.point, camera.position)
            }
            else if(object.userData.type == "UIbutton") {
                var group = object.parent.parent;
                if(object.userData.event == "UIclose") {
                    group.parent.remove(group);
                }
                else if(object.userData.event == "UIexpand") {
                    var cp = group.getObjectByName("codePlane");
                    cp.visible = !cp.visible;
                }
            }
            else if(object.userData.type == "menuButton") {
                var selectionChanged = nsc.VIEW.UISPACE.select(object);
                if(object.userData.event == "loadAuthorsList") {
                    if(selectionChanged) {
                        nsc.VIEW.MODEL.DATALOADER.loadGitDataList(function(result) {
                            var labels = getLabels(result.list);
                            nsc.VIEW.UISPACE.populate(object, labels, "loadAuthors", result.list);
                        });
                    }
                }
                else if(object.userData.event == "loadTraceList") {
                    if(selectionChanged) {
                        nsc.VIEW.MODEL.DATALOADER.loadTraceList(function(result) {
                            var labels = getLabels(result.list);
                            nsc.VIEW.UISPACE.populate(object, labels, "loadTrace", result.list);
                        });
                    }
                }
                else if(object.userData.event == "loadColorList") {
                    if(selectionChanged) {
                        nsc.VIEW.MODEL.DATALOADER.loadColorList(function(result) {
                            var labels = getLabels(result.list);
                            nsc.VIEW.UISPACE.populate(object, labels, "loadColor", result.list);
                        });
                    }
                }
                else if(object.userData.event == "loadColor") {
                    nsc.VIEW.CITY.loadColors(object.userData.data);
                }
                else if(object.userData.event == "loadAuthors") {
                    nsc.VIEW.CITY.AUTHORS.load(object.userData.data);
                }
                else if(object.userData.event == "showAuthors") {
                    nsc.VIEW.CITY.AUTHORS.show();
                }
                else if(object.userData.event == "hideAuthors") {
                    nsc.VIEW.CITY.AUTHORS.hide();
                }
                else if(object.userData.event == "loadTrace") {
                    nsc.VIEW.CITY.loadTrace(object.userData.data);
                }
                else if(object.userData.event == "stopTrace") {
                    nsc.VIEW.CITY.stopTrace();
                }
                else if(object.userData.event == "traceMode") {
                    nsc.VIEW.CITY.traceMode();
                }
                self.event = object.userData.event;
                self.data = object.userData.data;
            }
        }
	};
	
};

nsc.mouseController = function() {
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersected = null;
    this.event = null;
    this.data = null;
	this.pressedKeys = new Set();
	this.rotationReference = null;
	
    var self = this;

    this.init = function() {
		
		var uigroup = nsc.VIEW.UISPACE.group;
		uigroup.scale.multiplyScalar(2);
		uigroup.position.set(-2,2,2);
		nsc.VIEW.GROUP.add(uigroup);
		
		window.addEventListener( 'contextmenu', this.onContextMenu, { passive: false } );
        window.addEventListener( 'mousemove', this.onMouseMove, { passive: false } );
        window.addEventListener( 'mousedown', this.onMouseDown, { passive: false } );
        window.addEventListener( 'mouseup', this.onMouseUp, { passive: false } );
        window.addEventListener( 'wheel', this.onMouseWheel, { passive: false } );
		window.addEventListener( 'keydown', this.onKeyDown, false);
		window.addEventListener( 'keyup', this.onKeyUp, false);
		
		camera.position.set(-0.25, 2, 5);
		camera.rotation.x = - Math.PI / 8;
    };
    
    this.update = function () {
        nsc.VIEW.CITY.resetHighlighted();
        nsc.VIEW.CITY.highlightTraceSequence();
        this.raycaster.setFromCamera( this.mouse, camera );
        var toRaycast = nsc.VIEW.CITY.getBuildings();
        toRaycast = toRaycast.concat(nsc.VIEW.CODESPACE.getCodeBlocks());
        toRaycast = toRaycast.concat(nsc.VIEW.UISPACE.group.children);
        var intersects = this.raycaster.intersectObjects(toRaycast, true);
        if(intersects.length != 0) {
            this.intersected = intersects[0];
            if(this.intersected.object.userData.type == "building") {
                nsc.VIEW.CITY.highlightFloor(this.intersected);
            }
        }
        else {
            this.intersected = null;
        }
		this.updateKeyControls();
		this.updateMouseControls();
    };
	
	this.updateKeyControls = function() {
		this.pressedKeys.forEach(function(keyCode) {
			switch(keyCode) {
				case 83: // w -> forward
					camera.position.z += 0.01;
					break;
				case 87: // s-> backward
					camera.position.z -= 0.01;
					break;
				case 65: // a -> left
					camera.position.x -= 0.01;
					break;
				case 68: // d -> right
					camera.position.x += 0.01;
					break;
				case 16: // shift -> down
					camera.position.y -= 0.01;
					break;
				case 32: // space -> up
					camera.position.y += 0.01;
					break;
			}
		});
	};
	
	this.updateMouseControls = function() {
		
		if(self.rotationReference != null) {
			var deltaY = self.mouse.y - self.rotationReference.y;
			camera.rotation.x += deltaY * 0.05;
			camera.rotation.x = Math.min(Math.max(camera.rotation.x, -Math.PI / 2),Math.PI / 2);
		}
	};
    
	this.onKeyDown = function(event) {
		self.pressedKeys.add(event.keyCode);
	};
	
	this.onKeyUp = function(event) {
		self.pressedKeys.delete(event.keyCode);
	};
	
	this.onContextMenu = function(event) {
		event.preventDefault();
	}
	
    this.onMouseWheel = function(event) {
        
        event.preventDefault();
        
        if(self.event == "scale") {
            nsc.VIEW.CITY.deltaScale(event.wheelDelta * 0.001);
        }
        else if(self.event == "rotate") {
            nsc.VIEW.CITY.deltaRotate(event.wheelDelta * 0.0001);
        }
		else if(self.event == "translate") {
            nsc.VIEW.CITY.deltaTranslate(event.wheelDelta * 0.001);
        }
        else if(self.event == "setColor") {
            nsc.VIEW.CITY.deltaTraceColor(-event.wheelDelta * 0.001);
            self.data.setHSL(nsc.VIEW.CITY.traceColor, 1, 0.5);
        }
    };
    
    this.onMouseMove = function(event) {

        event.preventDefault();
        
        self.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        self.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    this.onMouseDown = function(event) {
        
		event.preventDefault();
        
		switch(event.which) {
			case 3:
				self.onMouseRightDown();
				break;
		}
    }
	
	this.onMouseRightDown = function(event) {
		self.rotationReference = self.mouse.clone();
	}
    
	this.onMouseLeftUp = function(event) {
		if(self.intersected != null) {
			var object = self.intersected.object;
			if(self.intersected.object.userData.type == "building") {
				if(self.event == "teleport") {
					nsc.VIEW.CITY.teleportTo(self.intersected.point, camera.position);
				}
				else {
					nsc.VIEW.CODESPACE.addCodeBlock(self.intersected);
				}
			}
			else if(object.userData.type == "UIbutton") {
				var group = object.parent.parent;
				if(object.userData.event == "UIclose") {
					group.parent.remove(group);
				}
				else if(object.userData.event == "UIexpand") {
					var cp = group.getObjectByName("codePlane");
					cp.visible = !cp.visible;
				}
			}
			else if(object.userData.type == "menuButton") {
				var selectionChanged = nsc.VIEW.UISPACE.select(object);
				if(object.userData.event == "loadAuthorsList") {
					if(selectionChanged) {
						nsc.VIEW.MODEL.DATALOADER.loadGitDataList(function(result) {
							var labels = getLabels(result.list);
							nsc.VIEW.UISPACE.populate(object, labels, "loadAuthors", result.list);
						});
					}
				}
				else if(object.userData.event == "loadTraceList") {
					if(selectionChanged) {
						nsc.VIEW.MODEL.DATALOADER.loadTraceList(function(result) {
							var labels = getLabels(result.list);
							nsc.VIEW.UISPACE.populate(object, labels, "loadTrace", result.list);
						});
					}
				}
				else if(object.userData.event == "loadColorList") {
					if(selectionChanged) {
						nsc.VIEW.MODEL.DATALOADER.loadColorList(function(result) {
							var labels = getLabels(result.list);
							nsc.VIEW.UISPACE.populate(object, labels, "loadColor", result.list);
						});
					}
				}
				else if(object.userData.event == "loadColor") {
					nsc.VIEW.CITY.loadColors(object.userData.data);
				}
				else if(object.userData.event == "loadAuthors") {
					nsc.VIEW.CITY.AUTHORS.load(object.userData.data);
				}
				else if(object.userData.event == "showAuthors") {
					nsc.VIEW.CITY.AUTHORS.show();
				}
				else if(object.userData.event == "hideAuthors") {
					nsc.VIEW.CITY.AUTHORS.hide();
				}
				else if(object.userData.event == "loadTrace") {
					nsc.VIEW.CITY.loadTrace(object.userData.data);
				}
				else if(object.userData.event == "stopTrace") {
					nsc.VIEW.CITY.stopTrace();
				}
				else if(object.userData.event == "traceMode") {
					nsc.VIEW.CITY.traceMode();
				}
				self.event = object.userData.event;
				self.data = object.userData.data;
			}
		}
	}
	
	this.onMouseRightUp = function(event) {
		self.rotationReference = null;
	}
	
    this.onMouseUp = function(event) {
        
        event.preventDefault();
        
		switch(event.which) { //left
			case 1:
				self.onMouseLeftUp();
				break;
			case 3:
				self.onMouseRightUp();
				break;
		};
    };
};

function getLabels(list) {
    var labels = []
    list.forEach(function(url) {
        var filename = url.substring(url.lastIndexOf('/')+1);
        filename = filename.substring(0, filename.lastIndexOf('.'));
        labels.push(filename);
    });
    return labels;
}