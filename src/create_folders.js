const createBtn = document.getElementById("new-folder-btn")
const newNameInput = document.getElementById("new-folder-name")
const newPicInput = document.getElementById("new-folder-pic")
const newfolderDesc  = document.getElementById("new-folder-desc")
const newFolderContainer = document.getElementById("folder-container")
const folderList = document.getElementById("folder-list")

let allFolders = []

// Add event listener on create button

// createBtn.addEventListener('submit', postFolder)


//////////add folders to dom///////////
function loadFolders() {
  fetch('http://localhost:3000/api/v1/folders')
  .then(resp => resp.json())
  .then(folderData => {
    allFolders = folderData
    addDivToDom(allFolders)
  })
}

function addDivToDom(array) {
  array.forEach(folder => {
    newFolderList = addFoldersDataToDiv(folder)
    newFolderContainer.appendChild(newFolderList)
  })
}

function addFoldersDataToDiv(folder) {
  let li = document.createElement("li");
      li.className = "folder-card"

  let title = document.createElement("h3")
  let star = document.createElement("span")
  let image = document.createElement("img")
  let description = document.createElement("p")

  let editBtn = document.createElement("button")
      editBtn.setAttribute("id", "edit-btn")

  let deleteBtn = document.createElement("button")
      deleteBtn.setAttribute("id", "delete-btn")


  title.innerHTML = folder.name
  star.innerHTML = folder.star
  image.src = folder.picture
  description.innerHTML = folder.description
  editBtn.innerHTML = "Edit Folder"
  deleteBtn.innerHTML = "Delete Folder"

  // title.appendChild(star)
  li.append(title, star, image, description, editBtn, deleteBtn)

  return li
}



//
// function postFolder() {
//   event.preventDefault();
//   console.log(event)
// }
//
// let fetchCreateFolder = () => {
//   let folderName = newNameInput.value
//   let folderPic = newPicInput.value
//   let folderDesc = newfolderDesc.value
//
//   let createFolderData = {
//     name: folderName,
//     picture: folderPic,
//     description: folderDesc
//   }
//
//   let configObj = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(createFolderData)
//     }
//
//
//   // fetch("http://localhost3000/api/v1/folders", configObj())
//   fetch('http://localhost:3000/api/v1/folders', configObj)
//     .then(response => response.json())
//     .then(data => {
//       console.log("successfully created folder", data)
//     })
//     .catch(error => console.log(error.message))
// }
  loadFolders();
