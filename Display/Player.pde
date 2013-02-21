class Player {
  String t; 
  //float cw = textWidth(t);
  float x;
  float y;
  float playerSize;
  float energySize;
  color colorEnergy;
  color colorPlayer;
  int _team;


  Player(float x, float y, float playerSize, float energySize, color colorPlayer, color colorEnergy) {
    this.x = x;
    this.y = y;
    this.playerSize = playerSize;
    this.energySize = energySize;
    this.colorPlayer = colorPlayer;
    this.colorEnergy = colorEnergy;
  }


  void draw() { 
    fill(colorEnergy);
    ellipse(x, y, energySize, energySize);
    fill(colorPlayer);
    ellipse(x, y, playerSize, playerSize);
    
    drawSpeechBubble("holaaa");
  }

  void setPosition(float x, float y) { 
    this.x = x;
    this.y = y;
  }

  float getPositionX() {
    return this.x;
  }
  float getPositionY() {
    return this.y;
  }
  float getPlayerSize() {
    return this.playerSize;
  }
  
  void setPlayerSize(float playerSize) {
    this.playerSize = playerSize;
  }
  float getEnergySize() {
    return this.energySize;
  }
  
  void setEnergySize(float energySize) {
    this.energySize = energySize;
  }
  color getColorPlayer() {
    return this.colorEnergy;
  }
  
  void setColorPlayer(color colorPlayer) {
    this.colorPlayer = colorPlayer;
  }
  
  color getColorEnergy() {
    return this.colorEnergy;
  }
  
  void setColorEnergy(color colorEnergy) {
    this.colorEnergy = colorEnergy;
  }
  void setTeam(int team){
   _team = team; 
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
  
  void drawSpeechBubble(String t) {
    pushMatrix();
    translate(x-65, y-135);
    
    stroke(0);
    beginShape();
    vertex(30, 20);
    vertex(125, 20);
    vertex(125, 75);
    vertex(55,75);
    vertex(42,95);
    vertex(30, 75);
    endShape(CLOSE);
  
    fill(0);
    //println(cw);
  
    text(t,55,55);
    fill(255,0,0);
   
    popMatrix(); 
  }
}

