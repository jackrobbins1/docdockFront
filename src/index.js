// state storing variables
let currentUser = -1
let currentFolder = -1
let currentDoc = -1
// end state storing variables

const loginBtn = document.getElementById("loginButton")
const nameInput = document.getElementById("name-input")
const emailInput = document.getElementById("email-input")
// containers for different views
const loginContain = document.getElementById(("login-container"))
const homeContain = document.getElementById(("home-container"))
const folderContain = document.getElementById(("folder-container"))
const docContain = document.getElementById(("doc-container"))
// end containers for different views

// Elements in homepage
const homeHeader = document.getElementById("home-header")
const myFolders = document.getElementById("user-folders")
// end Elements in homepage

// Elements in folder page
const folderHeader = document.getElementById("folder-header")
const folderDocs = document.getElementById("folder-docs")
// end Elements in folder page

// Elements in doc page
const docHeader = document.getElementById("doc-header")
const docNotes = document.getElementById("doc-notes")
const codeSamples = document.getElementById("doc-gists")
const siteButton = document.getElementById("button-to-site")
// end Elements in doc page


// Add event listener on submit button

loginBtn.addEventListener('click', event => {
  event.preventDefault()
  console.log("login button is clicked")
  fetchLoginUser()
})

// Create fetch method that gets all user IDs and
// finds one that matches user input on name and email

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
      let loggedUser = findMyId(data, userName, userEmail)
      console.log(loggedUser)
      if (loggedUser) {
        console.log("successfully logged in")
        showOneContainer(homeContain)
        nameInput.value = ""
        emailInput.value = ""
        currentUser = loggedUser.id
        fetchSingleUser(loggedUser.id)
      }
    })
    .catch(error => console.log(error.message))
}

// Create fetch method that gets data for 1 user
let fetchSingleUser = userID => {
  let id = userID
  fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      renderHomePage(data)
    })
}

//
//// Render methods start
let renderHomePage = userData => {
  homeHeader.innerText = userData.name
  myFolders.innerHTML = renderFolderHTML(userData)
}
//// Render methods end
//

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

let showOneContainer = activeNode => {
  const nodeList = [
    loginContain,
    homeContain,
    folderContain,
    docContain
  ]

  nodeList.forEach(node => {
    if (node === activeNode) {
      node.classList.remove("hideDiv")
      node.classList.add("showDiv")
    } else {
      node.classList.remove("showDiv")
      node.classList.add("hideDiv")
    }
  })
}

let renderFolderHTML = data => {
  htmlString = ""
  let userFolders = data.folders
  for (let folder of userFolders) {
    htmlString += `
    <div class="folder card shadow" data-folderID="${folder.id}" style="width: 18rem;">
      <div class="image-container">
        <img src="assets/pictures/file-folder-icon-png.png" class="card-img-top folder-image" alt="...">
      </div>
      <div class="card-body">
        <h5 class="card-title">${folder.name}</h5>
        <p class="card-text">${folder.description}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    `
  }
  return htmlString
}


// test
