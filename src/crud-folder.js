const newNameInput = document.getElementById("new-folder-name")
const newPicInput = document.getElementById("new-folder-pic")
const newFolderDesc  = document.getElementById("new-folder-desc")
const createFolderForm = document.getElementById("new-folder-form")


createFolderForm.addEventListener('submit', postFolder)
// Post new folder method
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
     star: false,
     user_id: currentUser
   })
  })
  .then(resp => resp.json())
  .then(folderData => {
    console.log("new folder created", folderData)
    fetchSingleUser(currentUser)
  })
  event.target.reset()
}

// End Post new folder method

// Event Listener for folder edit and destroy
  myFolders.addEventListener('click', () =>{
    console.log(event)
    if (event.target.innerText === "Edit") {
      console.log("clicked edit button")
    } else if (event.target.innerText === "Delete") {
      console.log("delete button clicked")
      let folderID = event.target.parentNode.parentNode.dataset.folderid
      clickFolderDelete(folderID)
      event.target.parentNode.parentNode.remove()
    }
  })

// End Event Listener for folder edit and destroy

// Function for deleting folder
  function clickFolderDelete (folderID) {
    let fID = folderID
    fetch('http://localhost:3000/api/v1/folders/' + fID, {
      method: "DELETE"
    })
  }
// end Function for deleting folder
