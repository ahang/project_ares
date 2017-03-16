 $(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAAJtv2XWoOxQ_1czEw3u6DR5m8OTwC2Qo",
        authDomain: "projares-b990d.firebaseapp.com",
        databaseURL: "https://projares-b990d.firebaseio.com",
        storageBucket: "projares-b990d.appspot.com",
        messagingSenderId: "811073714607"
    };

    console.log('hihi');
    console.log('yo');

    firebase.initializeApp(config);

    //var database = firebase.database();

    var provider = new firebase.auth.GoogleAuthProvider();
    
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
    // ...
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

    var user = firebase.auth().currentUser;
    var name, 
        email, 
        photoUrl, 
        uid, 
        emailVerified;

    if (user != null) {
        name = user.displayName
         $(".userName").html("Welcome " + user.name);
    }


    var uiConfig = {
        signInSuccessUrl: console.log("Test Successful"),
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: console.log("This is successful!")
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);


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
                $(".login-container").addClass("invisible");
                $(".user-container").removeClass("invisible");
                $(".userName").html("Welcome " + displayName);
                $(".signOut").html()
            // document.getElementById('sign-in-status').textContent = 'Signed in';
            // document.getElementById('sign-in').textContent = 'Sign out';
            // document.getElementById('account-details').textContent = JSON.stringify({
            //     displayName: displayName,
            //     email: email,
            //     emailVerified: emailVerified,
            //     photoURL: photoURL,
            //     uid: uid,
            //     accessToken: accessToken,
            //     providerData: providerData
            //     }, null, '  ');
            });
        } else {
        // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            // document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, function(error) {
        console.log(error);
        });
    };

    firebase.auth().signOut().then(function() {
    // Sign-out successful.
        }).catch(function(error) {
    // An error happened.
    });

    window.addEventListener('load', function() {
        initApp()
    });
});
