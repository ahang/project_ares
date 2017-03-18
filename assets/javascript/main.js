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
         var fullQUERY = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28";

         // Here we construct our URL
         var queryURL = fullQUERY;

         var flixRouletteURL = "http://netflixroulette.net/api/api.php?title=";




         //this will call theMovieDB movie list
         $.ajax({
             url: queryURL,
             method: 'GET'
         }).then(function(response) {
             // return response;
             // $('#movie-view').html("<p>" + JSON.stringify(response.results[0].title + "</p>");
             var title = response.results[9].title;
             console.log(title);
             flixRoulette(title);
         });


         function flixRoulette(movieTitle) {

             flixRouletteURL += movieTitle;
             $.ajax({
                 url: flixRouletteURL,
                 method: 'GET'
             }).then(function(response) {
                 console.log("this is: " + response);
                 $('#movie-view').html("<p>" + '<img src="' + response + '">');
                 console.log("this is: " + response.poster);

             });
         };
     });
 });