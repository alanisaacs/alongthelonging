/* Enable elements to be edited */

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
        this.stopEditing;
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