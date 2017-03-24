$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAAJtv2XWoOxQ_1czEw3u6DR5m8OTwC2Qo",
        authDomain: "projares-b990d.firebaseapp.com",
        databaseURL: "https://projares-b990d.firebaseio.com",
        storageBucket: "projares-b990d.appspot.com",
        messagingSenderId: "811073714607"
    }; // --- end config


    firebase.initializeApp(config);
    var database = firebase.database();

    var userInitialized = 0;
    var userPreference = {
        bookmarkAdded: []
    }; // --- end userPreference

    database.ref().on("value", function(snapshot) {
        if (snapshot.child("bookmarkAdded").exists()) {
            userPreference.bookmarkAdded = snapshot.val().bookmarkAdded;

        }
        userInitialized = 1;
    }); // --- end database

    function checkUserInitialized() {
        if (userInitialized == 0) {
            setTimeout(checkUserInitialized, 1000);
        } else {
            displayMovie();
        }

    } // --- end function checkUserInitialize

    // function buttonClickHandler(buttonName, genre) {
    //     var formattedButtonName = "." + buttonName;
    //     var genreType = genre;

    //     $(formattedButtonName).on("click", function(event) {
    //         event.preventDefault();
    //         clearInfo();
    //     });
    // };


    $(".movie-button").on("click", function(event) {
        var genre = $(this).data("genre");
        //console.log(genre);

        clearInfo();
        // Preventing the submit button from trying to submit the form
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();

        // Here we grab the text from the input box
        var movie = $("#movie-input").val();
        var apiKey = "395604c82b2663c214732886fe58d756";
        var apiReadAccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTU2MDRjODJiMjY2M2MyMTQ3MzI4ODZmZTU4ZDc1NiIsInN1YiI6IjU4YzljYzJkYzNhMzY4NDEyYTAwMDQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B6rxV4ke7MA56btQq1wNVTJYcjPx335Oi7C4gNArQF0";
        // the website page
        var apiRequest = "https://api.themoviedb.org/";
        // discover a movie by a parameter
        var discoverURL = "discover/movie";
        // popularity parameter
        var popularity = "?sort_by=popularity.desc&api_key=";
        // https://api.themoviedb.org/4/list/572?page=1&api_key=395604c82b2663c214732886fe58d756
        // full query request, includes: language is English, popular, non-adult movies, and action genre
        function randomNumber() {
            return Math.floor(Math.random() * 100);
        }
        var fullQUERY = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + randomNumber() + "&with_genres=" + genre;
        // var fullQUERY = "https://api.themoviedb.org/4/list/572?page=1&api_key=" + apiKey;
        // Here we construct our URL
        //var queryURL = fullQUERY;

        //this will call theMovieDB movie list
        $.ajax({
            url: fullQUERY,
            method: 'GET'
        }).then(function(response) {
            // random number generator
            function randomOrder() {
                return Math.floor(Math.random() * 20);
            }
            //randomly pick a title
            var randomOrder = randomOrder();
            var title = response.results[randomOrder].title;



            flixRoulette(title);
        });
    }); // --- end function buttonClickHandler


    // ==========
    // BEGINNING OF ACTION QUERY
    // ==========
    $(".movie-button.action").on("click", function(event) {
        event.preventDefault();
        clearInfo();
        // buttonClickHandler();


    }) // --- end .movie-button.action.onClick
    // ==========
    // END OF ACTION QUERY
    // ==========

    // GENRES
    // action: 28, comedy: 35, sci-fi: 878, romance: 10749, horror: 27, drama: 18

    //feeding the title from the first Ajax Call into search Param
    function flixRoulette(movieTitle) {
        var searchParam = encodeURIComponent(movieTitle);
        //query URL from unofficial netflix online global search param
        var unogsUrl = "https://unogs-unogs-v1.p.mashape.com/api.cgi?q=" + searchParam + "-!1900,2017-!0,5-!6,10-!0-!Any-!Any-!Any-!gt500-!Yes&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and";
        //ajax call to UNOGS
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("X-Mashape-Key", "RRfJ8Skq6Hmsh65wXDWWw17W0Ap5p1fSpnIjsnKyPAn2lruy8c");
                request.setRequestHeader("Accept", "application/json");
            },
            url: unogsUrl,
            method: 'GET'
        }).then(function(response) {
            //If title is a valid response in netflix input the title/poster/plot 
            $("#movie-view").html("<p>Your selected movie is " + "<b>" + response.ITEMS[0][1] + "</p>");
            $("#movie-view").append("<br>" + '<img src="' + response.ITEMS[0][2] + '"/>').addClass('imageStyle');
            $("#movie-view").append("<br><br> Plot: " + response.ITEMS[0][3] + "<br>");
            //append the button to the div and clicking on the button will direct the user to the netflix page
            var netflixBtn = $("<button>");
            netflixBtn.addClass("btn netflixBtn");
            netflixBtn.attr("data-link", response.ITEMS[0][4]);
            netflixBtn.append('<img class="netflix-size" src="assets/images/Netflix-logo.png">');
            $("#movie-view").append(netflixBtn);
            //Add a button to see if the user likes the movie we selected
            var loveIt = $("<button>");
            loveIt.addClass("hellYh btn btn-success");
            loveIt.attr("data-link", response.ITEMS[0][4]);
            var sanitizedMovieName = decodeURIComponent(response.ITEMS[0][1]);
            loveIt.attr("data-name", sanitizedMovieName);
            loveIt.text("Love It!");
            $("#movie-view").append(loveIt);
            //If the movie is added to the DB, remove the movie if they disliked it
            var nopes = $("<button>");
            nopes.addClass("nope btn btn-warning");
            nopes.attr("data-link", response.ITEMS[0][4]);
            nopes.attr("data-name", sanitizedMovieName);
            nopes.text("NOPE");
            $("#movie-view").append(nopes);
        }).fail(function() {
            //This is what happens if the title is not on netflix
            clearInfo();
            $("#movie-view").html("The selected movie we attempted to search is not available on <b>Netflix</b>. Please try again");
        }); // --- end fail
    }; // --- end function flixRoulette

    //Emptying out the movie view div
    function clearInfo() {
        $("movie-view").empty;
    } // --- end function clearInfo


    $(document).on("click", ".netflixBtn", function() {
        //on click open up the netflix URL with the respective data-link attr
        var name = $(this).attr("data-link");
        var netflixURL = "https://www.netflix.com/title/" + name;
        window.open(netflixURL);

    }); // --- end document.on.click netflixBtn

    $(document).on("click", ".loves", function() {
        //on click on the loves page to open up the respective title
        var name = $(this).attr("data-link");
        var netflixURL = "https://www.netflix.com/title/" + name;
        window.open(netflixURL);

    });

    //function on hell yeah button click
    $(document).on("click", ".hellYh", function() {
        var movieId = $(this).attr("data-link");
        var movieName = $(this).attr("data-name");
        movieName = movieName.replace('&#39;', '\'');
        //calling the user feedback function to set the firebase 
        userFeedBack(1,movieId,movieName);

    }); 

    //function on nopes button click
    $(document).on("click", ".nope", function() {
        var movieId = $(this).attr("data-link");
        var movieName = $(this).attr("data-name");
        movieName = movieName.replace('&#39;', '\'');
        //calling the user feedback function to set the firebase 
        userFeedBack(0,movieId,movieName);
    }); 

    //function to display movies in loves.html page
   function displayMovie() {
        for (var i = 0; i < userPreference.bookmarkAdded.length; i++) {
            var lovesDiv = $("<p>");
            lovesDiv.addClass("loves btn");
            lovesDiv.attr("data-link", userPreference.bookmarkAdded[i].id);
            lovesDiv.html("<b><font size='6'>" + userPreference.bookmarkAdded[i].name +" </b></font> &nbsp;&nbsp;LOVED: " + userPreference.bookmarkAdded[i].hellYeahClickCounter +" &nbsp;&nbsp;NOPE: " + userPreference.bookmarkAdded[i].nopesClickCounter);
            $('#movie-loved').append(lovesDiv);
        }
    };

    //function to set the userPreference in the firebase after checking if the movie is in bookmark array or not
    function userFeedBack(feedback,id,name) {
        var mov = null;
        for (var i = 0; i < userPreference.bookmarkAdded.length; i++) {
            if(userPreference.bookmarkAdded[i].id === id) {
                mov = userPreference.bookmarkAdded[i];   
            }
        }
        if(mov == null){
            mov = {
                id: id,
                name: name,
                hellYeahClickCounter: 0,
                nopesClickCounter: 0
            };
            userPreference.bookmarkAdded.push(mov);  
        }
        feedback == 1 ? ++mov.hellYeahClickCounter : ++mov.nopesClickCounter;
        database.ref().set(userPreference);
    }
    
    // function to display movie in loves section after the firebase is initialized  
    checkUserInitialized();

});