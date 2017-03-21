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

<<<<<<< HEAD
    // FirebaseUI config.
      var uiConfig = {
        queryParameterForSignInSuccessUrl: 'test',
        signInSuccessUrl: "/",
=======
    var provider = new firebase.auth.GoogleAuthProvider();
    //Using a google redirect
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
        }
        var user = result.user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

    var uiConfig = {
        queryParameterForWidgetMode: "mode",
        queryParameterForSignInSuccessUrl: "signInSuccessUrl",
        signInSuccessUrl: "/index.html",
>>>>>>> master
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    // //Creating an instance of the Google Provider Object
    // var provider = new firebase.auth.GoogleAuthProvider();

    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //     if (result.credential) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // ...
    // }
    //     // The signed-in user info.
    //     var user = result.user;
    // }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    // });

    // var uiConfig = {
    //     queryParameterForSignInSuccessUrl: 'test',
    //     signInSuccessUrl: "/",
    //     signInOptions: [
    //         // Leave the lines as is for the providers you want to offer your users.
    //         firebase.auth.GoogleAuthProvider.PROVIDER_ID
    //     ],
    //     // Terms of service url.
    //     tosUrl: ""
    // };

    // // Initialize the FirebaseUI Widget using Firebase.
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // // The start method will wait until the DOM is loaded.
    // ui.start('#firebaseui-auth-container', uiConfig);


    initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var providerData = user.providerData;
                user.getToken().then(function(accessToken) {
                    $(".login-container").addClass("invisible"); //hides login container if user is logged in
                    $(".signOut").removeClass("invisible"); //hides login container if user is logged in
                    $(".user-container").removeClass("invisible"); //unhides the user container
                    $(".movieFinder").removeClass("invisible"); //unhides the user container
                    $(".userName").html("Welcome " + displayName); //displays Welcome username
                    var signOutBtn = $("<button>");
                    signOutBtn.addClass("signOutBtn btn btn-danger");
                    signOutBtn.text("Sign Out");
                    $(".signOut").append(signOutBtn); //adds the signOut button for the user
                });
            } else {
                // User is signed out.
                $('#sign-in-status').text("Signed out");
                // document.getElementById('sign-in').textContent = 'Sign in';
                $('#account-details').text("null");
            }
        }, function(error) {
            console.log(error);
        });
    };
    //on click listener to unauth the user
    $(document).on("click", ".signOutBtn", function() {
        firebase.auth().signOut().then(function() {
            console.log("I am Signed out");
            $(".login-container").removeClass("invisible");
            $(".user-container").addClass("invisible");
        }).catch(function(error) {
            // An error happened.
        });
    });

    window.addEventListener('load', function() {
        initApp()
    });
});