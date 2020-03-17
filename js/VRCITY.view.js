var VRCITY = VRCITY || {};
VRCITY.View = VRCITY.View || {};

var nsv = VRCITY.View;

nsv.GROUP = new THREE.Group();
nsv.CITY = null;
nsv.CODESPACE = null;//TODO
nsv.UISPACE = null;


nsv.init = function(model) {
    nsv.MODEL = model;
    
    nsv.CITY = new nsv.City();
    nsv.CITY.init(model.MAP);
    nsv.GROUP.add(nsv.CITY.group);
    
    nsv.CODESPACE = new nsv.CodeSpace();
    nsv.CODESPACE.init();
    nsv.GROUP.add(nsv.CODESPACE.group);
    
    nsv.UISPACE = new nsv.UIspace();
    nsv.UISPACE.init();
    //nsv.GROUP.add(nsv.UISPACE.group);
    
    nsv.maxAnisotropy = renderer.getMaxAnisotropy();
};

nsv.animate = function(elapsed) {
    nsv.CITY.animate(elapsed);
    nsv.CODESPACE.animate();
};

nsv.UIspace = function() {
    this.group = new THREE.Group();
    this.group.name = "UIspace";
    this.itemSize = {"width":300, "height":100, "thickness":10}
    this.rootSize = {"width":100, "height":100, "thickness":10}
    this.offset = this.itemSize.thickness * 0.5;
    this.color = 0xddffdd;
    this.selected = null;
    this.normScale = 0.001;
    
    var self = this;
    
    this.init = function() {
        //TODO group with controller
        //this.group.position.set(-2,2,2);
        
        this.group.scale.multiplyScalar(this.normScale);
        this.root = this.createButton("Menu", this.rootSize, true);
        this.fillMenu();
        this.group.add(this.root);
    };
    
    this.fillMenu = function() {
        this.addChild(this.root, "Transform");
        this.addChild(this.root.children[0], "Scale", "scale");
        this.addChild(this.root.children[0], "Rotate", "rotate");
		this.addChild(this.root.children[0], "Translate", "translate");
        this.addChild(this.root, "Authors");
        this.addChild(this.root.children[1], "Load", "loadAuthorsList");
        this.addChild(this.root.children[1], "Hide", "hideAuthors");
        this.addChild(this.root.children[1], "Show", "showAuthors");
        this.addChild(this.root, "Trace");
        this.addChild(this.root.children[2], "Load", "loadTraceList");
        this.addChild(this.root.children[2], "Stop", "stopTrace");
        this.addChild(this.root.children[2], "Trace mode", "traceMode");
        this.addChild(this.root, "Color schema");
        this.addChild(this.root.children[3], "Load", "loadColorList");
		this.addChild(this.root, "Teleport", "teleport");
        
        var colorCube = this.createBlank();
        colorCube.material.color.setHSL(nsv.CITY.traceColor, 1, 0.5);
        this.addChildObject(this.root.children[2], colorCube, "setColor", colorCube.material.color);
    };
    
    this.createBlank = function(itemSize=this.itemSize, visible=false) {
        var geo = new THREE.BoxGeometry(itemSize.width, itemSize.height, itemSize.thickness);
        var mat = new THREE.MeshLambertMaterial();
        var mesh = new THREE.Mesh(geo, mat);
        mesh.userData.itemSize = itemSize;
        mesh.visible = visible;
        mesh.userData.type = "menuButton";
        return mesh;
    }
    
    this.addChildObject = function(parent, item, event, data) {
        var n = parent.children.length;
        var pos = new THREE.Vector3();
        item.userData.event = event;
        item.userData.data = data;
        pos.y -= (parent.userData.itemSize.height + this.offset) * n;
        pos.x = (parent.userData.itemSize.width + item.userData.itemSize.width + this.offset) * 0.5 + this.offset;
        item.position.copy(pos);
        parent.add(item);
    };
    
    this.addChild = function(object, label, event, data) {
        var item = this.createButton(label);
        this.addChildObject(object, item, event, data);
    };
    
    this.populate = function(object, labels, event, data) {
        this.removeChilds(object);
        labels.forEach(function(label, i) {
            self.addChild(object, label, event, data[i]);
        });
        this.showChilds(object);
        this.selected = object;
    };
    
    this.removeChilds = function(object) {
        while(object.children.length != 0) {
            object.children.pop();
        }
    };
    
    this.hideChilds = function(object) {
        object.children.forEach(function(child) {
            child.visible = false;
        });
    };
    
    this.showChilds = function(object) {
        object.children.forEach(function(child) {
            child.visible = true;
        });
    };
    
    this.hideFrom = function(object) {
        while(object !== this.group) {
            this.hideChilds(object);
            object = object.parent;
        }
    };
    
    this.showFrom = function(object) {
        while(object !== this.group) {
            this.showChilds(object);
            object = object.parent;
        }
    };
    
    this.select = function(object) {
        if(this.selected != null) {
            if(this.selected === object) {
                this.hideChilds(object);
                this.selected = object.parent;
                return false;
            }
            this.hideFrom(this.selected);
        }
        this.showFrom(object);
        if(object.children.length == 0) {
            this.selected = object.parent;
        }
        else {
            this.selected = object;
        }
        return true
    };
    
    this.createButton = function(text, itemSize=this.itemSize, visible=false) {
        var geo = new THREE.BoxGeometry(itemSize.width, itemSize.height, itemSize.thickness);
        var texture = this.createButtonTexture(text, itemSize);
        var mat = new THREE.MeshLambertMaterial({ shading: THREE.FlatShading, map:texture });
        var mesh = new THREE.Mesh(geo, mat);
        mesh.userData.itemSize = itemSize;
        mesh.visible = visible;
        mesh.userData.type = "menuButton";
        return mesh;
    }
    
    this.createButtonTexture = function(text, itemSize) {
        var parameters = {};
        parameters["fontface"] = "Segoe UI";
        parameters["fontsize"] = 32;
        parameters["backgroundColor"] = { r:255, g:255, b:180, a:1.0 };
        parameters["textAlign"] = "center";
        parameters["fontStyle"] = "Bold";
        parameters["fontColor"] = "rgba(0, 0, 0, 1.0)";
        var canvas = makeCanvas(text, itemSize.width, itemSize.height, parameters);
        var texture = makeTexture(canvas, nsv.maxAnisotropy);
        return texture;
    };
    
    this.show = function() {
        this.group.visible = true;
    };
    
    this.hide = function() {
        this.group.visible = false;
    };
    
};

