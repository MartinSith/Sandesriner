var MVC = MVC || {};
MVC.View = MVC.View || {};

var vvv = MVC.View;

vvv._graphData;
vvv.myGraph;
vvv.model;

vvv.init = function(model) {
    vvv._graphData = model.graphData;
    vvv.model = model;
}

vvv.initGraph = function() {
    vvv.myGraph = new ThreeForceGraph()
            .graphData(vvv._graphData)
            .dagMode('td')
            .dagLevelDistance(0.4)
            .linkColor(() => 'rgba(255,255,255,0.2)')
            .linkWidth(0.01)
            .linkOpacity(0.2)
            .linkDirectionalParticles(1)
            .linkDirectionalParticleSpeed('particleSpeed')
            .linkDirectionalParticleWidth(0.01)
            //.linkDirectionalParticleColor()
            .nodeRelSize(10)
            .nodeId('path')
            .nodeVal(200)
            //.nodeAutoColorBy('module')
            .nodeOpacity(0.9)
            .nodeThreeObject(node => {
                
                if (node.type == 'dir')
                    var object = new THREE.BoxGeometry(node.nodeSize, node.nodeSize, node.nodeSize);
                else 
                    var object = new THREE.SphereGeometry(node.nodeSize / 2, 16, 16);

                const obj = new THREE.Mesh(
                    object,
                    //new THREE.SphereGeometry(node.size),
                    new THREE.MeshLambertMaterial({ depthWrite: false, transparent: false, opacity: 0, color: node.color })
                );

                const sprite = new SpriteText(node.name);
                sprite.material.depthWrite = false;
                sprite.strokeWidth = 0.1;
                sprite.strokeColor = 0xffff00;
                sprite.textHeight = 0.02;
                obj.add(sprite);

                return obj;
            })
            .d3Force('collision', d3.forceCollide(node => Math.cbrt(node.size) * 0))
            .d3VelocityDecay(0.3)
            .onEngineTick(fixNodesPositions)
            .cooldownTime(10000);

    vvv.myGraph.d3Force('charge').strength(-0.1);
    vvv.myGraph.d3Force('link').distance(0.2);

    //console.log(vvv._graphData.nodes[0].fx);
    //vvv._graphData.nodes[0].y = 2;
    //vvv._graphData.nodes[0].fy = 2;
}

function fixNodesPositions(){

    vvv.myGraph.children.forEach(node => {

        // hotfix na neviditelne prve nody, linky a photony
        if(node.__linkThreeObjType == "photons" || node.__graphObjType == "link") {
            if (node.__data.source.name == "mainNode")
                node.visible = false;
        }
        if(node.__graphObjType == "node") {
            if (node.__data.name == "mainNode")
                node.visible = false;
        }

        if (node.__data.oldX != null && node.__data.oldY != null && node.__data.oldZ != null) {
            node.__data.x = node.__data.oldX;
            node.__data.y = node.__data.oldY;
            node.__data.z = node.__data.oldZ;
        }

        node.__data.y = GUIsettings.repoHeight + (node.__data.level * - GUIsettings.graphLevelHeight);
        node.__data.fy = node.__data.y;
    })
}

vvv.resetGraph = function(data) {

    newGraphData = {
        nodes: [],
        links: []
    };

    const levels = null,
            level = -1,
            module = null,
            leaf = null,
            parent = null,
            nodeSize = 0.1,
            size = null,
            path = null,
            type = "dir",
            user = null,
            repository = null,
            name = "mainNode",
            expanded = 0,
            color = "#FFFF00",
            commitCount = 10,
            oldX = 0,
            oldY = 2,
            oldZ = 0,
            fileContent = null,
            fileContentTokens = null,
            scrollPosition = null,
            loaded = 0,
            commitsInfo = null,
            repoInfo = null;

        const mainNode = {
            path,
            leaf,
            module,
            size,
            nodeSize,
            level,
            name,
            user,
            color,
            commitCount,
            repository,
            type,
            expanded,
            loaded,
            fileContent, 
            fileContentTokens,
            scrollPosition,
            oldX,
            oldY,
            oldZ,
            commitsInfo,
            repoInfo,
        };

    newGraphData.nodes.push(mainNode);

    console.log(newGraphData);

    var max = Math.max.apply(Math, data.map(function(o) { return o.size; }))
    var minValue = 0.1;
    var maxValue = 0.2;

    data.forEach(repo => {

        console.log("repo");
        console.log(repo);

        var nodeSize = minValue;

        const { nodes, links } = vvv.myGraph.graphData();

        const levels = null,
            level = 0,
            module = null,
            leaf = null,
            parent = null,
            size = repo.size,
            path = "",
            type = "dir",
            user = repo.owner.login,
            repository = repo.name,
            name = repo.name,
            expanded = 0,
            color = "#FFFF00",
            commitCount = 10,
            oldX = null,
            oldY = null,
            oldZ = null,
            fileContent = null,
            fileContentTokens = null,
            scrollPosition = 0,
            loaded = 0,
            commitsInfo = [],
            repoInfo = {
                owner: repo.owner.login,
                name: repo.name,
                description: repo.description,
                createdDate: repo.created_at,
                updatedDate: repo.updated_at,
                language: repo.language,
                stars: repo.stargazers_count,
                topics: repo.topics,
                size: repo.size,
                forks: repo.forks,
                score: repo.score,
                watchers: repo.watchers
            };

        const node = {
            path,
            leaf,
            module,
            size,
            nodeSize,
            level,
            name,
            user,
            color,
            commitCount,
            repository,
            type,
            expanded,
            loaded,
            fileContent, 
            fileContentTokens,
            scrollPosition,
            oldX,
            oldY,
            oldZ,
            commitsInfo,
            repoInfo,
        };

        newGraphData.nodes.push(node);
        newGraphData.links.push({ source: mainNode, target: node, targetNode: node });
    });

    vvv.myGraph.graphData(newGraphData);
}

