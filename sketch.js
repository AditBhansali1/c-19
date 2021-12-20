var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
  
}

function draw() {
  background(0);
  if(gameState=="play"){
  spawnDoors()
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown ("space")){
      ghost.velocityY=-5
    }
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3
    }
    ghost.velocityY=ghost.velocityY+0.8
    drawSprites();
 
      if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
        gameState="end"
        ghost.destroy()
  
      }
  
    if(climbersGroup.isTouching(ghost)){ 
      ghost.velocityY=0
    }
  }
  if(gameState=="end"){
background(0)
     textSize(30)
     fill("yellow")
     text("gameOver",230,250)
  }
}
function spawnDoors() {
  if(frameCount%240==0){

  
  door = createSprite(200,-50)
  door.addImage(doorImg)
  door.velocityY=1
  door.x=Math.round(random(120,400))
  climber = createSprite(200,10)
  climber.addImage(climberImg)
  climber.x=door.x
  climber.velocityY=1
  ghost.depth=climber.depth+1
  climber.lifetime=800
  door.lifetime=800
  invisibleBlock=createSprite(200,15,climber.width,10)
  invisibleBlock.velocityY=1
  invisibleBlock.x=door.x
  invisibleBlock.lifetime=800
  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)
  invisibleBlock.visible=false

  }
}