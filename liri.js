require("dotenv").config();

var fs = require("fs");
var action = process.argv[2];
var value = process.argv[3];
var Twitter = require("twitter");
var spotify = require("spotify");
var keys = require("keys.js");
var request = require("request");

var client = new Twitter(keys.twitter);
var params = {screen_name: "virus00712"};

switch (action) {
    case "my-tweets":
    tweets();
    break;
    
    case "spotify":
    spotifyThisSong(value);
    break;

    case "movie":
    omdbThisMovie(value);
    break;

    case "do-what-it-says":
    random();
    break;

    
}



function tweets() {
    client.get("statuses/user_timeline/", params, function (error, tweets, response) {
        if (!error && response.statusCode == 200){
            fs.appendFile("log.txt", "**************************************************** \r\n", function(err){
                if (err) {
                    throw err;
                }
            });
            console.log(" ");
            console.log("Last 20 Tweets: ");
            for (i = 0; i < 19; i++){
                var number = i++;
                var tResult = number + tweets[i].text + "\r\n" + tweets[i].created_at + "\r\n" +
                    "***********************" +i +"***************************** \r\n";
                console.log(tResult);
            }
    
    
    fs.appendFile("log.txt", ("**************************************************** \r\n" + 
        tweets[i].text + "\r\n" +
        tweets[i].created_at + "\r\n" +
        "***********************" +i +"***************************** \r\n"), function(err,data){
        if (err) {
            return console.log(err);
        }
    });
}
});
}




function omdbThisMovie(value) {
    if (value == null) {
        value = "Mr. Nobody";
    }
    request ("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("****************************************************");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("****************************************************");

            fs.append("log.txt", "**************************************************** \r\n" +
            "Title: " + JSON.parse(body).Title + "\r\n" +
            "Year: " + JSON.parse(body).Year + "\r\n" +
            "IMDB Rating: " + JSON.parse(body).imdbRating + "\r\n" +
            "Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\r\n" + 
            "Country: " + JSON.parse(body).Country + "\r\n" +
            "Language: " + JSON.parse(body).Language + "\r\n" +
            "Plot: " + JSON.parse(body).Plot + "\r\n" +
            "Actors: " + JSON.parse(body).Actors + "\r\n" +
            "****************************************************" + "\r\n", function(error){
                if (error) {
                    throw error;
                };
            })
        }
    })

}





function spotifyThisSong(value){
    if (value == null){
        value = "Walk this way";
    }
    spotify.search({type: "track", query: value}, function (error, body, response){
        if (!error && response.statusCode == 200) {
            console.log("****************************************************");
            console.log("Artist(s): " + JSON.parse(body).tracks.items[0].artists[0].name);
            console.log("Song Name:  " + JSON.parse(body).tracks.items[0].name);
            console.log("Preview Link: " + JSON.parse(body).tracks.items[0].preview_url);
            console.log("Album: " + JSON.parse(body).tracks.items[0].album.name);
            console.log("****************************************************");

            fs.appendFile("log.txt", "**************************************************** \r\n" +
            "Artist(s): " + JSON.parse(body).tracks.items[0].artists[0].name + "\r\n" +
            "Song Name:  " + JSON.parse(body).tracks.items[0].name + "\r\n" +
            "Preview Link: " + JSON.parse(body).tracks.items[0].preview_url + "\r\n" +
            "Album: " + JSON.parse(body).tracks.items[0].album.name + "\r\n" + 
            "****************************************************" + "\r\n", function (err){
                if (err) {
                    throw err;
                };
            })
        }
    })
}

function random() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            console.log(error);
        } else {
            rResult = data.split(",");
            if (rResult[0] === "spotify-this-song"){
                spotifyThisSong(rResult[1]);
            } if (rResult[0] === "omdb-this-movie"){
                omdbThisMovie(rResult[1]);
            }
        };
    });
}
