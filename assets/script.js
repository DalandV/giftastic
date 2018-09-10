$(document).ready(function () {

    // Stores values for initial buttons
    var animals = ["dog", "cat", "goat", "hamster", "bird"]

    // Creates initial buttons using 'animals array'
    function createButtons() {

        for (var i = 0; i < animals.length; i++) {

            var animalButtons = $("<button class='animal-buttons'>").text(animals[i])
            animalButtons.attr("data-name", animals[i]);
            $("#animal-button-div").append(animalButtons)

        }
    };
    createButtons();

    // Adds new buttons to the DOM
    $("#animal-submit").on("click", function () {

        event.preventDefault();

        if ($("#animal-input").val() !== "") {
            animals.push($("#animal-input").val())
            $("#animal-button-div").empty()
            createButtons()
            $("#animal-input").val("")
        }

    });


    // Populates the DOM with gifs
    $(document.body).on("click", ".animal-buttons", function () {

        var animalClicked = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalClicked + "&api_key=cBF6mOa28IxsuL3NJAePU7rvf9cWdJXv";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            console.log(results)

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var animalImage = $("<img>");

                var stillImageUrl = results[i].images.fixed_height_still.url;

                var gifURL = results[i].images.fixed_height.url;

                animalImage.attr("src", stillImageUrl)
                animalImage.attr("still-image", stillImageUrl)
                animalImage.attr("gif-image", gifURL)
                animalImage.attr("data-state", "still")
                animalImage.attr("class", "gif")

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#animals").prepend(animalDiv)

            }

        });

    });

    // Starts and stops gifs on click
    $(document.body).on("click", ".gif", function () {

        console.log(this);

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("gif-image"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("still-image"));
            $(this).attr("data-state", "still");
        }

    });

});