nsv.CodeSpace = function() {
    this.group = new THREE.Group();
    this.group.name = "codeSpace";
    this.CONNECTIONS = new nsv.Connections();
    this.normScale = 0.002;
    
    this.init = function() {
        this.addConnections();
    };
    
    this.show = function() {
        this.group.visible = true;
    };
    
    this.hide = function() {
        this.group.visible = false;
    };
    
    this.getLocal = function(worldPoint) {
        var point = worldPoint.clone();
        this.group.worldToLocal(point);
        return point;
    };
    
    this.addConnections = function() {
        this.group.add(this.CONNECTIONS.group);
    };
    
    this.removeConnections = function() {
        this.group.remove(this.group.getObjectByName("connections"));
    };
    
    this.drawConnections = function() {
        
        this.CONNECTIONS.drawConnection(mesh, connector);
    };
    
    this.scale = function(newScale) {
        this.group.scale.set(newScale, newScale, newScale);
    };
    
    this.getCodeBlocks = function() {
        return this.group.children.filter(function(group) { return group.name == "codeBlock"; });
    };
    
    this.addCodeBlock = function(intersection, pinpoint=null) {
        if(pinpoint == null) {
            pinpoint = this.getLocal(intersection.point);
        }
        var index = nsv.CITY.getFloorIndex(intersection.point);
        var object = intersection.object;
        var name = object.userData.floorNames[index];
        var tokens = nsv.MODEL.SOURCECODE[name].tokens;
        var label = nsv.MODEL.SOURCECODE[name].label;
        var mesh = this.createCodeLabel(label);
        var cp = this.createCodePlane(tokens);
        var codeBlock = new THREE.Group();
        codeBlock.add(mesh);
        var UI = this.createCodeUI();
        UI.position.set(-mesh.material.map.image.width * 0.5 - 5, mesh.material.map.image.height * 0.5, 0);
        cp.position.set(-mesh.material.map.image.width * 0.5, -mesh.material.map.image.height * 0.5 - 5, 0);
        cp.visible = false;
        codeBlock.add(cp);
        codeBlock.add(UI);
        codeBlock.scale.multiplyScalar(this.normScale);
        codeBlock.position.copy(pinpoint);
        codeBlock.name = "codeBlock";
        this.group.add(codeBlock);
        
        //update needed not sure how to make this robust
        codeBlock.updateMatrixWorld();
        var connectorPos = intersection.point.clone();
        intersection.object.worldToLocal(connectorPos);
        var connector = {"position":connectorPos, "visible":true, "parent":intersection.object, "userData":{}};
        this.CONNECTIONS.drawConnection(UI.children[1], connector, 0xffffff, 4, 0.15);
		return codeBlock;
    };
    
    this.createCodeUI = function() {
        //close expand buttons
        var buttonSize = 18;
        var buttonThickness = 2;
        var geo = new THREE.BoxGeometry(buttonSize, buttonSize, buttonThickness);
        var mat = new THREE.MeshBasicMaterial({ color:0xff0000, transparent:true, opacity:0.5 });
        var closeMesh = new THREE.Mesh(geo, mat);
        closeMesh.userData.type = "UIbutton";
        closeMesh.userData.event = "UIclose";
        geo = new THREE.BoxGeometry(buttonSize, buttonSize, buttonThickness);
        mat = new THREE.MeshBasicMaterial({ color:0x00ff00, transparent:true, opacity:0.5 });
        var expandMesh = new THREE.Mesh(geo, mat);
        expandMesh.userData.type = "UIbutton";
        expandMesh.userData.event = "UIexpand";
        closeMesh.position.x = buttonSize * -0.5;
        closeMesh.position.y = buttonSize * -0.5;
        expandMesh.position.x = buttonSize * -0.5;
        expandMesh.position.y = buttonSize * -1.5;
        var UIgroup = new THREE.Group();
        UIgroup.add(closeMesh);
        UIgroup.add(expandMesh);
        return UIgroup;
    };
    
    this.createCodeLabel = function(label) {
        var cc = makeCodeCanvas(label);
        var canvas = cc.canvas;
        var ctexture = makeTexture(canvas, nsv.maxAnisotropy);
        var geometry = new THREE.PlaneGeometry(cc.width, cc.height);
        var material = new THREE.MeshBasicMaterial({
                map:ctexture
            });
        // mesh
        var mesh = new THREE.Mesh(geometry, material);
        mesh.userData.type = "codeLabel";
        return mesh;
    };
    
    this.createCodePlane = function(tokens) {
        var cc = makeCodeCanvas(tokens);
        var canvas = cc.canvas;
        var ctexture = makeTexture(canvas, nsv.maxAnisotropy);
        var geometry = new THREE.PlaneGeometry(cc.width, cc.height);
        var material = new THREE.MeshBasicMaterial({
                map:ctexture
            });
        // mesh
        var mesh = new THREE.Mesh(geometry, material);
        mesh.userData.type = "codePlane";
        mesh.position.set(cc.width * 0.5, cc.height * -0.5, 0);
        var codePlane = new THREE.Group();
        codePlane.add(mesh);
        codePlane.name = "codePlane";
        return codePlane;
    };
    
    this.animate = function() {
        this.CONNECTIONS.animate();
    };

};
 
