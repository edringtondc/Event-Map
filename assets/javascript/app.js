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

var infoWindow;
var windowOpen = false;
var mark;
var today;
var thisWeek;
var favesArr = [];
var location1;


// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

//on submit, takes data from the input form and saves it to firebase database
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
 
  console.log("working");
  var searchTerm = $("#searchTerm-input").val().trim(); 
  var radius = $("#radiusSlider-input").val().trim();

  location1 = $('#location-input').val();
  if (typeof location1 == "number") {
      var searchLocation1 = "postal_code:"+location1;
  }
  else if (typeof location1 == "string"){
      var searchLocation1 = "locality:"+location1;
  }

  var QueryURL = "https://maps.googleapis.com/maps/api/geocode/json?components="+searchLocation1+"&key=AIzaSyAzSdHEzpxQrzsLIqaml-BGp9LEClOCkOU"
  $.ajax({
  method: "GET",
  url: QueryURL,
  // contentType: 'application/json',
  // crossDomain: true,
  // dataType: 'jsonp'

}).then(function (response) {
  console.log("map" ,response)
  console.log(QueryURL);
   map.panTo(response.results[0].geometry.location)
});

  dataRef.ref().push({
    location: location1,
    search: searchTerm,
    radius: radius
  });

  eventFul();
  // meetUp();
  $("#radiusSlider-input").val("");
  $("#location-input").val("");
  $("#searchTerm-input").val("");


});

$("#todayBtn").on("click", function (event) {
  event.preventDefault()
  today = $("#todayBtn").val()
  console.log(today);
  return today;
});
$("#thisWeekBtn").on("click", function (event) {
  event.preventDefault()
  thisWeek = $("#thisWeekBtn").val()
  console.log(today);
  return today;
});


function eventFul() {
  $("#table-body").empty();
        var searchTerm = $("#searchTerm-input").val().trim(); 
        console.log(searchTerm);
        var location = $("#location-input").val().trim();
        console.log(location);
        var radius = $("#radiusSlider-input").val().trim();
        if (today) {
            var eventQueryURL = "https://api.eventful.com/json/events/search?l="+location+"&keywords=" +searchTerm+ "&within=" +radius+ "&date="+ today + "&app_key=J3HPBSjCnXTGS2kV";
        } else {
            var eventQueryURL = "https://api.eventful.com/json/events/search?l="+location+"&keywords=" +searchTerm+ "&within=" +radius+ "&date="+ thisWeek + "&app_key=J3HPBSjCnXTGS2kV";
        };      

        console.log("radius is: "+ radius);
  $.ajax({
    method: "GET",
    url: eventQueryURL,
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp'

  }).then(function (response) {
    console.log(response);
    dataEventful = response;

    for (var i = 0; i < dataEventful.events.event.length; i++) {

      var lat1 = dataEventful.events.event[i].latitude;
      var lon1 = dataEventful.events.event[i].longitude;

      var latLng = {
        lat: parseFloat(lat1),
        lng: parseFloat(lon1)
      }


      var marker = new google.maps.Marker({ position: latLng, map: map, store_id: dataEventful.events.event[i].id });

      marker.addListener('click', function(){
        mark = this;
        var queryID = mark.get('store_id');
        MakeInfoWindow(queryID);
    });
    google.maps.event.addListener(map, 'click', function(){
      infoWindow.close(map);
    })

      var title = dataEventful.events.event[i].title;
      var description = dataEventful.events.event[i].description;
      // var button = $("<input class='btn btn-info mt-2' type='submit' value='Add Favorite' id='favoriteBtn'>");
      // var eventID = dataEventful.events.event[i].id;
      var eventDate = moment(dataEventful.events.event[i].start_time).format('MMMM Do YYYY, h:mm:ss a');      if (description == "" || description == null) {
        description = "This event has no description";
      }
      else {


        var newEvent = $("<tr class='m-1'>").append(
          $("<td>").text(title),
          $("<td>").html(description),
          $("<td id='date'>").text(eventDate)
    
        )
        newEvent.attr("src", dataEventful.events.event[i].url);
        $("#table-body").append(newEvent)
       
      }

    }


  })
}

function MakeInfoWindow(data) {
  if (windowOpen) {
    infoWindow.close(map);
  }

  // mark.infoWindow.close();
  // infoWindow.close(map);
  var queryID = data;
  //query eventful by id
  QueryURL = "https://api.eventful.com/json/events/get?id=" + queryID + "&app_key=J3HPBSjCnXTGS2kV";
  $.ajax({
    method: "GET",
    url: QueryURL,
    contentType: 'application/json',
    crossDomain: true,
    dataType: 'jsonp'

  }).then(function (response) {
    console.log(response);
    var lat2 = response.latitude;
    var lon2 = response.longitude;

    var latLng2 = {
      lat: parseFloat(lat2),
      lng: parseFloat(lon2)
    }



    var infoContent = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading" style="text-align: center;">' + response.title + '</h1>' + '<div id="bodyContent">' + '<p>' + response.description + '</p>';



    infoWindow = new google.maps.InfoWindow({
      content: infoContent,
      position: latLng2
    });
    infoWindow.open(map);
    windowOpen = true;
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

$('#radiusSlider-input').change(function () {
  var radius = $('#radiusSlider-input').val();
  console.log(radius);
  $('#sliderValue').text(radius + " mi");

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

  //favorites functions
  var userFavorites = dataRef.ref("/userFave" + uid);


  $("#events-table").on("click", "#favoriteBtn", function (event) {
    event.preventDefault();

    var eventID = $(this).attr("data-id");
    console.log("id " + eventID);
    userFavorites.push(eventID);

  });








});
