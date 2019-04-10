
// array of animals
var topic = ["cats", "dogs", "mouse", "bird", "fish"];


function buttonClick() {
// delete the prior gif buttons
$("#buttons-view").empty();

    for (var i = 0; i < topic.length; i++) {
                
        var newBTN = $("<button>")
        //add class
        newBTN.addClass("gif");
        //add attr
        newBTN.attr("data-name", topic[i]);
        //add text
        newBTN.text(topic[i]);
        $("#buttons-view").append(newBTN);
    }
    // Animals Buttons onClick
$("button").on("click", function() {
    
    var animal = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=KFL7UMj7I6KcwvEK0rxWe7P8INqDKZVe&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function(response) {
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            //variables
            var gifDiv = $("<div>");
            gifDiv.addClass("diplay-gif");

            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animalImage = $("<img>");
            //attr source of results to the image
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);
            // Diplay the GIFS onto the page
            $("#gif-section").prepend(gifDiv);
            // Stop the GIF by clicking on it
            $("img").on("click", function() {
                
                var state = $(this).attr("data-state");
                console.log(state);
                //logic
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                   } else {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "still");
                  }
            })
            

        }
    })
})
}



// add GIF....
$("#add-gif").on("click", function(event) {
    // prevent submit button sending a form
    event.preventDefault(event);
    // grab user input
    var userInput = $("#gif-input").val().trim();
    console.log(userInput);
    //add gif to array
    topic.push(userInput);
    // clear the input after submit
    $("#gif-input").val("");
    // add new gif with button
    buttonClick();
    
    
})

buttonClick();

