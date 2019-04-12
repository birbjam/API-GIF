//Button is linked to the api which then retrieves the animal that was clicked.

//Clicking on images makes the GIFs move.

window.onload = function () {

    // Setting a variable to house the initial animal array from which the initial buttons will be generated.
    var animalsArray = ["cat", "dog", "goat", "cow", "elephant", "bird", "otter", "sloth"];

    /*
    This animal variable was initially undefined so it could be worked with in the functions.

    After many attempts to try to give it the value of the dataset of whatever animal generated from 
    creating the buttons dynamically in every which way, I settled on setting it as a global variable where it is defined as
    whatever the user input is in the form.

    I realize that this is one of the reasons why the application runs the way it does:
    with GIFs being generated ONLY from the user input buttons and not the buttons of the array.
    But this is the only way I could make at least some of the functionality work.

    */
    var animal = document.querySelector("#animal-input").value.trim();


    // Setting up function for adding the buttons.
    function addButtons() {

        document.querySelector("#animal-buttons").innerHTML = "";

        //Looping through the array of animals.
        for (let animal of animalsArray) {

            // Creates a button for each animal in the array.
            var b = document.createElement("button");
            
            /* Here I tried multiple times in many different ways to make the initial buttons 
            display gifs by clicking them by writing additional functions. None of this worked. */
            //b.onclick = addAnimalGIF;

            // Adds a class of animal to the button.
            b.classList.add("animal");

            /* The attribute is supposed to give the dataset the name of whatever animal is on the button
            which could be used to fetch those particular gifs from the API but it just comes out as "undefined"
            and I realize it probably has something to do with my global animal variable but I have been unable to fix it. */

            // Sets the data attribute of the button.
            b.setAttribute("data-name", animal);

            /*Interestingly enough, this actually does set the inside text of the button correctly so I don't understand why
            it won't do the same for the attribute above. */

            // Sets the text inside the button.
            b.innerText = animal;

            //Adds the button to the div with the id "animal-buttons", next to the previously created button.
            document.querySelector("#animal-buttons").appendChild(b);
        }
    };


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


    //document.querySelector("#animal-buttons").addEventListener("click", addAnimalGIF);

    // Calling the addButtons function so all the initial buttons will be displayed in the DOM.
    addButtons();



    // Event listener that waits for the animal buttons to be clicked.
    document.querySelector("#animal-buttons").addEventListener("click", function (event) {

        /* This only works with animal as the global variable, I have tried a lot of different ways to fix this but 
            have not been able to figure it out. Sometimes what the variable is replaced with is "undefined" and other times
            it is replaced with nothing, just an empty query.
         */

        // A variable to house the API URL with the ability to insert whatever was 
        // typed into the input field into the URL to get differet results.
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf&limit=10&rating=pg";

        // For testing.
        //console.log(queryURL);

        if (event.target.tagName == "BUTTON") {

            /* This is where it is supposed to store the dataset of the animal and store it into a variable with 
            which I should be able to make a query, but for some reason it is not grabbing the dataset of the 
            initial generated buttons, regardless of whether or not the global animal variable is declared. */
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
                            
                            /* You can click only the first gif and make it move but clicking on any other gifs only
                            makes the first gif restart. Clicking on the first gif again makes it restart and does not 
                            pause it as it is supposed to. */
                            // When the image is clicked, it starts moving.
                            animalImage.setAttribute("src", item.images.fixed_height.url);
                        });
                    };
                }

                )
        }
    });


};