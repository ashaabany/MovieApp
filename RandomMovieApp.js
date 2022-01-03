//import { PROVIDERS, GENRES } from "./Constants";

const apiKey = ""

function getData() { 

    var providersChecked = getProviders();

    fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&watch_region=CA&with_watch_providers=' + providersChecked)
    .then(response => response.json())
    .then(data => printData(data));
    // fetch('https://api.themoviedb.org/3/watch/providers/movie?api_key=c04d6f7883fb2359efc07488cd72203f&language=en-US&watch_region=CA')
    // .then(response => response.json())
    // .then(data => printData(data));
}

function getProviders() {

    var providersContainer = document.getElementById("Providers");
    var providers = providersContainer.getElementsByTagName("input");

    var numberOfProvidersChecked = 0;
    var providersChecked = "";
    for(var i=0; i<providers.length; i++) {
        currentProvider = PROVIDERS[providers[i].name].toString()

        if (providers[i].checked) {
            numberOfProvidersChecked++;

            if (numberOfProvidersChecked > 1) {
                providersChecked = providersChecked + "|"
            } 
    
            providersChecked = providersChecked + currentProvider
            
        }

    }
    return providersChecked
}

function printData(data) {

    console.log(data)

}


const PROVIDERS = {
    "Netflix": 8,
    "DisneyPlus": 337,
    "Prime": 119,
    "Crave": 230
}

const GENRES = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

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