vvv.updateGraph = function(data, node) {
    console.log(data);

    var user = node.__data.user;
    var repository = node.__data.repository;
    var clickedNode = node;

    console.log(clickedNode);

    /*if (node.__data.commitCount == null)
    vvv.model.getFileCommitsInfo(user, repository, node.__data.path).then(function(commitInfo) {
        node.__data.commitCount = commitInfo.length;
    });*/

    var max = Math.max.apply(Math, data.map(function(o) { return o.size; }))
    var minValue = 0.1;
    var maxValue = 0.2;

    data.forEach(({ size, path, name, type }) => {

        var nodeColor;
        var lastUpdateDate;
        var commitCount;

        vvv.model.getFileCommitsInfo(user, repository, path).then(function(commitInfo) {
            const { nodes, links } = vvv.myGraph.graphData();

            lastUpdateDate = commitInfo[0].commit.committer.date;
            commitCount = commitInfo.length;

            var particleSpeed = Math.round(commitCount / clickedNode.__data.commitCount * 0.1 * 100) / 100 / 3;
            console.log("particleSpeed: " + particleSpeed);

            var repoCreatedDate = new Date(nodes.filter(obj => { return obj.name == clickedNode.__data.repository })[0].repoInfo.createdDate);
            var nodeLastUpdateDate = new Date(lastUpdateDate);
            var currentDate = new Date();
            const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

            const daysUntilToday = Math.round(Math.abs((repoCreatedDate - currentDate) / oneDay));
            const daysFromTodayToLastUpdate = Math.round(Math.abs((nodeLastUpdateDate - currentDate) / oneDay));

            console.log(daysUntilToday  + " " + daysFromTodayToLastUpdate);

            var colorGreenValue = Math.round(daysFromTodayToLastUpdate / daysUntilToday * 255);

            var hex = colorGreenValue.toString(16);
            if (hex.length == 1) {
                var colorGreenHexValue = "0" + hex;
            }
            else {
                var colorGreenHexValue = hex;
            }
            nodeColor = "#FF" + colorGreenHexValue + "00";

            console.log(colorGreenValue  + " " + nodeColor);

            if (type == "dir") {
                var nodeSize = minValue;
            }
            else {
                var nodeSize = size / max  * maxValue;
                if (nodeSize < minValue) nodeSize = minValue;
            }

            const levels = path.split('/'),
                level = levels.length,
                module = level > 0 ? levels[1] : null,
                leaf = levels.pop(),
                parent = levels.join('/'),
                expanded = 0,
                //size = size,
                oldX = null,
                oldY = null,
                oldZ = null,
                fileContent = null,
                fileContentTokens = null,
                commitsInfo = [],
                scrollPosition = 0,
                loaded = 0;

            const node = {
                path,
                leaf,
                module,
                size: +size || 0.1,
                color: nodeColor,
                nodeSize,
                lastUpdateDate,
                commitCount,
                particleSpeed,
                level,
                name, 
                type,
                user, 
                repository,
                expanded,
                loaded,
                fileContent, 
                fileContentTokens,
                scrollPosition,
                commitsInfo,
                oldX,
                oldY,
                oldZ,
            };

            vvv.myGraph.graphData({
                nodes: nodes.push(node),
                links: [...links]
            });

            //vvv._graphData.nodes.push(node);

            if (parent) {
                vvv.myGraph.graphData({
                    nodes: [...nodes],
                    links: [...links, { source: parent, target: path, targetNode: node, particleSpeed: particleSpeed }]
                });
                //currentGraphData.links.push({source: parent, target: path, targetNode: node});
            } 
            else if (level == 1) {
                vvv.myGraph.graphData({
                    nodes: [...nodes],
                    links: [...links, { source: nodes.filter(obj => { return obj.name == node.repository })[0], target: path, targetNode: node, particleSpeed: particleSpeed }]
                });
                //currentGraphData.links.push({source: "", target: path, targetNode: currentGraphData.nodes[0]});
            }
        });
    });

    //vvv.myGraph.graphData(currentGraphData);
}

