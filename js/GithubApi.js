const url = "https://api.github.com";

async function getGithubApi() {
    const response = await fetch(url);
    const result = await response.json();
	console.log(result);
}

async function compareCommits(user, repo, commit1, commit2) {
    const compareUrl = url + "/repos/" + user + "/" + repo + "/compare/" + commit1 + "..." + commit2;
    
    const response = await fetch(compareUrl);
    const result = await response.json();

	console.log(result);
}

async function getFileContent(user, repo, filePath) {
    const fileContentUrl = url + "/repos/" + user + "/" + repo + "/contents/" + filePath;
    
    const response = await fetch(fileContentUrl);
    const result = await response.json();

    const content = atob(result.content)
	console.log(content);
}

function search(searchFilter, searchQuery) {
    const searchUrl = url + "/search";

    switch (searchFilter) {
        case "repositories":
            repositories(searchQuery);
            break;
        case "commits":
            commits(searchQuery);
            break;
        case "code":
            code(searchQuery);
            break;
    }

    async function repositories(searchQuery) {
        const searchReposUrl = searchUrl + "/repositories?q=" + searchQuery;

        const response = await fetch(searchReposUrl);
        const result = await response.json();
		console.log(result);
    };

    async function commits(searchQuery) {
        const searchCommitsUrl = searchUrl + "/commits?q=" + searchQuery;
        const headers = {
            "Accept" : "application/vnd.github.cloak-preview"
        }

        const response = await fetch(searchCommitsUrl, {
            "method" : "GET",
            "headers" : headers
        })
        const result = await response.json();
		console.log(result);
    };

    async function code(searchQuery) {
        const searchCodeUrl = searchUrl + "/code?q=" + searchQuery;

        const response = await fetch(searchCodeUrl);
        const result = await response.json();
		console.log(result);
    };

}