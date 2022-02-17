const url = 'http://localhost:3000/notes'
const noteList = document.getElementById('note-list')
const noteForm = document.getElementById('note-form')
const myNotes = document.getElementById('notes')

console.log('hello')


// Different listener events on list items //
// -- EVENT DELEGATION -- //

myNotes.addEventListener('click', function(event) {

    if(event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
    if(event.target.classList.contains('edit')) {
        editNote(event.target)
    }
    if(event.target.classList.contains('update-note')) {
        updateNote(event.target)
    }
    if(event.target.classList.contains('cancel')) {
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


// Delete //
function deleteNote(element) {
    const noteId = element.parentElement.id
fetch(`http://localhost:3000/notes/${noteId}`, {
    method: 'DELETE',
}).then(function () {
    element.parentElement.remove()
})
}


// Patch //
function updateNote(element) {
    const noteId = element.parentElement.id
    const noteText = document.querySelector('.edit-text')
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
        item: noteText.value,
        updated_at: moment().format(),
        }),
    })
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log(noteText)
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


// DOM FUNCTIONS //

// function renderNoteItem(noteObj) {
// const noteCard = document.createElement('span')
// noteCard.id = noteObj.id
// noteCard.innerHTML = `
// <h2>${noteObj.title}</h2><p>${noteObj.body}</p>
// <span class="delete>Delete</span><span class='edit'>Edit Text</span>
// `
// noteList.appendChild(noteCard)
// }

function renderNoteItem(noteObj) {
    const itemEl = document.createElement('ul')
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

function renderNoteText(noteListItem, noteObj) {
noteListItem.innerHTML = `class=${noteObj.item} class='delete' class='edit`
}

function editNote(element) {
showEditInput(element.parentElement)
}

function showEditInput(noteItem) {
renderNoteItem.innerHTML = `
    <input class="edit-text input-reset ba b--black-20 type="text" value="${noteItem.textContent}"autofocus>
    <button class='update-note bn f6 link' value=${noteItem.id}>Save</button>
    <button class='cancel bn f6 link black'>cancel</button>`

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

function clearInputs(){
    noteForm.reset()
}