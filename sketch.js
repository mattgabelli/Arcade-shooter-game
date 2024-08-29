/* This is the file where objects are initialised
the methods are run every frame
this is where all functionality across different files is centralised
*/
let logo, road;
let screen = 0;
let score = 0;
var theme, colourPicker;
var bullets = [];
var enemies = [];
let x1, y1, x2, y2, enemySpeed, interval;
let diffMode = 'Novice';

function preload() {
  road = loadImage('Images/road.png');
  logo = loadImage('Images/mm-logo.png')
  theme = loadSound('Audio/theme.mp3');
}

function setup() {
  frameRate(60);
  createCanvas(800, 800);
  theme.loop();
  theme.setVolume(0.3);

  //initialises buttons
  startBtn = new Button('START', 100, 280, 400, 380);
  customiseBtn = new Button('CUSTOMISE', 100, 280, 400, 540);
  difficultyBtn = new Button('DIFFICULTY', 100, 280, 400, 700);

  //initialise difficulty buttons
  beginnerBtn = new Button('BEGINNER', 70, 330, 400, 350);
  noviceBtn = new Button('NOVICE', 70, 330, 400, 435);
  intermediateBtn = new Button('INTERMEDIATE', 70, 330, 400, 520);
  advancedBtn = new Button('ADVANCED', 70, 330, 400, 605);
  expertBtn = new Button('EXPERT', 70, 330, 400, 690);

  //initialises player
  myCar = new Player(400, 650, '#262626');

  interval = 45;
  enemySpeed = 4;
}

//choosing what screen to display
function draw() {
  road.resize(500, 800);

  if (screen == 0) {
    menu();
  } else if (screen == 1) {
    play();
  } else if (screen == 2) {
    customise();
  } else if (screen == 3) {
    difficulty();
  }

}

//drawing menu screen
function menu() {
  screen = 0;
  background('#00472E');

  //hides colour picker
  if (colourPicker) {
    colourPicker.hide();
    colourPicker = null;
  }

  //draws road and logo
  imageMode(CENTER);
  image(road, 400, 400);
  image(logo, 400, 170);

  //instructions
  textAlign(LEFT);
  textSize(18);
  fill('white');
  text('Movement - A, D', 11, 17);
  text('Shoot - SPACE', 11, 37);

  //current difficulty notice
  fill('grey');
  textSize(22);
  text(diffMode, 11, 776);

  //draw buttons
  fill('#83C785');
  strokeWeight(6);
  rectMode(CENTER);
  rect(startBtn.getCentreX(), startBtn.getCentreY(), startBtn.getWidth(), startBtn.getHeight(), 20);
  rect(customiseBtn.getCentreX(), customiseBtn.getCentreY(), customiseBtn.getWidth(), customiseBtn.getHeight(), 20);
  rect(difficultyBtn.getCentreX(), difficultyBtn.getCentreY(), difficultyBtn.getWidth(), difficultyBtn.getHeight(), 20);

  //label buttons
  textSize(35);
  textFont('Impact');
  fill(0);
  textAlign(CENTER, CENTER);
  text(startBtn.getText(), startBtn.getCentreX(), startBtn.getCentreY());
  text(customiseBtn.getText(), customiseBtn.getCentreX(), customiseBtn.getCentreY());
  text(difficultyBtn.getText(), difficultyBtn.getCentreX(), difficultyBtn.getCentreY());
}

//drawing play screen
function play() {
  screen = 1;
  background('#00472E');
  
  if (colourPicker) {
    colourPicker.hide();
    colourPicker = null;
  }

  //instructions
  textAlign(LEFT);
  textSize(18);
  fill('white');
  text('Movement - A, D', 11, 17);
  text('Shoot - SPACE', 11, 37);
  text('Quit - Q', 11, 57);

  //score
  textSize(30);
  text('Score: ' + score, 11, 776);

  //draws road
  imageMode(CENTER);
  image(road, 400, 400);

  //drawing player
  myCar.setStartY(650);
  myCar.draw();

  //player movement
  if (keyIsDown(68) && myCar.getStartX() >= 225 && myCar.getStartX() <= 570) {
    //moves right while not at right boundary
    myCar.setStartX(myCar.getStartX()+6);
  } else if (keyIsDown(65) && myCar.getStartX() >= 230 && myCar.getStartX() <= 575) {
    //moves left while not at left boundary
    myCar.setStartX(myCar.getStartX()-6);
  } 

  //draw bullet
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].draw();
  }

  //update bullet position
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].move();
  }

  //draw enemy
  newEnemy();
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].draw();
  }  

  //update enemy position
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].move();
  }

  //updates enemy speed depending on setting
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].setSpeed(enemySpeed);
  }

  //returns to menu if enemy passes the player
  for (let i = bullets.length - 1; i >= -1; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (enemies[j].getY() >= myCar.getStartY()) {
        bullets.splice(0, bullets.length);
        enemies.splice(j, enemies.length - j);
        myCar.setStartX(400);
        menu();
      } 
    }
  }

  //detect collision
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (bullets[i] && enemies[j] && bulletCollision(bullets[i], enemies[j])) { // null checks for both arrays
      //handle collision
      score++;
      bullets.splice(i, 1);
      enemies.splice(j, 1);
      }
    }
  }
}

