int youX, youY;        // x,y position of "you"
int youSize = 100;      // assumes a circle - elliptical collision is VERY complicated
int speed = 5;         // speed to move you around

int ballX, ballY;      // x,y position of the ball - will be randomly placed in the setup
int ballSize = 100;    // assumes a circle - elliptical collision is VERY complicated
  var x = document.getElementById('map').offsetWidth;
  var y = document.getElementById('map').offsetHeight;  

  var punten1 =  youSize * 5;
  var punten2 = ballSize * 5;


void setup() {

  // BASIC SETUP STUFF
  size(x, y);
  smooth();
  noStroke();

  // PLACE "YOU" IN THE CENTER
  youX = width/2;
  youY = height/2;

  // STATIC RECTANGLE IN RANDOM POSITION ON SCREEN
  ballX = int(random(ballSize, width-ballSize));
  ballY = int(random(ballSize, height-ballSize));
}

void draw() {


  document.getElementById("speler1").innerHTML = punten1;
  document.getElementById("speler2").innerHTML = punten2;
  
  background(120,120,120);
  
  // TEST FOR COLLISION
  // returns true if hit, false if not
  if (ballBall(youX, youY, youSize, ballX, ballY, ballSize) == true) {
    if(keyPressed)
    {
      if(ballSize > 0 && key == 'p')
      {
       youSize = youSize + 1;
       ballSize = ballSize-1;
       punten1 = punten1 + 5
       punten2 = punten2 - 5
      }  
      else if(youSize > 0 && key == 'o')
      {
       youSize = youSize - 1;
       ballSize = ballSize + 1;
        punten1 = punten1 - 5
        punten2 = punten2 + 5
      }  
    }
  }
  else {
    fill(200);
  }

  
  //fill(0,255,0,50);
  // DRAW STATIC BALL
  fill(0,0,255,80);
  ellipse(ballX, ballY, ballSize, ballSize);
  fill(0,0,0);
  ellipse(ballX, ballY, 10,10); 

  // DRAW "YOU"
  fill(255, 0, 0,80);
  ellipse(youX, youY, youSize,youSize);
  fill(0,0,0);
  ellipse(youX, youY, 10,10); 

  // IF ARROW KEYS ARE PRESSED, UPDATE "YOU" POSITION
  if (keyPressed) {
    if (key == CODED) {
      if (keyCode == LEFT && youX > 0) {
        youX -= speed;
      }
      if (keyCode == RIGHT && youX < x) {
        youX += speed;
      }
      if (keyCode == UP && youY > 0) {
        youY -= speed;
      }
      if (keyCode == DOWN) {
        youY += speed;
      }
    }
    if(key == 'w')
    {
      ballY -=speed;
    }
    if(key == 's')
    {
      ballY +=speed;
    }
    if(key == 'a')
    {
      ballX -=speed;
    }
    if(key == 'd')
    {
      ballX +=speed;
    }
  }
}

/* 
 BALL/BALL COLLISION FUNCTION
 Takes 6 arguments:
 + x,y position of the first ball - in this case "you"
 + diameter of first ball - elliptical collision is VERY difficult
 + x,y position of the second ball
 + diameter of second ball
 
 */
boolean ballBall(int x1, int y1, int d1, int x2, int y2, int d2) {

  // find distance between the two objects
  float xDist = x1-x2;                                   // distance horiz
  float yDist = y1-y2;                                   // distance vert
  float distance = sqrt((xDist*xDist) + (yDist*yDist));  // diagonal distance

  // test for collision
  if (d1/2 + d2/2 > distance) {
    return true;    // if a hit, return true
  }
  else {            // if not, return false
    return false;
  }
}

