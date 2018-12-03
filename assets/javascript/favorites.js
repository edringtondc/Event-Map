// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

//     //seperate javascript file for the favorites, for (var key in people){}
//     userFavorites.once('value').then(function(snapshot) {
//         // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

//         console.log("snapshot ", snapshot.val());
//         // ...
//       });

//         // var userID = firebase.auth().currentUser.uid;


// //recursion, within the then part of the ajax call. have an if statement that stops it at the end of the array 

// userFavorites.on("child_added", function (childSnapshot) {
//     console.log("help me")
//     var userIDForQuery = childSnapshot.val();

//     console.log("userIDForQuery val is: " + userIDForQuery);


//     var favesQueryURL = "https://api.eventful.com/json/events/get?id=" + userIDForQuery + "&app_key=J3HPBSjCnXTGS2kV";
//     console.log("url " + favesQueryURL);

//     $.ajax({
//       method: "GET",
//       url: favesQueryURL,
//       contentType: 'application/json',
//       crossDomain: true,
//       dataType: 'jsonp'

//     }).then(function (response) {

//       dataEventful = response;

//      console.log("data is " , dataEventful);





//       // var lat1 = dataEventful.events.event[i].latitude;
//       // var lon1 = dataEventful.events.event[i].longitude;

//       // var latLng = {
//       //   lat: parseFloat(lat1),
//       //   lng: parseFloat(lon1)
//       // }
//       // var marker = new google.maps.Marker({ position: latLng, map: map });

//       var title = dataEventful.title;
//       var description = dataEventful.description;
//       var button = $("<input class='btn btn-info' type='submit' value='Remove Favorite' id='removeBtn'>");
//       var eventID = dataEventful.id;
//       var eventDate = moment(dataEventful.start_time, "HH:mm");

//       // console.log("title: " + title + "description: " + description);

//       if (description == "" || description == null) {
//         description = "This event has no description";
//       }

//       else {
//         var faveEvent = $("<tr class='m-1'>").append(
//           $("<td><h4>").text(title),
//           $("<td><p>").html(description).text(),
//           $("<td id='date'>").text(eventDate),
//           // $("<td>").text(button)
//         )

//         faveEvent.attr("data-id", eventID);
//         faveEvent.attr("src", dataEventful.url);

//         $("#favorites-table").append(faveEvent)
//         faveEvent.append(button);
//       }

  //     });

$(document).ready(function () {


    console.log("ready");

    
    var event = 55;
    var row = $("<tr><td>" + "Title TBD" + "<td>" + "Description TBD" + "<td>" + "Date TBD" + "<td>" + "button TBD" )




    $("favorites-table").append(row);


});