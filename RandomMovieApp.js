const apiKey = ""

function getData() { 
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&watch_region=CA&with_watch_providers=8')
    .then(response => response.json())
    .then(data => printData(data));
    // fetch('https://api.themoviedb.org/3/movie/436969/watch/providers?api_key=c04d6f7883fb2359efc07488cd72203f')
    // .then(response => response.json())
    // .then(data => printData(data));
}

function printData(data) {
    if (document.getElementById("Netflix").checked) {
        console.log(data)
    }
        

}

// to get imdb rating:
// use path to get imdb id then use the other api to get imdb rankings based on imdb id

// useful api requests:
// - search (can query by name)
// - discover (query by other parameters such as year or genre)
// - watch providers option shows providers by region such as netflix

// APP FEATURES
// 1. Searches for a movie and gets rating, plot, providers (netflix, prime, etc)
// 2. Type in which providers you have + criteria and it will show a list of all the movies you can watch - PRIORITY
// 3. Random movie generator based on criteria (genre, year, providers, etc)

// MVP:
// Simple version of feature number 2:
// Go onto the website, check which providers you have (capping it at Netflix, Prime, Disney+, Crave)
// Select your region, then press Go and you will be shown all the movies available
// Watch traversy media video to get an idea on how to show the results