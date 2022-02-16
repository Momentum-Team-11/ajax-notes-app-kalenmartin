/* Must have -- MVP (minimum viable product) */
// need to show a list of existing notes
const url = 'http://localhost:3000/notes'
const noteList = document.getElementById('note-list')
const form = document.getElementById('note-form')

console.log('hello')

// listen for form submit
form.addEventListener('submit', function (event) {
    event.preventDefault()
  // grab the value from the input
const noteText = document.querySelector('#note-text').value
  // send it to the server to create a new note
    createNote(noteText)
})

function listNote() {
  fetch(url)
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
        // take all the notes
        // loop through and create a new note item on the page for each one
      for (let noteObj of data) {
          renderNoteItem(noteObj)
      }
      })
  }


// Listen for different actions on list items
// This is an example of event delegation
noteList.addEventListener('click', function (event) {
  // check to see if what was clicked is the "x" icon
if (event.target.classList.contains('delete')) {
    // the user intends to delete this note, so call the function to make that DELETE request
    deleteNote(event.target)
}
if (event.target.classList.contains('edit')) {
    editNote(event.target)
}
if (event.target.classList.contains('update-note')) {
    updateNote(event.target)
}
if (event.target.classList.contains('cancel')) {
    hideEditControls(event.target.parentElement)
}
})

/***** CRUD Functions *****/

// GET all the notes
// function listNote() {
// fetch(url)
//     .then(response => response.json())
//     .then((data) => {
//     console.log(data)
//       // take all the notes
//       // loop through and create a new note item on the page for each one
//     for (let noteObj of data) {
//         renderNoteItem(noteObj)
//     }
//     })
// }

//DELETE
function deleteNote(element) {
  // I need to know WHICH note to delete, so I need the id (matching in db.json)
const noteId = element.parentElement.id
fetch(`http://localhost:3000/notes/${noteId}`, {
    method: 'DELETE',
}).then(function () {
    // this might not be the same DOM structure for you
    element.parentElement.remove()
})
}

function updateNote(element) {
const noteId = element.parentElement.id
const noteText = document.querySelector('edit-text')
fetch(`http://localhost:3000/notes/${noteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    item: noteText,
    updated_at: moment().format(),
    })
})
    .then(function (res) {
    return res.json()
    })
    .then(function (data) {
    console.log(data)
      // update the item in the DOM
    renderNoteText(element.parentElement, data)
    })
}

// POST a new note
function createNote(noteText) {
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // I don't have to include "id" here because json server will add this for me
    item: noteText,
    created_at: moment().format(),
    }),
})
    .then((res) => res.json())
    .then((data) => {
      // what I get back from the server IS the newly created note object that looks like this:
    /*
    {
        "item": "Another thing!",
        "id": 5
    }
    */
      // So I can take that data and create a new note item in the DOM
    renderNoteItem(data)
    })
clearInputs()
}

/***** DOM changing functions *****/

// Add one note item to the list on the page
function renderNoteItem(noteObj) {
const itemEl = document.createElement('li')
  // I will need to have the id of the note in order to edit or delete it later, so make sure it's in the DOM
itemEl.id = noteObj.id
  // These classes are from the css library I'm using -- you can use your own or leave this out
itemEl.classList.add(
    'lh-copy',
    'pv3',
    'ba',
    'bl-0',
    'bt-0',
    'br-0',
    'b--dotted',
    'b--black-3'
)
renderNoteText(itemEl, noteObj)
noteList.prepend(itemEl)
}

function renderNoteText(noteListItem, noteObj) {
noteListItem.innerHTML = `<span class="dib w-60">${noteObj.item}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}

function editNote(element) {
showEditInput(element.parentElement)
}

function showEditInput(noteItem) {
noteItem.innerHTML = `
    <input class="edit-text input-reset ba b--black-20 pa2 mb2 w-60" type="text" value="${noteItem.textContent}" autofocus>
    <button class='update-note bn f6 link br1 ph2 pv1 ml1 dib white bg-green' data-note=${noteItem.id}>save</button>
    <button class='cancel bn f6 link br1 ph2 pv1 ml2 dib black bg-light-gray'>cancel</button>
`
noteItem.querySelector('input').select()
}

function hideEditControls(noteItem) {
fetch(`http://localhost:3000/notes/${noteItem.id}`)
    .then((res) => res.json())
    .then((data) => {
    console.log(data)
    renderNoteText(noteItem, data)
    })
}

function clearInputs() {
form.reset()
}

/**** Function that runs as soon as the script file loads *****/
// call this when the script first runs (on page load)
// This runs only on the first load!
listNote()

/* Nice to haves */
// delete a note item from the list
// edit an existing note

// add new notes to the top of the list of existing notes (sort by newest to oldest)
// a way to mark as completed
// indicate whether note has been completed or not
// filter completed/not completed