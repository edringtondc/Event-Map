// Initialize Firebase
var config = {
    apiKey: "AIzaSyBFWAIW4lFZruyUro91Hp6zyF5nEX3ZxLo",
    authDomain: "meet-up-mapping.firebaseapp.com",
    databaseURL: "https://meet-up-mapping.firebaseio.com",
    projectId: "meet-up-mapping",
    storageBucket: "meet-up-mapping.appspot.com",
    messagingSenderId: "1027713060208"
};
firebase.initializeApp(config);


var userLocation = $("#userLocation").val().trim();
var userSearchTerm = $("#searchTerm").val().trim();
var database = firebase.database;


$("#submit-button").on("click", function (event) {

    dataRef.ref().push({
        location: userLocation,
        search: userSearchTerm
    }
    );
});




