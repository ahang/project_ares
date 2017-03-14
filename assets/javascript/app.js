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

});