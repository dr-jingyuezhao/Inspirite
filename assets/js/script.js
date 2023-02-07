//TODO 

// Dynamically create a div for displaying the selected prompt from API

// Dynamically create / unveil a text writing field. 

// Add save and publish buttons once the user starts writing

// The save button saves text to local storage

// The publish buttons appends it to publication page and saves that page to local storage.

// Create a page with grid of previously written stories. 

//Each cell is a link to previously written story. 

// Add streak counter - counts new day when publish button pressed, once a day.

// Add notifications


var currentDate = moment().format("MMMM D, YYYY");

$(document).ready(function () {

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
    $("#counter").text("You can start writing today. Keep writing everyday!");
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

// Create a function to add sound
function soundEffect() {
  // Create the switch button
  $('<label class="switch">' +
    '<input type="checkbox" id="soundToggle">' +
    '<span class="slider round"></span>' +
    '</label><label>Sound On/Off:</label>').insertAfter('#prompt-container');

  // function to play sound on text area click
  const audio = new Audio('assets/sounds/writing_7s.mp3');
  document.getElementById("text-area").addEventListener("keydown", function () {
    if ($('#soundToggle').is(':checked')) {
      audio.play();
    }
  });
}

// Add text input box, discard, save, and publish buttons
function addTextArea() {
  $("#text-container").removeClass("hide");
  //Creates a text area under writing prompt for user input
  var textArea = $('<textarea rows="8" class="col"></textarea>');
  textArea.attr("id", "text-area-element")
  $("#text-area").append(textArea);
  // Creates a container for buttons: discard, save, and publish
  var textButtonsContainer = $("<div>");
  textButtonsContainer.attr("id", "text-buttons-container");
  // add discard button
  var discardButton = $('<button>');
  discardButton.text('DISCARD');
  discardButton.attr("id", "discard-button")
  textButtonsContainer.append(discardButton)
  // add save button
  var saveButton = $('<button>');
  saveButton.text('SAVE');
  saveButton.attr("id", "save-button");
  textButtonsContainer.append(saveButton);
  // add publish button
  var publishButton = $('<button>');
  publishButton.text('PUBLISH');
  publishButton.attr("id", "publish-button");
  textButtonsContainer.append(publishButton);
  $("#text-area").append(textButtonsContainer);
}



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
      $("#prompt-container").removeClass("hide");
      //Creates a H2 for the quote with the id of quote
      var quoteElement = $("<h4>");
      quoteElement.attr("id", "quote-element");
      quoteElement.addClass("prompt-element");
      //Adds quote text from the API call to the new H2 element
      quoteElement.text('"' + result[0].quote + '"');
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
      soundEffect();
      addTextArea();
      discard();
      save();
      publish();
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  })
});



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
      $("#prompt-container").removeClass("hide");
      var factElement = $("<h4>");
      factElement.attr("id", "fact-element");
      factElement.addClass("prompt-element");
      factElement.text(result[0].fact + ".");
      $("#prompt-container").append(factElement);
      soundEffect();
      addTextArea();
      discard();
      save();
      publish();
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
      $("#prompt-container").removeClass("hide");
      var imageElement = $("<img>");
      imageElement.attr("src", ("data:image/jpg;base64," + result));
      imageElement.attr("id", "image-element");
      imageElement.addClass("prompt-element");
      $("#prompt-container").append(imageElement);
      soundEffect();
      addTextArea();
      discard();
      save();
      publish();
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
      $("#prompt-container").removeClass("hide");
      var gifUrl = response.data.images.original.url
      var gifElement = $("<img>");
      gifElement.attr("src", gifUrl);
      gifElement.attr("id", "gif-element");
      gifElement.addClass("prompt-element");
      $("#prompt-container").prepend(gifElement);
      soundEffect();
      addTextArea();
      discard();
      save();
      publish();
    });
});

// DISCARD BUTTON
// Create an event listener when clicking the discard button
function discard() {
  $('#discard-button').on('click', function (event) {
    event.preventDefault();
    // Add a modal to the DISCARD button
    $('#discard-button').attr("data-toggle", "modal");
    $('#discard-button').attr("data-target", "#exampleModal");
    $('#discard-button').append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Are you sure about discarding your post?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"><p class="small">Your writing will be deleted and all progress will be lost!</p></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" id="deleteBtn" class="btn btn-danger">Delete writing</button>
          </div>
        </div>
      </div>
    </div>`);
    // Add an event listener when clicking on the Delete button and empty the entries
    $("#deleteBtn").click(function () {
      $('#text-area-element').val("");
    });
  });
}

// SAVE BUTTON
// Create an event listener when clicking the save button
function save() {
  $('#save-button').on('click', function (event) {
    event.preventDefault();
    // Add a modal to the save button
    $('#save-button').attr("data-toggle", "modal");
    $('#save-button').attr("data-target", "#exampleModal");
    $('#save-button').append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Please save your writing!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"><p class="small">Your writing will be saved in the records. You can view it on the Saved Writing page.</p></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" id="saveChgBtn" class="btn btn-warning">Save changes</button>
          </div>
        </div>
      </div>
    </div>`);
    // Add an event listener when clicking on the Save changes button and save entries to localStorage
    $("#saveChgBtn").click(function () {
      var savedEntries = JSON.parse(localStorage.getItem("savedEntries")) || [];
      savedEntries.push({
        date: currentDate,
        content: $("#text-area-element").val(),
      });
      localStorage.setItem("savedEntries", JSON.stringify(savedEntries));
    });
  });
}

// PUBLISH BUTTON
function publish() {
  $("#publish-button").click(function (event) {
    event.preventDefault();
    // Add a modal to the PUBLISH button
    $('#publish-button').attr("data-toggle", "modal");
    $('#publish-button').attr("data-target", "#exampleModal");
    $('#publish-button').append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Well done! One step closer to becoming a big writer!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"><p class="small">Your post will be published. You can view it on the Published Work page.</p></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" id="publishBtn" class="btn btn-success">Publish post</button>
          </div>
        </div>
      </div>
    </div>`);
    // Add an event listener when clicking on the Save changes button and save entries to localStorage
    $("#publishBtn").click(function () {
      var newEntryHeadline = $("<h5>")
      newEntryHeadline.text("Your post from " + currentDate);
      var newEntry = $("<p>")
      newEntry.html($("#text-area-element").val().replace(/\n/g, "<br>"));
      $("#new-entry-container").prepend(newEntryHeadline);
      $("#new-entry-container").append(newEntry);
      //Storing new post entry in localstorage. It stores it in an array of objects
      // each pos is marked with current date so that we can retrieve them on published page.
      var postedEntries = JSON.parse(localStorage.getItem("postedEntries")) || [];
      postedEntries.push({
        date: currentDate,
        content: $("#new-entry-container").html(),
      });
      localStorage.setItem("postedEntries", JSON.stringify(postedEntries));
      //Adds 1  streak to counter when post published
      streakCounter();
    });
  });
}

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
    $("#counter").text("Your current writing streak: " + writingStreak + " day");
  }
  else if (writingStreak === 0) {
    $("#counter").text("You've just started your writing streak!");
  }
  else {
    $("#counter").text("Your current writing streak: " + writingStreak + " days");
  }
  localStorage.setItem("writingStreak", writingStreak);
  localStorage.setItem("lastClicked", lastClicked);
}

