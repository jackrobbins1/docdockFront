// Create doc elements
const newNameDoc = document.getElementById("new-doc-name")
const newPicDoc = document.getElementById("new-doc-pic")
const newGistsDoc = document.getElementById("new-doc-gists")
const newUrlDoc = document.getElementById("new-doc-url")
const newNoteDoc  = document.getElementById("new-doc-note")
const createDocForm = document.getElementById("new-doc-form")
// end Create doc elements

// Edit doc elements
const editNameDoc = document.getElementById("edit-doc-name")
const editPicDoc = document.getElementById("edit-doc-pic")
const editGistsDoc = document.getElementById("edit-doc-gists")
const editUrlDoc = document.getElementById("edit-doc-url")
const editNoteDoc  = document.getElementById("edit-doc-note")
const editDocForm = document.getElementById("edit-doc-form")
// Edit doc elements

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

// Edit doc function
  editDocForm.addEventListener('submit', () => {
    event.preventDefault()
    let docName = editNameDoc.value
    let docPic =editPicDoc.value
    let docGists = editGistsDoc.value
    let docUrl = editUrlDoc.value
    let docNote = editNoteDoc.value

    let documentID = currentDoc

    fetch('http://localhost:3000/api/v1/docs/' + documentID, {
      method: "PATCH",
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
     })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // docFetch(currentDoc)
      renderDocPage(data)
    })
  })

  // function fetchEditDocument (documentID) {
  //   fetch('http://localhost:3000/api/v1/docs/' + documentID, {
  //     method: "PATCH",
  //     headers: {
  //      "Content-Type": "application/json",
  //      "Accept": "application/json"
  //    },
  //    body: JSON.stringify ({
  //      name: docName,
  //      site_url: docUrl,
  //      picture_url: docPic,
  //      notes: docNote,
  //      gists: docGists,
  //    })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //     // docFetch(currentDoc)
  //     renderDocPage(data)
  //   })
  //
  //
  //
  // }
// end Edit doc function

// stuff
