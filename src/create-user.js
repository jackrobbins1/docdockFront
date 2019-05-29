const submitBtn = document.getElementById("submit-btn")
const nameInput = document.getElementById("name-input")
const emailInput = document.getElementById("email-input")

// Add event listener on submit button

submitBtn.addEventListener('click', event => {
  event.preventDefault()
  console.log("sub button is clicked")
  fetchCreateUser()
})

// Create fetch method that posts user input
// to create new user.

let fetchCreateUser = () => {
  let userName = nameInput.value
  let userEmail = emailInput.value

  let createUserData = {
    name: userName,
    email: userEmail,
    avatar: null
  }

  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(createUserData)
    }


  // fetch("http://localhost3000/api/v1/users", configObj())
  fetch('http://localhost:3000/api/v1/users', configObj)
    .then(response => response.json())
    .then(data => {
      console.log("successfully created user", data)
      resetInputs()
      redirectToLogin()
    })
    .catch(error => console.log(error.message))
}

// Helper methods

let resetInputs = () => {
  nameInput.value = ""
  emailInput.value = ""
}

let redirectToLogin = () => {
  window.location.replace("http://localhost:4000/index.html");
}
