const newNameDoc = document.getElementById("new-doc-name")
const newPicDoc = document.getElementById("new-doc-pic")
const newGistsDoc = document.getElementById("new-doc-gists")
const newUrlDoc = document.getElementById("new-doc-url")
const newNoteDoc  = document.getElementById("new-doc-note")
const createDocForm = document.getElementById("new-doc-form")

const deleteDocBtn = document.getElementById("deleteDocBtn")

// Add event listener on create doc form
createDocForm.addEventListener('submit', postDoc)
// end Add event listener on create doc form

// Post new doc function
function postDoc() {
  event.preventDefault();
  console.log("creating new doc", event)

  let docName = newNameDoc.value
  let docUrl = newUrlDoc.value
  let docPic = newPicDoc.value
  let docNote = newNoteDoc.value
  let docGists = newGistsDoc.value
  let parentFolderId = currentFolder

  fetch('http://localhost:3000/api/v1/docs', {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
     "Accept": "application/json"
   },
   body: JSON.stringify ({
     name: docName,
     site_url: docUrl,
     picture_url: docPic,
     notes: docNote,
     gists: docGists,
     star: false,
     folder_id: parentFolderId
   })
  })
  .then(resp => resp.json())
  .then(docData => {
    console.log(docData)
    // allDocs.push(docData)
    // docList.innerHTML = ""
    // addDocDivToDom(allDocs)
    folderFetch(currentFolder)
  })
  event.target.reset()
}
// end Post new doc function

// Delete Doc function
  deleteDocBtn.addEventListener('click', () => deleteDocument(currentDoc))

  function deleteDocument (documentID) {
    fetch('http://localhost:3000/api/v1/docs/' + documentID, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      backToFolderView()
    })
  }
// end Delete Doc Function


// stuff
