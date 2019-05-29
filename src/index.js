const loginBtn = document.getElementById("loginButton")
const nameInput = document.getElementById("name-input")
const emailInput = document.getElementById("email-input")

// Add event listener on submit button

loginBtn.addEventListener('click', event => {
  event.preventDefault()
  console.log("login button is clicked")
  fetchLoginUser()
})

// Create fetch method that posts user input
// to create new user.

let fetchLoginUser = () => {
  let userName = nameInput.value
  let userEmail = emailInput.value
  //
  // let createUserData = {
  //   name: userName,
  //   email: userEmail,
  //   avatar: null
  // }

  // let configObj = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(createUserData)
  //   }


  // fetch("http://localhost3000/api/v1/users", configObj())
  fetch('http://localhost:3000/api/v1/users')
    .then(response => response.json())
    .then(data => {
      console.log("searching for user ID")
      console.log(data)
      // resetInputs()
      // redirectToLogin()
      findMyId(data, userName, userEmail)
    })
    .catch(error => console.log(error.message))
}

// Helper methods

let findMyId = (userArray, name, email) => {
  let matchedUser
  matchedUser = userArray.find(user => {
    return user.name === name && user.email === email
  })
  console.log(userArray.find(user => {
    return user.name === name && user.email === email
  }))
  return matchedUser
}
