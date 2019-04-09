//Form where you can add an animal.
//When you add an animal, creates a button.
//Button is linked to the api which then retrieves the animal that was clicked.
//Displays 10 GIFs
//GIFs load as still images
//Clicking on images makes the GIFs move.

window.onload = function () {

//var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf&limit=5&rating=g";

var topics = ["cat", "dog", "birb", "sloth", "rhino", "elephant", "goat", "cow", "tiger"];


document.querySelector("#gifbutton").addEventListener("click", function (event) {
    event.preventDefault();

    var animalEntered = document.querySelector("#animal-input").value.trim();

    function generateButtons() {

        for (var i = 0; i < topics.length; i++) {
            var animalButton = document.createElement("button");
            animalButton.getElementById("animal-buttons").innerText = (topics[i]);
            animalButton.setAttribute("data-name", topics[i]);
            animalButton.getElementById("animal-buttons").className = "appendbtn";
            document.getElementById("animal-buttons").innerText(animalButton);
        }
    };

});


}