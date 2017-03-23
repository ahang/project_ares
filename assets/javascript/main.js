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
        bookmarkAdded : []
    }; // --- end userPreference

    database.ref().on("value", function(snapshot) {
        if (snapshot.child("bookmarkAdded").exists()){
            userPreference.bookmarkAdded = snapshot.val().bookmarkAdded;
        }
        
        userInitialized = 1;
    }); // --- end database

    function checkUserInitialized(){
        //console.log("init called");
        if(userInitialized == 0){
            setTimeout(checkUserInitialized, 1000);
        }
        else
        {
            //console.log("init completed");
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
        console.log(genre);

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

                var randomOrder = randomOrder();
                var title = response.results[randomOrder].title;
                title = decodeURIComponent(title);


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


    function flixRoulette(movieTitle) {
        var searchParam = encodeURIComponent(movieTitle);

        var unogsUrl = "https://unogs-unogs-v1.p.mashape.com/api.cgi?q=" + searchParam + "-!1900,2017-!0,5-!6,10-!0-!Any-!Any-!Any-!gt500-!Yes&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and";

        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("X-Mashape-Key", "EnvSlMBKiYmsh28JzdBpJ2QcZcuyp1BtD76jsn5PZhgx2gcXDq");
                request.setRequestHeader("Accept", "application/json");
            },
                url: unogsUrl,
                method: 'GET'
            }).then(function(response) {
                $("#movie-view").html("<p>Your selected movie is " + "<b>" + response.ITEMS[0][1] + "</p>");
                $("#movie-view").append("<br>" + '<img src="' + response.ITEMS[0][2] + '"/>').addClass('imageStyle');
                $("#movie-view").append("<br><br> Plot: " + response.ITEMS[0][3] + "<br>");

                var netflixBtn = $("<button>");
                netflixBtn.addClass("btn netflixBtn");
                netflixBtn.attr("data-link", response.ITEMS[0][4]);
                console.log(netflixBtn);
                netflixBtn.append('<img class="netflix-size" src="assets/images/Netflix-logo.png">');
                //Netflix.addText("View it on Netflix");
                $("#movie-view").append(netflixBtn);

                var bookmark = $("<button>");
                bookmark.addClass("bkMark btn btn-success");
                bookmark.attr("data-link", response.ITEMS[0][4]);
                var sanitizedMovieName = decodeURIComponent(response.ITEMS[0][1]);
                bookmark.attr("data-name", sanitizedMovieName);
                bookmark.text("HELL YEAH");
                $("#movie-view").append(bookmark);

                var removeBookmark = $("<button>");
                removeBookmark.addClass("removeBkMark btn btn-warning");
                removeBookmark.attr("data-link", response.ITEMS[0][4]);
                removeBookmark.text("NOPE");
                $("#movie-view").append(removeBookmark);
                $(".removeBkMark").hide();
            }).fail (function() {
                clearInfo();
                $("#movie-view").html("The selected movie we attempted to search is not available on <b>Netflix</b>. Please try again");
            }); // --- end fail
        }; // --- end function flixRoulette


        function clearInfo() {
            $("movie-view").empty;
        } // --- end function clearInfo


    $(document).on("click", ".netflixBtn", function() {

        var name = $(this).attr("data-link");
        var netflixURL = "https://www.netflix.com/title/" + name;
            window.open(netflixURL);
            
    }); // --- end document.on.click netflixBtn


    $(document).on("click", ".loves", function() {

        var name = $(this).attr("data-link");
        var netflixURL = "https://www.netflix.com/title/" + name;
            window.open(netflixURL);
            
    });

    $(document).on("click", ".bkMark", function() {
        var movieId = $(this).attr("data-link");
        var movieName = $(this).attr("data-name");
        movieName = movieName.replace('&#39;','\'')
        
        userPreference.bookmarkAdded.push({
            id: movieId, 
            name: movieName
        }); // --- userPreference
        
        database.ref().set(userPreference);

        if (inArray(userPreference.bookmarkAdded,movieName)) {
            $(".removeBkMark").show();
            $(this).hide();
        } else {
            $(this).show();
        };

    }); // --- document.on.click bkMark

    $(document).on("click", ".removeBkMark", function() {
        var movieId = $(this).attr("data-link");
        $(".bkMark").show();
        $(this).hide();
        remove(userPreference.bookmarkAdded,movieId);
        database.ref().set(userPreference);
    }); // --- document.on.click removeBKMark

    //function to check if the bookmark array has the movie already
    function inArray(arr,item){
        var count=arr.length;
        for(var i=0;i<count;i++) {
            if(arr[i].name===item){return true;}
        };
        
        return false;
    };

    function remove(arr, item) {
        for(var i = arr.length-1;i>=0;i--) {
          if(arr[i].id === item) {
              arr.splice(i, 1);
          };
        };
    }; // --- end function remove

    function displayMovie() {
        for (var i = 0; i < userPreference.bookmarkAdded.length; i++) {
            var BookMarkDiv = $("<p>");
            BookMarkDiv.addClass("loves");
            BookMarkDiv.attr("data-link", userPreference.bookmarkAdded[i].id);
            BookMarkDiv.text(userPreference.bookmarkAdded[i].name);
            $('#movie-bookmarked').append(BookMarkDiv);
            // var br = $("<br>");
            // $('#movie-bookmarked').append("<br>");
            //console.log(userPreference.bookmarkAdded[i].name);
        }
        //console.log("display loop completed:"+userPreference.bookmarkAdded.length);       
    };
    
    checkUserInitialized();
    
});




