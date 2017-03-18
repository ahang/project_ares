 $(document).ready(function(){
    // array of movies 
	var movies = ["Blackfish", "Primer","Reservoir Dogs","Amelie","Oldboy","The Shining","Django Unchained","Leon:The Professional","Forrest Gump","Pulp Fiction","Pacific Rim","Scott Pilgrim Vs the World","Sherlock Homes: A Game Of Shadows","The Eagle","Avengers","Dectective Dee"];



	$("#find-movie").on("click", function(event){
		event.preventDefault();
		backup();
	});


	 function backup(){
	    var random = movies[Math.floor(Math.random() * movies.length)];
	    $("#movie-view").empty();
	    var MovieDiv = $("<div>");
	    MovieDiv.text(random);
	    $("#movie-view").prepend(MovieDiv);
		};
 });
