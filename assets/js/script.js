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


//^ STREAK TRACKER
//For now just counts as long as app open once a day. Has to be improved to count when Publish button pressed. 

//Sets today's date
let today = new Date();

// Gets the last time the user used the app from local storage
let lastUse = localStorage.getItem("lastUse");

// If the user has never used the app before, set lastUse to today
// and set the consecutive days to 1
if (!lastUse) {
  localStorage.setItem("lastUse", today);
  localStorage.setItem("writingStreak", 1);
} else {
  // Converts the stored date to a Date object
  lastUse = new Date(lastUse);

  // Checks if the user used the app yesterday by subtracting today date from last use date
  if (today.getDate() - lastUse.getDate() === 1) {
    // If the user used the app yesterday, increment the writing streak
    let writingStreak = localStorage.getItem("writingStreak");
    writingStreak++;
    localStorage.setItem("writingStreak", writingStreak);
  } else {
    // If the user didn't use the app yesterday, reset the writingStreaks to 1
    localStorage.setItem("writingStreak", 1);
  }

  // Update the lastUse date
  localStorage.setItem("lastUse", today);
}

//Displaying the counter. 

let writingStreak = localStorage.getItem("writingStreak")
if (writingStreak == 1) {
  var counter = $("<div>")
  counter.text("Your current streak: " + writingStreak + " day")
  $("#counter-section").append(counter);
}
else {
  var counter = $("<div>")
  counter.text("Your current streak: " + writingStreak + " days")
  $("#counter-section").append(counter);
}

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
    $("#start-screen").css("display" , "none")
    //Creates a H2 for the quote with the id of quote
    var quoteElement = $("<h2>")
    quoteElement.attr("id" , "quote")
    quoteElement.addClass("prompt-element");
    //Adds quote text from the API call to the new H2 element
quoteElement.text(result[0].quote)  
//Adds quote author element and its attributes
var authorElement = $("<h4>")
authorElement.attr("id" , "author")
authorElement.addClass("prompt-element");
//Sets author element text
authorElement.text("- " + result[0].author)  
//Appends author to quote
quoteElement.append(authorElement)
//Appends quote to prompt container section in HTML
$("#prompt-container").append(quoteElement)
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
    $("#start-screen").css("display" , "none")
    var factElement = $("<h2>")
    factElement.attr("id" , "fact")
    factElement.addClass("prompt-element");
factElement.text(result[0].fact)   
$("#prompt-container").append(factElement)
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
    $("#start-screen").css("display" , "none")
    var imageElement = $("<img>")
    imageElement.attr("src", ("data:image/jpg;base64," + result));
    imageElement.attr("id" , "fact")
    imageElement.addClass("prompt-element");
    $("#prompt-container").append(imageElement)
  },
  error: function ajaxError(jqXHR) {
    console.error('Error: ', jqXHR.responseText);
  }
})

})


//GIF BUTTON
$("#gif").on("click", function(event) {
  event.preventDefault() 
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + giphyKey; + "&rating=pg";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
console.log("Gif displayed");
console.log(response);
      $("#start-screen").css("display" , "none")
      var gifUrl = response.data.images.original.url
      var gifElement = $("<img>");
      gifElement.attr("src", gifUrl);
      gifElement.attr("id" , "gif");
      gifElement.addClass("prompt-element");
      $("#prompt-container").append(gifElement);
    });
});