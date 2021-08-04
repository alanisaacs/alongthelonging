/* Controls for displaying apps */

class ControlArea {
    constructor(ele) {
        this.controlWrap = ele;
        this.controlWrap.className = 'controlWrap';
    }

    init() {
        // Add div with button to toggle control box open/closed 
        const toggleShowCtrlBoxBtnWrap = document.createElement('div');
        toggleShowCtrlBoxBtnWrap.className = 'controlBtnWrap';
        this.controlWrap.appendChild(toggleShowCtrlBoxBtnWrap);
        const toggleShowCtrlBoxBtn = document.createElement('button');
        toggleShowCtrlBoxBtn.id = 'toggleShowCtrlBoxBtn';
        toggleShowCtrlBoxBtn.className = 'controlBtn';
        toggleShowCtrlBoxBtn.innerText = 'Show Controls';
        toggleShowCtrlBoxBtn.addEventListener('click',
            this.toggleShowControlBox);
        toggleShowCtrlBoxBtnWrap.appendChild(toggleShowCtrlBoxBtn);
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
        const toggleShowAllNotesBtn = document.createElement('button');
        toggleShowAllNotesBtn.id = 'toggleShowAllNotesBtn';
        toggleShowAllNotesBtn.className = 'controlBtn';
        toggleShowAllNotesBtn.innerText = 'Show All Notes';
        toggleShowAllNotesBtn.addEventListener(
            'click', this.toggleShowAllNotes);
        controlTray.appendChild(toggleShowAllNotesBtn);
        // If user is authenticated, add button to show edit buttons
        if (maniBox.authStatus.editOK) {
            const toggleShowEditBtn = document.createElement('button');
            toggleShowEditBtn.id = 'toggleShowEditBtn';
            toggleShowEditBtn.className = 'controlBtn';
            toggleShowEditBtn.style.backgroundColor = 'lightskyblue';
            toggleShowEditBtn.innerText = 'Hide Edit Buttons';
            toggleShowEditBtn.addEventListener('click', 
                this.toggleShowEditBtns);
            controlTray.appendChild(toggleShowEditBtn);
        }
        // Hide control box by default
        controlBox.style.display = 'none';
    }

    toggleShowControlBox() {
        const toggleShowAllNotesBtn = document.
            getElementById('toggleShowAllNotesBtn');
        const controlArea = document.getElementById('controlBox');
        let displayProp = controlArea.style.display;
        if (displayProp === 'none') {
            controlArea.style.display = 'block';
            toggleShowAllNotesBtn.innerText = 'Hide Controls'
        } else {
            controlArea.style.display = 'none';
            toggleShowAllNotesBtn.innerText = 'Show Controls'
        }
    }

    toggleShowAllNotes() {
        const toggleShowAllNotesBtn = document.
            getElementById('toggleShowAllNotesBtn');
        let notesAreHidden = true;
        if (toggleShowAllNotesBtn.innerText === 'Show All Notes') {
            toggleShowAllNotesBtn.innerText = 'Hide All Notes';
        } else {
            notesAreHidden = false;
            toggleShowAllNotesBtn.innerText = 'Show All Notes';
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
        const toggleShowEditBtn = document.
            getElementById('toggleShowEditBtn');
        if (toggleShowEditBtn.innerText === 'Show Edit Buttons') {
            toggleShowEditBtn.innerText = 'Hide Edit Buttons';
        } else {
            toggleShowEditBtn.innerText = 'Show Edit Buttons';
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