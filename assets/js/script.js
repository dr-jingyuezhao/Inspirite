//TODO 

// Dynamically create a div for displaying the selected prompt from API

// Dynamically create / unveil a text writing field. 

// Add save and publish buttons once the user starts writing

// The save button saves text to local storage

// The publish buttons appends it to publication page and saves that page to local storage.

// Create a page with grid of previously written stories. 

//Each cell is a link to previously written story. 

// Add streak counter - counts new day when publish button pressed, once a day.

//COUNTER ON PAGE REFRESH /  LOAD

$(document).ready(function(){

  let writingStreak = localStorage.getItem("writingStreak");
  let lastClicked = localStorage.getItem("lastClicked");
  if (writingStreak === null) {
    $("#counter").text("Start your writing streak!");
  } else {
    writingStreak = parseInt(writingStreak);
  }
  if (lastClicked === null) {
    lastClicked = new Date();
  } else {
    lastClicked = new Date(lastClicked);
  }

  if (writingStreak === 1) {
    $("#counter").text("Your current writing streak is " + writingStreak + " day");  
  } 
  else if (writingStreak > 1) {
    $("#counter").text("Your current writing streak is " + writingStreak + " days");
  }

  else {
    $("#counter").text("You've started your writing streak. Keep going tomorrow!");
  }
})


// //^NOTIFICATIONS

// if ("Notification" in window) {
//   if (Notification.permission === "granted") {
//     setInterval(function () {
//       let notification = new Notification("Time to INSPIRITE", {
//         body: "Get inspired and write something great today!",
//         icon: "icon.png" //to be added
//       });
//     }, 1000 * 60 * 60 * 24);
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(function (permission) {
//       if (permission === "granted") {
//         setInterval(function () {
//           let notification = new Notification("Time to INSPIRITE", {
//             body: "Get inspired and write something great today!",
//             icon: "icon.png" //to be added
//           });
//         }, 1000 * 60 * 60 * 24);
//       }
//     });
//   }
// }


//QUOTES BUTTON
//Buttons on click event
$("#quote").on("click", function (event) {
  event.preventDefault()
  //Launches Ajax call for quotes
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=',
    headers: { 'X-Api-Key': ninjaKey },
    contentType: 'application/json',
    success: function (result) {
      //"Disappears" the start page jumbotron
      $("#start-screen").css("display", "none");
      //Creates a H2 for the quote with the id of quote
      var quoteElement = $("<h2>");
      quoteElement.attr("id", "quote-element");
      quoteElement.addClass("prompt-element");
      //Adds quote text from the API call to the new H2 element
      quoteElement.text('"' + result[0].quote + '"')
      //Adds quote author element and its attributes
      var authorElement = $("<h4>");
      authorElement.attr("id", "author");
      authorElement.addClass("prompt-element");
      //Sets author element text
      authorElement.text("- " + result[0].author);
      //Appends author to quote
      quoteElement.append(authorElement);
      //Appends quote to prompt container section in HTML
      $("#prompt-container").append(quoteElement);
      //Creates a text area under writing prompt for user input
      var textArea = $('<textarea rows="8" class="col"></textarea>');
      textArea.attr ("id", "text-area-element")
      $("#text-area").append(textArea);
      //Creates a container for buttons and the save and publish buttons
      var textButtonsContainer = $("<div>")
      textButtonsContainer.attr("id", "text-buttons-container")
      var saveButton = $('<button>');
      saveButton.text('SAVE');
      saveButton.attr("id" , "save-button")
      saveButton.addClass('btn btn-info btn-lg');
      textButtonsContainer.append(saveButton)
      $("#text-area").append(textButtonsContainer);
      var publishButton = $('<button>');
      publishButton.text('PUBLISH');
      publishButton.attr("id" , "publish-button")
      publishButton.addClass('btn btn-success btn-lg');
           saveButton.attr("id" , "save-button")
      textButtonsContainer.append(publishButton)
      daysCounter()
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  })
})


//FACTS BUTTON
$("#fact").on("click", function (event) {
  event.preventDefault()
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/facts?limit=1',
    headers: { 'X-Api-Key': ninjaKey },
    contentType: 'application/json',
    success: function (result) {
      $("#start-screen").css("display", "none");
      var factElement = $("<h2>");
      factElement.attr("id", "fact-element");
      factElement.addClass("prompt-element");
      factElement.text(result[0].fact + ".")
      $("#prompt-container").append(factElement)
      var textArea = $('<textarea rows="8" class="col"></textarea>');
      textArea.attr ("id", "text-area-element")
      $("#text-area").append(textArea);
      var textButtonsContainer = $("<div>")
      textButtonsContainer.attr("id", "text-buttons-container")
      var saveButton = $('<button>');
      saveButton.text('SAVE');
      saveButton.attr("id" , "save-button")
      saveButton.addClass('btn btn-info btn-lg');
      textButtonsContainer.append(saveButton)
      $("#text-area").append(textButtonsContainer);
      var publishButton = $('<button>');
      publishButton.text('PUBLISH');
      publishButton.attr("id" , "publish-button")
      publishButton.addClass('btn btn-success btn-lg');
           saveButton.attr("id" , "save-button")
      textButtonsContainer.append(publishButton)
      daysCounter()
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  })
})


