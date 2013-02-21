//import java.util.Collections;

Player p;

int youX, youY;        // x,y position of "you"
int youSize = 100;      // assumes a circle - elliptical collision is VERY complicated
int speed = 5;
int playerNr = 10;

int ballX, ballY;      // x,y position of the ball - will be randomly placed in the setup
int ballSize = 100;    // assumes a circle - elliptical collision is VERY complicated


ArrayList<Player> players;
//Team teamRed;

ArrayList<Player> teamRed = new ArrayList<Player>();
ArrayList<Player> teamBlue = new ArrayList<Player>();


void setup() {

  // BASIC SETUP STUFF
  size(600, 800);
  smooth();
  noStroke();

  // PLACE "YOU" IN THE CENTER
  youX = width/2;
  youY = height/2;

  // STATIC RECTANGLE IN RANDOM POSITION ON SCREEN
  ballX = int(random(ballSize, width-ballSize));
  ballY = int(random(ballSize, height-ballSize));

  players = new ArrayList();
  //teamRed = new Team();
}

void draw() {
  background(120, 120, 120);
  //p1.draw();

  for (int i = 0; i < players.size(); i++) {
    p = players.get(i);
    //p.setPosition(mouseX, mouseY);
    p.draw();
  }
}
void keyPressed() {

  if (key == 'a') {
    println("Add");
    p = new Player(random(width), random(height), 20, 100, color(204, 153, 0), color(0, 0, 0));
    players.add(p);

  }
  if (key == 'r') {
    println("Remove");
    if (players.size() >= 1) {
      players.remove(p);
    }
  }
  //println(players);
  if (players.size() == playerNr) {
    
    //teamRed.addPlayers(players.subList(0, players.size() / 2 + players.size() % 2));
    
    teamRed.addAll(players.subList(0, players.size() / 2 + players.size() % 2));
   for(int i = 0; i < teamRed.size(); i++)
   {
     teamRed.get(i).setTeam(1);
     teamRed.get(i).setColorPlayer(color(255,255,255));
   }
    
    teamBlue.addAll(players.subList(players.size() / 2 + players.size()%2, players.size()));
    for(int i = 0; i < teamBlue.size(); i++)
   {
     teamBlue.get(i).setTeam(1);
     teamBlue.get(i).setColorPlayer(color(0,255,0));
   }
    
    
    println(teamRed);
    //println(teamBlue);
  }
}

