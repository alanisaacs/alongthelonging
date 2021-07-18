/* Controls for displaying apps */

class ControlBox {
    constructor(ele) {
        this.controlsBox = ele;
    }

    init() {
        const instructionBox = document.createElement('div');
        instructionBox.innerHTML = "Use these filters to determine " +
            "which items of the Manifesto are displayed.";
        this.controlsBox.appendChild(instructionBox);
        this.displayDefault();
    }

    displayDefault() {
        
    }
}

export { ControlBox }