function fixToken(token, type) {
    var fixedTokens = [];

    token = token.replace(/\t/g, "    ");

    if (token.includes("\n")) {
        var subTokens = token.split("\n");

        for (i = 0; i < subTokens.length; i++) {

            if (subTokens[i] != "")
                fixedTokens.push({
                    type: type, 
                    content: subTokens[i]
                });

            if (i != subTokens.length - 1)
                fixedTokens.push({
                    type: type, 
                    content: "\n"
                });
        }
    }
    else {
        fixedTokens.push({
            type: type, 
            content: token
        });
    }

    return fixedTokens;

}

tokenExpand = function expand(token, language) {

    if (typeof token == 'string') {
        var fixedTokens = fixToken(token, null);
        return fixedTokens;
    }

    if (Array.isArray(token.content)) {
        var finalToken = [];

        token.content.forEach(function (e) {

            if (typeof e == 'string') {
                var fixedTokens = fixToken(e, token.type);
                finalToken = finalToken.concat(fixedTokens);
            } 
            else {
                if (e.type == null) 
                    e.type = token.type;

                finalToken = finalToken.concat( expand(e, language) );
            }

        });
    }
    else {
        var fixedTokens = fixToken(token.content, token.type);
        return fixedTokens;
    }

    return finalToken;
};

function getTokenInfo(token) {

    var tokenInfo = {};

    tokenInfo["content"] = token.content;

    switch(token.type) {
        case "comment": case "block-comment": case "prolog": case "doctype": case "cdata":
            tokenInfo["fontColor"] = "#999999";
            break;

        case "punctuation":
            tokenInfo["fontColor"] = "#cccccc";
            break;

        case "tag": case "attr-name": case "namespace": case "deleted": 
            tokenInfo["fontColor"] = "#e2777a";
            break;

        case "function-name":
            tokenInfo["fontColor"] = "#6196cc";
            break;

        case "boolean": case "number": case "function":
            tokenInfo["fontColor"] = "#f08d49";
            break;

        case "property": case "class-name": case "constant": case "symbol":
            tokenInfo["fontColor"] = "#f8c555";
            break;

        case "selector": case "important": case "atrule": case "keyword": case "builtin":
            tokenInfo["fontColor"] = "#cc99cd";
            break;

        case "string": case "attr-value": case "char": case "regex": case "variable":
            tokenInfo["fontColor"] = "#7ec699";
            break;

        case "operator": case "entity": case "url":
            tokenInfo["fontColor"] = "#67cdcc";
            break;
    }

    /*switch(token.type) {
        case "comment": case "prolog": case "doctype": case "cdata":
            tokenInfo["fontColor"] = "#708090";
            break;

        case "punctuation":
            tokenInfo["fontColor"] = "#999999";
            break;

        case "namespace":
            tokenInfo["fontOpacity"] = "0.7";
            break;

        case "property": case "tag": case "boolean": case "number": case "constant": case "symbol": case "deleted":
            tokenInfo["fontColor"] = "#990055";
            break;

        case "selector": case "attr-name": case "string": case "char": case "builtin": case "inserted":
            tokenInfo["fontColor"] = "#669900";
            break;

        case "operator": case "entity": case "url":
            tokenInfo["fontColor"] = "#9a6e3a";
            break;

        case "atrule": case "attr-value": case "keyword":
            tokenInfo["fontColor"] = "#0077aa";
            break;

        case "function": case "class-name":
            tokenInfo["fontColor"] = "#DD4A68";
            break;

        case "regex": case "important": case "variable":
            tokenInfo["fontColor"] = "#ee9900";
            break;
    }*/

    return tokenInfo;
}

function nthIndex(text, subString, numberOfOccurences){
    var L = text.length, i = -1;
    while(numberOfOccurences-- && i++ < L){
        i = text.indexOf(subString, i);
        if (i < 0) break;
    }
    if (i == -1)
        return 0;

    return i;
}

function splitLine(str, firstRow, countLines) {

    if (!str) {
        return str; 
    }
    if (countLines <= 0) {
        return '';
    }
    let nlIndex = -1;
    let newLinesFound = 0;
    while(newLinesFound < countLines) {
        let nextIndex = str.indexOf('\n', nlIndex + 1);
        if (nextIndex === -1) {
            return str;
        }
        nlIndex = nextIndex;
        newLinesFound++;
    }
    return str.slice(firstRow, nlIndex);
}

vvv.addImageContent = function(imageData) {
    const container = new ThreeMeshUI.Block({
        height: 0.84,
        width: 1.83,
        padding: 0.02,
        backgroundOpacity: 1,
        name: "fileContentContainer",
    });
    
    new THREE.TextureLoader().load('data:image/png;base64,' + imageData, (texture) => {
        container.set({
          backgroundTexture: texture,
          backgroundSize: 'stretch',
        });
    });

    return container;
}

