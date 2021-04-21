var balloon,balloonImage1,balloonImage2, balloonPosition, database, position;
// create database and position variable here

function preload(){
   bg = loadImage("cityImage.png");
   balloonImage1 = loadImage("hotairballoon1.png");
   balloonImage2 = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png");
   var ballonPosition = database.ref('Balloon/Position');
   ballonPosition.on("value", readPosition, showError);
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500, 700);

  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale = 0.5;



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    writePosition(-10, 0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10, 0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0, -10);
    balloon.addAnimation("hotairballoon", balloonImg3); 
    balloon.scale = balloon.scale-0.02;    
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0, 10);
    balloon.addAnimation("hotairballoon", balloonImg1);     
    balloon.scale = balloon.scale+0.02; 
    //write code to move air balloon in down direction
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  }
  
  function writePosition(x, y){
  database.ref('Balloon/Position').set({
    'x': balloon.x + x,
    'y': balloon.y + y,
  })
  }
  
  function showError(){
    console.log("error");
  }