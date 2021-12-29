var request = new XMLHttpRequest()
var data = null
const apiKey = ""

function getData() {
    request.open('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US', true)
    request.onload = function () {
    // Begin accessing JSON data here
    data = JSON.parse(this.response)
    printData()
    
    }
    request.send()
}

function printData() {
    console.log(data)
}

// to get imdb rating:
// use path to get imdb id then use the other api to get imdb rankings based on imdb id

// APP FEATURES
// 1. Searches for a movie and gets rating, plot, providers (netflix, prime, etc)
// 2. Type in which providers you have + criteria and it will show a list of all the movies you can watch
// 3. Random movie generator based on criteria (genre, year, providers, etc)