vvv.addTextContentTokens = function(text, fileExtension) {
    var tokenRows = [];
    var tokenRow = [];
    var i = 0;
    let mainTokens = Prism.tokenize(text, Prism.languages[fileExtension]);

    mainTokens.forEach(mainToken => {
        var subTokens = tokenExpand(mainToken);

        subTokens.forEach(token => {
            var tokenInfo = getTokenInfo(token);

            if (tokenInfo.content != "") {
                tokenRow.push({
                    fontColor: tokenInfo.fontColor, 
                    content: tokenInfo.content
                });
            }

            if (tokenInfo.content == "\n") {
                tokenRows.push(tokenRow);
                tokenRow = [];
            }
            
        })
    });

    return tokenRows;
}

vvv.addTextContent = function(tokenRows, scrollRow) {

    const container = new ThreeMeshUI.Block({
        height: 0.84,
        width: 1.83,
        padding: 0.02,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0,
        alignContent: "left",
        backgroundOpacity: 0,
        name: "fileContentContainer"
    });

    for (i = scrollRow; i < scrollRow + textFieldSize; i++) {
        if (i < tokenRows.length) {
            tokenRows[i].forEach(token => {
                container.add(
                    new ThreeMeshUI.Text({
                        fontSize: 0.035,
                        fontColor: new THREE.Color(token.fontColor),
                        content: token.content
                    })
                );
                
            })
        }
    }

    return container;
}

vvv.addDiffTextContent = function(tokenRows, scrollRow) {
    var block;

    const container = new ThreeMeshUI.Block({
        height: 0.84,
        width: 1.83,
        padding: 0.02,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0,
        alignContent: "left",
        backgroundOpacity: 0,
        name: "fileContentContainer"
    });

    for (i = scrollRow; i < scrollRow + textFieldSize; i++) {
        if (i < tokenRows.length) {

            if (tokenRows[i][0].content.startsWith("@@"))
                continue;

            if (tokenRows[i][0].content.startsWith("+")) {
                const greenBlock = new ThreeMeshUI.InlineBlock({
                    height: 0.035,
                    width: 1.8,
                    alignContent: "left",
                    backgroundOpacity: 0.25,
                    backgroundColor: new THREE.Color( 0x00ff00 )
                })
                block = greenBlock;
            }
            else if (tokenRows[i][0].content.startsWith("-")) {
                const redBlock = new ThreeMeshUI.InlineBlock({
                    height: 0.035,
                    width: 1.8,
                    alignContent: "left",
                    backgroundOpacity: 0.25,
                    backgroundColor: new THREE.Color( 0xff0000 )
                })
                block = redBlock;
            }
            else {
                const normalBlock = new ThreeMeshUI.InlineBlock({
                    height: 0.035,
                    width: 1.8,
                    alignContent: "left",
                    backgroundOpacity: 0
                })
                block = normalBlock;
            }

            tokenRows[i].forEach(token => {
                block.add(
                    new ThreeMeshUI.Text({
                        fontSize: 0.035,
                        fontColor: new THREE.Color(token.fontColor),
                        content: token.content
                    })
                );
                
            })

            container.add(block);
        }
    }

    return container;
}

vvv.createNodeLayout = function(posX, posY, posZ, repoInfo) {

    const nodeLayoutContainer = new ThreeMeshUI.Block({
        width: 0.351,
        height: 0.351,
        padding: 0.01,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0.015,
        alignContent: "left",
        backgroundOpacity: 0.8,
        name: "nodeLayoutContainer"
    }); 

    const buttonExpand = createNodeButton(0.1, 0.1, "buttonExpand", "expand");
    const buttonOpen = createNodeButton(0.1, 0.1, "buttonOpen", "open");
    const buttonHistory = createNodeButton(0.1, 0.1, "buttonHistory", "history");
    const buttonXXX = createNodeButton(0.1, 0.1, "buttonXXX", "XXX");
    const buttonYYY = createNodeButton(0.1, 0.1, "buttonYYY", "YYY");

    nodeLayoutContainer.add(
        buttonExpand,
        createNodeSpace(0.015, 0.1),
        buttonOpen,
        createNodeSpace(0.015, 0.1),
        buttonHistory,
        // new line
        buttonXXX,
        createNodeSpace(0.13, 0.1),
        buttonYYY
    );

    if (repoInfo) {
        const info = createNodeInfo(0.33, 0.33, repoInfo);
        nodeLayoutContainer.set({
            height: 0.58
        });
        nodeLayoutContainer.add(info);
    }

    objsToTest.push(buttonExpand, buttonOpen, buttonHistory, buttonXXX, buttonYYY);
    nodeLayoutContainer.position.set(posX, posY, posZ);

    //console.log(nodeLayoutContainer);

    return nodeLayoutContainer;
}

createNodeSpace = function(width, height) {

    const nodeSpace = new ThreeMeshUI.InlineBlock({
        height: height,
        width: width,
        backgroundOpacity: 0,
    });

    return nodeSpace;
}

