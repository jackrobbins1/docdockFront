const logoutBtn = document.getElementById("logoutBtn")
const backHomeBtn = document.getElementById("backHomeBtn")
const backFolderBtn = document.getElementById("backFolderBtn")

// logoutBtn methods
function logoutUser () {
  currentUser = -1
  currentFolder = -1
  currentDoc = -1

  showOneContainer(loginContain)
}

logoutBtn.addEventListener('click', logoutUser)
// end logoutBtn methods

// backHomeBtn methods
  function backToHomeView () {
    currentFolder = -1
    showOneContainer(homeContain)
    fetchSingleUser(currentUser)
  }

  backHomeBtn.addEventListener('click', backToHomeView)
// end backHomeBtn methods

// backFolderByn methods
  function backToFolderView () {
    currentDoc = -1
    folderFetch(currentFolder)
  }
  backFolderBtn.addEventListener('click', backToFolderView)
// backFolderByn methods




// spacer
