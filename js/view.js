var MVC = MVC || {};
MVC.View = MVC.View || {};

var vvv = MVC.View;

vvv._graphData;
vvv.myGraph;
vvv.model;

var Languages = /*languages_placeholder[*/{
    "none": "Plain text",
    "plain": "Plain text",
    "plaintext": "Plain text",
    "text": "Plain text",
    "txt": "Plain text",
    "html": "HTML",
    "xml": "XML",
    "svg": "SVG",
    "mathml": "MathML",
    "ssml": "SSML",
    "rss": "RSS",
    "css": "CSS",
    "clike": "C-like",
    "js": "JavaScript",
    "abap": "ABAP",
    "abnf": "ABNF",
    "al": "AL",
    "antlr4": "ANTLR4",
    "g4": "ANTLR4",
    "apacheconf": "Apache Configuration",
    "apl": "APL",
    "aql": "AQL",
    "arff": "ARFF",
    "asciidoc": "AsciiDoc",
    "adoc": "AsciiDoc",
    "aspnet": "ASP.NET (C#)",
    "asm6502": "6502 Assembly",
    "autohotkey": "AutoHotkey",
    "autoit": "AutoIt",
    "basic": "BASIC",
    "bbcode": "BBcode",
    "bnf": "BNF",
    "rbnf": "RBNF",
    "bsl": "BSL (1C:Enterprise)",
    "oscript": "OneScript",
    "csharp": "C#",
    "cs": "C#",
    "dotnet": "C#",
    "cpp": "C++",
    "cfscript": "CFScript",
    "cfc": "CFScript",
    "cil": "CIL",
    "cmake": "CMake",
    "cobol": "COBOL",
    "coffee": "CoffeeScript",
    "conc": "Concurnas",
    "csp": "Content-Security-Policy",
    "css-extras": "CSS Extras",
    "csv": "CSV",
    "dataweave": "DataWeave",
    "dax": "DAX",
    "django": "Django/Jinja2",
    "jinja2": "Django/Jinja2",
    "dns-zone-file": "DNS zone file",
    "dns-zone": "DNS zone file",
    "dockerfile": "Docker",
    "dot": "DOT (Graphviz)",
    "gv": "DOT (Graphviz)",
    "ebnf": "EBNF",
    "editorconfig": "EditorConfig",
    "ejs": "EJS",
    "etlua": "Embedded Lua templating",
    "erb": "ERB",
    "excel-formula": "Excel Formula",
    "xlsx": "Excel Formula",
    "xls": "Excel Formula",
    "fsharp": "F#",
    "firestore-security-rules": "Firestore security rules",
    "ftl": "FreeMarker Template Language",
    "gml": "GameMaker Language",
    "gamemakerlanguage": "GameMaker Language",
    "gcode": "G-code",
    "gdscript": "GDScript",
    "gedcom": "GEDCOM",
    "glsl": "GLSL",
    "graphql": "GraphQL",
    "hs": "Haskell",
    "hcl": "HCL",
    "hlsl": "HLSL",
    "http": "HTTP",
    "hpkp": "HTTP Public-Key-Pins",
    "hsts": "HTTP Strict-Transport-Security",
    "ichigojam": "IchigoJam",
    "icu-message-format": "ICU Message Format",
    "idr": "Idris",
    "ignore": ".ignore",
    "gitignore": ".gitignore",
    "hgignore": ".hgignore",
    "npmignore": ".npmignore",
    "inform7": "Inform 7",
    "javadoc": "JavaDoc",
    "javadoclike": "JavaDoc-like",
    "javastacktrace": "Java stack trace",
    "jq": "JQ",
    "jsdoc": "JSDoc",
    "js-extras": "JS Extras",
    "json": "JSON",
    "webmanifest": "Web App Manifest",
    "json5": "JSON5",
    "jsonp": "JSONP",
    "jsstacktrace": "JS stack trace",
    "js-templates": "JS Templates",
    "kts": "Kotlin Script",
    "kt": "Kotlin",
    "kumir": "KuMir (КуМир)",
    "kum": "KuMir (КуМир)",
    "latex": "LaTeX",
    "tex": "TeX",
    "context": "ConTeXt",
    "lilypond": "LilyPond",
    "ly": "LilyPond",
    "emacs": "Lisp",
    "elisp": "Lisp",
    "emacs-lisp": "Lisp",
    "llvm": "LLVM IR",
    "log": "Log file",
    "lolcode": "LOLCODE",
    "md": "Markdown",
    "markup-templating": "Markup templating",
    "matlab": "MATLAB",
    "mel": "MEL",
    "mongodb": "MongoDB",
    "moon": "MoonScript",
    "n1ql": "N1QL",
    "n4js": "N4JS",
    "n4jsd": "N4JS",
    "nand2tetris-hdl": "Nand To Tetris HDL",
    "naniscript": "Naninovel Script",
    "nani": "Naninovel Script",
    "nasm": "NASM",
    "neon": "NEON",
    "nginx": "nginx",
    "nsis": "NSIS",
    "objectivec": "Objective-C",
    "objc": "Objective-C",
    "ocaml": "OCaml",
    "opencl": "OpenCL",
    "openqasm": "OpenQasm",
    "qasm": "OpenQasm",
    "parigp": "PARI/GP",
    "objectpascal": "Object Pascal",
    "psl": "PATROL Scripting Language",
    "pcaxis": "PC-Axis",
    "px": "PC-Axis",
    "peoplecode": "PeopleCode",
    "pcode": "PeopleCode",
    "php": "PHP",
    "phpdoc": "PHPDoc",
    "php-extras": "PHP Extras",
    "plsql": "PL/SQL",
    "powerquery": "PowerQuery",
    "pq": "PowerQuery",
    "mscript": "PowerQuery",
    "powershell": "PowerShell",
    "promql": "PromQL",
    "properties": ".properties",
    "protobuf": "Protocol Buffers",
    "purebasic": "PureBasic",
    "pbfasm": "PureBasic",
    "purs": "PureScript",
    "py": "Python",
    "qsharp": "Q#",
    "qs": "Q#",
    "q": "Q (kdb+ database)",
    "qml": "QML",
    "rkt": "Racket",
    "jsx": "React JSX",
    "tsx": "React TSX",
    "renpy": "Ren'py",
    "rpy": "Ren'py",
    "rest": "reST (reStructuredText)",
    "robotframework": "Robot Framework",
    "robot": "Robot Framework",
    "rb": "Ruby",
    "sas": "SAS",
    "sass": "Sass (Sass)",
    "scss": "Sass (Scss)",
    "shell-session": "Shell session",
    "sh-session": "Shell session",
    "shellsession": "Shell session",
    "sml": "SML",
    "smlnj": "SML/NJ",
    "solidity": "Solidity (Ethereum)",
    "sol": "Solidity (Ethereum)",
    "solution-file": "Solution file",
    "sln": "Solution file",
    "soy": "Soy (Closure Template)",
    "sparql": "SPARQL",
    "rq": "SPARQL",
    "splunk-spl": "Splunk SPL",
    "sqf": "SQF: Status Quo Function (Arma 3)",
    "sql": "SQL",
    "iecst": "Structured Text (IEC 61131-3)",
    "t4-templating": "T4 templating",
    "t4-cs": "T4 Text Templates (C#)",
    "t4": "T4 Text Templates (C#)",
    "t4-vb": "T4 Text Templates (VB)",
    "tap": "TAP",
    "tt2": "Template Toolkit 2",
    "toml": "TOML",
    "trig": "TriG",
    "ts": "TypeScript",
    "tsconfig": "TSConfig",
    "uscript": "UnrealScript",
    "uc": "UnrealScript",
    "uri": "URI",
    "url": "URL",
    "vbnet": "VB.Net",
    "vhdl": "VHDL",
    "vim": "vim",
    "visual-basic": "Visual Basic",
    "vba": "VBA",
    "vb": "Visual Basic",
    "wasm": "WebAssembly",
    "wiki": "Wiki markup",
    "xeoracube": "XeoraCube",
    "xml-doc": "XML doc (.net)",
    "xojo": "Xojo (REALbasic)",
    "xquery": "XQuery",
    "yaml": "YAML",
    "yml": "YAML",
    "yang": "YANG"
}/*]*/;

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
            .linkWidth(0.02)
            .linkOpacity(0.7)
            .linkDirectionalParticles(1)
            .linkDirectionalParticleSpeed('particleSpeed')
            .linkDirectionalParticleWidth(0.04)
            //.linkDirectionalParticleColor()
            .nodeRelSize(10)
            .nodeId('path')
            .nodeVal(200)
            //.nodeAutoColorBy('module')
            .nodeOpacity(0.9)
            .nodeThreeObject(node => {
                
                if (node.type == 'dir') {
                    var object = new THREE.BoxGeometry(node.nodeSize, node.nodeSize, node.nodeSize);
                    if (node.repoInfo) {
                        var language = Object.keys(Languages).find(key => Languages[key] === node.repoInfo.language);
                        if (!language) language = node.repoInfo.language;
                        var material = new THREE.MeshLambertMaterial({ map: vvv.createRepoNodeTexture(language, node.color ), depthWrite: true, transparent: false, opacity: 0, color: node.color });
                        material.map.minFilter = THREE.LinearFilter;
                    } else {
                        var material = new THREE.MeshLambertMaterial({depthWrite: true, transparent: false, opacity: 0, color: node.color });
                    }
                }
                else {
                    var object = new THREE.SphereGeometry(node.nodeSize / 2, 16, 16);
                    var material = new THREE.MeshLambertMaterial({depthWrite: true, transparent: false, opacity: 0, color: node.color });
                }
                
                const obj = new THREE.Mesh(
                    object,
                    //new THREE.SphereGeometry(node.size),
                    material
                );

                const sprite = new SpriteText(node.name);
                sprite.material.depthWrite = false;
                sprite.strokeWidth = 0.1;
                sprite.strokeColor = 0xffff00;
                sprite.textHeight = 0.02;
                obj.add(sprite);
                sprite.position.y -= (node.nodeSize / 2 + 0.03);

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

vvv.createRepoNodeTexture = function(text, color) {
    var canvas,
        context,
        metrics = null,
        textHeight = 100,
        textWidth = 0;

    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');  

    metrics = context.measureText(text);
    var textWidth = metrics.width * 10;

    //context.fillStyle = '#fff';
    //context.fillRect(0, 0, textWidth, textHeight);

    canvas.width = textWidth;
    canvas.height = textHeight;
    canvas.color = "#00FF00";
    context.font = "normal " + textHeight + "px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;

    var object = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const obj = new THREE.Mesh(
        object,
        new THREE.MeshLambertMaterial({ map: texture, depthWrite: true, transparent: false, opacity: 0})
    );
    return obj;
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
            commitCount = null,
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
            //console.log("particleSpeed: " + particleSpeed);

            var repoCreatedDate = new Date(nodes.filter(obj => { return obj.name == clickedNode.__data.repository })[0].repoInfo.createdDate);
            var nodeLastUpdateDate = new Date(lastUpdateDate);
            var currentDate = new Date();
            const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

            const daysUntilToday = Math.round(Math.abs((repoCreatedDate - currentDate) / oneDay));
            const daysFromTodayToLastUpdate = Math.round(Math.abs((nodeLastUpdateDate - currentDate) / oneDay));

            //console.log(daysUntilToday  + " " + daysFromTodayToLastUpdate);

            var colorGreenValue = Math.round(daysFromTodayToLastUpdate / daysUntilToday * 255);

            var hex = colorGreenValue.toString(16);
            if (hex.length == 1) {
                var colorGreenHexValue = "0" + hex;
            }
            else {
                var colorGreenHexValue = hex;
            }
            nodeColor = "#FF" + colorGreenHexValue + "00";

            //console.log(colorGreenValue  + " " + nodeColor);

            if (type == "dir") {
                var nodeSize = minValue;
            }
            else {
                var nodeSize = size / max  * maxValue;
                if (nodeSize < minValue) nodeSize = minValue;
            }
            //console.log("nodeSize: " + nodeSize);

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

                // fix kvoly diff
                if (subTokens[i].startsWith("-")) {
                    subTokens[i] = subTokens[i].substring(1);
                    fixedTokens.push({
                        type: type, 
                        content: "-"
                    });
                }
                if (subTokens[i].startsWith("+")) {
                    subTokens[i] = subTokens[i].substring(1);
                    fixedTokens.push({
                        type: type, 
                        content: "+"
                    });
                }

                // fix kvoly medzeram
                while (subTokens[i].startsWith("    ")) {
                    subTokens[i] = subTokens[i].substring(4);
                    fixedTokens.push({
                        type: type, 
                        content: "    "
                    });
                }

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
        // fix kvoly medzeram
        while (token.startsWith("    ")) {
            token = token.substring(4);
            fixedTokens.push({
                type: type, 
                content: "    "
            });
        }

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
    var lineLength = 75;
    var tokenRowLength = 0;
    let mainTokens = Prism.tokenize(text, Prism.languages[fileExtension]);

    mainTokens.forEach(mainToken => {
        var subTokens = tokenExpand(mainToken);

        subTokens.forEach(token => {
            var tokenInfo = getTokenInfo(token);

            //console.log(tokenInfo.content);
            if (tokenInfo.content != "") {

                // fix na dlhe riadky
                if (tokenRowLength + tokenInfo.content.length > lineLength) {
                    tokenRow.push({
                        fontColor: null, 
                        content: "\n"
                    });

                    tokenRows.push(tokenRow);
                    tokenRow = [];
                    tokenRowLength = 0;
                }

                tokenRow.push({
                    fontColor: tokenInfo.fontColor, 
                    content: tokenInfo.content
                });
                tokenRowLength += tokenInfo.content.length;
            }

            if (tokenInfo.content == "\n") {
                tokenRows.push(tokenRow);
                tokenRow = [];
                tokenRowLength = 0;
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
        //alignContent: "left",
        backgroundOpacity: 0,
        name: "fileContentContainer"
    });

    var mesh, x = 0.02, y = 0.02;

    for (i = scrollRow; i < scrollRow + textFieldSize; i++) {
        if (i < tokenRows.length) {
            tokenRows[i].forEach(token => {
                mesh = dat.GUIVR.addTextMesh( token.content, { color: token.fontColor, scale: 1.0, align: 'left' });
                mesh.position.x -= 0.91 - x;
                mesh.position.y += 0.42 - y;
                if (token.content.includes("\n")) {
                    y += 0.045;
                    x = 0.02;
                }
                x += mesh.userData.width;

                container.add(
                    mesh,
                    /*new ThreeMeshUI.Text({
                        fontSize: 0.035,
                        fontColor: new THREE.Color(token.fontColor),
                        content: token.content
                    })*/
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

            var mesh, x = 0.02;
            tokenRows[i].forEach(token => {
                mesh = dat.GUIVR.addTextMesh( token.content, { color: token.fontColor, scale: 1.0, align: 'left' });
                mesh.position.x -= 0.91 - x;
                if (token.content.includes("\n")) {
                    x = 0.02;
                }
                x += mesh.userData.width;

                block.add(
                    mesh
                    /*new ThreeMeshUI.Text({
                        fontSize: 0.035,
                        fontColor: new THREE.Color(token.fontColor),
                        content: token.content
                    })*/
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
        new dat.GUIVR.addTextMesh( "owner: " + info.owner + "\n"
                                 + "name: " + info.name + "\n" 
                                 + "language: " + info.language + "\n"
                                 + "size: " + info.size + "\n"    
                                 + "created: " + createdDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
                                 + "updated: " + updatedDate.toLocaleDateString('sk-SK', dateOptions)
        , { color: 0xffffff, scale: 1.0, align: 'left', position: 'center' })
        /*new ThreeMeshUI.Text({
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
        }),*/
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
        new dat.GUIVR.addTextMesh( content, { color: 0xffffff, scale: 1.0, align: 'left', position: 'center' })
        /*new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: content
        }),*/
    );

    return container;
}

vvv.createBaseGUI = function() {
    const baseGUI = new ThreeMeshUI.Block({
        height: 1,
        width: 1,
        padding: 0.025,
        alignContent: "left",
        interLine: 0.05,
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

    // otvor a historia
    const buttonOpen = createButton(0.15, 0.15, "buttonOpen", "Open");

    const space4 = new ThreeMeshUI.InlineBlock({
        height: 0.15,
        width: 0.05,
        backgroundOpacity: 0,
    });

    const buttonHistory = createButton(0.15, 0.15, "buttonHistory", "History");

    const space5 = new ThreeMeshUI.InlineBlock({
        height: 0.15,
        width: 0.20,
        backgroundOpacity: 0,
    });

    baseGUI.add(buttonKeyboard, space, buttonGraphGUI, space2, buttonStartTest, space3, buttonEndTest, buttonOpen, space4, buttonHistory, space5);
    objsToTest.push(buttonKeyboard, buttonGraphGUI, buttonStartTest, buttonEndTest, buttonOpen, buttonHistory);

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

    var mesh = new dat.GUIVR.addTextMesh("Informacie o vybranom prvku: \n", { color: 0xffffff, scale: 1.0, align: 'left'});

    nodeInfoBlock.add(
        mesh
        /*new ThreeMeshUI.Text({
            fontSize: 0.035,
            fontColor: new THREE.Color(0xd3d3d3),
            content: "Informacie o vybranom prvku: \n"
        })*/
    );

    mesh.position.x -= 0.47;
    mesh.position.y += 0.1;

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

    var mesh = new dat.GUIVR.addTextMesh("", { color: 0xffffff, scale: 1.0, align: 'left'});
    nodeInfoSubBlock.add(
        mesh
    );

    mesh.position.x -= 0.5;
    mesh.position.y -= 0.3;

    nodeInfoBlock.add(nodeInfoSubBlock);

    baseGUI.add(nodeInfoBlock);

    console.log(baseGUI);
    return baseGUI;
}

vvv.updateRepoInfo = function(node) {
    const createdDate = new Date(node.__data.repoInfo.createdDate);
    const updatedDate = new Date(node.__data.repoInfo.updatedDate);

    var topics = "";
    node.__data.repoInfo.topics.forEach(topic => { 
        topics += topic + " "
    })

    var newText =     "Nazov: "        + node.__data.repoInfo.name + "\n"
                    + "Popis: "        + node.__data.repoInfo.description.replace(/\p{Emoji}/ug, (m, idx) => `[e-${m.codePointAt(0).toString(16)}]`) + "\n"
                    + "Topics: "       + topics + "\n"
                    + "Stars: "        + node.__data.repoInfo.stars + "\n"
                    + "Forks: "        + node.__data.repoInfo.forks + "\n"
                    + "Watchers: "     + node.__data.repoInfo.watchers + "\n"
                    + "Language: "     + node.__data.repoInfo.language + "\n"
                    + "Created: "      + createdDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
                    + "Updated: "      + updatedDate.toLocaleDateString('sk-SK', dateOptions) + "\n";

    return newText;
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

    const createdDate = new Date(node.__data.repoInfo.createdDate);
    const updatedDate = new Date(node.__data.repoInfo.updatedDate);

    var topics = "";
    node.__data.repoInfo.topics.forEach(topic => { 
        topics += topic + " "
    })

    var repoDescription = node.__data.repoInfo.description.replace(/\p{Emoji}/ug, (m, idx) => `[e-${m.codePointAt(0).toString(16)}]`)
    repoDescription = repoDescription.length > 50 ? repoDescription.substring(0, 40) + "..." : repoDescription;

    var mesh = new dat.GUIVR.addTextMesh( "Nazov: "        + node.__data.repoInfo.name + "\n"
                                        + "Popis: "        + repoDescription + "\n"
                                        + "Topics: "       + topics + "\n"
                                        + "Stars: "        + node.__data.repoInfo.stars + "\n"
                                        + "Forks: "        + node.__data.repoInfo.forks + "\n"
                                        + "Watchers: "     + node.__data.repoInfo.watchers + "\n"
                                        + "Language: "     + node.__data.repoInfo.language + "\n"
                                        + "Created: "      + createdDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
                                        + "Updated: "      + updatedDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
                                        , { color: 0xffffff, scale: 1.0, align: 'left'});

    nodeInfoSubBlock.add(
        mesh
    );

    mesh.position.x -= 0.5;
    mesh.position.y -= 0.5;
 
    return nodeInfoSubBlock;
}

vvv.updateNodeInfo = function(node) {
    const createdDate = new Date(node.__data.repoInfo.createdDate);
    const updatedDate = new Date(node.__data.repoInfo.updatedDate);

    var topics = "";
    node.__data.repoInfo.topics.forEach(topic => { 
        topics += topic + " "
    })

    var newText =     "Nazov: "        + node.__data.repoInfo.name + "\n"
                    + "Popis: "        + node.__data.repoInfo.description.replace(/\p{Emoji}/ug, (m, idx) => `[e-${m.codePointAt(0).toString(16)}]`) + "\n"
                    + "Topics: "       + topics + "\n"
                    + "Stars: "        + node.__data.repoInfo.stars + "\n"
                    + "Forks: "        + node.__data.repoInfo.forks + "\n"
                    + "Watchers: "     + node.__data.repoInfo.watchers + "\n"
                    + "Language: "     + node.__data.repoInfo.language + "\n"
                    + "Created: "      + createdDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
                    + "Updated: "      + updatedDate.toLocaleDateString('sk-SK', dateOptions) + "\n";

    return newText;
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

    const updatedDate = new Date(node.__data.lastUpdateDate);
    if (node.__data.type == "file") 
        var type = node.__data.name.split('.').pop();
    else 
        var type = node.__data.type;

    var mesh = new dat.GUIVR.addTextMesh( "Nazov: "          + node.__data.name + "\n"
                                        + "Cesta k suboru: " + node.__data.repository + "/" + node.__data.path + "\n"
                                        + "Typ suboru: "     + type + "\n"
                                        + "Velkost: "        + node.__data.size + " Bajtov\n"
                                        + "Pocet commitov: " + node.__data.commitCount + "\n"
                                        + "Updated: "        + updatedDate.toLocaleDateString('sk-SK', dateOptions) + "\n"
                                        , { color: 0xffffff, scale: 1.0, align: 'left'});

    nodeInfoSubBlock.add(
        mesh
    );

    mesh.position.x -= 0.49;
    mesh.position.y -= 0.3;

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
        info: {},
        name: name
    }).add(
        new dat.GUIVR.addTextMesh(content, { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        /*new ThreeMeshUI.Text({
            fontSize: 0.035,
            fontColor: new THREE.Color( 0x000000 ),
            content: content
        }),*/
    );

    return container;
}

vvv.createLayout = function(posX, posY, posZ) {

    const layoutContainer = new ThreeMeshUI.Block({
        width: 2,
        height: 1.2,
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
        height: 1.04,
        width: 1.83,
        backgroundColor: new THREE.Color( 0x2d2d2d ),
        backgroundOpacity: 1,
        name: "layoutContent"
    });

    const layoutContentSpace = new ThreeMeshUI.InlineBlock({
        height: 1.04,
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
    });

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
        new dat.GUIVR.addTextMesh("_", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        /*new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: "_"
        })*/
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
        new dat.GUIVR.addTextMesh("X", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        /*new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: "X"
        })*/
    );

    layoutHeader.add(layoutHeaderTitle, layoutHeaderSpace, layoutHeaderMinimalize, layoutHeaderSpace2, layoutHeaderClose);
    objsToTest.push(layoutHeaderMinimalize, layoutHeaderClose, layoutHeaderTitle);
    console.log(objsToTest);

    return layoutHeader;
}

createLayoutScroll = function() {
    // scroll
    const layoutScroll = new ThreeMeshUI.InlineBlock({
        height: 1.04,
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
        new dat.GUIVR.addTextMesh("<<", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        /*new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: "<<"
        })*/
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
        new dat.GUIVR.addTextMesh("<", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        /*new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: "<"
        })*/
    );

    const buttonSpace = new ThreeMeshUI.InlineBlock({
        height: 0.6,
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
        new dat.GUIVR.addTextMesh(">", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        /*new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: ">"
        })*/
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
        new dat.GUIVR.addTextMesh(">>", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
        /*new ThreeMeshUI.Text({
            fontSize: 0.05,
            fontColor: new THREE.Color( 0x000000 ),
            content: ">>"
        })*/
    );

    layoutScroll.add(buttonPageUp, buttonUp, buttonSpace, buttonDown, buttonPageDown);
    objsToTest.push(buttonPageUp, buttonUp, buttonDown, buttonPageDown);

    return layoutScroll;
}

vvv.createHistoryLayout = function(posX, posY, posZ, commitsInfo) {

    var width = 1.2;
    var height = 4 * 0.15 + ((4 - 1) * 0.015) + 0.14;

    const fileHistoryContainer = new ThreeMeshUI.Block({
        width: width,
        height: height,
        padding: 0.01,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0.015,
        alignContent: "left",
        info: {scrollPosition: 0},
        backgroundOpacity: 0.8,
        name: "fileHistoryContainer"
    }); 

    const historyLayoutHeader = createHistoryLayoutHeader();

    const layoutHistoryContent = new ThreeMeshUI.InlineBlock({
        height: height-0.15,
        width: 0.97,
        backgroundColor: new THREE.Color( 0x2d2d2d ),
        backgroundOpacity: 1,
        name: "layoutHistoryContent"
    });

    const space = new ThreeMeshUI.InlineBlock({
        height: height-0.15,
        width: 0.05,
        backgroundOpacity: 0,
    });

    const layoutHistoryScroll = new ThreeMeshUI.InlineBlock({
        height: height-0.15,
        width: 0.15,
        backgroundColor: new THREE.Color( 0x2d2d2d ),
        backgroundOpacity: 1,
        name: "layoutHistoryScroll"
    });

    for (i = 0; i < 4; i++) {
        var commitSubButton = createHistorySubButton(i + 1);
        layoutHistoryScroll.add(commitSubButton);
        objsToTest.push(commitSubButton);
    }

    fileHistoryContainer.position.set(0 + width/2 + 0.175, 0 - height/2 + 0.175, 0);
    //console.log(fileHistoryContainer);
    fileHistoryContainer.add(historyLayoutHeader, layoutHistoryContent, space, layoutHistoryScroll);

    return fileHistoryContainer;
}

createHistoryLayoutHeader = function() {

    // hlavicka (nazov, minimalizovat, zavriet)
    const layoutHistoryHeader = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 1.17,
        name: "layoutHistoryHeader"
    })

    // title
    const layoutHistoryHeaderTitle = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.82,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        name: "layoutHistoryHeaderTitle"
    });

    const layoutHistoryHeaderSpace = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.12,
        backgroundOpacity: 0,
    });

    // minimalize
    const layoutHistoryHeaderMinimalize = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        alignContent: "center",
        justifyContent: "center",
        name: "buttonHistoryMinimalize"
    }).add(
        new dat.GUIVR.addTextMesh("_", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
    );

    const layoutHistoryHeaderSpace2 = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.02,
        backgroundOpacity: 0,
    });

    // close
    const layoutHistoryHeaderClose = new ThreeMeshUI.InlineBlock({
        height: 0.1,
        width: 0.1,
        backgroundColor: new THREE.Color( 0xd3d3d3 ),
        backgroundOpacity: 0.3,
        alignContent: "center",
        justifyContent: "center",
        name: "buttonHistoryClose"
    }).add(
        new dat.GUIVR.addTextMesh("X", { color: 0xffffff, scale: 1.0, align: 'center', position: "center"})
    );

    layoutHistoryHeader.add(layoutHistoryHeaderTitle, layoutHistoryHeaderSpace, layoutHistoryHeaderMinimalize, layoutHistoryHeaderSpace2, layoutHistoryHeaderClose);
    objsToTest.push(layoutHistoryHeaderMinimalize, layoutHistoryHeaderClose);

    return layoutHistoryHeader;
}

createHistorySubButton = function(row) {
    var buttonKeyboard;
    if (row == 1) {
        buttonKeyboard = createButton(0.15, 0.15, "buttonHistoryUp", ">");
        buttonKeyboard.info = {scrollValue: -4, type: 'historyButton', scrollDirection: "up"};
    }
    if (row == 2) {
        buttonKeyboard = createButton(0.15, 0.15, "buttonHistoryDiff", "Show diff");
    }
    if (row == 3) {
        buttonKeyboard = createButton(0.15, 0.15, "buttonHistoryOpen", "Show file");
    }
    if (row == 4) {
        buttonKeyboard = createButton(0.15, 0.15, "buttonHistoryDown", "<");
        buttonKeyboard.info = {scrollValue: 4, type: 'historyButton', scrollDirection: "down"};
    }
    return buttonKeyboard;
}

vvv.addHistoryContent = function(commitsInfo, scrollRow) {

    const container = new ThreeMeshUI.Block({
        height: 0.635,
        width: 0.95,
        //padding: 0.02,
        fontFamily: './js/' + fontFilesName + '.json',
        fontTexture: './js/' + fontFilesName + '.png',
        interLine: 0.015,
        //alignContent: "left",
        backgroundOpacity: 0,
        name: "historyContentContainer"
    });

    for (i = scrollRow; i < scrollRow + 4; i++) {
        if (commitsInfo[i]) {
            var commitButton = createHistoryButton(0.95, 0.15, commitsInfo[i]);
            container.add(commitButton);
            objsToTest.push(commitButton);
        }
    }

    return container;
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
    })

    var commitMessage = commitInfo.message.length > 50 ? commitInfo.message.substring(0, 50) + "..." : commitInfo.message;

    var mesh = new dat.GUIVR.addTextMesh(commitMessage  + "\n"
                                         + commitInfo.author + "\n"
                                         + commitInfo.date
        , { color: 0xffffff, scale: 1.0, align: 'center'/*, position: "center"*/})
    
    mesh.position.x -= width/2;
    mesh.position.y -= 0.09;

    container.add(mesh);

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
        new dat.GUIVR.addTextMesh( "Type search query on the keyboard", { color: 0xffffff, scale: 1.0, align: 'left', position: 'center' })
    );

    /*console.log(title);
    var x = title.children[2].inlines[0].offsetX;
    var y = title.children[2].inlines[0].offsetY;
    mesh.position.x += x;
    mesh.position.y += y;*/

    //userText = new ThreeMeshUI.Text({ content: '', queryType: '' });
    newUserTextMesh = new dat.GUIVR.addTextMesh( "", { color: 0xffffff, scale: 1.0, align: 'center', position: 'center' });
    newUserTextMesh.position.y += 0.2;
    newUserTextMesh.position.x -= 0.45;

    const textField = new ThreeMeshUI.Block({
    	width: 1,
    	height: 0.4,
    	fontSize: 0.033,
    	padding: 0.02,
    	backgroundOpacity: 0
    }).add( 
        //userText 
        newUserTextMesh
    );

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

    		//new ThreeMeshUI.Text({
    		//	offset: 0,
    		//	fontSize: 0.035,
    		//	content: options[ 0 ]
    		//})
            new dat.GUIVR.addTextMesh( options[0], { color: 0xffffff, scale: 1.0, align: 'left', position: 'center' })

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
                console.log(options[ 1 ]);
                switch( options[ 1 ] ) {

                    // hlavne
                    case 'user' :
                        //userText.set({ content: userText.content += '+user:' });
                        newUserText += "+user";
                        newUserTextMesh.geometry.update(newUserText);
                        //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
                        break;
                    
                    case 'name' :
                        //userText.set({ content: userText.content += '+name:' });
                        newUserText += "+name";
                        newUserTextMesh.geometry.update(newUserText);
                        //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
                        break;

                    case 'language' :
                        //userText.set({ content: userText.content += '+language:' });
                        newUserText += "+language";
                        newUserTextMesh.geometry.update(newUserText);
                        //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
                        break;

                    case 'topic' :
                        //userText.set({ content: userText.content += '+topic:' });
                        newUserText += "+topic";
                        newUserTextMesh.geometry.update(newUserText);
                        //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
                        break;

                    // doplnkove
                    case 'sort' :
                        //userText.set({ content: userText.content += '&sort=' });
                        newUserText += "&sort=";
                        newUserTextMesh.geometry.update(newUserText);
                        //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
                        break;

                    case 'order' :
                        //userText.set({ content: userText.content += '&order=' });
                        newUserText += "&order=";
                        newUserTextMesh.geometry.update(newUserText);
                        //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
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

	  		//new ThreeMeshUI.Text({
	  		//	fontSize: 0.04,
	  		//	content: 'Help to search query:'
	  		//}),
            new dat.GUIVR.addTextMesh( "Help to search query:", { color: 0xffffff, scale: 1.0, align: 'left', position: 'center' })

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

	  		//new ThreeMeshUI.Text({
	  		//	fontSize: 0.03,
	  		//	content: 'Example: tetris+language:assembly&sort=stars&order=desc'
	  		//}),
            new dat.GUIVR.addTextMesh( "Example: tetris+language:java&sort=stars&order=desc", { color: 0xffffff, scale: 1.0, align: 'left', position: 'center' })

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
                            //userText.set({ content: userText.content = 'user:MartinSith' });
                            newUserText = "user:MartinSith";
                            newUserTextMesh.geometry.update(newUserText);
                            //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
							break;

						case 'backspace' :
							if ( !newUserText.length ) break
                            newUserText = newUserText.substring(0, newUserText.length - 1) || "";
                            newUserTextMesh.geometry.update(newUserText);
                            //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
                            //if ( !userText.content.length ) break
							/*userText.set({
								content: userText.content.substring(0, userText.content.length - 1) || ""
							});*/
							break;

						case 'shift' :
							keyboard.toggleCase();
							break;

					};

				// print a glyph, if any
				} else if ( key.info.input ) {
					//userText.set({ content: userText.content += key.info.input });
                    newUserText += key.info.input;
                    newUserTextMesh.geometry.update(newUserText);
                    //newUserTextMesh.position.x = 0 - (newUserTextMesh.userData.width / 2);
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