$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAAJtv2XWoOxQ_1czEw3u6DR5m8OTwC2Qo",
        authDomain: "projares-b990d.firebaseapp.com",
        databaseURL: "https://projares-b990d.firebaseio.com",
        storageBucket: "projares-b990d.appspot.com",
        messagingSenderId: "811073714607"
    };

    firebase.initializeApp(config);
    var database = firebase.database();
   
    var counter = {
        thumbsUp: 0,
        thumbsDwn: 0
    };
    

    $(".movie-button").on("click", function(event) {
        event.preventDefault();
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

        // full query request, includes: language is English, popular, non-adult movies, and action genre
        var fullQUERY = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=5&with_genres=28";

        // Here we construct our URL
        var queryURL = fullQUERY;

        //this will call theMovieDB movie list
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            // random number generator
            function randomOrder() {
                return Math.floor(Math.random() * 20);
            }

            var randomOrder = randomOrder();
            var title = response.results[randomOrder].title;

            flixRoulette(title);
        });

        function flixRoulette(movieTitle) {
            var searchParam = encodeURIComponent(movieTitle);

            var unogsUrl = "https://unogs-unogs-v1.p.mashape.com/api.cgi?q=" + searchParam + "-!1900,2017-!0,5-!6,10-!0-!Any-!Any-!Any-!gt500-!Yes&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and"

            $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader("X-Mashape-Key", "EnvSlMBKiYmsh28JzdBpJ2QcZcuyp1BtD76jsn5PZhgx2gcXDq");
                    request.setRequestHeader("Accept", "application/json");
                },
                url: unogsUrl,
                method: 'GET'
            }).then(function(response) {
                $("#movie-view").html("<p>Your selected movie is " + "<b>" + response.ITEMS[0][1] + "</p>");
                $("#movie-view").append("<br>" + '<img src="' + response.ITEMS[0][2] + '"/>');
                $("#movie-view").append("<br> Plot: " + response.ITEMS[0][3] + "<br>");

                var netflixBtn = $("<button>");
                netflixBtn.addClass("btn netflixBtn");
                netflixBtn.attr("data-link", response.ITEMS[0][4]);
                console.log(netflixBtn);
                netflixBtn.append('<img class="netflix-size" src="assets/images/Netflix-logo.png">');
                //Netflix.addText("View it on Netflix");
                $("#movie-view").append(netflixBtn);

                var thumbsUpBtn = $("<button>");
                thumbsUpBtn.addClass("thmbsup btn btn-success");
                thumbsUpBtn.text("I Liked It");
                $("#movie-view").append(thumbsUpBtn);

                var thumbsDwnBtn = $("<button>");
                thumbsDwnBtn.addClass("thmbsdwn btn btn-warning");
                thumbsDwnBtn.text("I Disliked it");
                $("#movie-view").append(thumbsDwnBtn);
            });
        };

        function clearInfo() {
            $("movie-view").empty;
        }

    });

    $(document).on("click", ".netflixBtn", function() {

        var name = $(this).attr("data-link");
        var netflixURL = "https://www.netflix.com/title/" + name;
        //console.log(netflixURL);

        window.open(netflixURL);

        //netflixWatch();
    });


    $(document).on("click", ".thmbsup", function() {
        counter.thumbsUp++;
        database.ref().set(counter);
    });

    $(document).on("click", ".thmbsdwn", function() {
        counter.thumbsDwn++;
        database.ref().set(counter);
    });

});