var spaceShip,laser,lasersGroup;
var aliens,aliensGroup;
var alienAnm1,alienAnm2,alienAnm3,alienAnm4;
var spaceAnm,laserAnm;
var edges ,backgroundImg;


function preload(){
  spaceAnm = loadAnimation("space.gif");
  laserAnm = loadAnimation("laserbeam.gif");
  alienAnm1 = loadAnimation("alien1.gif");
  alienAnm2 = loadAnimation("alien2.gif");
  alienAnm3 = loadAnimation("alien3.gif");
  alienAnm4 = loadAnimation("alien4.gif");
  getTime();


}

function setup(){
  spaceShip = createSprite(50,200,20,20);
spaceShip.addAnimation("space",spaceAnm);
spaceShip.scale = 0.2;



 aliensGroup = new Group();
 lasersGroup = new Group();

}

function draw() {
  //set background according to the game 
  if(backgroundImg)
        background(backgroundImg);

if(keyDown("up")){
  spaceShip.y = spaceShip.y -2;
}
if(keyDown("down")){
  spaceShip.y = spaceShip.y +2;
}
if(keyDown("left")){
  spaceShip.x = spaceShip.x -2;
}
if(keyDown("right")){
  spaceShip.x = spaceShip.x +2;
}

// laser.y = spaceShip.y;

if(keyDown("enter")&&keyDown("space")){
  spwanLaser();

}

spawnAliens();
if (aliensGroup.isTouching(lasersGroup)){
  aliensGroup.destroyEach();
  lasersGroup.destroyEach();
  
}


edges = createEdgeSprites();
spaceShip.bounceOff(edges);

drawSprites();

}

function spawnAliens(){
  if(frameCount % 100 === 0){
    aliens = createSprite(350,350,20,20);
    aliens.scale = 0.20;
    aliens.velocityX = -3;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: aliens.addAnimation("alienMoving",alienAnm1);
              break;
      case 2: aliens.addAnimation("alien",alienAnm2);
              break;
      case 3: aliens.addAnimation("alien",alienAnm3);
              break;
      case 4: aliens.addAnimation("alien",alienAnm4);
              break;
      default: break;
    }
    aliensGroup.add(aliens);
    aliens.lifetime = 200;
  }
}

function spwanLaser(){
 laser = createSprite(50,spaceShip.y,20,20);
 laser.addAnimation("laserbeam",laserAnm);
 laser.scale = 0.1;
 laser.velocityX = 2;
 lasersGroup.add(laser)

}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
console.log(responseJSON)
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  console.log(datetime);
  console.log(hour);
  if(hour>=06 && hour<=18){
      bg = "bg2.gif";
  }
  else{
      bg = "bg1.gif";
  }

  backgroundImg = loadImage(bg);
}

