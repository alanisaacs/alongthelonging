/* Enable elements to be edited */

class EditElement {
    constructor(ele) {
        this.editBox = ele;
        this.editBtn = this.editBox.querySelector('.editBtn')
        this.originalContent = ele.innerHTML;
    }
    
    init() {
        // Initialize instance; make element editable
        this.editBox.setAttribute('contentEditable', true);
        this.editBox.className = 'editMode';
        this.addSaveCancelBtns();
    }

    addSaveCancelBtns() {
        // Hide the edit button
        this.editBtn.style.display = 'none';
        // Create Save and Cancel buttons
        const saveBtn = document.createElement('button');
        saveBtn.className = 'saveBtn';
        saveBtn.innerText = 'Save';
        saveBtn.setAttribute('contentEditable', false);
        saveBtn.addEventListener('click', (ev) => {
            this.saveEdits();
        });
        this.editBox.appendChild(saveBtn);
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancelBtn';
        cancelBtn.innerText = 'Cancel';
        cancelBtn.setAttribute('contentEditable', false);
        cancelBtn.addEventListener('click', (ev) => {
            this.cancelEdits();
        });
        this.editBox.appendChild(cancelBtn);
    }

    saveEdits() {
        console.log("Saving Edits");
    }

    cancelEdits() {
        console.log("Canceling Edits");
    }
}


export { EditElement };