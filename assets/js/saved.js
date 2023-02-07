// Declare variables
var currentDate = moment().format("DD/MM/YYYY, kk:mm");
var savedEntries = JSON.parse(localStorage.getItem("savedEntries")) || [];
console.log("savedEntries: ", savedEntries);
// Create a card for each saved entry
for (var i = 0; i < savedEntries.length; i++) {
  var savedDate = moment(savedEntries[i].date).format("DD/MM/YYYY, kk:mm");
  var daysAgo = moment(savedDate).fromNow();
  $('#savedWriting').append(`<div class="cardContainer mb-3 col-xs-12 col-md-6 col-xl-3">
  <div class="card text-center">
    <div id="cardTitle" class="card-header">
    ${savedEntries[i].date}
    </div>
    <div class="card-body">
      <p class="card-text">${savedEntries[i].content.substr(0, 30)}</p>
      <a href="#" class="btn btn-sm btn-danger">Continue writing</a>
    </div>
    <div class="card-footer text-muted small">
    ${daysAgo}
    </div>
  </div>
</div>`);
};
