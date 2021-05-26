var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var end, endImg;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
  path=createSprite(200,windowHeight);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(windowWidth-170,windowHeight-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  boy.debug = false;
  boy.setCollider("circle",0,0,300);

  end = createSprite(windowWidth-200,windowHeight-300);
  end.addImage(endImg);
  end.scale = 0.7;
  end.visible = false;
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() {
  
  console.log(World.frameCount);

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  //boy.x = touches.X;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
    
    if(swordGroup.isTouching(boy)) {
      gameState=END;
  }
    if(gameState===END){
      cashG.destroyEach(1);
      diamondsG.destroyEach(1);
      jwelleryG.destroyEach(1);
      swordGroup.destroyEach(1);
      end.visible = true;
      boy.destroy();

    }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+50;
      
    }else if (jwelleryG.isTouching(boy)){
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,windowWidth-230,windowHeight-570)
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, windowHeight-250),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 1000;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, windowHeight-250),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 1000;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, windowHeight-250),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 1000;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 240 == 0) {
  var sword = createSprite(Math.round(random(50, windowHeight-250),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 1000;
  swordGroup.add(sword);
  }
}