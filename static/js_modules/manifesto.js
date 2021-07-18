/* JavaScript for Manifesto */

import { EditElement } from "./editElement.js";
import { markupForDisplay } from "./markups.js";
import { ControlBox } from "./controls.js";

function initManifesto() {
    // Code required to load page, called from main.js
    const maniBox = document.getElementById('maniBox');
    displayDefault(maniBox.manis);
    // Add listeners to buttons on the page
    document.getElementById('toggleShowAllNotes').addEventListener(
        'click', toggleShowAllNotes);
    // If user is authenticated, show button to show/hide edit buttons
    if (maniBox.authStatus.editOK) {
        const btn = document.createElement('button');
        btn.className = 'articleBtn';
        btn.style.backgroundColor = 'lightskyblue';
        btn.innerText = 'Edit Buttons';
        btn.addEventListener('click', toggleShowEditBtns);
        document.getElementById('articleNav').appendChild(btn);
    }
    // Add button to open controls area
    // TODO: RE-ENABLE
    // const toggleShowControlAreaBtn = document.createElement('button');
    // toggleShowControlAreaBtn.innerText = 'Show/Hide Filters';
    // toggleShowControlAreaBtn.className = 'articleBtn';
    // toggleShowControlAreaBtn.addEventListener('click', 
    //     toggleShowControlArea);
    // document.getElementById('articleNav').
    //     appendChild(toggleShowControlAreaBtn);
    // Update controls area itself (container DIV defined in HTML)
    const controlsArea = document.getElementById('controlsBox');
    controlsArea.className = 'controlsBox';
    controlsArea.style.display = 'none'; //DEV MODE: USE BLOCK
    const ManifestoControls = new ControlBox(controlsArea);
    ManifestoControls.init();
}

// Default Display
function displayDefault(manisAll) {
    // Input: Array of objects; each object is a row in the db
    // The whole container is defined in the html
    const maniBox = document.getElementById('maniBox');
    maniBox.className = 'collectionBox';
    for (let mani of manisAll) {
        // DIV for mani with id & soundbite at top
        const mBox = document.createElement('div');
        mBox.className = 'itemBox';
        mBox.innerHTML = `#${mani.id}: `;
        // Store ID as attribute for easy retrieval while saving edits
        mBox.setAttribute('maniID', `${mani.id}`);
        // DIV for soundbite so it can be edited
        const soundbiteBox = document.createElement('div');
        soundbiteBox.className = 'soundbiteBox';
        soundbiteBox.innerHTML = markupForDisplay(mani.soundbite);
        mBox.appendChild(soundbiteBox);
        createEditBarAfter(soundbiteBox);
        maniBox.appendChild(mBox);
        // DIV for description appended to mani
        const mDesc = document.createElement('div');
        mDesc.className = 'itemDesc';
        mDesc.innerHTML = markupForDisplay(mani.description);
        mBox.appendChild(mDesc);
        // Add a control bar with buttons if user is authenticated
        createEditBarAfter(mDesc);
        // DIV for notes appended to mani
        // Construct notesBox by sending text to be inside
        let noteText = markupForDisplay(mani.notes);
        const notesBox = createNotesBox(noteText);
        notesBox.setAttribute('hidden', true);
        // DIV with button for toggling visibility of notes
        const btnBar = createShowHideBtnBar(notesBox)
        mBox.appendChild(btnBar)
        mBox.appendChild(notesBox);
    }
}

function createNotesBox(txt) {
    // Input: text to be displayed
    // Output: DIV with two children, title bar and note text
    let nb = document.createElement('div');
    nb.className = 'notesBox';
    // DIV for title bar at top of notes
    let notesBar = document.createElement('div');
    notesBar.className = 'notesBar';
    notesBar.innerHTML = 'Notes'
    nb.appendChild(notesBar);
    // DIV for text of notes
    let noteTextBox = document.createElement('div');
    noteTextBox.className = 'itemNotes';
    // Format the notes // TODO: REMOVED FOR NOW
    //let noteText = convertUserMarkup(txt);
    //noteText = markup_multiline_notes(noteText);
    //noteTextBox.innerHTML = `<ul>${noteText}</ul>`;
	noteTextBox.innerHTML = txt;
    nb.appendChild(noteTextBox);
    createEditBarAfter(noteTextBox);
    return nb;
}

