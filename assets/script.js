$(document).ready(function() {
  // Stores values for initial buttons
  const animals = [
    "dog",
    "cat",
    "goat",
    "hamster",
    "bird",
    "salamander",
    "goldfish"
  ];

  // Creates initial buttons using 'animals' array
  function createButtons() {
    for (let i = 0; i < animals.length; i++) {
      const animalButtons = $("<button class='animal-buttons'>").text(
        animals[i]
      );
      animalButtons.attr("data-name", animals[i]);
      $("#animal-button-div").append(animalButtons);
    }
  }
  createButtons();

  // Adds new buttons to the DOM
  $("#animal-submit").on("click", function() {
    event.preventDefault();

    if ($("#animal-input").val() !== "") {
      animals.push($("#animal-input").val());
      $("#animal-button-div").empty();
      createButtons();
      $("#animal-input").val("");
    }
  });

  // Populates the DOM with gifs
  $(document.body).on("click", ".animal-buttons", function() {
    const animalClicked = $(this).attr("data-name");

    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${animalClicked}&api_key=cBF6mOa28IxsuL3NJAePU7rvf9cWdJXv&limit=10`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      const results = response.data;

      for (var i = 0; i < results.length; i++) {
        const animalDiv = $("<div class='img-divs'>");
        const p = $("<p>").text(`Rating: ${results[i].rating}`);
        const animalImage = $("<img>");
        const stillImageUrl = results[i].images.fixed_height_still.url;
        const gifURL = results[i].images.fixed_height.url;

        animalImage.attr("src", stillImageUrl);
        animalImage.attr("still-image", stillImageUrl);
        animalImage.attr("gif-image", gifURL);
        animalImage.attr("data-state", "still");
        animalImage.attr("class", "gif");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").prepend(animalDiv);
      }
    });
  });

  // Starts and stops gifs on click
  $(document.body).on("click", ".gif", function() {
    const state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("gif-image"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("still-image"));
      $(this).attr("data-state", "still");
    }
  });
});
