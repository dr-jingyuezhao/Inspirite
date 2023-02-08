// Declare variables
var currentDate = moment().format("DD/MM/YYYY, H:mm");
console.log("Current date/time is: " + currentDate);
var postedEntries = JSON.parse(localStorage.getItem("postedEntries")) || [];
console.log("postedEntries: ", postedEntries);

// Create a card for each posted entry
for (var i = 0; i < postedEntries.length; i++) {
    var postedDate = moment(postedEntries[i].date).format("DD/MM/YYYY, H:mm");
    var daysAgo = moment(postedDate).fromNow();
    $('#publishedWork').append(`<div class="blogCard card bg-dark text-white ml-3 mr-3 mb-5 mx-auto col-xs-12 col-lg-6 w-auto">
    <img src="assets/images/hd-wallpaper-7091379_1920.jpg" class="card-img"
        alt="The background image for each published blog.">
    <div class="card-img-overlay" style="padding: 50px;">
    <h5 class="card-title">${postedDate}</h5>
        <p class="card-text">${postedEntries[i].content.substr(0, 256)}</p>
        <button type="button" id="posted#${i}" class="readBtn btn btn-success mt-auto">Read more</button>
    </div>
    <div class="card-footer text-muted small text-center">
        Posted ${daysAgo}
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




