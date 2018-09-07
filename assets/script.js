$(document).ready(function () {

    // Stores values for initial buttons
    var animals = ["dog", "cat", "goat", "hamster", "bird"]

    // Creates initial buttons using 'animals array'
    for (var i = 0; i < animals.length; i++) {
        var animalButtons = $("<button class='animal-buttons'>").text(animals[i])
        animalButtons.attr("data-name", animals[i]);
        $("#animal-button-div").append(animalButtons)
    }

    $(".animal-buttons").on("click", function () {

        var animalClicked = $(this).attr("data-name")

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalClicked + "&api_key=cBF6mOa28IxsuL3NJAePU7rvf9cWdJXv"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.data)

            for (var i = 0; i < response.data.length; i++) {

                var imageUrl = response.data[i].images["480w_still"].url;
                var gifURL = response.data[i].images.original.url;
                var gifs = $("<img class='animal-img'>")
                gifs.attr("src", imageUrl)
                $("#animals").prepend(gifs)

            }

        });

    });

});