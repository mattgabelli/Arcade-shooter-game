/* Class file from which player is created this forms the backbone for the gameplay*/
class Player {
    constructor(startX, startY, colour) {
        this.startX = startX;
        this.startY = startY;
        this.colour = colour;
    }

    draw() {
        fill('black');
        rect(myCar.getStartX(), myCar.getStartY()-10, 60, 10, 2); //wheels
        rect(myCar.getStartX(), myCar.getStartY()+20, 60, 10, 2);
        fill(myCar.getColour());
        strokeWeight(2);
        rect(myCar.getStartX(), myCar.getStartY(), 50, 80, 15);
    }

    getStartX() {
        return this.startX;
    }

    setStartX(newX) {
        this.startX = newX;
    }

    getStartY() {
        return this.startY;
    }

    setStartY(newY) {
        this.startY = newY;
    }

    getColour() {
        return this.colour;
    }

    setColour(newColour) {
        this.colour = newColour;
    }
}