nsv.City = function() {
  
    this.floorHeight = 2;
    this.floorSpacing = 1.4;
    this.normScale = 0.01;
    this.group = new THREE.Group();
    this.buildingGroup = this.group;
    this.buildingMap = new Map();
    this.floorMap = new Map();
    this.AUTHORS = new nsv.Authors();
    this.highlightedFloors = new Map();
    this.traceSequence = 0;
    this.traceLoop = 0;
    this.traceModeEnabled = false;
    this.traceColor = 0;
  
    var self = this;
  
    this.init = function(cityMap) {
        this.buildCity(cityMap);
        this.norm();
        this.setConnectors(cityMap);
        this.addAuthors();
        this.AUTHORS.init();
    };
    
    this.traceMode = function() {
        this.stopTrace();
        this.resetHighlighted();
        if(this.traceModeEnabled) {
            for (var [key, value] of this.floorMap) {
                var color = value.color;
                var object = this.buildingMap.get(this.getBuildingName(key));
                color.setHex(object.userData.defaultColor);
                object.geometry.colorsNeedUpdate = true;
                object.material.opacity = 1;
                object.material.transparent = false;
            }
        }
        else {
            for (var [key, value] of this.floorMap) {
                var color = value.color;
                var object = this.buildingMap.get(this.getBuildingName(key));
                color.setHex(0xffffff);
                object.geometry.colorsNeedUpdate = true;
                object.material.opacity = 0.2;
                object.material.transparent = true;
                value.traceColor = null;
            }
        }
        this.traceModeEnabled = !this.traceModeEnabled;
    }
    
    this.color = function() {
        for (var [key, value] of this.floorMap) {
            var color = value.color;
            var object = this.buildingMap.get(this.getBuildingName(key));
            var hex = 0x888888;
            if (nsv.MODEL.COLORS.hasOwnProperty(object.name)) {
                hex = parseInt(nsv.MODEL.COLORS[object.name].color, 16);
            }
            color.setHex(hex);
            object.geometry.colorsNeedUpdate = true;
            object.userData.defaultColor = hex;
        }
    }
    
    this.loadColors = function(path) {
        nsv.MODEL.DATALOADER.loadColors(path, function() {
            self.color();
        });
    };
    
    this.loadTrace = function(path) {
        self.stopTrace();
        nsv.MODEL.DATALOADER.loadTrace(path);
    };
    
    this.stopTrace = function() {
        self.traceSequence = 0;
        nsv.MODEL.TRACE = null;
    }
    
    this.highlightTraceSequence = function() {
        if(nsv.MODEL.TRACE != null && this.traceSequence < nsv.MODEL.TRACE.length) {
            var floors = nsv.MODEL.TRACE[this.traceSequence];
            floors.forEach(function(key) {
                if(self.traceModeEnabled) {
                    //TODO
                    self.heatFloorWithKey(key);
                }
                self.highlightFloorWithKey(key, 0x000000);
            });
            this.traceLoop = ++this.traceLoop % 2 //TODO 2=speed factor
            if(this.traceLoop == 0) {
                this.traceSequence++;
            }
        }
    }
    
    this.getBuildings = function() {
        return this.buildingGroup.children;
    };
    
    this.getLocal = function(worldPoint) {
        var point = worldPoint.clone();
        this.buildingGroup.worldToLocal(point);
        return point;
    };
    
    this.getFloorIndex = function(worldPoint) {
        var point = this.getLocal(worldPoint);
        //some imperfections in raycasting cause negative index and floor will make -1
        return Math.max(0, Math.floor(point.z / (this.floorHeight * this.floorSpacing)));
    };

    this.getBuildingName = function(floorName) {
        return floorName.split(":")[0]
    }
    
    this.heatFloorWithKey = function(key) {
        var obj = this.floorMap.get(key);
        var color = obj.color;
        var building = this.buildingMap.get(this.getBuildingName(key));
        
        //in one sequence same method can be called multiple times
        if(this.highlightedFloors.has(key)) {
            color.setHex(this.highlightedFloors.get(key));
            this.highlightedFloors.delete(key);
        }
        
        var hsl = color.getHSL();
        var h = this.traceColor;
        var s = 1;
        var l = hsl.l;
        
        if(obj.traceColor == null) {
            obj.traceColor = h;
        }
        else if(obj.traceColor != h) {
            h = 0.75;
        }
        l = Math.max(l - 0.002, 0.5);
        building.material.opacity = Math.min(building.material.opacity + 0.002, 1);
        
        color.setHSL(h, s, l);
    }
    
    this.highlightFloorWithKey = function(key, forcedColor=null) {
        if(this.highlightedFloors.has(key)) {
            return;
        }
        
        var color = this.floorMap.get(key).color;
        var object = this.buildingMap.get(this.getBuildingName(key));
        
        var oldColor = null;
        
        if(forcedColor==null) {
            invertColor(color);
        }
        else {
            oldColor = color.getHex();
            color.setHex(forcedColor);
        }
        

        object.geometry.colorsNeedUpdate = true;
        this.highlightedFloors.set(key, oldColor);
    }
    
    this.highlightFloor = function(intersection) {
        var index = this.getFloorIndex(intersection.point);
        var object = intersection.object;
        var key = object.userData.floorNames[index];
        this.highlightFloorWithKey(key);
    };
    
    this.resetHighlighted = function() {
        this.highlightedFloors.forEach(function(oldColor, key) {
            var color = self.floorMap.get(key).color;
            var object = self.buildingMap.get(self.getBuildingName(key));
            if(oldColor == null) {
                invertColor(color);
            }
            else {
                color.setHex(oldColor);
            }
            object.geometry.colorsNeedUpdate = true;
        });
        this.highlightedFloors.clear();
    };
    
    this.buildCity = function(cityMap) {
        for (var name in cityMap) {
            var building = cityMap[name];
            var material = new THREE.MeshLambertMaterial({ shading: THREE.FlatShading, vertexColors: THREE.VertexColors	} );
            var buildingGeo = new THREE.Geometry();
            var vertexColorHex = parseInt(nsv.MODEL.COLORS[name].color, 16);
            //var vertexColorHex = parseInt(building.color,16);
            var vertexColor = new THREE.Color(vertexColorHex);
            var floors = building.floors;
            var buildingGeo = this.createBuildingGeo(floors, vertexColor);
            var offset = buildingGeo.center();
            var buildingMesh = new THREE.Mesh(buildingGeo, material);
            buildingMesh.position.copy(offset.negate());
            buildingMesh.name = name;
            buildingMesh.userData.defaultColor = vertexColorHex;
            var floorNames = [];
            floors.forEach(function(floor) {
                floorNames.push(floor.name);
            });
            buildingMesh.userData.floorNames = floorNames;
            buildingMesh.userData.type = "building";
            this.group.add(buildingMesh);
            this.buildingMap.set(name, buildingMesh);
        }
    };
    
    this.center = function () {
        var bbox = new THREE.Box3().setFromObject(this.group);
        var center = bbox.getCenter();
        center.sub(this.group.position);
        this.group.position.sub(center);
        this.group.position.set(-center.x, 0, -center.z);
    }
    
    this.norm = function() {
        this.group.rotateX(-Math.PI/2);
        this.scale(this.normScale);
        this.center();
        var tmp = this.group;
        this.group = new THREE.Group();
        this.group.name = "city";
        tmp.name = "buildings";
        this.group.add(tmp);
    };
    
    this.createBuildingGeo = function(floors, vertexColor) {
        var buildingGeo = new THREE.Geometry();
        for (var floorID in floors) {
            var floor = floors[floorID];
            var blocks = floor.blocks;
            var floorName = floor.name;
            var floorGeo = this.createFloorGeo(blocks);
            floorGeo.translate(0, 0, floorID * this.floorHeight * this.floorSpacing);
            var color = vertexColor.clone();
            applyVertexColors(floorGeo.faces, color);
            this.floorMap.set(floorName, {"color":color});
            mergeGeometries(buildingGeo, floorGeo);
        }
        return buildingGeo;
    };
    
    this.createFloorGeo = function(blocks) {
        var floorGeo = new THREE.Shape();
        for (var blockID in blocks) {
            var block = blocks[blockID];
            var x = block[0];
            var y = block[1];
            if(blockID == 0)
            {
                floorGeo.moveTo( x,y );
            }
            else
            {
                floorGeo.lineTo( x,y );
            }
        }
        floorGeo.lineTo(blocks[0][0], blocks[0][1]);
        var extrudeSettings = {
            steps: 1,
            amount: this.floorHeight,
            bevelEnabled: false
        };
        
        floorGeo = new THREE.ExtrudeGeometry( floorGeo, extrudeSettings );
        return floorGeo;
    };
    
    this.drawConnectors = function() {
        var group = new THREE.Group();
        var geometry = new THREE.SphereGeometry( 0.02, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var connectorMesh = new THREE.Mesh( geometry, material );
        for (var buildingMesh of this.buildingMap.values()) {
            var bc = connectorMesh.clone();
            bc.position.copy(buildingMesh.userData.connector.position);
            group.add(bc);
        }
        group.name = "connectors";
        this.group.add(group);
    };
    
    this.removeConnectors = function() {
        this.group.remove(this.group.getObjectByName("connectors"));
    };
    
    this.setConnectors = function(cityMap) {
        for (var name in cityMap) {
            var building = cityMap[name];
            var floors = building.floors;
            var lastFloorID = floors.length-1;
            var lastFloor = floors[lastFloorID];
            var firstBlock = lastFloor.blocks[0];
            var buildingMesh = this.buildingMap.get(name);
            var connectorPos = new THREE.Vector3(firstBlock[0], firstBlock[1], lastFloorID * this.floorHeight * this.floorSpacing + this.floorHeight);
            var refGroup = this.group.children[0];
            connectorPos.applyQuaternion(refGroup.quaternion);
            connectorPos.multiplyScalar(this.normScale);
            connectorPos.add(refGroup.position);
            buildingMesh.userData.connector = {"position":connectorPos, "visible":true, "parent":this.group, "userData":{}};
        }
    };
    
    this.deltaTraceColor = function(delta) {
        this.traceColor += delta;
        this.traceColor = Math.max(Math.min(this.traceColor, 0.6), 0);
    };
    
    this.deltaScale = function(delta){
        this.group.scale.multiplyScalar(1 + delta);
    };
    
    this.deltaRotate = function(delta) {
        this.group.rotateY(Math.PI*delta);
    }
	
	this.deltaTranslate = function(delta) {
		if(this.group.position.y + delta > 0) {
			this.group.translateY(delta);
		}
		else {
			this.group.position.y = 0;
		}
		
	}
    
    this.scale = function(newScale) {
        this.group.scale.set(newScale, newScale, newScale);
    };
    
    this.teleportTo = function(target, origin) { //probably intersection.point (need world coords)
        var offsetx = target.x - origin.x;
        var offsetz = target.z - origin.z;
        this.group.position.x -= offsetx;
        this.group.position.z -= offsetz;        
    };
    
    this.addAuthors = function() {
        this.group.add(this.AUTHORS.group);
    };
    
    this.removeAuthors = function() {
        this.group.remove(this.group.getObjectByName("authors"));
    };
    
    this.animate = function(elapsed) {
        
        if(this.group.parent == null) {
            return;
        }
        
        this.AUTHORS.animate(elapsed);
    };
    
};

nsv.Authors = function() {
    
    this.group = new THREE.Group();
    this.group.name = "authors";
    var self = this;
    this.CONNECTIONS = new nsv.Connections();
    
    this.init = function() {
        this.addConnections();
    };
    
    this.truncate = function() {
        truncateGroup(this.group);
    };
    
    this.load = function(path) {
        this.truncate();
        this.addConnections();
        nsv.MODEL.DATALOADER.loadGitData(path, this.create);
    }
    
    //need self => fuck you js
    this.create = function(data) {
        for (var author in data) {
            var color = Math.random() * 0xffffff;
            var mat = new THREE.MeshLambertMaterial({ color: color, shading: THREE.FlatShading } );
            var sphereGeo = new THREE.SphereGeometry(0.05, 24, 24);
            var sphere = new THREE.Mesh(sphereGeo, mat);
            sphere.name = author;
            self.group.add(sphere);
        }
        self.setWaypoints(data);
    };
    
    this.setWaypoints = function(data) {
        //connections are part of group too => need filter
        var meshes = this.group.children.filter(function(mesh) { return mesh.type == "Mesh"; });
        for (var meshID in meshes) {
            var mesh = meshes[meshID];
            var name = mesh.name;
            var commits = data[name];
            var waypoints = [];
            for (var commitID in commits) {
                var affectedBuildings = commits[commitID];
                var targets = [];
                var sum = new THREE.Vector3();
                for (var buildingID in affectedBuildings)
                {
                    var buildingName = affectedBuildings[buildingID];
                    var building = nsv.CITY.buildingMap.get(buildingName);
                    var target = building.userData.connector;
                    targets.push(target);
                    sum.add(target.position);
                }
                var destination = sum.divideScalar(affectedBuildings.length);
                var waypoint = {"destination":destination, "targets":targets};
                waypoints.push(waypoint);
            }
            mesh.userData.waypoints = waypoints;
            var startPosition = waypoints[0].destination.clone();
            startPosition.y += 0.1;
            mesh.position.copy(startPosition);
        }
    };
    
    this.addConnections = function() {
        this.group.add(this.CONNECTIONS.group);
    };
    
    this.removeConnections = function() {
        this.group.remove(this.group.getObjectByName("connections"));
    };
    
    this.animate = function (elapsed) {
        
        if(this.group.parent == null) {
            return;
        }
        
        var meshes = this.group.children.filter(function(mesh) { return mesh.type == "Mesh"; });// author meshes
        for (var meshID in meshes) {
            var mesh = meshes[meshID];
            move(mesh, elapsed, 0.001);
        }
        
        this.CONNECTIONS.clear();
        this.updateConnections(meshes);
        //this.CONNECTIONS.animate();
    }
    
    this.updateConnections = function() {
        var meshes = this.group.children.filter(function(mesh) { return mesh.type == "Mesh"; });
        for (var meshID in meshes) {
            var mesh = meshes[meshID];
            this.drawBeams(mesh);
        }
    };
    
    this.drawBeams = function(mesh, range=1) {
        if(mesh.userData.waypoints == null)
        {
            return;
        }
        var lwp_id = mesh.userData.lwp_id;
        var nwp_id = mesh.userData.nwp_id;
        var lwp = mesh.userData.waypoints[lwp_id];
        var nwp = mesh.userData.waypoints[nwp_id];
        var lwp_distance = mesh.position.distanceTo(lwp.destination);
        var nwp_distance = mesh.position.distanceTo(nwp.destination);
        
        var distance;
        var nearest;
        if(lwp_distance < nwp_distance) {
            distance = lwp_distance;
            nearest = lwp;
        }
        else {
            distance = nwp_distance;
            nearest = nwp;
        }
        
        if(distance > range)
        {
            return;
        }
        
        for (var connectorID in nearest.targets) {
            var connector = nearest.targets[connectorID];
            this.CONNECTIONS.drawConnection(mesh, connector);
        }
    };
    
    this.hide = function() {
        this.group.visible = false;
    };
    
    this.show = function() {
        this.group.visible = true;
    };
    
    this.add = function(name, waypoints) {
        
    };
    
    //via visibility
    this.remove = function(name) {
        
    };
    
};

nsv.Connections = function() {
    
    this.group = new THREE.Group();
    this.group.name = "connections";
    this.lineID = 0; //do we need to reuse connections???
    
    this.drawConnection = function(origin, target, color=null, linewidth=2, opacity=0.5) {
        
        if(color == null) {
            color = origin.material.color.getHex();
        }
        
        if(this.lineID >= this.group.children.length) {
            var geometry = new THREE.Geometry();
            var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({transparent:true}) );
            line.frustumCulled = false;
            this.group.add(line);
        }
        
        var line = this.group.children[this.lineID++];
        line.material.color.setHex(color);
        line.material.opacity = opacity;
        line.material.linewidth = linewidth;
        line.userData.origin = origin;
        line.userData.target = target;
        line.visible = true;
        line.geometry.vertices[0] = this.getLocalFromOther(origin);
        line.geometry.vertices[1] = this.getLocalFromOther(target);
        line.geometry.verticesNeedUpdate = true;
    };
    
    this.clear = function() {
        var meshes = this.group.children;
        for (var meshID in meshes) {
            var mesh = meshes[meshID];
            mesh.visible = false;
        }
        this.lineID = 0;
    };
    
    this.hide = function() {
        this.group.visible = false;
    };
    
    this.show = function() {
        this.group.visible = true;
    };
    
    this.animate = function() {
        
        if(this.group.parent == null) {
            return;
        }
        
        var meshes = this.group.children;
        var meshID = meshes.length;
        while (meshID--) {
            var mesh = meshes[meshID];
            var origin = mesh.userData.origin;
            var target = mesh.userData.target;
            
            if(isVisible(target) == false || isVisible(origin) == false) {
                mesh.visible = false;
                continue;
            }
            mesh.visible = true;
            
            if(isInScene(target) == false || isInScene(origin) == false) {
                this.group.remove(mesh);
                this.lineID--;
                continue;
            }
            
            mesh.geometry.vertices[0] = this.getLocalFromOther(origin);
            mesh.geometry.vertices[1] = this.getLocalFromOther(target);
            mesh.geometry.verticesNeedUpdate = true;
        }
    };
    
    this.getLocalFromOther = function(object) {
        var local = object.position.clone();
        object.parent.localToWorld(local);
        this.group.worldToLocal(local);
        return local;
    }
    
};

