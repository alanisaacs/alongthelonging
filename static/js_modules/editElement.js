/* Enable elements to be edited */

class EditElement {
    constructor(ele) {
        console.log(">>> editElement.js: EditElement: constructor: top");
        this.editBox = ele;
        this.content = ele.innerHTML;
    }
    
    init() {
        console.log(">>> editElement.js: EditElement: init: top");
        // Initialize instance; make element editable
        this.editBox.setAttribute('contentEditable', true);
        this.editBox.className = 'editMode';
    }
}

export { EditElement };