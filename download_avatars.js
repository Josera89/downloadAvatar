var abcde = 123;
var repoOwner = process.argv[2];
var repoName  = process.argv[3];

var fs = require('fs');
var request = require('request');

var username = "josera89";
var password = "e8c58f44d5cf8c9da17b5ea81134dc0d098b24bb";

function getRepoContributors(repoOwner, repoName, callback) {
  request({
    url: "https://" + username + ":" + password + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      // github requirement
      'User-Agent': 'request'
    }},

    function(err, request, body) {
      callback(err, JSON.parse(body));
    });
}

function downloadImageByURL(url, fileName) {
  var file = fs.createWriteStream(fileName);
  request(url).pipe(file);
};

getRepoContributors(repoOwner, repoName, function (err, contributorsList) {
  contributorsList.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, "./avatars/" + contributor.login + ".jpg")
  })
});