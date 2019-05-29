const createBtn = document.getElementById("new-folder-btn")
const newNameInput = document.getElementById("new-folder-name")
const newPicInput = document.getElementById("new-folder-pic")
const newFolderDesc  = document.getElementById("new-folder-desc")
const newFolderContainer = document.getElementById("folder-container")
const folderList = document.getElementById("folder-list")
const createFolderForm = document.getElementById("new-folder-form")

let allFolders = []

// Add event listener on create button

createFolderForm.addEventListener('submit', postFolder)


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

      //////////add event listener to delete btn//////
      deleteBtn.addEventListener("click", event => deleteFolder(folder, event))

  title.innerHTML = folder.name
  star.innerHTML = folder.star
  image.src = folder.picture
  description.innerHTML = folder.description
  editBtn.innerHTML = "Edit Folder"
  deleteBtn.innerHTML = "Delete Folder"

  // title.appendChild(star)
  li.append(title, image, description, editBtn, deleteBtn, star)
  folderList.appendChild(li)
  return folderList
}


/////////////// delete folder//////////////


function deleteFolder(folder, event) {
  event.preventDefault();
  // console.log(event)
  fetch('http://localhost:3000/api/v1/folders/' + folder.id, {
    method: "DELETE"
  })
  event.target.parentElement.remove()
}


//
function postFolder() {
  event.preventDefault();
  console.log(event)

  let folderName = newNameInput.value
  let folderPic = newPicInput.value
  let folderDesc = newFolderDesc.value
  fetch('http://localhost:3000/api/v1/folders', {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
     "Accept": "application/json"
   },
   body: JSON.stringify ({
     name: folderName,
     picture: folderPic,
     description: folderDesc,
     star: false
   })
  })
  .then(resp => resp.json())
  .then(folderData => {
    allFolders.push(folderData)
    folderList.innerHTML = ""
    addDivToDom(allFolders)
  })
  event.target.reset()
}

  loadFolders();
  
