removeClass("hide");
addClass("visible");

// add a function to load prompt
function renderPrompt(event) {
    event.preventDefault();
    
}
renderPrompt();
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
        textArea.attr("id", "text-area-element")
        $("#text-area").append(textArea);
        var textButtonsContainer = $("<div>")
        textButtonsContainer.attr("id", "text-buttons-container")
        var saveButton = $('<button>');
        saveButton.text('SAVE');
        saveButton.attr("id", "save-button")
        saveButton.addClass('btn btn-info btn-lg');
        textButtonsContainer.append(saveButton)
        $("#text-area").append(textButtonsContainer);
        var publishButton = $('<button>');
        publishButton.text('PUBLISH');
        publishButton.attr("id", "publish-button")
        publishButton.addClass('btn btn-success btn-lg');
        saveButton.attr("id", "save-button")
        textButtonsContainer.append(publishButton)
        daysCounter()
      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    })
  })
  