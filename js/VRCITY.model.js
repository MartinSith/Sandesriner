var VRCITY = VRCITY || {};
VRCITY.Model = VRCITY.Model || {};

var nsm = VRCITY.Model;

nsm.MAP = null;
nsm.SOURCECODE = null;
nsm.DATALOADER = null;
nsm.TRACE = null;
nsm.COLORS = null;

nsm.sourceCodeAvailable = function() {
    return nsm.SOURCECODE != null;
};

nsm.initAsync = function () {
    
    var promises = [];
    var dl = new nsm.DataLoader();
    
    promises.push(dl.loadMap(function(result){
        nsm.MAP = result;
    }));
    promises.push(dl.loadSourceCode(function(result){
        nsm.SOURCECODE = result;
    }));
    promises.push(dl.loadColors());
    
    nsm.DATALOADER = dl;
    
    return Promise.all(promises);
}

nsm.DataLoader = function() {
    
    var dataPath = "data/city.json";
    var gitDataPath = "data/gitData.json";
    var sourceCodePath = "data/methodBodies.json";
    var traceListPath = "data/trace/list.json";
    var gitDataListPath = "data/git/list.json";
    var colorListPath = "data/colors/list.json";
    var defaultColorsPath = "data/colors/package.json";
    
    this.loadMap = function(callback) {
        return $.getJSON(dataPath, callback);
    };
    
    this.loadColorList = function(callback) {
        return $.getJSON(colorListPath, callback);
    };
    
    this.loadColors = function(path=defaultColorsPath, callback=null) {
        return $.getJSON(path, function(result) {
            nsm.COLORS = result;
            if(callback != null) {
                callback();
            }
        });
    };
    
    this.loadSourceCode = function(callback) {
        return $.getJSON(sourceCodePath, callback);
    };
    
    this.loadGitDataList = function(callback) {
        return $.getJSON(gitDataListPath, callback);
    };
    
    this.loadGitData = function(path, callback) {
        return $.getJSON(path, callback);
    };
    
    this.loadTraceList = function(callback) {
        return $.getJSON(traceListPath, callback);
    };
    
    this.loadTrace = function(path, callback) {
        return $.getJSON(path, function(result) {
            nsm.TRACE = result.sequences;
            if(callback != null) {
                callback();
            }
        });
    };
 
}