createNodeInfo = function(width, height, info) {

    const createdDate = new Date(info.createdDate);
    const updatedDate = new Date(info.updatedDate);

    const nodeInfo = new ThreeMeshUI.InlineBlock({
        height: height,
        width: width,
        alignContent: "left",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: "owner: " + info.owner + "\n"
        }),
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: "name: " + info.name + "\n"
        }),
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: "language: " + info.language + "\n"
        }),
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: "size: " + info.size + "\n"
        }),
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: "created: " + createdDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
        }),
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: "updated: " + updatedDate.toLocaleDateString('sk-SK', dateOptions)
        }),
    );

    return nodeInfo;
}

createNodeButton = function(width, height, name, content) {

    const container = new ThreeMeshUI.InlineBlock({
        height: height,
        width: width,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: name
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: content
        }),
    );

    return container;
}

vvv.createBaseGUI = function() {
    const baseGUI = new ThreeMeshUI.Block({
        height: 1,
        width: 1,
        padding: 0.025,
        alignContent: "left",
        backgroundOpacity: 0.6,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        name: "baseGUI"
    })

    const buttonKeyboard = createButton(0.15, 0.15, "buttonKeyboard", "keyboard");

    const space = new ThreeMeshUI.InlineBlock({
        height: 0.15,
        width: 0.05,
        backgroundOpacity: 0,
    });

    const buttonGraphGUI = createButton(0.15, 0.15, "buttonGraphGUI", "GraphGUI");

    const space2 = new ThreeMeshUI.InlineBlock({
        height: 0.15,
        width: 0.20,
        backgroundOpacity: 0,
    });

    const buttonStartTest = createButton(0.15, 0.15, "buttonStartTest", "Start Test");

    const space3 = new ThreeMeshUI.InlineBlock({
        height: 0.15,
        width: 0.05,
        backgroundOpacity: 0,
    });

    const buttonEndTest = createButton(0.15, 0.15, "buttonEndTest", " End Test");

    baseGUI.add(buttonKeyboard, space, buttonGraphGUI, space2, buttonStartTest, space3, buttonEndTest);
    objsToTest.push(buttonKeyboard, buttonGraphGUI, buttonStartTest, buttonEndTest);

    // sem
    const nodeInfoBlock = new ThreeMeshUI.Block({
        height: 0.5,
        width: 1,
        padding: 0.025,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0,
        alignContent: "left",
        backgroundOpacity: 0,
        name: "nodeInfoBlock"
    });

    nodeInfoBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.035,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Informacie o vybranom prvku: \n"
        })
    );

    const nodeInfoSubBlock = new ThreeMeshUI.InlineBlock({
        height: 0.5,
        width: 1,
        padding: 0.025,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0,
        alignContent: "left",
        backgroundOpacity: 0,
        name: "nodeInfoSubBlock"
    });
    nodeInfoBlock.add(nodeInfoSubBlock);

    baseGUI.add(nodeInfoBlock);

    console.log(baseGUI);
    return baseGUI;
}

vvv.addRepoInfoSubBlock = function(node) {

    const nodeInfoSubBlock = new ThreeMeshUI.InlineBlock({
        height: 0.5,
        width: 1,
        padding: 0.025,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0,
        alignContent: "left",
        backgroundOpacity: 0,
        name: "nodeInfoSubBlock"
    });

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Nazov: " + node.__data.repoInfo.name + "\n"
        })
    );

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Popis: " + node.__data.repoInfo.description.replace(/\p{Emoji}/ug, (m, idx) => `[e-${m.codePointAt(0).toString(16)}]`) + "\n"
        })
    );

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Topics: "
        })
    );

    node.__data.repoInfo.topics.forEach(topic => {
        nodeInfoSubBlock.add(
            new ThreeMeshUI.Text({
                fontSize: 0.03,
                fontColor: new THREE.Color(0xd3d3d3),
                content: topic + " "
            })
        );
    });

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "\nStars: " + node.__data.repoInfo.stars + "\nForks: " + node.__data.repoInfo.forks + " \nWatchers: " + node.__data.repoInfo.watchers + "\n"
        })
    );

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Language: " + node.__data.repoInfo.language + "\n"
        })
    );

    const createdDate = new Date(node.__data.repoInfo.createdDate);
    const updatedDate = new Date(node.__data.repoInfo.updatedDate);
    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Created: " + createdDate.toLocaleDateString('sk-SK', dateOptions) + "\nUpdated: " + updatedDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
        })
    );

    /*
    repoInfo = {
                owner: repo.owner.login,
                name: repo.name,
                createdDate: repo.created_at,
                updatedDate: repo.updated_at,
                language: repo.language,
                size: repo.size,
                forks: repo.forks,
                score: repo.score,
                watchers: repo.watchers
            };
    */ 
    return nodeInfoSubBlock;
}

