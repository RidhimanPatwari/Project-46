const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
var engine, world;
var playButtonImage;
var homepage, homepageImage;
var gameState = "homepage";
var image;
var button;
var playButton = document.getElementById("playButton");
var ground;
var player, playerImage, playerSprite;
var obstacle1, obstacleImage;
var counter = 1;
var jumpButton = document.getElementById("jumpButton");
var playBg;
var obstacleCounter = 0;
var endBg;
var block1
var obstaclesGroup;
var obstacle1X;

function preload() {
  playButtonImage = loadImage("play_button.png");
  homepageImage = loadImage("homepage.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(1200,800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(600, 700, 1214, 207);
  engine.timing.timeScale = 2;
  player = new Player(200, 550);
  //playerSprite.draw = function() {ellipse(player.body.position.x , player.body.position.y, 100, 100)}
  block1 = new Block(600, 300);

  obstaclesGroup = new Group();
  
}

function draw() {
  //background(195, 237, 255); 
  Engine.update(engine);
  
  obstacle1 = createSprite(1200,550,100,100);
  obstacle1.addImage(obstacleImage);
  obstaclesGroup.add(obstacle1);
  //obstacle1.visible = false;

  if (gameState === "homepage") {
    homepage = createSprite(600, 400, 1200, 800);
    homepage.addImage(homepageImage);    
    drawSprites();
    playButton.onclick = function() {
      playButton.remove();
      playBg = createSprite(600, 400, 1200, 800);
      playBg.shapeColor = rgb(195, 237, 255);
      homepage.visible = false;
      gameState = "play";
    }

  }

  

  if (gameState === "play") {
    background(195, 237, 255);
    
    
    

    
    playerSprite = createSprite(player.body.position.x, player.body.position.y, 100, 100); 
    drawSprite(playerSprite);
    
    
    createObstacles();

    

    ground.display();
    player.display();

    block1.display();
    Matter.Body.setStatic(block1.body, false);
    Matter.Body.applyForce(block1.body, block1.body.position, {x: -0.1, y: 0});

    textSize(30);
    
    jumpButton.onmousedown = function() {
      Matter.Body.applyForce(player.body, player.body.position, {x: 0, y: -0.2});
    }
    
    
    

    fill("darkblue");
    text("FPS: " + Math.trunc(frameRate()), 10, 30);
    noFill();
    
    /*
    if (playerSprite.x - obstacle1.x < obstacle1.width/2 + playerSprite.width/2
      && obstacle1.x - playerSprite.x < obstacle1.width/2 + playerSprite.width/2
      && playerSprite.y - obstacle1.y < obstacle1.height/2 + playerSprite.height/2
      && obstacle1.y - playerSprite.y < obstacle1.height/2 + playerSprite.height/2) {
        console.log("plz work...");
    }
    */
  }

  if (gameState === "end") {
    background(255, 255, 255);
    var endBg = createSprite(600, 400, 1200, 800);
    endBg.shapeColor = "white";
    drawSprite(endBg);
    text("Work In Progress", 600, 400);
  }

}

function createObstacles() {
  if (frameCount === 50) {
    obstacle1.visible = true;
    obstacle1.velocityX = -10;
    obstacle1.lifetime = 500;
    if (playerSprite.x === obstacle1.x) {
      console.log("plz...");
    }
  }
  
  drawSprites();
}


