var bg, bg_image;
var bob, bob_img, bob_gamelost_img;

var invisibleGround;
var invisibleTopLayer;
var lion, lion_img, bear, bear_img, elephant, elephant_img, fox, fox_img, snake, snake_img, tiger, tiger_img;
var animalsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var dartRight, dartRight_img, dartLeft_img;
var dartsGroup;
var score;
var restart, restart_img;
var gameover, gameover_img;


function preload() {
    bg_image = loadImage("bg.jpg");

    // =====PLAYING CHARACTER=====
    bob_img = loadAnimation("bob_1.png", "bob_2.png");

    bob_gamelost_img = loadAnimation("bob_gamelost.png", "bob_gamelost.png");

    // =====NON-PLAYING CHARACTERS=====
    lion_img = loadImage("lion.png");
    bear_img = loadImage("snake.png");
    elephant_img = loadImage("elephant.png");
    fox_img = loadImage("fox.png");
    snake_img = loadImage("snake.png");
    tiger_img = loadImage("tiger.png");
    restart_img = loadImage("restart.png");
    gameover_img = loadImage("gameover.png");


    //dartRight_img = loadImage("dartright_3.png")
    dartLeft_img = loadImage("dartright.png")

}

function setup() {
    createCanvas(1200, 700);

    bg = createSprite(900, 380);
    bg.addImage(bg_image);
    bg.scale = 0.257;
    // if scale decrease, then other values such as image length increases

    bob = createSprite(100, 500);
    bob.addAnimation("moving", bob_img);
    bob.scale = 0.5;

    invisibleGround = createSprite(0, 670, 2400, 20);
    invisibleGround.visible = false;

    invisibleTopLayer = createSprite(0, 250, 2400, 20);
    invisibleTopLayer.visible = false;

    animalsGroup = new Group();
    dartsGroup = new Group();

    //rightDartGroup = new Group();

    restart = createSprite(50, 50);
    restart.addImage(restart_img);
    restart.visible = false;
    restart.scale = 0.2;

    gameover = createSprite(600, 350);
    gameover.addImage(gameover_img);
    gameover.scale = 0.8;

    bob.debug = false;
        
    bob.setCollider("rectangle", 10,10,350,400)
    score = 0;
    stroke("brown");
    fill("brown");
    textSize(20);

    swal({
        title: "Instructions",
        text: "If you collect an arrow on the track you can press 'right arrow key' to launch it and kill the other animals. Use Up Arrow Key to dodge the animals and stay alive!",
        button: "Continue",
    });

}

function draw() {
    background(0);


    if (gameState === PLAY) {

        gameover.visible = false;

        bg.velocityX = -8;

        bob.changeAnimation(bob_gamelost_img);

        if (bg.x < 370) {
            bg.x = bg.width / 8;
        }

        if (keyDown("space")) {
            bob.velocityY = -13;
        }

        if (keyDown("LEFT_ARROW")) {
            bob.x+=1;
          }

        bob.velocityY = bob.velocityY + 0.435;

        bob.collide(invisibleGround)


       /* if (bob.collide(invisibleTopLayer)) {
            bob.y = 600;
        }*/

       /* if (dartsGroup.collide(bob)) {
            dartsGroup.destroyEach();*/

          /*  if (keyDown("RIGHT_ARROW")) {
                dartRight = createSprite(bob.x, bob.y);
                dartRight.velocityX = 15;
                dartRight.addImage(dartRight_img);
                dartRight.scale = 0.7;
                //rightDartGroup.add(dartRight);*/
                
                
                
                /*shoot();
                if (animalsGroup.collide( dartsGroup)) {
                    animalsGroup[0].destroy();
                    dartsGroup[0].destroy();
                    score = score + 1;
                }*/

                shoot();
                if(dartsGroup.overlap(animalsGroup)){
                    animalsGroup[0].destroy();
                    dartsGroup[0].destroy();
                   
                   score = score+1;
                    
                }
            

                
           // }
       // }

        /*if (animalsGroup.collide(bob)) {
            gameState = END;
        }*/


        if(animalsGroup.collide(bob)){
            bob.velocityY = 0.0;
            bob.visible = false;
            bob.y = 350;
            
    
            gameState = END;
        }
    } else if (gameState === END) {
       /* bg.velocityX = 0;
        // animalsGroup.setVelocityXEach(0);
        // animalsGroup.setVelocityYEach(0);
        dartsGroup.setVelocityXEach(0);
        dartsGroup.setVelocityYEach(0);
        bob.velocityY = 0.0;
        // animalsGroup.setVisibleEach(false);
        dartsGroup.setVisibleEach(false);
        // dartRight.velocityX = 0;
        // bob.changeAnimation(bob_gamelost_img);*/



        restart.visible = true;
        gameover.visible = true;
        text("Please reload your screen to play again", 600, 50);
        

        if(mousePressedOver(restart)) {
            reset();
          }

          bg.velocityX = 0;
          
          dartsGroup.setVelocityXEach(0); 
          dartsGroup.setVelocityYEach(0); 
          
          dartsGroup.setVisibleEach(false);
          animalsGroup.setVelocityXEach(0); 
          animalsGroup.setVelocityYEach(0); 
          
          animalsGroup.setVisibleEach(false);
    }

    spawnAnimals();

    //spawnDarts();

    drawSprites();
    text("Score: " + score, 250, 50);
}

function spawnAnimals() {
    if (frameCount % 170 === 0) {
        animals = createSprite(1100, 600, 35, 55);
        animals.velocityX = -10;
        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1: animals.addImage(lion_img);
                break;
            case 2: animals.addImage(bear_img);
                break;
            case 3: animals.addImage(elephant_img);
                break;
            case 4: animals.addImage(fox_img);
                break;
            case 5: animals.addImage(snake_img);
                break;
            case 6: animals.addImage(tiger_img);
                break;
            default: break;
        }
        animals.scale = 0.17;
        animals.lifetime = 110;
        animalsGroup.add(animals);
    }
}

/*function spawnDarts() {
    if (frameCount % 100 === 0) {
        dart = createSprite(100, 600, 20, 25);
        //dart.velocityX = 8;
        dart.addImage(dartLeft_img);
        dart.scale = 0.09;
       // dart.lifetime = 138;
        dartsGroup.add(dart);
    }
}*/

function reset(){

    gameState = PLAY;
    bob.visible=true;
    bob.x = 50;
    //bob.y = 600;
    restart.visible = false; 
    score = 0;
    
    

    
}


function shoot(){
    if(keyDown("RIGHT_ARROW")){
        if(frameCount % 10 == 0){
        //bulletGroup[0].visible
        dart = createSprite(bob.x, bob.y);
        dart.addImage(dartLeft_img);
        dart.velocityX = 9;
        dartsGroup.add(dart);
        dart.scale = 0.05;
        dart.lifetime = 100;
        }

    }
}