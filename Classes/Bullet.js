/* Class from which bullets are created
bullets fired from player hit enemy and increase score
*/
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        fill(0, 230, 222);
        rect(this.getBX(), this.getBY()-15, 10, 10, 2);
    }

    move() {
        this.setBY(this.getBY()-3);
    }

    getBX() {
        return this.x;
    }

    getBY() {
        return this.y;
    }

    setBY(newY) {
        this.y = newY;
    }
}