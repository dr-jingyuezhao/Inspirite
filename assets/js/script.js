//TODO 

// Dynamically add buttons connected to APIs to source writing prompts

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

//^NOTIFICATIONS

if ("Notification" in window) {
  if (Notification.permission === "granted") {
    setInterval(function () {
      let notification = new Notification("Time to INSPIRITE", {
        body: "Get inspired and write something great today!",
        icon: "icon.png" //to be added
      });
    }, 1000 * 60 * 60 * 24);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        setInterval(function () {
          let notification = new Notification("Time to INSPIRITE", {
            body: "Get inspired and write something great today!",
            icon: "icon.png" //to be added
          });
        }, 1000 * 60 * 60 * 24);
      }
    });
  }
}


//Quotes API

var category = 'happiness'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=',
    headers: { 'X-Api-Key': ninjaKey},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
})

//Facts API

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/facts?limit=1'  ,
    headers: { 'X-Api-Key': ninjaKey },
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});


// Giphy API calls
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + giphyKey;

var searchQueryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyKey + "&q=cat&limit=25&offset=0&rating=g&lang=en";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
  
    console.log(response);
});


// Random image API call. Check https://api-ninjas.com/api/randomimage for more info.
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomimage?', 
    headers: { 'X-Api-Key': ninjaKey }, //Had to remove Accept: from here -don't know why, but it works :)
    success: function(result) {

// Creates element for the image and sets its attribute of SRC to URL including API call result.
var testImage = $("<img>")
testImage.attr("src", ("data:image/jpg;base64," + result));

// Appends image to HTML section 

$("#image-section").append(testImage)
   
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
})