vvv.addNodeInfoSubBlock = function(node) {

    const nodeInfoSubBlock = new ThreeMeshUI.InlineBlock({
        height: 0.5,
        width: 1,
        padding: 0.025,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0,
        alignContent: "left",
        backgroundOpacity: 0,
        name: "nodeInfoSubBlock"
    });

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Nazov: " + node.__data.name + "\n"
        })
    );

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Cesta k suboru: " + node.__data.repository + "/" + node.__data.path + "\n"
        })
    );

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Typ suboru: " + node.__data.name.split('.').pop() + "\n"
        })
    );

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Velkost: " + node.__data.size + " Bajtov\n"
        })
    );

    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Pocet commitov: " + node.__data.commitCount + "\n"
        })
    );

    const updatedDate = new Date(node.__data.lastUpdateDate);
    nodeInfoSubBlock.add(
        new ThreeMeshUI.Text({
            fontSize: 0.03,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Updated: " + updatedDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
        })
    );

    return nodeInfoSubBlock;
}

createButton = function(width, height, name, content) {

    const container = new ThreeMeshUI.InlineBlock({
        height: height,
        width: width,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: name
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.035,
            fontColor: new THREE.Color( 0x000000 ),
            content: content
        }),
    );

    return container;
}

vvv.createLayout = function(posX, posY, posZ) {

    const layoutContainer = new ThreeMeshUI.Block({
        width: 2,
        height: 1,
        padding: 0.02,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0.02,
        alignContent: "left",
        backgroundOpacity: 1,
        info: {scrollPosition: 0},
        name: "layoutContainer"
    });

    const layoutHeader = createLayoutHeader();
    const layoutScroll = createLayoutScroll();  

    // content
    const layoutContent = new ThreeMeshUI.InlineBlock({
        height: 0.84,
        width: 1.83,
        backgroundColor: new THREE.Color( 0x2d2d2d ),
        backgroundOpacity: 1,
        name: "layoutContent"
    });

    const layoutContentSpace = new ThreeMeshUI.InlineBlock({
        height: 0.84,
        width: 0.02,
        backgroundOpacity: 0,
    });  

    layoutContainer.add(layoutHeader, layoutContent, layoutContentSpace, layoutScroll);
    layoutContainer.position.set(posX, posY, posZ);

    //console.log(layoutContainer);

    return layoutContainer;
}

createLayoutHeader = function() {

    // hlavicka (nazov, minimalizovat, zavriet)
    const layoutHeader = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 1.95,
        name: "layoutHeader"
    })

    // title
    const layoutHeaderTitle = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 1.6,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: "layoutHeaderTitle"
    })/*.add(
        new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: title
        }),
    )*/;

    const layoutHeaderSpace = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.12,
        backgroundOpacity: 0,
    });

    // minimalize
    const layoutHeaderMinimalize = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        alignContent: "center",
        justifyContent: "center",
        name: "buttonMinimalize"
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: "_"
        })
    );

    const layoutHeaderSpace2 = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.02,
        backgroundOpacity: 0,
    });

    // close
    const layoutHeaderClose = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        alignContent: "center",
        justifyContent: "center",
        name: "buttonClose"
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: "X"
        })
    );

    layoutHeader.add(layoutHeaderTitle, layoutHeaderSpace, layoutHeaderMinimalize, layoutHeaderSpace2, layoutHeaderClose);
    objsToTest.push(layoutHeaderMinimalize, layoutHeaderClose);

    return layoutHeader;
}

createLayoutScroll = function() {
    // scroll
    const layoutScroll = new ThreeMeshUI.InlineBlock({
        height: 0.84,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.1,
        alignContent: "center",
        justifyContent: "center",
        name: "layoutScroll"
    });

    const buttonPageUp = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: 'buttonPageUp',
        info: {scrollValue: -20, type: 'button', scrollDirection: "up"},
        justifyContent: "center",
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: "<<"
        })
    );

    const buttonUp = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: 'buttonUp',
        info: {scrollValue: -1, type: 'button', scrollDirection: "up"},
        justifyContent: "center",
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: "<"
        })
    );

    const buttonSpace = new ThreeMeshUI.InlineBlock({
        height: 0.4,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0,
    });

    const buttonDown = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: 'buttonDown',
        info: {scrollValue: 1, type: 'button', scrollDirection: "down"},
        justifyContent: "center",
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: ">"
        })
    );

    const buttonPageDown = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: 'buttonPageDown',
        info: {scrollValue: 20, type: 'button', scrollDirection: "down"},
        justifyContent: "center",
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: ">>"
        })
    );

    layoutScroll.add(buttonPageUp, buttonUp, buttonSpace, buttonDown, buttonPageDown);
    objsToTest.push(buttonPageUp, buttonUp, buttonDown, buttonPageDown);

    return layoutScroll;
}

vvv.createHistoryLayout = function(posX, posY, posZ, commitsInfo) {

    var width = 0.41;
    var height = commitsInfo.length * 0.1 + ((commitsInfo.length - 1) * 0.015) + 0.02;

    const fileHistoryContainer = new ThreeMeshUI.Block({
        width: width,
        height: height,
        padding: 0.01,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0.015,
        alignContent: "left",
        backgroundOpacity: 0.8,
        name: "fileHistoryContainer"
    }); 

    commitsInfo.forEach(commitInfo => {
        var commitButton = createHistoryButton(0.38, 0.1, commitInfo);
        fileHistoryContainer.add(commitButton);
        objsToTest.push(commitButton);
    });

    fileHistoryContainer.position.set(0 + width/2 + 0.175, 0 - height/2 + 0.175, 0);
    //console.log(fileHistoryContainer);

    return fileHistoryContainer;
}

