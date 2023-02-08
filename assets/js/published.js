// Declare variables
var currentDate = moment().format("DD/MM/YYYY, H:mm");
console.log("Current date/time is: " + currentDate);
var postedEntries = JSON.parse(localStorage.getItem("postedEntries")) || [];
console.log("postedEntries: ", postedEntries);
var writingStreak = JSON.parse(localStorage.getItem("writingStreak")) || [];
console.log("writingStreak: ", writingStreak);


//COUNTER ON PAGE REFRESH /  LOAD

$(document).ready(function() {
    
      if (writingStreak === 1) {
        $("#counter").text("Your current writing streak is " + writingStreak + " day");
      }
      else if (writingStreak > 1) {
        $("#counter").text("Your current writing streak is " + writingStreak + " days");
      }
 });


// Create a card for each posted entry
for (var i = 0; i < postedEntries.length; i++) {
    var postedDate = moment(postedEntries[i].date).format("DD/MM/YYYY, H:mm");
    var daysAgo = moment(postedDate).fromNow();
    $('#publishedWork').append(`<div class="blogCard card bg-light text-black ml-3 mr-3 mb-5 mx-auto col-xs-12 col-lg-6 w-auto">
    
    <h5 class="card-title">${postedDate}</h5>
        <p class="card-text">${postedEntries[i].content.substr(0, 256)}</p>
        <button type="button" id="posted#${i}" class="readBtn btn mt-auto">Read more</button>
    </div>
    
</div>`);
}

// Add an event listener on click for each Read more button
$(".readBtn").each(function () {
    $(this).click(function (event) {
        event.preventDefault();
        // Hide the published card section and display the blog section
        $("#cardSection").css("display", "none");
        $("#blogSection").removeClass("hide");
        // Create respective published blog 
        var entryIndex = parseInt($(this).attr("id").split("#")[1]);
        console.log("entryIndex: ", entryIndex);
        var blogDate = postedEntries[entryIndex].date;
        var postedBlog = postedEntries[entryIndex].content;
        console.log("posted blog: ", postedBlog);
        $("#blogDate").text(blogDate);
        $("#blog-container").html(postedBlog);
    });
});



