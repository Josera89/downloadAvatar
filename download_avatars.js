var repoOwner = process.argv[2];
var repoName = process.argv[3];

var fs = require('fs');
var request = require('request');
var username = "josera89";
var password = "e8c58f44d5cf8c9da17b5ea81134dc0d098b24bb";

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

function getRepoContributors(repoOwner, repoName, cb) {
  request({ // request(options, callback);
    url: "https://" + username + ":" + password + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    // url: 'https://username:api.github.com/repos/lighthouse-labs/laser_shark/contributors',

    headers: {
      'User-Agent': 'request'
    }},

    function(err, request, body) {
      cb(err, JSON.parse(body));
    });
}

function downloadImageByURL(url, fileName) {
  var file = fs.createWriteStream(fileName);
  request(url).pipe(file);
};


getRepoContributors( repoOwner, repoName, function (err, result) {
  result.forEach( function(contributor) {
    //url repoOwner.avatar_url, './.avartars/${repoOwner.login}.jpg'
    downloadImageByURL(contributor.avatar_url, "./avatars/" + contributor.login + ".jpg")
  })
});



