/* Must have -- MVP (minimum viable product) */

const url = 'http://localhost:3000/notes'
const noteList = document.getElementById('note-list')
const noteForm = document.getElementById('note-form')

console.log('hello')

// // event listener
// form.addEventListener('submit', function (event) {
//     event.preventDefault()

// const noteText = document.querySelector('#text').value
//     createNote(noteText)
// })


// Different listener events on list items //
// -- EVENT DELEGATION -- //
noteList.addEventListener('click', function (event) {
if (event.target.classList.contains('delete')) {
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

// GET //
function dezNotes() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
        console.log(data)
    for(let noteObj of data) {
        renderNoteItem(noteObj)
    }
    })
}



//CRUD //


//DELETE
function deleteNote(element) {

const noteId = element.parentElement.id
fetch(`http://localhost:3000/notes/${noteId}`, {
    method: 'DELETE',
}).then(function () {
    element.parentElement.remove()
})
}

function updateNote(element) {
const noteId = element.parentElement.id
const noteBody = document.querySelector('note-body')
fetch(`http://localhost:3000/notes/${noteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    item: noteBody.value,
    updated_at: moment().format(),
    }),
})
    .then(function (res) {
    return res.json()
    })
    .then(function (data) {
    console.log(noteBody)
    renderNoteText(element.parentElement, data)
    })
}

// event listener //
//the submit event listener to the POST//
// Post //

noteForm.addEventListener('submit', function (event) {
    event.preventDefault()
function createNote(myNotes) {
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body:JSON.stringify({
    item: myNotes
    // created_at: moment().format(),
    }),
})
.then((res) => res.json())
.then((data) => {
    renderNoteItem(data)
    noteForm.reset();
    });
}});

/***** DOM changing functions *****/

function renderNoteItem(noteObj) {
const itemEl = document.createElement('li')
itemEl.id = noteObj.id
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
    <input class="edit-text" type="text" value="${noteItem.textContent}"focus>
    <textarea class="update-note" data-note=${noteBody.textarea.id}>save</button>
    <button class="submit">submit</button>
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
dezNotes()



/* Nice to haves */
// delete a note item from the list
// edit an existing note

// add new notes to the top of the list of existing notes (sort by newest to oldest)
// a way to mark as completed
// indicate whether note has been completed or not
// filter completed/not completed