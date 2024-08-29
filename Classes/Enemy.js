/* Class file from which enemies are created which
form the main challenge in the game
*/
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2;
    }

    draw() {
        fill('black');
        rect(this.getX(), this.getY()-15, 50, 10, 2); //wheels
        rect(this.getX(), this.getY()+10, 50, 10, 2);
        fill('#6b0500');
        strokeWeight(2);
        rect(this.getX(), this.getY(), 40, 70, 12); //body
    }

    move() {
        this.setY(this.getY()+this.getSpeed());
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setY(newY) {
        this.y = newY;
    }

    getSpeed() {
        return this.speed;
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed
    }
}