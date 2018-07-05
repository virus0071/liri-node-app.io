require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");

var action = process.argv[2];
var value = process.argv[3];

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);








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
    var params = {
        screen_name: "Nan"
    } && {
            count: 20
        };

    client.get("statuses/user_timeline/", params, function (error, data, response) {


        if (!error && response.statusCode === 200) {
            for (var i = 0; i < 10; i++) {

                var tResults =
                    data[i].user.name + ": \r\n" +
                    data[i].text + "\r\n" +
                    data[i].created_at + "\r\n" +
                    "****************************************************" + "\r\n";

                console.log(tResults);
                fs.appendFile("log.txt", ("****************************************************" + "\r\n" +
                    data[i].user.name + "\r\n" +
                    data[i].text + "\r\n" +
                    data[i].created_at + "\r\n" +
                    "****************************************************" + "\r\n"), function (err, data) {
                        if (err) {
                            return console.log(err);
                        }

                    });
            }
        }

    });

}




function omdbThisMovie(value) {
    if (value == null) {
        value = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
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

            fs.appendFile("log.txt", "**************************************************** \r\n" +
                "Title: " + JSON.parse(body).Title + "\r\n" +
                "Year: " + JSON.parse(body).Year + "\r\n" +
                "IMDB Rating: " + JSON.parse(body).imdbRating + "\r\n" +
                "Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\r\n" +
                "Country: " + JSON.parse(body).Country + "\r\n" +
                "Language: " + JSON.parse(body).Language + "\r\n" +
                "Plot: " + JSON.parse(body).Plot + "\r\n" +
                "Actors: " + JSON.parse(body).Actors + "\r\n" +
                "****************************************************" + "\r\n", function (error) {
                    if (error) {
                        throw error;
                    };
                })
        }
    })

}





function spotifyThisSong(value) {
    if (value == null) {
        value = "Walk this way";
    }

    spotify.search({ type: "track", query: value }, function (error, body, response) {
        if (error) {
            console.log(
                error
            )
        }
        if (!error) {

            console.log("****************************************************");
            console.log("Artist(s): " + body.tracks.items[0].artists[0].name);
            console.log("Song Name:  " + body.tracks.items[0].name);
            console.log("Preview Link: " + body.tracks.items[0].preview_url);
            console.log("Album: " + body.tracks.items[0].album.name);
            console.log("****************************************************");

            fs.appendFile("log.txt", "**************************************************** \r\n" +
                "Artist(s): " + body.tracks.items[0].artists[0].name + "\r\n" +
                "Song Name:  " + body.tracks.items[0].name + "\r\n" +
                "Preview Link: " + body.tracks.items[0].preview_url + "\r\n" +
                "Album: " + body.tracks.items[0].album.name + "\r\n" +
                "****************************************************" + "\r\n", function (err) {
                    if (err) {
                        console.log(err);
                    };

                })

        }
    })
}

function random() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            rResult = data.split(",");
            if (rResult[0] === "song") {
                spotifyThisSong(rResult[1]);
            } if (rResult[0] === "movie") {
                omdbThisMovie(rResult[1]);
            }
        };
    });
}
