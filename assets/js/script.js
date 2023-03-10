
// GLOBAL VARIABLES

var currentDate = moment().format("DD/MM/YYYY, H:mm");

//Ninja APIs Key
var ninjaKey = "7uO6vmcctMNbKS/uvDMn/Q==hOPwoCDiiaGwubha"

//Giphy API Key
var giphyKey = "WdLpU2BkCnIWDlaD3YUH0DJNCA116UsI"


//COUNTER ON PAGE REFRESH /  LOAD

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
});

  //LOGO CLICK Action (Go Home)
  $("#app-name").click(function () {
    window.location.href = "index.html";
  });
  $("#app-name").css("cursor", "pointer");


  //VIEW HISTORY NAVBAR ITEM CLICK
  $("#published").click(function () {
    window.location.href = "published.html";
  });
  $("#published").css("cursor", "pointer");

  //VIEW SAVED NAVBAR ITEM CLICK
  $("#saved").click(function () {
    window.location.href = "saved.html";
  });
  $("#saved").css("cursor", "pointer");


//QUOTES BUTTON
//Buttons on click event
$("#quote").on("click", function (event) {
  event.preventDefault()

  let textInput = document.getElementById("text-area");

  if (textInput.style.display === "none") {
    textInput.style.display = "block";
  } else {
    textInput.style.display = "none";
  }

  $('#sound-toggle').css('display', 'block');

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
      textArea.attr("id", "text-area-element")
      $("#text-area").append(textArea);

      //Creates a container for buttons and the save and publish buttons
      var textButtonsContainer = $("<div>")
      textButtonsContainer.attr("id", "text-buttons-container")
      var discardButton = $('<button>');
      discardButton.text('DISCARD');
      discardButton.attr("id", "discard-button")

      textButtonsContainer.append(discardButton)
      var saveButton = $('<button>');
      saveButton.text('SAVE');
      saveButton.attr("id", "save-button")

      textButtonsContainer.append(saveButton)
      $("#text-area").append(textButtonsContainer);
      var publishButton = $('<button>');
      publishButton.text('PUBLISH');
      publishButton.attr("id", "publish-button")

      saveButton.attr("id", "save-button")
      textButtonsContainer.append(publishButton)
      discard()
      save()
      publish()
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  })
})


//FACTS BUTTON
$("#fact").on("click", function (event) {
  event.preventDefault()
  let textInput = document.getElementById("text-area");
  if (textInput.style.display === "none") {
    textInput.style.display = "block";
  } else {
    textInput.style.display = "none";
  }
  $('#soundToggleContainer').css('display', 'block');
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
      textArea.attr("id", "text-area-element")
      $("#text-area").append(textArea);
      var textButtonsContainer = $("<div>")
      textButtonsContainer.attr("id", "text-buttons-container")
      var discardButton = $('<button>');
      discardButton.text('DISCARD');
      discardButton.attr("id", "discard-button")
      textButtonsContainer.append(discardButton)
      var saveButton = $('<button>');
      saveButton.text('SAVE');
      saveButton.attr("id", "save-button")
      textButtonsContainer.append(saveButton)
      $("#text-area").append(textButtonsContainer);
      var publishButton = $('<button>');
      publishButton.text('PUBLISH');
      publishButton.attr("id", "publish-button")
      saveButton.attr("id", "save-button")
      textButtonsContainer.append(publishButton)
      discard()
      save()
      publish()
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  })
})

//RANDOM IMAGE BUTTON
$("#random-img").on("click", function (event) {
  event.preventDefault()
  let textInput = document.getElementById("text-area");
  if (textInput.style.display === "none") {
    textInput.style.display = "block";
  } else {
    textInput.style.display = "none";
  }
  $('#soundToggleContainer').css('display', 'block');
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
      textArea.attr("id", "text-area-element")
      $("#text-area").append(textArea);
      var textButtonsContainer = $("<div>")
      textButtonsContainer.attr("id", "text-buttons-container")
      var discardButton = $('<button>');
      discardButton.text('DISCARD');
      discardButton.attr("id", "discard-button")
      textButtonsContainer.append(discardButton)
      var saveButton = $('<button>');
      saveButton.text('SAVE');
      saveButton.attr("id", "save-button")
      textButtonsContainer.append(saveButton)
      $("#text-area").append(textButtonsContainer);
      var publishButton = $('<button>');
      publishButton.text('PUBLISH');
      publishButton.attr("id", "publish-button")
      saveButton.attr("id", "save-button")
      textButtonsContainer.append(publishButton)
      discard()
      save()
      publish()
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

  let textInput = document.getElementById("text-area");
  if (textInput.style.display === "none") {
    textInput.style.display = "block";
  } else {
    textInput.style.display = "none";
  }

  $('#soundToggleContainer').css('display', 'block');

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
      textArea.attr("id", "text-area-element")
      $("#text-area").append(textArea);
      var textButtonsContainer = $("<div>")
      textButtonsContainer.attr("id", "text-buttons-container")
      var discardButton = $('<button>');
      discardButton.text('DISCARD');
      discardButton.attr("id", "discard-button")
      textButtonsContainer.append(discardButton)
      var saveButton = $('<button>');
      saveButton.text('SAVE');
      saveButton.attr("id", "save-button")
      textButtonsContainer.append(saveButton)
      $("#text-area").append(textButtonsContainer);
      var publishButton = $('<button>');
      publishButton.text('PUBLISH');
      publishButton.attr("id", "publish-button")
      saveButton.attr("id", "save-button")
      textButtonsContainer.append(publishButton)
      discard()
      save()
      publish()
    });
});

