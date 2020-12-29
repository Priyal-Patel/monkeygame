
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   //creating monkey character
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1; 
  
 ground = createSprite(400,350,900,10);
 ground.velocityX = -4;
 console.log(ground.x); 
  
  fruitGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background(250);
  
  if(ground.x<0){
  ground.x=ground.width/2;
}
  if(keyDown("space")){
    monkey.velocityY = -5;
  }
  monkey.velocityY = monkey.velocityY+3;
  monkey.collide(ground);
  
  spawnFruits();
  spawnObstacles();
  
  if (obstaclesGroup.isTouching(monkey)){
    fruitGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    fruitGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);  
  }
  drawSprites();
  var survivalTime = 0;
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
}

function spawnFruits(){
 if(frameCount%80===0){
     fruit = createSprite(600,250,40,10);
     fruit.addImage(bananaImage);
     fruit.scale = 0.1 ;
     fruit.y = random(120,200);
     fruit.velocityX = -5;
     monkey.depth = fruit.depth+1;
     fruitGroup.add(fruit);   
 }
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstaclesGroup.add(obstacle);
  }
}
