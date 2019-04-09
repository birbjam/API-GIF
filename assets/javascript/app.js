//Form where you can add an animal.
//When you add an animal, creates a button.
//Button is linked to the api which then retrieves the animal that was clicked.
//Displays 10 GIFs
//GIFs load as still images
//Clicking on images makes the GIFs move.

window.onload = function () {

// Setting a variable to house an empty array.
var topics = [];

// Event Listener for the gif button to be pressed.
document.querySelector("#gifbutton").addEventListener("click", function (event) {
    event.preventDefault();

    // Trims any spaces from what is typed into the form and stores it into
    // a variable.
    var animalEntered = document.querySelector("#animal-input").value.trim();

    // A variable to house the API URL with the ability to insert whatever was 
    // typed into the input field into the URL to get differet results.
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${animalEntered}&api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf&limit=10&rating=pg`;

    // API request using the above variable.
    fetch(queryURL, {
        method: "GET"
    })
        // After data comes back from the request.
        .then(function (response) { return response.json() })
        .then(function (response) {

            // Testing to see if the response comes back.
            //console.log(response);

            //Stores the data in a results variable.
            var results = response.data;

            // Loops through the results with a for loop.
            for (let item of results) {

                // Creates a div element and stores it in a variable.
                var animalDiv = document.createElement("div");

                // Creates a paragraph tag.
                var p = document.createElement("p");

                // The paragraph tag will display the rating on the page.
                p.innerText = `Rating: ${item.rating}`;

                // Creates an img element and stores it in a variable.
                var animalImage = document.createElement("img");

                // Sets the src attribute of the image to a property from the result item.
                animalImage.setAttribute("src", item.images.fixed_height.url);

                // Appends the p and img tags to the animalDiv tag.
                animalDiv.appendChild(p);
                animalDiv.appendChild(animalImage);

                // Prepends the animalDiv to the HTML page in the "#images" div
                let gifContainer = document.querySelector("#images");
                gifContainer.prepend(animalDiv);
            }



});



        })};
