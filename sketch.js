var monkey, monkey_running,monkey_end;
var banana, bananaImage, bananaGroup, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0,ground;
var END = 0,PLAY = 1;
var gameState=PLAY;
var restart,restartImage;
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_end=loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage=loadImage("restart.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  background(rgb(100,100,100));
  monkey = createSprite(width*(50/400),height*(260/400));
  obstacleGroup = new Group();
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
  ground = createSprite(width, height*(300/400), width, height*(10/400));
  ground.x = ground.width / 2;
  bananaGroup = new Group();
  restart=createSprite(width/2,height/4);
    restart.addImage(restartImage);
  restart.visible=false;
}


function draw() {
  background("white");
  
  if (gameState===PLAY) {
    obstacleGroup.setVelocityXEach(-5);
    bananaGroup.setVelocityXEach(-5);
    if (keyDown("space") && monkey.y > height*(257/400)) {
      monkey.velocityY = -(height*(15/400));
    }
    text("score:" + score, width*(350/400), height*(370/400));
    monkey.velocityY = monkey.velocityY + (height*(0.8/400));

    monkey.debug = true;
    //monkey.setCollider("circle", 10, 10,width*(250,400))
    spawnobs();
    bananaSpawn();
    obstacleGroup.setVelocityXEach(-(width*(5/400)));
    bananaGroup.setVelocityXEach(-(width*(5/400)));
    scoree();
    console.log(monkey.y);
  
  }
  if (monkey.isTouching(obstacleGroup)) {
    gameState = END;
  }
  if (gameState===END) 
  
  {
    gameState=END;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);  
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    restart.visible=true;
    monkey.velocityY=0;
    monkey.velocityX=0;
    monkey.changeImage(monkey_end);
    if (mousePressedOver(restart))
    {
      gameState=PLAY;
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      restart.visible=false;
      score=0;
    }  
  }
monkey.collide(ground);
ground.debug=true;
ground.setCollider("rectangle",0,10,1000,10);
  drawSprites();

}

function spawnobs() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {
    obstacle = createSprite(width, height*(270/400));
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.15;
    obstacle.debug = true;
    
    obstacle.lifetime = (-(width*(5/400)))*(width);
  }
}



function bananaSpawn() {
  if (frameCount % 80 === 0) {
    banana = createSprite(width, Math.round(random(height*(120/400), height*(200/400))));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    //banana.velocityX=-5;
    banana.lifetime =(-(width*(5/400)))*(width);
    bananaGroup.add(banana);
  }
}

function scoree() {
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 10;
  }
  if (frameCount % 20 === 0) {
    score++;
  }
}