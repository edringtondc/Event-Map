//initializing firebase
var config = {
  apiKey: "AIzaSyBZ979hB_iuXPeMV2Kp_VZIWS-tccUtuE4",
  authDomain: "bored-project-5ef59.firebaseapp.com",
  databaseURL: "https://bored-project-5ef59.firebaseio.com",
  projectId: "bored-project-5ef59",
  storageBucket: "bored-project-5ef59.appspot.com",
  messagingSenderId: "254018358590"
};
firebase.initializeApp(config);
// console.log("Range input is: " + rangeInput[0].value);
var dataRef = firebase.database();
//authorization


//user login interface
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
  privacyPolicyUrl: function () {
    window.location.assign('<your-privacy-policy-url>');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


//on submit, takes data from the input form and saves it to firebase database
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  $("events-table").empty();
  console.log("working");
  var searchTerm = $("#searchTerm-input").val().trim();
  var location = $("#location-input").val().trim();
  var radius = $("#radiusSlider-input").val().trim();

  dataRef.ref().push({
    location: location,
    search: searchTerm,
    radius: radius
  });

  eventFul();
  // meetUp();

});

function eventFul() {

  var searchTerm = $("#searchTerm-input").val().trim();
  console.log(searchTerm);
  var location = $("#location-input").val().trim();
  console.log(location);
  var radius = $("#radiusSlider-input").val().trim();

  console.log("radius is: " + radius)

  var eventQueryURL = "https://api.eventful.com/json/events/search?l=" + location + "&keywords=" + searchTerm + "&within=" + radius + "&app_key=J3HPBSjCnXTGS2kV";
  $.ajax({
    method: "GET",
    url: eventQueryURL,
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp'

  }).then(function (response) {
    console.log(response);
    dataEventful = response;

    // // ** eventful **//
    // //name//
    //dataEventful.events.event[i].title

    // //description//
    //dataEventful.events.event[i].description

    // //time//
    //dataEventful.events.event[i].start_time

    // // venue//
    //dataEventful.events.event[i].venue_name


    for (var i = 0; i < dataEventful.events.event.length; i++) {

      var lat1 = dataEventful.events.event[i].latitude;
      var lon1 = dataEventful.events.event[i].longitude;

      var latLng = {
        lat: parseFloat(lat1),
        lng: parseFloat(lon1)
      }
      var marker = new google.maps.Marker({ position: latLng, map: map });

      var title = dataEventful.events.event[i].title;
      var description = dataEventful.events.event[i].description;
      var button = $("<td><input class='btn btn-info' type='submit' value='Add Favorite' class='favoriteBtn'>");

      var newEvent = $("<tr class='m-1'>").append(
        $("<td>").text(title),
        $("<td><p>").html(description).text(),
    
      )

      newEvent.attr(dataEventful.events.event[i].id);
      // newEvent.attr("src", results.data.images.fixed_height_still.url);

      $("#table-body").append(newEvent)
      newEvent.append(button);

    }




  })
}


// function renderEvents() {
//   var eventTitle = event[i].title

//   var newEvent = $("<tr>").append(
//     $("<td>").text(title1),
//     $("<td>").text(descript1),
//   )

//   newEvent.attr("row1")
//   //newEvent.attr("data-id", eventID)

//   $("#table-body").append(newEvent)
//   var a = $("<td><input class='btn btn-info' type='submit' value='Add Favorite' id='favoriteBtn'>");


//   newEvent.append(a)
// }

function meetUp() {

  var meetQueryURL = "https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/open_events?&sign=true&photo-host=public&radius=100&zip=80209&text=coding&page=20&key=435738444150791a2870325319107d"
  $.ajax({
    url: meetQueryURL,
    method: "GET"
  }).then(function (Data1) {
    dataMU = Data1
    console.log(dataMU);
    for (var i = 0; i < dataMU.results.length; i++) {
      if ('venue' in dataMU.results[i]) {
        console.log("YES");
        var lat1 = dataMU.results[i].venue.lat;
        var lon1 = dataMU.results[i].venue.lon;

        console.log(lat1 + ":" + lon1);

        var latLng = {
          lat: parseFloat(lat1),
          lng: parseFloat(lon1)
        }
        var marker = new google.maps.Marker({
          position: latLng,
          label: dataMU.results[i].name,
          map: map
        });
      }
      else {
        console.log("no");
      }
      // MEETUP//
      // ** Here are the data paths for title/location/description **//

      // // title
      //dataMU.results[i].name

      // //description
      //dataMU.results[i].description

      // //venue
      // dataMU.results[i].venue.name

      // //time
      // dataMU.results[i].time




    }
  });
}

function signOut() {
  //function to sign out user
  firebase.auth().signOut().then(function () {
    console.log("you are logged out");
    window.location.href = "index.html"

    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}

//sign out button logs user out and redirects to log in page
$("#outbutton").on("click", function (event) {
  console.log("this button was clicked")
  event.preventDefault();
  signOut();
});


//authentication state observer and gets user data
firebase.auth().onAuthStateChanged(function (user) {
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
    console.log(uid);
    // User is signed out.
    // ...
  }
  console.log(uid);
  // firebase.database().ref('users/' + uid).set({
  //   userID: uid,
  //   email: email,
  // })
  //Get the current userID

  var userFavorites = dataRef.ref("/userFave" + uid);

  $("#events-table").on("click", ".favoriteBtn", function (event) {
    console.log("faves clicked");
    event.preventDefault();

    var event = "event name";
    var description = "event description";

    var selectedFavorite = {
      event: event,
      description: description,

    }

    userFavorites.push(selectedFavorite);


    //Do something with your user data located in snapshot
  });
});





//favorites functions

$('#radiusSlider-input').change(function () {
  var radius = $('#radiusSlider-input').val();
  console.log(radius);
  $('#sliderValue').text(radius + " mi");

});




  // var userID = firebase.auth().currentUser.uid;
