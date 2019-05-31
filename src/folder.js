// Event listener for clicking on folder

myFolders.addEventListener('click', folderClick)
folderDocs.addEventListener('click', docClick)

function folderFetch (id) {
  fetch(`http://localhost:3000/api/v1/folders/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      showOneContainer(folderContain)
      currentFolder = data.folder.id
      renderFolderPage(data)
    })
    .catch(error => console.log(error.message))
}

function folderClick (event) {
  console.log(event.target)
  if (event.target.classList.value === "btn btn-primary") {
    let folderID = event.target.parentNode.parentNode.dataset.folderid
    folderFetch(folderID)
  }
}

function renderFolderPage (data) {
  folderHeader.innerText = data.folder.name
  folderDocs.innerHTML = renderFolderDocs(data)
}

function renderFolderDocs (fData) {
  htmlString = ""
  let folderDocs = fData.docs
  for (let doc of folderDocs) {
    htmlString += `
    <div class="folder card shadow" data-docid="${doc.id}" style="width: 18rem;">
      <div class="image-container">
        <img src="assets/pictures/Filetype-Docs-icon.png" class="card-img-top folder-image" alt="...">
      </div>
      <div class="card-body">
        <h5 class="card-title">${doc.name}</h5>
        <p class="card-text">${doc.notes}</p>
        <a class="btn btn-primary">Notes</a>
        <a href="${doc.site_url}" class="btn btn-secondary">Go to site</a>
        <button type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
    `
  }
  return htmlString
}

// clicking on notes of a doc will send to
// docs page

function docClick (event) {
  console.log(event.target)
  if (event.target.classList.value === "btn btn-primary") {
    let docID = event.target.parentNode.parentNode.dataset.docid
    docFetch(docID)
  }
}

function docFetch (id) {
  fetch(`http://localhost:3000/api/v1/docs/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      showOneContainer(docContain)
      currentDoc = data.id
      renderDocPage(data)
    })
    .catch(error => console.log(error.message))
}

// render docs page
  function renderDocPage (docData) {
    docHeader.innerText = docData.name
    docNotes.innerText = docData.notes

    // Edit form fill inputs with values to edit

     editNameDoc.value = docData.name
     editPicDoc.value = docData.picture_url
     editGistsDoc.value = docData.gists
     editUrlDoc.value = docData.site_url
     editNoteDoc.value = docData.notes

  }
