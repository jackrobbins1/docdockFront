const createDocBtn = document.getElementById("new-doc-btn")
const newNameDoc = document.getElementById("new-doc-name")
const newPicDoc = document.getElementById("new-doc-pic")
const newGistsDoc = document.getElementById("new-doc-gists")
const newUrlDoc = document.getElementById("new-doc-url")
const newNoteDoc  = document.getElementById("new-doc-note")
const newDocContainer = document.getElementById("doc-container")
const docList = document.getElementById("doc-list")
const createDocForm = document.getElementById("new-doc-form")

let allDocs = []

// Add event listener on create button

createDocForm.addEventListener('submit', postDoc)

// newDocContainer.addEventListener("click", e => {
//   console.log(e)
//   if (e.target.className === "edit") {
//     // debugger
//     const clickedDocId = e.target.dataset.id
//     console.log(clickedDocId)
// /////////populating the form with the clicked doc info///////
//     fetch(`http://localhost:3000/api/v1/docs/${clickedDocId}`)
//     .then(resp => resp.json())
//     .then(clickedData => {
//       createDocForm.querySelector("#new-doc-name").value = clickedData.name
//       createDocForm.querySelector("#new-doc-pic").value = clickedData.picture
//       createDocForm.querySelector("#new-doc-gists").value = clickedData.description
//       createDocForm.querySelector("#new-doc-btn").innerHTML = "Edit"
//       createDocForm.dataset.action = "edit"
//
// //////////// adding event listener on the form////////////
//       createDocForm.addEventListener('submit', e => {
//         event.preventDefault();
//         console.log(e)
//         ////////////// if data-action === ""create => then method "post"///////////
//           if (e.target.dataset.action === "create")
//             postDoc()
//
// ///////////// edit doc///////////////
//           else if (e.target.dataset.action === "edit") {
//             console.log(e)
//             editDoc(clickedDocId)
//
//           }
//         })
//
//     })
//   }
// })




//////////add docs to dom///////////
function loadDocs() {
  fetch('http://localhost:3000/api/v1/docs')
  .then(resp => resp.json())
  .then(docData => {
    allDocs = docData
    addDocDivToDom(allDocs)
  })
}

function addDocDivToDom(array) {
  if (docList.childElementCount) {
    docList.innerHTML = ""
  }
  array.forEach(doc => {
    newDocList = addDocsDataToDiv(doc)
    newDocContainer.appendChild(newDocList)
  })
}

function addDocsDataToDiv(doc) {
  let docLi = document.createElement("li");
      docLi.className = "doc-card"

  let docTitle = document.createElement("h3")
  let docStar = document.createElement("span")
  let docImage = document.createElement("img")
  let docNotes = document.createElement("p")
  let gists = document.createElement("p")

  let docEditBtn = document.createElement("button")
      docEditBtn.setAttribute("id", "edit-btn")
      docEditBtn.setAttribute("data-id", `${doc.id}`)
      // docEditBtn.addEventListener("click", event => console.log(event))

  let docDeleteBtn = document.createElement("button")
      docDeleteBtn.setAttribute("id", "delete-btn")

      //////////add event listener to delete btn//////
      docDeleteBtn.addEventListener("click", event => deleteDoc(doc, event))

  docTitle.innerHTML = doc.name
  if (doc.star === true) {
    docStar.innerHTML = doc.star
  }
  docImage.src = doc.picture_url
  docNotes.innerHTML = doc.notes
  gists.innerHTML = doc.gists
// debugger;
  docEditBtn.innerHTML = "Edit Doc"
  docDeleteBtn.innerHTML = "Delete Doc"

  // docTitle.appendChild(star)
  docLi.append(docTitle, docStar, docImage, docNotes, gists, docEditBtn, docDeleteBtn)
  docList.appendChild(docLi)
  return docList
}


///////////// delete doc//////////////


function deleteDoc(doc, event) {
  event.preventDefault();
  // console.log(event)
  fetch('http://localhost:3000/api/v1/docs/' + doc.id, {
    method: "DELETE"
  })
  event.target.parentElement.remove()
}


////////////// create new doc /////////////
function postDoc() {
  event.preventDefault();
  console.log(event)

  let docName = newNameDoc.value
  let docUrl = newUrlDoc.value
  let docPic = newPicDoc.value
  let docNote = newNoteDoc.value
  let docGists = newGistsDoc.value
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
     note: docNote,
     gists: docGists,
     star: false
   })
  })
  .then(resp => resp.json())
  .then(docData => {
    allDocs.push(docData)
    docList.innerHTML = ""
    addDocDivToDom(allDocs)
  })
  event.target.reset()
}

/////////////update doc////////////


function editDoc(id) {
  console.log(event)
  // let id = event.target
  console.log(id)
  let docName = newNameDoc.value
  let docUrl = newUrlDoc.value
  let docPic = newPicDoc.value
  let docNote = newNoteDoc.value
  let docGists = newGistsDoc.value

   fetch(`http://localhost:3000/api/v1/docs/${id}`, {
     method:"PATCH",
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({
       name: docName,
       site_url: docUrl,
       picture_url: docPic,
       note: docNote,
       gists: docGists,
     })
   })
   .then( res => res.json())
   .then(res => loadDocs())
}




  loadDocs();