createHistoryButton = function(width, height, commitInfo) {

    const container = new ThreeMeshUI.InlineBlock({
        height: height,
        width: width,
        alignContent: "left",
        justifyContent: "center",
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: "buttonCommit",
        info: commitInfo,
    }).add(
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: commitInfo.message  + "\n"
        }),
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: commitInfo.author + "\n"
        }),
        new ThreeMeshUI.Text({
            fontSize: 0.02,
            fontColor: new THREE.Color( 0xffffff ),
            content: commitInfo.date
        }),
    );

    return container;
}

function makeUI() {

    const colors = {
        keyboardBack: 0x858585,
        panelBack: 0x262626,
        button: 0x363636,
        hovered: 0x1c1c1c,
        selected: 0x109c5d
    };

	const container = new THREE.Group();
	container.position.set( -1.2, 1.2, -1.2 );
	container.rotation.x = -0.15;
    container.name = "keyboardTop";
    scene.add( container );

	//////////////
	// TEXT PANEL
	//////////////

    const textPanel = new ThreeMeshUI.Block({
    	fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png', 
    	width: 1,
    	height: 0.35,
    	backgroundColor: new THREE.Color( colors.panelBack ),
    	backgroundOpacity: 1
    });

    textPanel.position.set( 0, -0.15, 0 );
    container.add( textPanel );

    //

    const title = new ThreeMeshUI.Block({
    	width: 1,
    	height: 0.1,
    	justifyContent: 'center',
    	fontSize: 0.045,
    	backgroundOpacity: 0
    }).add(
    	new ThreeMeshUI.Text({ content: 'Type search query on the keyboard' })
    );

    userText = new ThreeMeshUI.Text({ content: '', queryType: '' });

    const textField = new ThreeMeshUI.Block({
    	width: 1,
    	height: 0.4,
    	fontSize: 0.033,
    	padding: 0.02,
    	backgroundOpacity: 0
    }).add( userText );

    textPanel.add( title, textField );

    ////////////////////////
    // LAYOUT OPTIONS PANEL
    ////////////////////////

    // BUTTONS

    /*let layoutButtons = [
    	[ 'Repositories', 'repositories' ],
    	[ 'Commit', 'commit' ],
    	[ 'Code', 'code' ],
    	[ 'Users', 'users' ],
    	[ 'Topics', 'topics' ],
    	[ 'Issues', 'issues' ],
    	[ 'Labels', 'labels' ]
    ];*/

    let layoutButtons = [
    	[ 'User', 'user' ],
    	[ 'Name', 'name' ],
    	[ 'Language', 'language' ],
    	[ 'Topic', 'topic' ],
    	[ 'Sort', 'sort' ],
    	[ 'Order', 'order' ]
    ];

    layoutButtons = layoutButtons.map( (options)=> {

    	const button = new ThreeMeshUI.Block({
    		height: 0.06,
    		width: 0.22,
    		margin: 0.012,
    		justifyContent: 'center',
	  		backgroundColor: new THREE.Color( colors.button ),
	  		backgroundOpacity: 1
    	}).add(

    		new ThreeMeshUI.Text({
    			offset: 0,
    			fontSize: 0.035,
    			content: options[ 0 ]
    		})

    	);

    	button.setupState({
			state: "idle",
			attributes: {
				offset: 0.02,
				backgroundColor: new THREE.Color( colors.button ),
	  			backgroundOpacity: 1
			}
		});

		button.setupState({
			state: "hovered",
			attributes: {
				offset: 0.02,
				backgroundColor: new THREE.Color( colors.hovered ),
				backgroundOpacity: 1
			}
		});

		button.setupState({
			state: "selected",
			attributes: {
				offset: 0.01,
				backgroundColor: new THREE.Color( colors.selected ),
				backgroundOpacity: 1
			},
			onSet: ()=> {
                //userText.queryType = options[ 1 ];
                console.log(options[ 1 ]);
                switch( options[ 1 ] ) {

                    // hlavne
                    case 'user' :
                        userText.set({ content: userText.content += '+user:' });
                        break;
                    
                    case 'name' :
                        userText.set({ content: userText.content += '+name:' });
                        break;

                    case 'language' :
                        userText.set({ content: userText.content += '+language:' });
                        break;

                    case 'topic' :
                        userText.set({ content: userText.content += '+topic:' });
                        break;

                    // doplnkove
                    case 'sort' :
                        userText.set({ content: userText.content += '&sort=' });
                        break;

                    case 'order' :
                        userText.set({ content: userText.content += '&order=' });
                        break;

                    
                };
			}

		});

		objsToTest.push( button );

    	return button

    });

    // CONTAINER

    layoutOptions = new ThreeMeshUI.Block({
    	fontFamily: './js/' + fontFilesName + '.json', //fontFamily: './js/roboto-bold.json',
        fontTexture: './js/' + fontFilesName + '.png', // fontTexture: './js/roboto-bold.png',
    	height: 0.3,
    	width: 1,
    	offset: 0,
    	backgroundColor: new THREE.Color( colors.panelBack ),
    	backgroundOpacity: 1
    }).add(

    	new ThreeMeshUI.Block({
    		height: 0.07,
    		width: 0.6,
    		offset: 0,
    		justifyContent: 'center',
    		backgroundOpacity: 0
	  	}).add(

	  		new ThreeMeshUI.Text({
	  			fontSize: 0.04,
	  			content: 'Help to search query:'
	  		})

	  	),

	  	new ThreeMeshUI.Block({
	  		height: 0.075,
	  		width: 1,
	  		offset: 0,
	  		contentDirection: 'row',
	  		justifyContent: 'center',
    		backgroundOpacity: 0
	  	}).add(

	  		layoutButtons[ 0 ],
	  		layoutButtons[ 1 ],
	  		layoutButtons[ 2 ],
	  		layoutButtons[ 3 ],

	  	),

	  	new ThreeMeshUI.Block({
	  		height: 0.075,
	  		width: 1,
	  		offset: 0,
	  		contentDirection: 'row',
	  		justifyContent: 'center',
    		backgroundOpacity: 0
	  	}).add(

	  		layoutButtons[ 4 ],
	  		layoutButtons[ 5 ]

	  	),

          new ThreeMeshUI.Block({
    		height: 0.07,
    		width: 0.6,
    		offset: 0,
    		justifyContent: 'center',
    		backgroundOpacity: 0
	  	}).add(

	  		new ThreeMeshUI.Text({
	  			fontSize: 0.03,
	  			content: 'Example: tetris+language:assembly&sort=stars&order=desc'
	  		})

	  	)

    );

    layoutOptions.position.set( 0, 0.2, 0 );
    container.add( layoutOptions );
    objsToTest.push( layoutOptions );

    makeKeyboard( 'eng' );

};

