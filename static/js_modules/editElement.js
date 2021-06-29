/* Enable elements to be edited */

import { convertUserMarkup, markupForDisplay, markupForEditing, 
    markupMultilineNotes } from "./markups.js";

class EditElement {
    constructor(ele) {
        this.editBox = ele;
    }
    
    init() {
        // Initialize instance; make element editable
        this.editBox.setAttribute('contentEditable', true);
        this.originalContent = this.editBox.innerHTML;
        this.originalClass = this.editBox.className;
        this.editBox.className = 'editMode';
        this.editBox.innerHTML = markupForEditing(this.originalContent);
        this.editBar = this.editBox.nextElementSibling;
        this.editBtn = this.editBar.querySelector('.editBtn');
        this.addSaveCancelBtns();
    }

    addSaveCancelBtns() {
        // Hide the edit button
        this.editBtn.style.display = 'none';
        // Create Save and Cancel buttons
        const saveBtn = document.createElement('button');
        saveBtn.className = 'saveBtn';
        saveBtn.innerText = 'Save';
        saveBtn.addEventListener('click', (ev) => {
            this.saveEdits();
        });
        this.editBar.appendChild(saveBtn);
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancelBtn';
        cancelBtn.innerText = 'Cancel';
        cancelBtn.addEventListener('click', (ev) => {
            this.cancelEdits();
        });
        this.editBar.appendChild(cancelBtn);
    }

    saveEdits() {
        // Markup text for display and also storage
        let newText = markupForDisplay(this.editBox.innerHTML);
        // Get ID for record from itemBox (parent or parent's parent)
        const maniID = this.editBox.closest('.itemBox').
            getAttribute('maniID');
        // Get name of DB column being edit
        let colName = '';
        switch (this.originalClass) {
            case 'soundbiteBox':
                colName = 'soundbite';
                break;
            case 'itemDesc':
                colName = 'description';
                break;
            case 'itemNotes':
                colName = 'notes';
        }
        // Format POST as json to keep formatting
        let postjson = {'id': maniID};
        postjson['colName'] = colName;
        postjson['newText'] = newText;
        // POST json to server
        fetch('/saveEdits', {
            method: 'POST',
            headers: new Headers({"Content-Type": "application/json"}),
            body: JSON.stringify(postjson)
        })
        .then(response => {
            // First response is headers
            return response.json();
        })
        .then(message => {
            // Next response is returned by server function
            if (message.status === 'ok') {
                this.editBox.innerHTML = newText;
            } else {
                this.editBox.innerHTML = newText;
                alert("Sorry, an error may have occured while saving." +
                    " Try refreshing the page")
            }
        })
        .catch(err => {
            // This will catch 404s etc.
            alert(`Unexpected Error: ${err}`);
        });
        this.stopEditing();
    }

    cancelEdits() {
        this.stopEditing();
        this.editBox.innerHTML = this.originalContent;
    }

    stopEditing() {
        // Remove Save & Cancel buttons, put back Edit
        this.editBar.querySelector('.saveBtn').remove();
        this.editBar.querySelector('.cancelBtn').remove();
        this.editBtn.style.display = 'inline';
        // Return element to normal state
        this.editBox.setAttribute('contentEditable', false);
        this.editBox.className = this.originalClass;
    }
}


export { EditElement };