//RANDOM IMAGE BUTTON
$("#random-img").on("click", function (event) {
  event.preventDefault()
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomimage?',
    headers: { 'X-Api-Key': ninjaKey },
    success: function (result) {
      $("#start-screen").css("display", "none");
      var imageElement = $("<img>");
      imageElement.attr("src", ("data:image/jpg;base64," + result));
      imageElement.attr("id", "image-element");
      imageElement.addClass("prompt-element");
      $("#prompt-container").append(imageElement)
      var textArea = $('<textarea rows="8" class="col"></textarea>');
      textArea.attr ("id", "text-area-element")
      $("#text-area").append(textArea);
      var textButtonsContainer = $("<div>")
      textButtonsContainer.attr("id", "text-buttons-container")
      var saveButton = $('<button>');
      saveButton.text('SAVE');
      saveButton.attr("id" , "save-button")
      saveButton.addClass('btn btn-info btn-lg');
      textButtonsContainer.append(saveButton)
      $("#text-area").append(textButtonsContainer);
      var publishButton = $('<button>');
      publishButton.text('PUBLISH');
      publishButton.attr("id" , "publish-button")
      publishButton.addClass('btn btn-success btn-lg');
           saveButton.attr("id" , "save-button")
      textButtonsContainer.append(publishButton)
      daysCounter()
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  })
})


//GIF BUTTON
var count = 0;
var lastClicked = new Date();

$("#gif").on("click", function (event) {
  event.preventDefault()
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + giphyKey; + "&rating=pg";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      $("#start-screen").css("display", "none");
      var gifUrl = response.data.images.original.url
      var gifElement = $("<img>");
      gifElement.attr("src", gifUrl);
      gifElement.attr("id", "gif-element");
      gifElement.addClass("prompt-element");
      $("#prompt-container").prepend(gifElement);
      var textArea = $('<textarea rows="8" class="col"></textarea>');
      textArea.attr ("id", "text-area-element")
      $("#text-area").append(textArea);
      var textButtonsContainer = $("<div>")
      textButtonsContainer.attr("id", "text-buttons-container")
      var saveButton = $('<button>');
      saveButton.text('SAVE');
      saveButton.attr("id" , "save-button")
      saveButton.addClass('btn btn-info btn-lg');
      textButtonsContainer.append(saveButton)
      $("#text-area").append(textButtonsContainer);
      var publishButton = $('<button>');
      publishButton.text('PUBLISH');
      publishButton.attr("id" , "publish-button")
      publishButton.addClass('btn btn-success btn-lg');
      textButtonsContainer.append(publishButton)
      publish()

    });
});


// PUBLISH BUTTON
 function publish() {
  $("#publish-button").click(function() {
   console.log("publish-clicked");
   streakCounter()
 });
 }



// // Saves current entry to local storage ---------- NEEDS WORK!
// function save() {
//   // add the click event for the publish button
//   $("#save-button").click(function() {
//    console.log("save-clicked");
//    localStorage.setItem('textareaValue', $("#text-area-element").val())
//  });
//  }


// COUNTER FUNCTION 

function streakCounter() {
  let writingStreak = localStorage.getItem("writingStreak");
  let lastClicked = localStorage.getItem("lastClicked");
  if (writingStreak === null) {
    writingStreak = 0;
  } else {
    writingStreak = parseInt(writingStreak);
  }
  if (lastClicked === null) {
    lastClicked = new Date();
  } else {
    lastClicked = new Date(lastClicked);
  }
  let currentDate = new Date();
  if (currentDate - lastClicked >= 24 * 60 * 60 * 1000) {
    writingStreak++;
  }
  lastClicked = currentDate;
  if (writingStreak === 1) {
    $("#counter").text("Your current writing streak is " + writingStreak + " day");
  } 
  else if (writingStreak === 0) {
    $("#counter").text("You've started your writing streak. Keep going tomorrow!");
  }
  else {
    $("#counter").text("Your current writing streak is " + writingStreak + " days");
  }
  localStorage.setItem("writingStreak", writingStreak);
  localStorage.setItem("lastClicked", lastClicked);
}


//SOUND FUNCTION
// function to play sound on text area click
const audio = new Audio ('assets/sounds/writing_7s.mp3');
  document.getElementById("text-area").addEventListener("keydown", function() {
    audio.play();
  });