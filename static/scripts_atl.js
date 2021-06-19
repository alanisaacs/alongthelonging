// JavaScript for Along the Longing

// ======= Manifesto =======

// Default Display
// Cribbed from tools in tfb
function displayDefault(manisAll) {
    // Input: Array of objects; each object is a row in the db
    // The whole container is defined in the html
    const maniBox = document.getElementById('maniBox');
    maniBox.className = 'collectionBox';
    for (mani of manisAll) {
        // DIV for mani with id & soundbite at top
        const mBox = document.createElement('div');
        mBox.className = 'itemBox';
        mBox.innerHTML = `#${mani.id}: ${mani.soundbite}`;
        maniBox.appendChild(mBox);
        // DIV for description appended to mani
        const mDesc = document.createElement('div');
        mDesc.className = 'itemDesc';
        mDesc.innerHTML = mani.description;
        mBox.appendChild(mDesc);
        // DIV for notes appended to mani
        // Construct notesBox by sending text to be inside
        let noteText = mani.notes;
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
    // Format the notes // REMOVED FOR NOW
    //let noteText = convertUserMarkup(txt);
    //noteText = markup_multiline_notes(noteText);
    //noteTextBox.innerHTML = `<ul>${noteText}</ul>`;
	noteTextBox.innerHTML = txt;
    nb.appendChild(noteTextBox);
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

// Generic Table Functions

function set_table(table, data, ...cols) {
    // Generate a table element
	// Parameters: table reference, array_of_objects, column names
	// Create header row with column names inside
	let thead = table.createTHead();
	let row = thead.insertRow(-1);
	for (col of cols) {
		let th = document.createElement('th');
		let text = document.createTextNode(col.toUpperCase());
		th.appendChild(text);
		row.appendChild(th);
	}
	// Write each row of data into the table body
	let tbody = table.createTBody();
	for (d of data) {
		row = tbody.insertRow(-1);
		for (col of cols) {
			row.insertCell(-1).innerHTML = d[col];
		}
	}
}