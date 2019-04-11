
//Button is linked to the api which then retrieves the animal that was clicked.

//Clicking on images makes the GIFs move.

window.onload = function () {

// Setting a variable to house the initial animal array.
var animalsArray = ["cat", "dog", "goat", "cow", "elephant", "bird", "otter", "sloth"];

var animal = document.querySelector("#animal-input").value.trim();

// Setting up function for adding the buttons.
function addButtons() {
    document.querySelector("#animal-buttons").innerHTML = "";

    //Looping through the array of animals.
    for (let animal of animalsArray) {

        // Creates a button for each animal in the array.
        var b = document.createElement("button");
        //b.onclick = addAnimalGIF;
        // Adds a class of animal to the button.
        b.classList.add("animal");
        // Sets the data attribute of the button.
        b.setAttribute("data-name", animal);
        // Sets the text inside the button.
        b.innerText = animal;
        //Adds the button to the DOM.
        document.querySelector("#animal-buttons").appendChild(b);
    }
};

// Event Listener for the gif button to be pressed.
document.querySelector("#gifbutton").addEventListener("click", (event) => addAnimal(event));
var addAnimal = (event) => {
    event.preventDefault();

    // Trims any spaces from what is typed into the form and stores it into
    // a variable.
    animal = document.querySelector("#animal-input").value.trim();
    // Adds the animal from the textbox to the animals array
    animalsArray.push(animal);

    addButtons();
};


    //document.querySelector("#animal-buttons").addEventListener("click", addAnimalGIF);

    addButtons();
    

    
    // Event listener that waits for the animal buttons to be clicked.
    document.querySelector("#animal-buttons").addEventListener("click", function(event) {

    // A variable to house the API URL with the ability to insert whatever was 
    // typed into the input field into the URL to get differet results.
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf&limit=10&rating=pg";
        
    console.log(queryURL);

    if (event.target.tagName == "BUTTON") {
        
        animal = event.target.dataset.animal;

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
                // In this case it will put the GIF as a still image.
                animalImage.setAttribute("src", item.images.fixed_height_still.url);
                animalImage.setAttribute("data-animal", animal);

        

                // Appends the p and img tags to the animalDiv tag.
                animalDiv.appendChild(p);
                animalDiv.appendChild(animalImage);

                // Prepends the animalDiv to the HTML page in the "#images" div
                let gifContainer = document.querySelector("#images");
                gifContainer.prepend(animalDiv);
                
                // Selects all the img elements and adds an event listener.
                document.querySelector("#images").addEventListener("click", function () {
                    // When the image is clicked, it starts moving.
                    animalImage.setAttribute("src", item.images.fixed_height.url);
                });
            };
            }
            
            )}
        });
    

};
