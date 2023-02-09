// Declare variables
var currentDate = moment().format("DD/MM/YYYY, H:mm");
console.log("Current date/time is: " + currentDate);
var savedEntries = JSON.parse(localStorage.getItem("savedEntries")) || [];
console.log("savedEntries: ", savedEntries);

// Create a card for each saved entry
for (var i = 0; i < savedEntries.length; i++) {
  var savedDate = moment(savedEntries[i].date).format("DD/MM/YYYY, H:mm");
  var daysAgo = moment(savedDate).fromNow();
  $('#savedWriting').append(`<div class="blogCard card bg-light text-black ml-3 mr-3 mb-5 mx-auto col-xs-12 col-lg-6 w-auto">
  <div class="card text-center">
    <div id="cardTitle" class="card-header">
    ${savedDate}
    </div>
    <div class="card-body">
      <h5 class="card-title">Draft #${i + 1}</h5>
      <p class="card-text">${savedEntries[i].content.substr(0, 25)}</p>
      <button type="button" id="saved#${i}" class="btn btn-sm btn-danger continueBtn">Continue writing</button>
    </div>
    <div class="card-footer text-muted small">
    ${daysAgo}
    </div>
  </div>
</div>`);
};

// Add an event listener on click for each Continue writing button
$(".continueBtn").each(function () {
  $(this).click(function (event) {
    event.preventDefault();
    // Hide the saved card section and display the writing section
    $("#cardSection").css("display", "none");
    $("#text-area").css("display", "block");
    // Create respective continue writing page 
    var entryIndex = parseInt($(this).attr("id").split("#")[1]);
    console.log("entryIndex: ", entryIndex);
    var savedDraft = savedEntries[entryIndex].content;
    console.log("saved draft: ", savedDraft);
    //Create a text area for user input to continue writing
    $('#text-area').append(`<textarea id="text-area-element" class="col">${savedDraft}</textarea>`);
    //Create a container for buttons and the save and publish buttons
    var textButtonsContainer = $("<div>");
    textButtonsContainer.attr("id", "text-buttons-container");
    // Create a Discard button
    var discardButton = $('<button>');
    discardButton.text('DISCARD');
    discardButton.attr("id", "discard-button");
    textButtonsContainer.append(discardButton);
    // Create a Save button
    var saveButton = $('<button>');
    saveButton.text('SAVE');
    saveButton.attr("id", "save-button");
    textButtonsContainer.append(saveButton);
    // Create a Publish button
    var publishButton = $('<button>');
    publishButton.text('PUBLISH');
    publishButton.attr("id", "publish-button");
    textButtonsContainer.append(publishButton);
    $("#text-area").append(textButtonsContainer);
    // Call the function for each button
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
    $('#discard-button').attr("data-target", "#exampleModal-1");
    $('#discard-button').append(`<div class="modal fade" id="exampleModal-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Are you sure about discarding your draft?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"><p class="small">Your writing will be deleted. You can start again with a fresh inspiration!</p></div>
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
    $('#save-button').attr("data-target", "#exampleModal-2");
    $('#save-button').append(`<div class="modal fade" id="exampleModal-2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Great progress! Please save your draft!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"><p class="small">Your writing will be saved. You can view it on the Saved Writing page.</p></div>
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
    $('#publish-button').attr("data-target", "#exampleModal-3");
    $('#publish-button').append(`<div class="modal fade" id="exampleModal-3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Well done! One step closer to becoming a big writer!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"><p class="small">Your writing will be published. You can view it on the Published Work page.</p></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" id="publishBtn" class="btn btn-success">Publish blog</button>
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
    });
  });
}