function createShowHideBtnBar(ele) {
    // Input: element whose visibility is to be toggled on/off
    // Output: DIV wrapping toggle button on its right
    const btnBar = document.createElement('div');
    btnBar.className = 'showHideBtnBar';
    const showHideBtn = document.createElement('button');
    showHideBtn.className = 'showHideButton';
    // Event for handling clicks on the visibility toggle
    showHideBtn.addEventListener('click', 
    ev => {
        toggleVisibility(ele);
        if (showHideBtn.innerText == 'Show Notes') {
            showHideBtn.innerText = 'Hide';
        } else {
            showHideBtn.innerText = 'Show Notes';
        }
    })
    showHideBtn.innerText = 'Show Notes';
    btnBar.appendChild(showHideBtn);
    return btnBar;
}

function toggleVisibility(ele) {
    if (ele.getAttribute('hidden')) {
        ele.removeAttribute('hidden');
    } else {
        ele.setAttribute('hidden', true);
    }
}

function toggleShowAllNotes() {
    const notes = document.querySelectorAll('.notesBox');
    let isHidden = notes[0].getAttribute('hidden');
    for (let n of notes) {
        let showHideBtn = n.previousElementSibling.children[0];
        if (isHidden) {
            showHideBtn.innerText = 'Hide';
            n.removeAttribute('hidden');
        } else {
            showHideBtn.innerText = 'Show Notes';
            n.setAttribute('hidden', true);
        }
    }
}

function toggleShowEditBtns() {
    const editBars = document.querySelectorAll('.editBar');
    let displayProp = editBars[0].style.display;
    for (let b of editBars) {
        if (displayProp === 'none' ) {
            b.style.display = 'inline-block';
        } else {
            b.style.display = 'none';
        }
    }
}

function toggleShowControlArea() {
    const controlsArea = document.getElementById('controlsBox');
    let displayProp = controlsArea.style.display;
    if (displayProp === 'none') {
        controlsArea.style.display = 'block';
    } else {
        controlsArea.style.display = 'none';
    }
}

// Generic Table Functions

function set_table(table, data, ...cols) {
    // Generate a table element
	// Parameters: table reference, array_of_objects, column names
	// Create header row with column names inside
	let thead = table.createTHead();
	let row = thead.insertRow(-1);
	for (let col of cols) {
		let th = document.createElement('th');
		let text = document.createTextNode(col.toUpperCase());
		th.appendChild(text);
		row.appendChild(th);
	}
	// Write each row of data into the table body
	let tbody = table.createTBody();
	for (let d of data) {
		row = tbody.insertRow(-1);
		for (col of cols) {
			row.insertCell(-1).innerHTML = d[col];
		}
	}
}

// Editing triggers

function createEditBarAfter(ele) {
    const maniBox = document.getElementById('maniBox');
    if (maniBox.authStatus.editOK) {
        const editBar = document.createElement('div');
        editBar.className = 'editBar';
        const editBtn = document.createElement('button');
        editBtn.className = 'editBtn';
        editBtn.innerText = 'Edit';
        editBtn.style.display = 'inline';
        editBtn.addEventListener('click', (ev) => makeEditable(ev));
        editBar.appendChild(editBtn);
        // Append after ele in ele's parent's child list
        // so ele be edited without including the editing controls
        // Note if nextSibling is null then new node is appended to end
        ele.parentNode.insertBefore(editBar, ele.nextSibling);
    }
}

function makeEditable(ev) {
    // Initialize class instance to handle editing of text element
    // Note the event target is the button clicked
    // so the element to edit is the previous sibling (content div)
    // above the parent (editBar)
    const editingElement = new EditElement(
        ev.target.parentElement.previousSibling);
    editingElement.init();
}

export { initManifesto };