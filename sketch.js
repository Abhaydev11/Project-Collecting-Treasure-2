var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver;

//Game States
var PLAY=1;
var END=0;
var gameState=1;


touches=[]

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY =(20+(treasureCollection/500));


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
gameOver = createSprite(width/2,height/2);  
gameOver.addAnimation("end",endImg)
gameOver.visible=false;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy))
   {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+150;
      
    }else if(jwelleryG.isTouching(boy))
   {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else{ if(swordGroup.isTouching(boy))
    {
     gameState=END;

    }
  }
}
else if(gameState===END){
    
     gameOver.visible=true;
 
     path.velocityY=0
     cashG.destroyEach();
     cashG.setVelocityYEach(0);
     jwelleryG.destroyEach();
     jwelleryG.setVelocityYEach(0);
     diamondsG.destroyEach();
     diamondsG.setVelocityYEach(0);
     swordGroup.destroyEach();
     swordGroup.setVelocityYEach(0);
     
     }
  
     if(touches.length>0 || keyDown("SPACE")) 
     {      
      reset();
      touches = []
     }
  
  drawSprites();
  textSize(20);
  fill("220");
  textFont("algiria");
  text("Treasure: "+ treasureCollection,250,30);
  

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = (13+(treasureCollection/200));
  cash.lifetime = 250;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = (13+(treasureCollection/200));
  diamonds.lifetime = 250;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = (13+(treasureCollection/200));
  jwellery.lifetime = 250;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = (8+(treasureCollection/200));
  sword.lifetime = 250;
  swordGroup.add(sword);
  }
}

function reset()
{
  gameOver.visible=false;
  path.velocityY =(20+(treasureCollection/500));
  console.log("reset")
  gameState= PLAY;
  boy.scale=0.08;
  treasureCollection=0;
}