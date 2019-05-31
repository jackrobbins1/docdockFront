const createBtn = document.getElementById("new-folder-btn")
const newNameInput = document.getElementById("new-folder-name")
const newPicInput = document.getElementById("new-folder-pic")
const newFolderDesc  = document.getElementById("new-folder-desc")
const newFolderContainer = document.getElementById("folder-container")
const folderList = document.getElementById("folder-list")
let createFolderForm = document.getElementById("new-folder-form")

let allFolders = []

// Add event listener on create button


//////////create event listener on the folder container in order to get to edit butoon of each elemet////

newFolderContainer.addEventListener("click", e => {
  if (e.target.className === "edit") {
    // debugger
    const clickedFolderId = e.target.dataset.id
    console.log(clickedFolderId)
/////////populating the form with the clicked folder info///////
    fetch(`http://localhost:3000/api/v1/folders/${clickedFolderId}`)
    .then(resp => resp.json())
    .then(clickedData => {
      createFolderForm.querySelector("#new-folder-name").value = clickedData.name
      createFolderForm.querySelector("#new-folder-pic").value = clickedData.picture
      createFolderForm.querySelector("#new-folder-desc").value = clickedData.description
      createFolderForm.querySelector("#new-folder-btn").innerHTML = "Edit"
      createFolderForm.dataset.action = "edit"

    })
  }
})


/////////////add event listener on the form, switching between create and edit/////////

createFolderForm.addEventListener('submit', e => {
  event.preventDefault();
  console.log(e)
  ////////////// if data-action === ""create => then method "post"///////////
    if (e.target.dataset.action === "create")
      postFolder()


    else if (e.target.dataset.action === "edit") {
console.log(e)
        let folderName = newNameInput.value
        let folderPic = newPicInput.value
        let folderDesc = newFolderDesc.value

       fetch(`http://localhost:3000/api/v1/folders/`, {
         method: "PATCH",
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
         body: JSON.stringify({
           name: folderName.value,
           picture: folderPic.value,
           description: folderDesc.value
         })
       })
       .then(resp => resp.json())
       .then(folderData => {
         allFolders.push(folderData)
         folderList.innerHTML = ""
         addDivToDom(allFolders)
         ///////reset the form back to "post" mode///////
         e.target.dataset.action = "create"

         createFolderForm.querySelector("#new-folder-btn").innerHTML = "Create Folder"
       })
  }
})


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
      title.className = "post-header"
  let star = document.createElement("span")
  let image = document.createElement("img")
      image.className = "post-img"
  let description = document.createElement("p")
      description.className = "post-desc"

  let editBtn = document.createElement("button")
      editBtn.className = "edit"
      editBtn.setAttribute("data-id", `${folder.id}`)
      editBtn.addEventListener("click", event => console.log(event))

  let deleteBtn = document.createElement("button")
      deleteBtn.setAttribute("id", "delete-btn")

      //////////add event listener to delete btn//////
      deleteBtn.addEventListener("click", event => deleteFolder(folder, event))

  title.innerHTML = folder.name
  if (folder.star === "true") {
    star.innerHTML = folder.star
  }
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


///////// create new folder/////////
function postFolder(folder) {
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

/////////////    update/edit folder       ////////////

function editFolder(folder, event) {

}


  loadFolders();
