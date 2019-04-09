//Form where you can add an animal.
//When you add an animal, creates a button.
//Button is linked to the api which then retrieves the animal that was clicked.
//Displays 10 GIFs
//GIFs load as still images
//Clicking on images makes the GIFs move.


//var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf&limit=5&rating=g";

var topics = ["python", "javascript", "css", "html", "bootstrap", "java", "c++"];

var codingMemesButton;


function generateButtons() {
    document.getElementById("memebtn").innerHTML = null;

    for (var i=0; i < topics.length; i++) {
        codingMemesButton = document.createElement("button");
        document.getElementById("button").innerText(topics[i]);
}
}