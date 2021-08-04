/* Controls for displaying apps */

class ControlArea {
    constructor(ele) {
        this.controlWrap = ele;
        this.controlWrap.className = 'controlWrap';
    }

    init() {
        // Add div with button to toggle control box open/closed 
        const showControlBoxBtnWrap = document.createElement('div');
        showControlBoxBtnWrap.className = 'controlBtnWrap';
        this.controlWrap.appendChild(showControlBoxBtnWrap);
        const showControlBoxBtn = document.createElement('button');
        showControlBoxBtn.id = 'showControlBoxBtn';
        showControlBoxBtn.innerText = 'Show Controls';
        showControlBoxBtn.addEventListener('click',
            this.toggleShowControlBox);
        showControlBoxBtnWrap.appendChild(showControlBoxBtn);
        // Add control box where controls will live
        const controlBox = document.createElement('div');
        controlBox.id = 'controlBox';
        controlBox.className = 'controlBox';
        this.controlWrap.appendChild(controlBox);
        // Add title bar to top of control box
        const controlTitleBar = document.createElement('div');
        controlTitleBar.className = 'controlBar';
        controlTitleBar.innerText = 'Control the View';
        controlBox.appendChild(controlTitleBar);
        // Controls Themselves (buttons contained in a "tray")
        const controlTray = document.createElement('div');
        controlTray.className = 'controlTray';
        controlBox.appendChild(controlTray);
        // Add button to toggle showing/hiding all the notes
        const showAllNotesBtn = document.createElement('button');
        showAllNotesBtn.id = 'showAllNotesBtn';
        showAllNotesBtn.className = 'controlBtn';
        showAllNotesBtn.innerText = 'Show All Notes';
        showAllNotesBtn.addEventListener(
            'click', this.toggleShowAllNotes);
        controlTray.appendChild(showAllNotesBtn);
        // If user is authenticated, add button to show edit buttons
        if (maniBox.authStatus.editOK) {
            const showEditBtnsBtn = document.createElement('button');
            showEditBtnsBtn.id = 'showEditBtnsBtn';
            showEditBtnsBtn.className = 'controlBtn';
            showEditBtnsBtn.style.backgroundColor = 'lightskyblue';
            showEditBtnsBtn.innerText = 'Hide Edit Buttons';
            showEditBtnsBtn.addEventListener('click', 
                this.toggleShowEditBtns);
            controlTray.appendChild(showEditBtnsBtn);
        }
        // Hide control box by default
        controlBox.style.display = 'none';
    }

    toggleShowControlBox() {
        const showControlBoxBtn = document.
            getElementById('showControlBoxBtn');
        const controlArea = document.getElementById('controlBox');
        let displayProp = controlArea.style.display;
        if (displayProp === 'none') {
            controlArea.style.display = 'block';
            showControlBoxBtn.innerText = 'Hide Controls'
        } else {
            controlArea.style.display = 'none';
            showControlBoxBtn.innerText = 'Show Controls'
        }
    }

    toggleShowAllNotes() {
        const showAllNotesBtn = document.
            getElementById('showAllNotesBtn');
        let notesAreHidden = true;
        if (showAllNotesBtn.innerText === 'Show All Notes') {
            showAllNotesBtn.innerText = 'Hide All Notes';
        } else {
            notesAreHidden = false;
            showAllNotesBtn.innerText = 'Show All Notes';
        }
        const notes = document.querySelectorAll('.notesBox');
        // let isHidden = notes[0].getAttribute('hidden');
        for (let n of notes) {
            let showHideBtn = n.previousElementSibling.children[0];
            if (notesAreHidden) {
                showHideBtn.innerText = 'Hide Notes';
                n.removeAttribute('hidden');
            } else {
                showHideBtn.innerText = 'Show Notes';
                n.setAttribute('hidden', true);
            }
        }
    }

    toggleShowEditBtns() {
        const showEditBtnsBtn = document.
            getElementById('showEditBtnsBtn');
        if (showEditBtnsBtn.innerText === 'Show Edit Buttons') {
            showEditBtnsBtn.innerText = 'Hide Edit Buttons';
        } else {
            showEditBtnsBtn.innerText = 'Show Edit Buttons';
        }
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

}

export { ControlArea }