function makeKeyboard( language ) {

    const colors = {
        keyboardBack: 0x858585,
        panelBack: 0x262626,
        button: 0x363636,
        hovered: 0x1c1c1c,
        selected: 0x109c5d
    };

	keyboard = new ThreeMeshUI.Keyboard({
		language: language,
		fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
		backgroundColor: new THREE.Color( colors.keyboardBack ),
	  	backgroundOpacity: 1,
	  	backspaceTexture: './js/backspace.png',
	  	shiftTexture: './js/shift.png',
	  	enterTexture: './js/enter.png'
	});

	keyboard.position.set( -1.2, 0.65, -1 );
	keyboard.rotation.x = -0.55;
    keyboard.name = "keyboardBottom"
	scene.add( keyboard );

	//

	keyboard.keys.forEach( (key)=> {

		objsToTest.push( key );

		key.setupState({
			state: 'idle',
			attributes: {
				offset: 0,
				backgroundColor: new THREE.Color( colors.button ),
    			backgroundOpacity: 1
			}
		});

		key.setupState({
			state: 'hovered',
			attributes: {
				offset: 0,
				backgroundColor: new THREE.Color( colors.hovered ),
				backgroundOpacity: 1
			}
		});

		key.setupState({
			state: 'selected',
			attributes: {
				offset: -0.009,
				backgroundColor: new THREE.Color( colors.selected ),
				backgroundOpacity: 1
			},
			// triggered when the user clicked on a keyboard's key
			onSet: ()=> {

				// if the key have a command (eg: 'backspace', 'switch', 'enter'...)
				// special actions are taken
				if ( key.info.command ) {

					switch( key.info.command ) {

						// switch between panels
						case 'switch' :
							keyboard.setNextPanel();
							break;

						// switch between panel charsets (eg: russian/english)
						case 'switch-set' :
							keyboard.setNextCharset();
							break;

						case 'enter' :
                            //vvv.model.getSearchQuery(userText.queryType, userText.content);
							break;

						case 'space' :
                            //userText.set({ content: userText.content += ' ' });
                            //userText.set({ content: userText.content = 'JavaTestRepo+user:MartinSith' });
                            userText.set({ content: userText.content = 'user:MartinSith' });
							break;

						case 'backspace' :
							if ( !userText.content.length ) break
							userText.set({
								content: userText.content.substring(0, userText.content.length - 1) || ""
							});
							break;

						case 'shift' :
							keyboard.toggleCase();
							break;

					};

				// print a glyph, if any
				} else if ( key.info.input ) {

					userText.set({ content: userText.content += key.info.input });

				};

			}
		});

	});

};

function clear( uiComponent ) {

	scene.remove( uiComponent );

	// We must call this method when removing a component,
	// to make sure it's removed from the update registry.
	uiComponent.clear();

	uiComponent.traverse( (child)=> {

		if ( objsToTest.includes( child ) ) objsToTest.splice( objsToTest.indexOf( child ), 1 );

	});

};