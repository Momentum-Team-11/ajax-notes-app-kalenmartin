/* Must have -- MVP (minimum viable product) */

// const url = 'http://localhost:3000/notes'
// const noteList = document.getElementById('note-list')
// const noteForm = document.getElementById('note-form')

// console.log('hello')

// // // event listener
// // form.addEventListener('submit', function (event) {
// //     event.preventDefault()

// // const noteText = document.querySelector('#text').value
// //     createNote(noteText)
// // })


// // Different listener events on list items //
// // -- EVENT DELEGATION -- //
// noteList.addEventListener('click', function (event) {
// if (event.target.classList.contains('delete')) {
//     deleteNote(event.target)
// }
// if (event.target.classList.contains('edit')) {
//     editNote(event.target)
// }
// if (event.target.classList.contains('update-note')) {
//     updateNote(event.target)
// }
// if (event.target.classList.contains('cancel')) {
//     hideEditControls(event.target.parentElement)
// }
// })

// // GET //
// function dezNotes() {
//     fetch(url)
//         .then((res) => res.json())
//         .then((data) => {
//         console.log(data)
//     for(let noteObj of data) {
//         renderNoteItem(noteObj)
//     }
//     })
// }



// //CRUD //


// //DELETE
// function deleteNote(element) {

// const noteId = element.parentElement.id
// fetch(`http://localhost:3000/notes/${noteId}`, {
//     method: 'DELETE',
// }).then(function () {
//     element.parentElement.remove()
// })
// }

// function updateNote(element) {
// const noteId = element.parentElement.id
// const noteBody = document.querySelector('note-body')
// fetch(`http://localhost:3000/notes/${noteId}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//     item: noteBody.value,
//     updated_at: moment().format(),
//     }),
// })
//     .then(function (res) {
//     return res.json()
//     })
//     .then(function (data) {
//     console.log(noteBody)
//     renderNoteText(element.parentElement, data)
//     })
// }

// // event listener //
// //the submit event listener to the POST//
// // Post //

// noteForm.addEventListener('submit', function (event) {
//     event.preventDefault()
// function createNote(myNotes) {
// fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json'},
//     body:JSON.stringify({
//     item: myNotes
//     // created_at: moment().format(),
//     }),
// })
// .then((res) => res.json())
// .then((data) => {
//     renderNoteItem(data)
//     noteForm.reset();
//     });
// }});

// /***** DOM changing functions *****/

// function renderNoteItem(noteObj) {
// const itemEl = document.createElement('li')
// itemEl.id = noteObj.id
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
// renderNoteText(itemEl, noteObj)
// noteList.prepend(itemEl)
// }

// function renderNoteText(noteListItem, noteObj) {
// noteListItem.innerHTML = `<span class="dib w-60">${noteObj.item}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
// }

// function editNote(element) {
// showEditInput(element.parentElement)
// }

// function showEditInput(noteItem) {
// noteItem.innerHTML = `
//     <input class="edit-text" type="text" value="${noteItem.textContent}"focus>
//     <textarea class="update-note" data-note=${noteBody.textarea.id}>save</button>
//     <button class="submit">submit</button>
// `
// noteItem.querySelector('input').select()
// }

// function hideEditControls(noteItem) {
// fetch(`http://localhost:3000/notes/${noteItem.id}`)
//     .then((res) => res.json())
//     .then((data) => {
//     console.log(data)
//     renderNoteText(noteItem, data)
//     })
// }

// function clearInputs() {
// form.reset()
// }

/**** Function that runs as soon as the script file loads *****/
// call this when the script first runs (on page load)
// This runs only on the first load!
// dezNotes()



/* Nice to haves */
// delete a note item from the list
// edit an existing note

// add new notes to the top of the list of existing notes (sort by newest to oldest)
// a way to mark as completed
// indicate whether note has been completed or not
// filter completed/not completed







const url = 'http://localhost:3000/notes'
const noteList = document.getElementById('note-list')
const noteForm = document.getElementById('note-form')
const subButton = document.getElementById('submit-button')
const saveButton = document.getElementById('save-button')
const cancelButton = document.getElementById('cancel-button')
let noteId

function deezNotes() {
    document.getElementById("note-list").innerHTML = ''
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
        // take all the notes
        // loop through and create a new note item on the page for each one
            for (let noteObj of data) {
                renderNote(noteObj)
            }
    })
}

function renderNote(noteObj) {
    const itemEl = document.createElement('li')
    itemEl.id = noteObj.id
    itemEl.classList.add('lh-copy','pv3','ba','bl-0','bt-0','br-0','b--solid','b--black-3')
    itemEl.innerHTML = `<span>${noteObj.title}</span><i alt="delete note" class="ml2 dark-red fas fa-times delete"></i><i alt="edit note" class="ml3 fas fa-edit edit"></i><br><p>${noteObj.date}</p>`
    noteList.prepend(itemEl)
}


//List notes at top of page
deezNotes()

//delete and edit
noteList.addEventListener('click', function (event) {
    event.preventDefault()
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
    if (event.target.classList.contains('edit'))
        editMode(event.target)
})


//submit button
subButton.addEventListener('click', function (event) {
    event.preventDefault()
    console.log("submit")
    
    if (document.getElementById("newNote").value === '' || document.getElementById("currentBody").value === '') {
        return
    } else {
    createNote(event)
    }
})

//edit button
saveButton.addEventListener('click', function (event) {
    event.preventDefault()
    editNote(event)
})

//cancel button
cancelButton.addEventListener('click', function (event) {
    event.preventDefault()
    console.log("cancel")
    document.getElementById("note-edit").innerText = "New Note"
    const newNote = document.querySelector('#newNote')
    const noteText = document.querySelector('#currentBody')
    newNote.value = ''
    noteText.value = ''
    subButton.style = "display: block;"
    saveButton.style = "display: none;"
    cancelButton.style = "display: none;"
})



function createNote() {
    const newNote = document.querySelector('#newNote')
    const noteText = document.querySelector('#currentBody')
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: newNote.value,
            body: noteText.value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
    renderNote(data)
    })
    newNote.value = ''
    noteText.value = ''
}



function deleteNote(element) {
    const noteId = element.parentElement.id
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE',
    }).then(function() {
        element.parentElement.remove()
    })
}



function editMode(element) {
    noteId = element.parentElement.id
    subButton.style = "display: none;"
    saveButton.style = "display: row;"
    cancelButton.style = "display: row;"
    //replace current form with edit form
    document.getElementById("note-edit").innerText = "Edit Note"

    fetch(`http://localhost:3000/notes/${noteId}`)
    .then((res) => res.json())
    .then((data) => {
        const newNote = document.getElementById("newNote")
        const currentBody = document.getElementById("currentBody")
        newNote.value = data.title
        currentBody.value = data.body
        })
}


function editNote() {
    const newNote = document.querySelector('#newNote')
    const noteText = document.querySelector('#currentBody')
    document.getElementById(`${noteId}`).innerHTML = `<span class="dib w-60">${newNote.value}</span><i alt="delete note" class="ml2 dark- fas fa-times delete"></i><i alt="edit note" class="ml3 fas fa-edit edit"></i><br></p>`
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: newNote.value,
            body: noteText.value,
        })
    })
    document.getElementById("note-edit").innerText = "Plzdontforgetthis"
    newNote.value = ''
    noteText.value = ''
    subButton.style = "display: block;"
    saveButton.style = "display: none;"
    cancelButton.style = "display: none;"
}