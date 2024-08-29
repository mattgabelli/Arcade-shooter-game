/* Class from which buttons are created
these buttons are the primary form of navigation in my game
*/
class Button {
    constructor(text, height, width, centreX, centreY) {
        this.text = text;
        this.height = height;
        this.width = width;
        this.centreX = centreX;
        this.centreY = centreY;
        this.colour = '#d5ff6b';
    }

    getText() {
        return this.text;
    }

    setText(newText) {
        this.text = newText;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getCentreX() {
        return this.centreX;
    }

    getCentreY() {
        return this.centreY;
    }
}