function customise() {
  screen = 2;
  background('#00472E');
  imageMode(CENTER);
  image(logo, 400, 170);

  //instructions
  textAlign(LEFT);
  textSize(18);
  fill('white');
  text('Quit - Q', 11, 17);

  //creates colour picker
  if (!colourPicker) {
    colourPicker = createColorPicker(myCar.getColour());
    colourPicker.position(375, 580);
  }
  colourPicker.show();

  //draws example character
  myCar.draw();

  //change colour of character to selection
  textAlign(CENTER);
  myCar.setColour(colourPicker.color());

  myCar.setStartY(500);
  myCar.draw();
}

function difficulty() {
  screen = 3;
  background('#00472E');
  imageMode(CENTER);
  image(logo, 400, 170);

  if (colourPicker) {
    colourPicker.hide();
    colourPicker = null;
  }

  //instructions
  textAlign(LEFT);
  textSize(18);
  fill('white');
  text('Quit - Q', 11, 17);

  //creating buttons
  strokeWeight(6);
  rectMode(CENTER);

  fill('#3EFF9F');
  rect(beginnerBtn.getCentreX(), beginnerBtn.getCentreY(), beginnerBtn.getWidth(), beginnerBtn.getHeight(), 20);
  
  fill('#51FF53');
  rect(noviceBtn.getCentreX(), noviceBtn.getCentreY(), noviceBtn.getWidth(), noviceBtn.getHeight(), 20);
  
  fill('#FCFF34');
  rect(intermediateBtn.getCentreX(), intermediateBtn.getCentreY(), intermediateBtn.getWidth(), intermediateBtn.getHeight(), 20);

  fill('#FFB232');
  rect(advancedBtn.getCentreX(), advancedBtn.getCentreY(), advancedBtn.getWidth(), advancedBtn.getHeight(), 20);
  
  fill('#FF7556');
  rect(expertBtn.getCentreX(), expertBtn.getCentreY(), expertBtn.getWidth(), expertBtn.getHeight(), 20);
 
  textAlign(CENTER);
  textSize(25);
  textFont('Impact');
  fill(0);
  text(beginnerBtn.getText(), beginnerBtn.getCentreX(), beginnerBtn.getCentreY());
  text(noviceBtn.getText(), noviceBtn.getCentreX(), noviceBtn.getCentreY());
  text(intermediateBtn.getText(), intermediateBtn.getCentreX(), intermediateBtn.getCentreY());
  text(advancedBtn.getText(), advancedBtn.getCentreX(), advancedBtn.getCentreY());
  text(expertBtn.getText(), expertBtn.getCentreX(), expertBtn.getCentreY());
}

//adds new bullet to bullets[] array
function keyPressed() {
  if (keyCode == 32) {
    bullets.push(new Bullet(myCar.getStartX(), myCar.getStartY()-30))
  }
  //return to menu option which wipes both arrays 
  else if (keyCode == 81) {
    menu();
  } 
  for (let i = bullets.length - 1; i >= -1; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (keyCode == 81) {
        bullets.splice(0, bullets.length);
        enemies.splice(j, enemies.length);
        myCar.setStartX(400);
        screen = 1;
        menu();
      } 
    }
  } 
}

//pushes new enemy to array every 2 seconds
function newEnemy() {
  if ((frameCount % interval) == 0) {
    enemies.push(new Enemy(random(230, 570), -25));
  }
}

//determines whether or not there was collision and returns boolean
function bulletCollision(b, e) {
  return (abs(b.getBX() - e.getX()) < 40 &&
  abs(b.getBY() - e.getY()) < 40);
}

function mouseClicked() {
  //action if startBtn is clicked
  if (mouseX >= 260 && mouseX <= 540 && mouseY >= 330 && mouseY <= 450 && screen == 0) {
    score = 0;
    play();
  } else if (mouseX >= 260 && mouseX <= 540 && mouseY >= 490 && mouseY <= 610 && screen == 0) { //first 3 conditions for main menu buttons
    customise();
  } else if (mouseX >= 260 && mouseX <= 540 && mouseY >= 650 && mouseY <= 770 && screen == 0) {
    difficulty();
  } else if (mouseX >= 235 && mouseX <= 565 && mouseY >= 315 && mouseY <= 385 && screen == 3) { //last 5 conditions for difficulty buttons
    enemySpeed = 2;
    interval = 60;
    diffMode = 'Beginner';
    menu();
  } else if (mouseX >= 235 && mouseX <= 565 && mouseY >= 400 && mouseY <= 470 && screen == 3) {
    enemySpeed = 5;
    interval = 45;
    diffMode = 'Novice';
    menu();
  } else if (mouseX >= 235 && mouseX <= 565 && mouseY >= 485 && mouseY <= 555 && screen == 3) {
    enemySpeed = 7;
    interval = 40;
    diffMode = 'Intermediate';
    menu();
  } else if (mouseX >= 235 && mouseX <= 565 && mouseY >= 570 && mouseY <= 640 && screen == 3) {
    enemySpeed = 9.5;
    interval = 40;
    diffMode = 'Advanced';
    menu();
  } else if (mouseX >= 235 && mouseX <= 565 && mouseY >= 655 && mouseY <= 725 && screen == 3) {
    enemySpeed = 11;
    interval = 30;
    diffMode = 'Expert';
    menu();
  }
}