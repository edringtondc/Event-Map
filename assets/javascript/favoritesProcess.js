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

    // var event = (whatever value comes from the EVENT that was click on from the home page);
    // var description = (what value comes from the DESCRIPTION that was click on from the home page);

    var selectedFavorite = {
       event: event,
       description: description,

    }

    project1Ref.push(selectedFavorite);
  
  });
  
  
  project1Ref.on("child_added", function(childSnapshot) {
  
  
    var event = childSnapshot.val().event;
    var description = childSnapshot.val().description;
    var removeBtn = $('<btn class="btn btn-info" type="submit" value="Remove Favorite" id="removeBtn">');
  
    var newRow = $("<tr>").append(
      $("<td>").text(event),
      $("<td>").text(description),
      $("<td>").append(removeBtn)
    );
  
    $("#favorites-table").append(newRow);

    // ADD CLASS TO REMOVE BUTTON SOMEHOW AND MAKE IT DELETE THE ROW
  });

  
  
  
  
  
  
  
  
  
  
  
  