function invertColor(color) {
    color.setHex(0xffffff ^ color.getHex());
}

function applyVertexColors( faces, c ) {
    faces.forEach( function( f ) {
        var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
        for( var j = 0; j < n; j ++ ) {
            if (c !== undefined)
            {
                f.vertexColors[ j ] = c;
            }
        }
    } );
}

function move(object, elapsed, speed = 0.1, zOffset = 0.1, repeat = true)
{
	if(object.userData.waypoints == null)
	{
		return;
	}
	var waypoints = object.userData.waypoints;
	if(object.userData.lwp_id == undefined)
	{
		object.userData.lwp_id = 0;
		object.position.set(-1,1,-1);
        object.position.y += zOffset;
	}
	var lwp_id = object.userData.lwp_id;
	//var nwp_id = (lwp_id + 1) % waypoints.length;
    var nwp_id = (lwp_id + 1);
    if(nwp_id >= waypoints.length)
    {
        if(repeat) {
            nwp_id = 0;
        }
        else
        {
            //TODO blending ?
            return;   
        }
    }
	var lwp = object.position;
	var nwp = waypoints[nwp_id].destination.clone();
    nwp.y += zOffset;
	var toTravel = elapsed * speed;
	var distance = lwp.distanceTo(nwp);
    
	while(toTravel > distance && distance != 0)
	{
		toTravel -= distance;
		lwp_id = nwp_id;
		nwp_id = (lwp_id + 1) % waypoints.length;
		lwp = waypoints[lwp_id].destination;
		nwp = waypoints[nwp_id].destination;
		distance = lwp.distanceTo(nwp);
	}
	
	var ratio = toTravel / distance;
    var movement = new THREE.Vector3();
    movement.copy(nwp);
    movement.sub(lwp);
    movement.multiplyScalar(ratio);
	object.position.add(movement);
	object.userData.lwp_id = lwp_id;
    object.userData.nwp_id = nwp_id;
}

