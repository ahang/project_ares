$(document).ready(function() {

    $("#find-movie").on("click", function(event) {

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

            var unogsUrl = "https://unogs-unogs-v1.p.mashape.com/api.cgi?q=" + searchParam + "-!1900,2017-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and"

            $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader("X-Mashape-Key", "f4wdRtwlPImshDfHb3hczt25D4bGp1HrZTFjsnhctrypL2Qe6I");
                    request.setRequestHeader("Accept", "application/json");
                },
                url: unogsUrl,
                method: 'GET'
            }).then(function(response) {
                $("#movie-view").html("<p>Your selected movie is " + "<b>" + response.ITEMS[0][1]);
                $("#movie-view").append("<br>" + '<img src="' + response.ITEMS[0][2] + '"/>');
                $("#movie-view").append("<br> Plot: " + response.ITEMS[0][3] + "<br>");

                var netflixBtn = $("<button>");
                netflixBtn.addClass("btn netflixBtn img");
                netflixBtn.append('<img src="assets/images/netflix.png"/>');
                //etflix.addText("View it on Netflix");
                $("#movie-view").append(netflixBtn);

                var thumbsUpBtn = $("<button>");
                thumbsUpBtn.addClass("btn btn-success");
                thumbsUpBtn.text("I Liked It");
                $("#movie-view").append(thumbsUpBtn);

                var thumbsDwnBtn = $("<button>");
                thumbsDwnBtn.addClass("btn btn-danger");
                thumbsDwnBtn.text("I Disliked it");
                $("#movie-view").append(thumbsDwnBtn);
            });
        };




    });
});