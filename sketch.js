var monkey,monkeyAnim;
var banana,bananaImg;
var bg,bgImg;
var stone,stoneImg;
var PLAY;
var END;
var gamestate;
var score;
var count;
var gameover,restart;
var stones,fruits;
var invisibleGround;

function preload(){
  
  bgImg = loadImage("forest.jpg");

monkeyAnim=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  
  Restart = loadImage("reset.png");
  Gameover = loadImage("gameover.png");
  
  monkey_collided = loadImage("monkey_collided.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  bg = createSprite(displayWidth/2, displayHeight/2,displayWidth,displayHeight);
  bg.addAnimation("bg",bgImg);
  bg.x = bg.width/2;
  bg.velocityX = -6;
  bg.scale = 5.78;

  PLAY = 1;
  END = 0;
  gamestate = PLAY;

  monkey = createSprite(50,displayHeight/2+200,30,50);
  monkey.addAnimation("monkey",monkeyAnim);
  monkey.scale = 0.1;

  stones  = createGroup();
  fruits  = createGroup();
  
  score = 0;
  count = 1;
  
  gameover = createSprite(displayWidth/2-300, displayHeight/2-50,30,30);
  gameover.addImage("textGameOver_1",Gameover);

  restart = createSprite(displayWidth/2-300, displayHeight/2+30,30,30);
  restart.addImage("restart",Restart);

  gameover.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(displayWidth/2,displayHeight/2+300,displayWidth,5);
  invisibleGround.visible = false;
  
  monkey2 = createSprite(50,displayHeight/2+200,30,50);
  monkey2.addImage("monkeycollided",monkey_collided);
  monkey2.visible = false;
}

function draw() {
   background("black");

 if(gamestate === PLAY){
   
    score = score + Math.round(World.frameRate/40);

    if(bg.x < 0){
      bg.x = bg.width/2;
    }
 
 if(keyDown("space") && monkey.y>=displayHeight/2+200){
   monkey.velocityY = -10;
 }
 
 monkey.velocityY = monkey.velocityY + 0.5;
 
 if (fruits.isTouching(monkey)) {
   fruits.destroyEach();
   count = count + 1;
 }
 
 
 if(stones.isTouching(monkey)){
   gamestate = END;
   monkey.velocityY = 0;
   count = count - 1;
 }
   
 b();
  
 spawnstones();
   
   switch(count){
     case 3 : monkey.scale = 0.12;
       break;
     case 6 : monkey.scale = 0.14;
       break;
     case 9 : monkey.scale = 0.16;
       break;
     case 12 : monkey.scale = 0.18;
       break;
   }

  camera.position.x = monkey.x;
  camera.position.y = monkey.y;
 
  
 }
 
 if(gamestate === END){
   monkey.visible = false;
   monkey2.visible = true;
   
   bg.velocityX = 0;
   stones.setVelocityXEach(0);
   fruits.setVelocityXEach(0);
   
   stones.setLifetimeEach(-1);
   fruits.setLifetimeEach(-1);
   
   if(keyDown("space")){
     monkey.velocityY = 0;
   }
   
  gameover.visible = true;
  restart.visible = true;

  if (mousePressedOver(restart)) {
    gamestate = PLAY;
    reset();
  }
   
 }
 
 
 
  
  
  monkey.collide(invisibleGround);
  
 drawSprites();
 
 fill("black");
 textSize(25);
 textFont(BOLD);
 text("Survived Time: " + score + " sec",0,displayHeight/8-15+270);
 text("Monkey Energy: " + count,0,displayHeight/8+15+270);
}

function reset(){
  
  monkey.visible = true;
  monkey.scale = 0.1;
  
  monkey2.visible = false;
   
  
  gameover.visible = false;
  restart.visible = false;
  
  monkey.addAnimation("monkey",monkeyAnim);
  
  score = 0;
  
  fruits.destroyEach();
  stones.destroyEach();
   
  count = 1;
  
  bg.velocityX = -5;
}

function spawnstones(){
  if(World.frameCount % 100 === 0){
    
  var rock = createSprite(displayWidth,displayHeight-180,40,30);
  rock.velocityX = -6;
  rock.scale = 0.2;
  
  rock.addImage("stone",stoneImg);
  
  rock.lifetime = displayWidth/6;
  
  stones.add(rock);
  }
}

function b(){
  
  if(World.frameCount % 280===0){
    
    var banana = createSprite(displayWidth,displayHeight/2+210,10,40);
    banana.addImage("Banana",bananaImg);
    banana.scale = 0.05;
   
    banana.y = random(displayHeight/2,displayHeight/2+70); 
    
    banana.velocityX = -6;
    
    fruits.add(banana);
  }
}
