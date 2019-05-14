//Button is linked to the api which then retrieves the animal that was clicked.

//Clicking on images makes the GIFs move.

window.onload = function () {

    // Setting a variable to house the initial animal array from which the initial buttons will be generated.
    var animalsArray = ["cat", "dog", "goat", "cow", "elephant", "bird", "otter", "sloth"];



    // Event Listener for the "click for animal magic" button.
    document.querySelector("#gifbutton").addEventListener("click", (event) => addAnimal(event));
    
    // An event function stored in a variable.
    var addAnimal = (event) => {
        
        //Since we are not submitting the form anywhere, this will prevent the form of acting like we are.
        event.preventDefault();

        /* Trims any spaces from what is typed into the form and stores it into a variable. 
        This is what I had set up originally instead of the global variable and it was not working at all. */
        animal = document.querySelector("#animal-input").value.trim();

        // Adds the animal from the from to the animals array.
        animalsArray.push(animal);

        //Generates a button for the animal inputted by calling the addButtons function declared above.
        addButtons();
    };


    // Calling the addButtons function so all the initial buttons will be displayed on the page.
    addButtons();



    // Event listener that waits for the animal buttons to be clicked.
    document.querySelector("#animal-buttons").addEventListener("click", function (event) {
        

        if (event.target.tagName === "BUTTON") {

        //Set the animal variable from the data-name attribute on each animal button.
        let animal = event.target.dataset.name;
        
        console.log("CONSOLE LOG ANIMAL: " + animal);

                // A variable to house the API URL with the ability to insert whatever was 
        // typed into the input field into the URL to get differet results.
        var queryURL = `http://api.giphy.com/v1/gifs/search?q=${animal}&api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf&limit=10&rating=pg`;
        
        // For testing.
        console.log(queryURL);

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
                        // This is where we could start it as a still image.
                        animalImage.setAttribute("src", item.images.fixed_height.url);
                        animalImage.setAttribute("data-animal", animal);

                        // Appends the p and img tags to the animalDiv tag.
                        animalDiv.appendChild(p);
                        animalDiv.appendChild(animalImage);

                        // Prepends the animalDiv to the HTML page in the "#images" div
                        let gifContainer = document.querySelector("#images");
                        gifContainer.prepend(animalDiv);

                        // Selects all the img elements and adds an event listener.
                        document.querySelector("#images").addEventListener("click", function () {
                        
                            // Clicking on the image will restart the GIF.
                            animalImage.setAttribute("src", item.images.fixed_height.url);
                        });
                    };
                }

                )
        }
    });

    
    // Setting up function for adding the buttons.
    function addButtons() {

        document.querySelector("#animal-buttons").innerHTML = "";

        //Looping through the array of animals from the global variable.
        for (let animal of animalsArray) {

            // Creates a button for each animal in the array.
            var b = document.createElement("button");

            // Adds a class of animal to the button.
            b.classList.add("animal");

            /* The attribute is supposed to give the dataset the name of whatever animal is on the button
            which could be used to fetch those particular gifs from the API but it just comes out as "undefined"*/

            // Sets the data attribute of the button.
            b.setAttribute("data-name", animal);
            console.log("Add animal buttons to test if the animal displays: " + animal);

            // Sets the text inside the button.
            b.innerText = animal;

            //Adds the button to the div with the id "animal-buttons", next to the previously created button.
            document.querySelector("#animal-buttons").appendChild(b);
        }
    };



};