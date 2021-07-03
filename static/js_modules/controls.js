/* Controls for displaying apps */

class ControlBox {
    constructor(ele) {
        this.controlsBox = ele;
    }

    init() {
        this.controlsBox.innerHTML = 'Controls go here';
    }
}

export { ControlBox }