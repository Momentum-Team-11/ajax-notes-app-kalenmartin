const url = 'http://localhost:3000/notes'
const noteList = document.getElementById('note-list')
const form = document.getElementById('note-form')

console.log('hello')

// GET //

function listNote() {
fetch(url)
    .then((res) => res.json())
    .then((data) => {
    console.log(data)
for(let noteObj of data) {
    renderNoteItem(noteObj)
    }
    })
}




// Different listener events on list items //
// -- EVENT DELEGATION -- //

noteList.addEventListener('click', function(event) {

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


// Delete //

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
const editText = document.querySelector('.edit-text')
fetch(`http://localhost:3000/notes/${noteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
    item: editText.value,
    updated_at: moment().format(),
    }),
})
.then(function (res) {
    return res.json()
})
.then(function (data) {
    console.log(editText)
    renderEditText(element.parentElement, data)
})
}

// event listener //

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const noteText = document.querySelector('#note-text').value
    createNote(noteText)
})
//the submit event listener to the POST//

// POST //
form.addEventListener('submit', function (event) {
    event.preventDefault()
const noteText = document.querySelector('#noteText').value 
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body:JSON.stringify({
        title :noteText,
    // created_at: moment().format(),
    }),
})
.then((res) => res.json())
.then((data) => {

    renderNoteItem(data)
})
clearInputs()
})


// DOM FUNCTIONS //

function renderNoteItem(noteObj) {
const noteCard = document.createElement('span')
noteCard.id = noteObj.id
noteCard.innerHTML = `
<h2>${noteObj.title}</h2><p>${noteObj.body}</p>
<span class="delete>Delete</span><span class='edit'>Edit Text</span>
`
noteList.append(noteCard)
}

// itemEl.classList.add(
//     'lh-copy',
//     'pv3',
//     'ba',
//     'bl-0',
//     'bt-0',
//     'br-0',
//     'b--dotted',
//     'b--black-3'
// )
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
    renderEditText(noteItem, data)
    })
}

function clearInputs(){
    form.reset()
}

listNote()