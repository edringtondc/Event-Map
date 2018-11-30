//VARIABLES

// var searchTerm = $("#searchTerm-input").val().trim(); 
// var location = $("#location-input").val().trim();
// var radius = $("#radiusSlider-input").val().trim();

// $("#submitBtn")

// $("#eventsMap")
// $("#events-table")
// $("#favoriteBtn")

// $("#favoritesMap")
// $("#favorites-table")
// $("#removeBtn")

//FUNCTIONS



//PROCESS

// var config = {
//     apiKey: "AIzaSyA4deSE6FhdyRTPbr001ODPtibfgGHnLlA",
//     authDomain: "test-for-bootcamp.firebaseapp.com",
//     databaseURL: "https://test-for-bootcamp.firebaseio.com",
//     projectId: "test-for-bootcamp",
//     storageBucket: "test-for-bootcamp.appspot.com",
//     messagingSenderId: "478329140159"
//   };
  
//   firebase.initializeApp(config);
  
//   var database = firebase.database();




// Populates favorite table when FAVORITE buttons are clicked
  
  var project1Ref = database.ref("/project1");
  
  $("#favoriteBtn").on("click", function(event) {
    
    event.preventDefault();

    var selectedFavorite = {xxxxxxxxxxxxxxxxxxxx, xxxxxxxxxxxxxxxxxxxx};
  
    project1Ref.push(selectedFavorite);
  
  });
  
  
  project1Ref.on("child_added", function(childSnapshot) {
  
    // console.log("CHILD :"+ childSnapshot.val());
  
    var eventArr = childSnapshot.val().event;
    var eventArr = childSnapshot.val().description;
    var removeBtn = $('<btn class="btn btn-info" type="submit" value="Remove Favorite" id="removeBtn">');
  
    var newRow = $("<tr>").append(
      $("<td>").text(xxxxxxxxxxxxxxxxxxxxxxxxxx),
      $("<td>").text(xxxxxxxxxxxxxxxxxxxxxxxxxx),
      $("<td>").append(removeBtn)
    );
  
    $("#favorites-table").append(newRow);
  });
  
  
  
  
  
  
  
  
  
  
  
