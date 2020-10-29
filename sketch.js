   
   var PLAY = 0;
   var gameState = PLAY;
   var score =0;

   function preload(){
    spaceImage= loadImage("images/bgspace.jpg");
    enemyImage= loadImage("images/enemy.png");
    spaceshipImage= loadImage("images/spaceShip.png");
   }
   
   function setup(){
     createCanvas(500,500)
    space = createSprite(0, 0 ,400, 400);
    space.addImage(spaceImage);  
    space.scale=3
    space.y = space.height/2;
    
    player = createSprite(200, 460);
    player.addImage(spaceshipImage);
    player.scale= 0.5;

    EnemyGroup = new Group();
    BulletGroup = new Group();
    textSize(25);
    fill("yellow")
   }


   
   function draw() {
  
   background("black");
   
   if(gameState === PLAY){
  
    if(keyWentDown("space"))  {
      generateBullets();  
   }

     space.velocityY= 5;
     player.x = World.mouseX;
   
     if (space.y > 500) {       
       space.y = space.height/2;
     }
  
     generateEnemy();
       
   }
   
   for (var i = 0; i < EnemyGroup.length; i++) {
   var temp=EnemyGroup.get(i);
   if(temp.isTouching(BulletGroup)){
     temp.destroy();
     score = score+1;
   }
 }  
 
   for (var i = 0; i < EnemyGroup.length; i++) {
     var temp1=EnemyGroup.get(i);
     if(temp1.y>500){
     temp1.destroy();
     score = score-1;
   }
 }  
   
   drawSprites();
    
     text("Score:  "+score,300,30); 
   }
  
  function generateEnemy() {
   if(World.frameCount%40===0){
     var enemy = createSprite(300,0);
     enemy.addImage(enemyImage);
     enemy.x = random(20,500);
     enemy.velocityY = 5;
     enemy.scale = 0.5;
     enemy.lifetime = 300;
     EnemyGroup.add(enemy);
   }
 }
 
 function generateBullets() {
   var bullet = createSprite(300,380,5,10);
   bullet.x = player.x;
   bullet.shapeColor = "red"; 
   bullet.velocityY = -10;
   bullet.depth = player.depth-1;
   bullet.lifetime = 200;  
   BulletGroup.add(bullet);
   
 }  
 
   