function mergeGeometries ( target, geometry, matrix, materialIndexOffset ) {

    if ( (geometry && geometry.isGeometry) === false ) {

        console.error( 'THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry );
        return;

    }

    var normalMatrix,
    vertexOffset = target.vertices.length,
    vertices1 = target.vertices,
    vertices2 = geometry.vertices,
    faces1 = target.faces,
    faces2 = geometry.faces,
    uvs1 = target.faceVertexUvs[ 0 ],
    uvs2 = geometry.faceVertexUvs[ 0 ],
    colors1 = target.colors,
    colors2 = geometry.colors;

    if ( materialIndexOffset === undefined ) materialIndexOffset = 0;

    if ( matrix !== undefined ) {

        normalMatrix = new Matrix3().getNormalMatrix( matrix );

    }

    // vertices

    for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

        var vertex = vertices2[ i ];

        var vertexCopy = vertex.clone();

        if ( matrix !== undefined ) vertexCopy.applyMatrix4( matrix );

        vertices1.push( vertexCopy );

    }

    // colors

    for ( var i = 0, il = colors2.length; i < il; i ++ ) {

        colors1.push( colors2[ i ].clone() );

    }

    // faces

    for ( i = 0, il = faces2.length; i < il; i ++ ) {

        var face = faces2[ i ], faceCopy, normal, color,
        faceVertexNormals = face.vertexNormals,
        faceVertexColors = face.vertexColors;

        faceCopy = new THREE.Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );
        faceCopy.normal.copy( face.normal );

        if ( normalMatrix !== undefined ) {

            faceCopy.normal.applyMatrix3( normalMatrix ).normalize();

        }

        for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {

            normal = faceVertexNormals[ j ].clone();

            if ( normalMatrix !== undefined ) {

                normal.applyMatrix3( normalMatrix ).normalize();

            }

            faceCopy.vertexNormals.push( normal );

        }

        faceCopy.color.copy( face.color );

        faceCopy.vertexColors = faceVertexColors;
        /*for ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {

            color = faceVertexColors[ j ];
            faceCopy.vertexColors.push( color.clone() );

        }*/

        faceCopy.materialIndex = face.materialIndex + materialIndexOffset;

        faces1.push( faceCopy );

    }

    // uvs

    for ( i = 0, il = uvs2.length; i < il; i ++ ) {

        var uv = uvs2[ i ], uvCopy = [];

        if ( uv === undefined ) {

            continue;

        }

        for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

            uvCopy.push( uv[ j ].clone() );

        }

        uvs1.push( uvCopy );

    }
    
}

function truncateGroup(group) {
    while(group.children.length > 0) {
        group.remove(group.children[0]);
    }
}

function isInScene(object) {
    while(object != null) {
        if(object.name == "root") {
            return true;
        }
        object = object.parent;
    }
    return false;
}

function isVisible(object) {
    while(object.parent != null) {
        if(object.visible == false) {
            return false;
        }
        object = object.parent;
    }
    return true;
}
