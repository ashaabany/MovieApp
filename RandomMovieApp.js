const apiKey = "c04d6f7883fb2359efc07488cd72203f"
var providersChecked;
var ratingInput;
var genreInput;
var URL_string;
var currentStep = 1;

window.onload = () => {
    //can put duplicates between get data and random movie button here (the variables)
}

async function getData() { 
    let button = document.querySelector(".goButton")
    let stepTwo = document.getElementById("Genres")
    let stepThree = document.getElementById("OtherCriteria")

    if (currentStep == 1) {
        stepTwo.style.display = "inline"
        currentStep++;
    } else if (currentStep == 2) {
        stepThree.style.display = "inline"
        button.innerHTML = "Show Movies!"
        currentStep++;
    } else if (currentStep == 3) {
        providersChecked = getProviders();
        ratingInput = getRatingInput();
        genreInput = getGenreInput();
        URL_string = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&watch_region=CA&with_watch_providers=' + providersChecked + '&vote_average.gte=' + ratingInput + "&with_genres=" + genreInput;
    
        var response = await fetch(URL_string)
        var data = await response.json()
        traversePages(data)
    }

}

function randomMovieButton() { 

    providersChecked = getProviders();
    ratingInput = getRatingInput();
    genreInput = getGenreInput();
    URL_string = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&watch_region=CA&with_watch_providers=' + providersChecked + '&vote_average.gte=' + ratingInput + "&with_genres=" + genreInput;

    fetch(URL_string)
    .then(response => response.json())
    .then(data => getRandomMovie(data));
}

function filterClick() {
    let filterButton = document.querySelector("form");
    let stepsDisplayed = filterButton.style.display

    if (!stepsDisplayed) {
        return filterButton.style.display = "grid";
    }

    filterButton.style.display = ""

    
}

function getGenreInput() {

    var genreContainer = document.getElementById("Genres");
    var genres = genreContainer.getElementsByTagName("input");

    var numberOfGenresChecked = 0;
    var genresChecked = "";
    for(var i=0; i<genres.length; i++) {
        currentGenre = GENRES[genres[i].name].toString()

        if (genres[i].checked) {
            numberOfGenresChecked++;

            if (numberOfGenresChecked > 1) {
                genresChecked = genresChecked + "|"
            } 
    
            genresChecked = genresChecked + currentGenre
            
        }

    }
    return genresChecked

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

function getRatingInput() {
    var rating = document.getElementById("Rating").value
    if (rating.trim() == "") {
        return "0";
    }

    if (!isValidRating(rating)) {
        alert("Rating: not a valid number");
    }

    return rating.toString()
}

function isValidRating(rating) {
    if (isNaN(rating) || rating > 10 || rating < 0) {
        return false;
    }
    return true;
}

function traversePages(data) {
    if (data.total_pages >= 1) {
        var i = 1
        while (i<=data.total_pages && i<=500) {
            
            URL_string = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&watch_region=CA&with_watch_providers=' + providersChecked + '&vote_average.gte=' + ratingInput + "&with_genres=" + genreInput + "&page=" + i;
            fetch(URL_string)
            .then(response => response.json())
            .then(pageData => {
                getMovieDataForPage(pageData)
            });
            i++;
        }
    } else {
        alert("no results found")
    }
}


function getMovieDataForPage(pageData) {
    console.log(pageData)
}

function getRandomMovie(data) {

    randomPage = getRandomPage(data.total_pages)

    URL_string = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&watch_region=CA&with_watch_providers=' + providersChecked + '&vote_average.gte=' + ratingInput + "&with_genres=" + genreInput + "&page=" + randomPage;
    fetch(URL_string)
    .then(response => response.json())
    .then(pageData => {
        randomizeMovie(pageData)
    });

}

function randomizeMovie(pageData) {
    moviesInPage = pageData.results
    randomMovie = moviesInPage[Math.floor(Math.random()*moviesInPage.length)]
    document.getElementById("movie").innerHTML = randomMovie.title + " - Rating: " + randomMovie.vote_average
}

function getRandomPage(pages) {
    if (!pages) {
        alert("No movies found!");
        return
    }
    if (pages > 500) {
        pages = 500;
    }

    return Math.floor(Math.random() * pages + 1)
}

function getPageNumber() {
    //function to get which page user is on to pull appropriate data
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
    "ScienceFiction": 878,
    "Thriller": 53,
    "War": 10752,
}

// to get imdb rating:
// use path to get imdb id then use the other api to get imdb rankings based on imdb id

// useful api requests:
// - search (can query by name)
// - discover (query by other parameters such as year or genre)
// - watch providers option shows providers by region such as netflix

// https://api.themoviedb.org/3/movie/343611/watch/providers?api_key=c04d6f7883fb2359efc07488cd72203f
// gets the providers based on watch regions for the given movie ID

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