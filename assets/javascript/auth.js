
   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyBZ979hB_iuXPeMV2Kp_VZIWS-tccUtuE4",
    authDomain: "bored-project-5ef59.firebaseapp.com",
    databaseURL: "https://bored-project-5ef59.firebaseio.com",
    projectId: "bored-project-5ef59",
    storageBucket: "bored-project-5ef59.appspot.com",
    messagingSenderId: "254018358590"
  };
  firebase.initializeApp(config);


     // FirebaseUI config.
     var uiConfig = {
        signInSuccessUrl: "main.html",
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
          window.location.assign('<your-privacy-policy-url>');
        }
      };
      
      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);

      var email 

//function to create new account
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

//function that passes user info to firebase
// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

function signOut() {
//function to sign out user
firebase.auth().signOut().then(function() {
    console.log("you are logged out");
          window.location.href="index.html"

    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
    // console.log(error);
  });
}

$("#outbutton").on("click", function (event) {
    console.log("this button was clicked")
  event.preventDefault();
  signOut();
});



//authentication state observer and gets user data
firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    if (user) {

      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      
      console.log("user got logged out")

      // User is signed out.
      // ...
    }
  });
