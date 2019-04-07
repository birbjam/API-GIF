//Form where you can add an animal.
//When you add an animal, creates a button.
//Button is linked to the api which then retrieves the animal that was clicked.
//Displays 10 GIFs
//GIFs load as still images
//Clicking on images makes the GIFs move.


var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf";

fetch(queryURL)
    .then((response) => response.json()) // then do something with the response (Promise)
    .then((myJson) => console.log(JSON.stringify(myJson)));