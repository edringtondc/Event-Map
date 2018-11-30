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





// console.log("Range input is: " + rangeInput[0].value);
// var database = firebase.database;


$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    console.log("working");
    // var searchTerm = $("#searchTerm-input").val().trim();
    // var location = $("#location-input").val().trim();
    // var radius = $("#radiusSlider-input").val().trim();



    // dataRef.ref().push({
    //     location: userLocation,
    //     search: userSearchTerm
    // });

    eventFul();
    meetUp();


});
function eventFul() {

    var eventLoc = "39.67,-104.96";
    var eventDate = "today";
    var eventRadius = 5;
    var eventQueryURL = "https://api.eventful.com/json/events/search?location=" + eventLoc + "&date=" + eventDate + "&within=" + eventRadius + "&app_key=J3HPBSjCnXTGS2kV";
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
        }
    })
}

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



