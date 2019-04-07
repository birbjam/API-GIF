
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf";

fetch(queryURL)
    .then((response) => response.json()) // then do something with the response (Promise)
    .then((myJson) => console.log(JSON.stringify(myJson)));