
window.onload = function () {
  // Setting a variable to house the initial animal array from which the initial buttons will be generated.
  var animalsArray = ['cat', 'dog', 'goat', 'cow', 'elephant', 'crow', 'otter', 'sloth']

  // Calling the addButtons function so all the initial buttons will be displayed on the page.
  addButtons()

  // Event Listener for the "create" button.
  document.querySelector('#gifbutton').addEventListener('click', (event) => addAnimal(event))

  // An event function stored in a variable.
  var addAnimal = (event) => {
    // Since we are not submitting the form anywhere, this will prevent the form of acting like we are.
    event.preventDefault()

    // Trims any spaces from what is typed into the form and stores the value into a variable.
    let animal = document.querySelector('#animal-input').value.trim()

    // An if statement in case the user does not enter anything into the field, in which case no button
    // will be added to the buttons.
    if (animal === '') {
      return false
      // An if statement that alerts the user when the button already exists to avoid duplicates.
    } else if (animalsArray.includes(animal)) {
      clearForm()
      return alert('This button already exists!')
    } else {
      // Adds the animal from the form to the animals array.
      animalsArray.push(animal)

      // Function that clears the form
      clearForm()

      // Calling the addButtons function to generate a new button based on the input.
      addButtons()
    }
  }

  // Event listener that waits for the animal buttons to be clicked.
  document.querySelector('#animal-buttons').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
      // Set the animal variable from the data-name attribute on each animal button.
      let animal = event.target.dataset.name

      // Testing the animal variable.
      // console.log("CONSOLE LOG ANIMAL: " + animal);

      // A variable to house the API URL with the ability to insert whatever was
      // typed into the input field into the URL to get differet results.
      var queryURL = `http://api.giphy.com/v1/gifs/search?q=${animal}&api_key=hvJfg6OTKsJp7gfJ3BHvuSNBGjqF4sgf&limit=10&rating=pg`

      // For testing.
      // console.log(queryURL);

      // API request using the query URL.
      fetch(queryURL, {
        method: 'GET'
      })
      // After data comes back from the request.
        .then(function (response) { return response.json() })
        .then(function (response) {
          // Testing to see if the response comes back.
          console.log(response)

          // Stores the data in a results variable.
          var results = response.data

          // Loops through the results with a for loop.
          for (let item of results) {
            // Creates a div element and stores it in a variable.
            var animalDiv = document.createElement('div')
            // Adding a class attribute for styling purposes
            animalDiv.setAttribute('class', 'img-container')

            // // Creates a paragraph tag.
            // var p = document.createElement('p')
            // // The paragraph tag will display the rating on the page.
            // p.innerText = `Rating: ${item.rating}`

            // Creates an img element and stores it in a variable.
            var animalImage = document.createElement('img')

            // Sets the src attribute of the image to a property from the result item.
            // (This is where we could start it as a still image.)
            animalImage.setAttribute('src', item.images.fixed_height.url)
            animalImage.setAttribute('data-animal', animal)
            animalImage.setAttribute('class', 'img')

            // Appends the p and img tags to the animalDiv tag.
            // animalDiv.appendChild(p)
            animalDiv.appendChild(animalImage)

            // Prepends the animalDiv to the HTML page in the "#images" div
            let gifContainer = document.querySelector('#images')
            gifContainer.prepend(animalDiv)

            // Selects all the img elements and adds an event listener.
            document.querySelector('#images').addEventListener('click', function () {
              // Clicking on the image will restart the GIF.
              animalImage.setAttribute('src', item.images.fixed_height.url)
            })
          };
        }

        )
    }
  })

  // Function definition for clearing the form field
  function clearForm () {
    document.getElementById('animal-form').reset()
  }

  // Setting up function for adding the buttons.
  function addButtons () {
    document.querySelector('#animal-buttons').innerHTML = ''

    // Looping through the array of animals from the global variable.
    for (let animal of animalsArray) {
      // Creates a button for each animal in the array.
      var btn = document.createElement('button')

      // Adds a class of animal to the button.
      btn.classList.add('animal')

      // Sets the data attribute of the button.
      btn.setAttribute('data-name', animal)
      // console.log('Add animal buttons to test if the animal displays: ' + animal)

      // Sets the text inside the button.
      btn.innerText = animal

      // Adds the button to the div with the id "animal-buttons", next to the previously created button.
      document.querySelector('#animal-buttons').appendChild(btn)
    }
  };
}
