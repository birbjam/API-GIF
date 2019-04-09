//Form where you can add an animal.
//When you add an animal, creates a button.
//Button is linked to the api which then retrieves the animal that was clicked.
//Displays 10 GIFs
//GIFs load as still images
//Clicking on images makes the GIFs move.

window.onload = function () {


var topics = ["cat", "dog", "birb", "sloth", "rhino", "elephant", "goat", "cow", "tiger"];


document.querySelector("#gifbutton").addEventListener("click", function (event) {
    event.preventDefault();

    var animalEntered = document.querySelector("#animal-input").value.trim();


});

var queryURL = "http://api.giphy.com/v1/gifs/search?q=animals&api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf&limit=5&rating=pg";

    fetch(queryURL, {
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) { return response.json() })
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
        var results = response.data;

            for (let item of results) {

                // Creating and storing a div tag
                var animalDiv = document.createElement("div");

                // Creating a paragraph tag with the result item's rating
                var p = document.createElement("p")
                p.innerText = `Rating: ${item.rating}`;

                // Creating and storing an image tag
                var animalImage = document.createElement("img");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.setAttribute("src", item.images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.appendChild(p);
                animalDiv.appendChild(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                let gifContainer = document.querySelector("#images");
                gifContainer.prepend(animalDiv);
            }

        })};
