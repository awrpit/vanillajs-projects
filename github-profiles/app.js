function renderProfile(profile) {

    const avatar = document.querySelector("img");
    avatar.src = profile.avatar;
    avatar.alt = profile.name;

    const name = document.querySelector("h2");
    name.innerText = profile.name;

    const bio = document.querySelector(".bio");
    bio.innerText = profile.bio.trim();

    const followers = document.querySelector(".followers")
    const following  = document.querySelector(".following");
    const reposNum = document.querySelector(".totalrepos");
    followers.innerText = profile.followers +  " Followers";
    reposNum.innerText =  profile.repos_num + " Repositories";
    following.innerText = profile.following + " Following";

    if (profile.email !== null){
        const email = document.querySelector(".email");
        email.setAttribute("href", profile.email);
        email.style.visibility = "visible";
    }
    if (profile.website !== null){
        const website = document.querySelector(".website");
        website.setAttribute("href", profile.website);
        website.style.visibility = "visible";
    }
    if (profile.twitter !== null){
        const twitter = document.querySelector(".twitter");
        twitter.setAttribute("href",  "https://twitter.com/" +  profile.twitter);
        twitter.style.visibility = "visible";
    }
    
    const repos = document.querySelector(".repos");
    repos.innerHTML = "";

    for (let i = 0; i < profile.repos.length; i++) {
        var repoTag = document.createElement("li");
        var repoLink = document.createElement("a");

        repoTag.classList.add("repo");

        repoLink.setAttribute("target", "_blank");
        repoLink.href = profile.repos[i].url;
        repoLink.innerText = profile.repos[i].name;

        repoTag.appendChild(repoLink);

        repos.appendChild(repoTag);
    }


            
}
// fetch the userdata from the github api
const Userdata = async (name) => {
    const url = "https://api.github.com/users/"
    const response = await fetch(url + name);
    let data = "";

    if (response.status === 200) {
        data = await response.json()
    } else {
    console.log(response.status);
    } 
    return data;
}
// get the repos of the user.
const getRepos = async (reposurl) => {
    
    const repoData = await fetch(reposurl)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));

    let repos = [];

    if (repoData.length < 10){
        for (let i = 0; i < repoData.length; i++){
            repos.push(parseRepo(repoData[i]));
        }
    } else {
        for (let i = 0; i < 10; i++){
            repos.push(parseRepo(repoData[i]));
        }
    }
    return repos;
}
// parse and return the repos name and url of the user.
const parseRepo = (rawRepo) => {
    const {
    name: name,
    html_url: url,
    } = rawRepo;
    return {name, url}
}
// parse the userdata.
const parseData = (data) => {
    const {
        bio,
        blog,
        email,
        followers,
        following,
        public_repos,
        name,
        login,
        repos_url,
        twitter_username,
        html_url,
    } = data;
    let parsedData = getRepos(repos_url).then((popular_repos) => {
        return {
           avatar:
               data.avatar_url !== null
                   ? data.avatar_url
                   : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fbokeh%2Fbokeh_PNG27.png",
           bio: bio,
           name: name === null ? login : name,
           website: blog === null || blog === "" ? null : blog,
           email: email === null || email === "" ? null : email,
           followers: followers,
           following: following,
           repos_num: public_repos,
           repos: popular_repos,
           twitter:
               twitter_username === null || twitter_username === ""
                   ? null
                   : twitter_username,
           url: html_url,
       };
   });
   return parsedData;
}
// render the userProfile.
document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("input");
    const button = document.querySelector("button");
    button.addEventListener("click", async () => {
        const username = input.value.trim();
        console.log(username);
        const data = await Userdata("AadilVarsh");
        parseData(data)
        const finalData = await parseData(data);
        console.log(finalData);
        renderProfile(finalData);
       // const content = document.querySelector("#content");
        //content.style.display = "block";
    })
})