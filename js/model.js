var MVC = MVC || {};
MVC.Model = MVC.Model || {};

var mmm = MVC.Model;

mmm.githubApiUrl = "https://api.github.com";
mmm.graphData = {
    nodes: [],
    links: []
};

var token = "ghp_I03cMuEsx4dAQ1wO";
token = token + "nPQH20uRZsQDlS2QC4v1";

var fetchInfo = {
    method: "GET",
    headers: {
        //Authorization: 'Basic ' + "sithmartin1@gmail.com" + ':' + "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"
        Authorization: "token " + token
    }
}

mmm.init = function() {

    const levels = null,
        level = 0,
        module = null,
        leaf = null,
        parent = null,
        size = 0.1,
        name = "Sandesriner",
        path = "",
        type = "dir",
        expanded = 0,
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
        size,
        level,
        name,
        type,
        expanded,
        loaded,
        oldX,
        oldY,
        oldZ,
        fileContent, 
        fileContentTokens,
        scrollPosition,
        commitsInfo
    };

    mmm.graphData.nodes.push(node);
}

mmm.getRepository = async function(user, repo) {
    const contentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo;
    
    const response = await fetch(contentUrl, fetchInfo);
    const result = await response.json();
    
    console.log(result);
    return result;
}

mmm.getRateLimit = async function() {
    const contentUrl = mmm.githubApiUrl + "/rate_limit";
    
    const response = await fetch(contentUrl, fetchInfo);
    const result = await response.json();
    
    console.log(result);
    return result;
}

mmm.getUserRepositories = async function(user) {
    const contentUrl = mmm.githubApiUrl + "/users/" + user + "/repos";
    
    const response = await fetch(contentUrl, fetchInfo);
    const result = await response.json();
    
    console.log(result);
    return result;
}

mmm.getContent = async function(user, repo, filePath) {
    const contentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo + "/contents/" + filePath;
    
    const response = await fetch(contentUrl, fetchInfo);
    const result = await response.json();
    
    console.log(result);
    return result;
}

mmm.getFileContent = async function(user, repo, filePath) {
    const fileContentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo + "/contents/" + filePath;
    
    const response = await fetch(fileContentUrl, fetchInfo);
    const result = await response.json();
    const content = atob(result.content);

    console.log(content);
    return content;
}

mmm.getImageContent = async function(user, repo, filePath) {
    const fileContentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo + "/contents/" + filePath;
    
    const response = await fetch(fileContentUrl, fetchInfo);
    const result = await response.json();

    console.log(result);
    return result;
}

mmm.getSearchQuery = async function(type, query) {
    const fileContentUrl = mmm.githubApiUrl + "/search/" + type + "?q=" + query;
    
    //const response = await fetch(fileContentUrl);
    const response = await fetch(fileContentUrl, 
        {
            method: "GET",
            headers: {
                Accept: "application/vnd.github.mercy-preview+json",
                //Authorization: 'Basic ' + "MartinSith" + ':' + "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"
            }    
        }
    )
    const result = await response.json();
    
    console.log(result);
    return result;
}

mmm.getFileCommitsInfo = async function(user, repo, filePath) {
    const fileContentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo + "/commits?path=" + filePath;
    
    const response = await fetch(fileContentUrl, fetchInfo);
    const result = await response.json();

    console.log(result);
    return result;
}

mmm.getFileCommitInfo = async function(user, repo, commitSha) {
    const fileContentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo + "/commits/" + commitSha;
    
    const response = await fetch(fileContentUrl, fetchInfo);
    const result = await response.json();

    console.log(result);
    return result;
}

mmm.getDirCommits = async function(user, repo) {
    const fileContentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo + "/commits";
    
    const response = await fetch(fileContentUrl, fetchInfo);
    const result = await response.json();

    console.log(result);
    return result;
}

mmm.getFileCommitContent = async function(user, repo, filePath, commitSha) {
    const fileContentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo + "/contents/" + filePath + "?ref=" + commitSha;
    
    const response = await fetch(fileContentUrl, fetchInfo);
    const result = await response.json();
    const content = atob(result.content);

    console.log(content);
    return content;
}

mmm.getCommitActivity = async function(user, repo) {
    const fileContentUrl = mmm.githubApiUrl + "/repos/" + user + "/" + repo + "/stats/commit_activity";
    
    const response = await fetch(fileContentUrl, fetchInfo);
    const result = await response.json();

    console.log(result);
    return result;
}