// PUBLISH BUTTON
function publish() {

  let textArea = document.getElementById("text-area-element");
  let publishButton = document.getElementById("publish-button");
  publishButton.disabled = true;
  textArea.addEventListener("input", function () {
    if (textArea.value.length > 0) {
      publishButton.disabled = false;
    } else {
      publishButton.disabled = true;
    }
  });

  $("#publish-button").click(function () {
    console.log("publish-clicked");
    $("#text-area").css("display", "none");
    var textAreaValue = $("#text-area-element").val();
    var newEntryHeadline = $("<h3>")
    newEntryHeadline.text(currentDate);
    var newEntry = $("<p>")
    newEntry.html(textAreaValue.replace(/\n/g, "<br>"));
    $("#new-entry-container").css("display", "block");
    $("#new-entry-container").addClass("container")
    $("#new-entry-container").prepend(newEntryHeadline);
    $("#new-entry-container").append(newEntry);


    //Storing entry in localstorage. It stores it in an array of objects
    // each pos is marked with current date so that we can retrieve them on archives page.
    var publishedEntries = JSON.parse(localStorage.getItem("publishedEntries")) || [];
    publishedEntries.push({
      date: currentDate,
      content: $("#new-entry-container").html()
    });
    localStorage.setItem("publishedEntries", JSON.stringify(publishedEntries));

    //Adds 1  streak to counter when post published
    streakCounter();
  });


}

// SAVE BUTTON
function save() {
  let textArea = document.getElementById("text-area-element");
  let saveButton = document.getElementById("save-button");
  saveButton.disabled = true;
  textArea.addEventListener("input", function () {
    if (textArea.value.length > 0) {
      saveButton.disabled = false;
    } else {
      saveButton.disabled = true;
    }
  });
  $("#save-button").click(function () {
    console.log("save clicked");
    var currentDate = moment().format("DD/MM/YYYY, kk:mm");

    var textAreaValue = $("#text-area-element").val();
    var savedEntries = JSON.parse(localStorage.getItem("savedEntries")) || [];
    savedEntries.push({
      date: currentDate,
      content: textAreaValue
    });
    localStorage.setItem("savedEntries", JSON.stringify(savedEntries));


//MODAL FOR SAVE BUTTON - Causes BUG wuith multiplying saves

// $('#save-button').attr("data-toggle", "modal");
// $('#save-button').attr("data-target", "#exampleModal");
// $('#save-button').append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
// <div class="modal-dialog" role="document">
//   <div class="modal-content">
//     <div class="modal-header">
//       <h3 class="modal-title" id="exampleModalLabel">Post Saved!</h3>
//       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body"><p class="smaller">You can find your saved posts in the View Saves section</p></div>
//     <div class="modal-footer">
   
//     </div>
//   </div>
// </div>
// </div>`);
  });
}

//DISCARD BUTTON
function discard() {

  let textArea = document.getElementById("text-area-element");
  let discardButton = document.getElementById("discard-button");
  discardButton.disabled = true;
  textArea.addEventListener("input", function () {
    if (textArea.value.length > 0) {
      discardButton.disabled = false;
    } else {
      discardButton.disabled = true;
    }
  });

  $('#discard-button').on('click', function (event) {
    event.preventDefault();
    console.log("discard clicked");
    // Add a modal to the DISCARD button
    $('#discard-button').attr("data-toggle", "modal");
    $('#discard-button').attr("data-target", "#exampleModal");
    $('#discard-button').append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="exampleModalLabel">Are you sure about discarding your post?</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body"><p class="smaller">Your writing will be deleted and all progress will be lost!</p></div>
        <div class="modal-footer">
          <button type="button" id="cancelBtn" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" id="deleteBtn" class="btn btn-danger">Delete</button>
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

// COUNTER FUNCTION 
function streakCounter() {
  let writingStreak = localStorage.getItem("writingStreak");
  let lastClicked = localStorage.getItem("lastClicked");
  let increased = localStorage.getItem("increased");

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

  if (currentDate - lastClicked < 24 * 60 * 60 * 1000 && increased !== "true") {
    writingStreak++;
    localStorage.setItem("increased", "true");
  } else if (currentDate - lastClicked >= 24 * 60 * 60 * 1000) {
    writingStreak = 0;
    localStorage.setItem("increased", "false");
  }

  lastClicked = currentDate;

  if (writingStreak === 1) {
    $("#counter").text("Your current writing streak is " + writingStreak + " day");
  } else {
    $("#counter").text("Your current writing streak is " + writingStreak + " days");
  }
  localStorage.setItem("writingStreak", writingStreak);
  localStorage.setItem("lastClicked", lastClicked);
}

//SOUND FUNCTION

// Create the switch button
$('<label class="switch" >' +
  '<input type="checkbox" id="soundToggle">' +
  '<span class="slider round"></span>' +
  '</label><label>Sound On/Off:</label>').insertBefore("#footer");

// function to play sound on text area click ---- DOES NOT DISPLAY ON PUBLISHED PAGE AND CAUSES ERROR
const audio = new Audio('assets/sounds/writing_7s.mp3');
document.getElementById("text-area").addEventListener("keydown", function () {
  if ($('#soundToggle').is(':checked')) {
    audio.play();
  }
});


