//import { PROVIDERS, GENRES } from "./Constants";

const apiKey = ""

function getData() { 

    var providersChecked = getProviders();
    var URL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&watch_region=CA&with_watch_providers=' + providersChecked;

    fetch(URL)
    .then(response => response.json())
    .then(data => printData(data));
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

const GENRES =  {
    "Action": 28,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Documentary": 99,
    "Drama": 18,
    "Family": 10751,
    "Fantasy": 14,
    "Horror": 27,
    "Music": 10402,
    "Mystery": 9648,
    "Romance": 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    "Thriller": 53,
    "War": 10752,
    "Western": 37   
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

// MVP (V1):
// Simple version of feature number 2:
// Go onto the website, check which providers you have (capping it at Netflix, Prime, Disney+, Crave)
// Select other criteria such as genre, then press Go and you will be shown all the movies available
// (Watch traversy media video to get an idea on how to show the results)

// MVP (V2):
// Get region of user and populate the providers based on region

// MVP (V3):
// Add randomize option to get you random movie based on criteria/providers

// Final Product:
// Add final styling for a sleek finish